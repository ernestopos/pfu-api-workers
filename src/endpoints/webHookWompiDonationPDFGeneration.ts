import { Bool, OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { type AppContext, PaypalDonation, Message, WebhookWompiSchema } from "../types";
import jsPDF from "jspdf";
import { sendDonationEmail } from "../common/sendMail";

export class WebHookWompiDonationPDFGeneration extends OpenAPIRoute{
    schema = {
		tags: ["Wompi Webhooks"],
		summary: "Receive transaction status updates from Wompi",
    description: "This endpoint handles webhook notifications from Wompi for transaction updates. It generates a PDF certificate for donations and sends it via email to the donor.",
		request: {
			body: {
				content: {
					"application/json": {
						schema: WebhookWompiSchema,
					},
				},
			},
		},
		responses: {
			"200": {
				description: "PDF generated successfully and email sent for Wompi donation platform.",
				content: {
					"application/json": {
						schema: z.object({
							series: z.object({
								success: Bool(),
								result: z.object({
									task: Message,
								}),
							}),
						}),
					},
				},
			},
		},
	};

    async handle(c: AppContext) {
            const data = await this.getValidatedData<typeof this.schema>();
            const donateData = data.body;

            if(donateData.event !== "transaction.updated" && donateData.event !== "nequi_token.updated" && donateData.event !== "bancolombia_transfer_token.updated" ) {
                return new Response("Event not supported", { status: 200 });
            }

            if(donateData.data.transaction.status !== "APPROVED") {
                return new Response("Status not supported", { status: 200 });
              
            }
            
            const donationPDF = await generateDonationPDF('PRUEBA', Number(donateData.data.transaction.amount_in_cents), 'COL', new Date(), 'INV-12345');
            await sendDonationEmail(donateData.data.transaction.customer_email,
                                    donationPDF,
                                    'PRUEBA');
            return {
                success: true,
                message: {
                    message: "PDF generated successfully and email sent.",
                    description: "The PDF for the donation has been created and the email has been sent.",
                },
            };
        };
}

export async function generateDonationPDF(donorName: string, amount: number, currency: string, date: Date, invoiceId: string) {
  const doc = new jsPDF({orientation: 'portrait', unit: 'pt', format: 'a4' });

  // Título
  doc.setFontSize(18);
  const logoUrl = 'https://cdn1.site-media.eu/images/0/17352501/PFU-Logo_blanco-GxBlRzv5qp7Lsp-cXOtV1g.png';
  const logoBase64 = await loadImageAsDataUrl(logoUrl);
  doc.addImage(logoBase64, 'PNG', 40, 40, 120, 100);
  
  // Título y contenido
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('CERTIFICADO DE DONACIÓN', doc.internal.pageSize.getWidth() / 2, 180, { align: 'center' });

  doc.setDrawColor(0);
  doc.line(40, 200, doc.internal.pageSize.getWidth() - 40, 200);

  doc.setFontSize(14);
  doc.setFont('times', 'normal');
  const content = `La Fundación PFU - Peerkals Fundations, certifica que el(la) señor(a) ${donorName} ha realizado una donación por un valor de $${amount.toLocaleString()} COP el día ${date}.
Este aporte contribuye a la formación tecnológica de jóvenes en situación de vulnerabilidad, promoviendo caminos de vida con propósito.`;
  doc.text(content, 60, 240, { maxWidth: doc.internal.pageSize.getWidth() - 120, align: 'justify' });
  doc.setFont('helvetica', 'italic');
  doc.text('Atentamente,', 60, 350);

  const firmaUrl = 'https://cdn1.site-media.eu/images/0/17796467/FirmaRepresentanteLegal-cF5cCYrKop2w8u2dHJkBEg.jpg';
  const firmaBase64 = await loadImageAsDataUrl(firmaUrl);
  doc.addImage(firmaBase64, 'PNG', 60, 350, 200, 160);

  doc.text('_________________________________', 60, 560);
  doc.text('Ing. Ernesto Enrique Posada Pulido,', 60, 580);
  doc.text('Representante Legal,', 60, 600);
  doc.text('Fundación PFU - Peerkals Fundation', 60, 620);
  doc.text('NIT: 901955282-7', 60, 640);
  doc.setFontSize(10);
  doc.text('Cra 47 #84-200 | pfu.info@peerkals.com | www.peerkals.com', doc.internal.pageSize.getWidth() / 2, 800, { align: 'center' });
  const base64 = doc.output('datauristring').split(',')[1];
  return base64;
}

async function loadImageAsDataUrl(url: string): Promise<string> {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  const contentType = response.headers.get("content-type") || "image/png";
  const base64String = arrayBufferToBase64(buffer);
  return `data:${contentType};base64,${base64String}`;
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}