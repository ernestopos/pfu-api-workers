import { Bool, OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { type AppContext, PaypalDonation, Message } from "../types";
import jsPDF from "jspdf";
import { sendDonationEmail } from "../common/sendMail";

export class DonationPDFGeneration extends OpenAPIRoute{
    schema = {
		tags: ["GEnerate PDF With Donation Certificate and Send Email"],
		summary: "Generate a PDF for a PayPal donationThis function is responsible for generating and sending a donation certificate via email to donors who contribute to the PFU Foundation. It uses the donor's information and donation amount to create a personalized PDF certificate and sends it as an email attachment through PFU’s official SMTP server. The goal is to acknowledge and thank donors while providing an official record of their contribution",
		request: {
			body: {
				content: {
					"application/json": {
						schema: PaypalDonation,
					},
				},
			},
		},
		responses: {
			"200": {
				description: "PDF generated successfully and email sent.",
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
            const donationPDF = await generateDonationPDF('ernesto', 100, 'USD', new Date(), 'INV-12345');
            
            await sendDonationEmail(donateData.resource.payer.email_address,
                                    donationPDF,
                                    donateData.resource.payer.name.given_name);
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
  const doc = new jsPDF({
    unit: 'pt',
    format: 'a4',
  });

  // Título
  doc.setFontSize(18);
  doc.text("Certificate of Donation", 20, 30);

  // Contenido
  doc.setFontSize(12);
  doc.text(`This certifies that ${donorName}`, 20, 50);
  doc.text(`has made a generous donation of ${amount} ${currency}`, 20, 60);
  doc.text(`Date of donation: ${new Date(date).toLocaleDateString()}`, 20, 70);
  doc.text(`Invoice ID: ${invoiceId}`, 20, 80);
  doc.text("We sincerely appreciate your support!", 20, 100);
  doc.text("Sincerely,", 20, 130);
  doc.text("Fundación PFU", 20, 140);
  const pdfBase64 = doc.output('datauristring').split(',')[1];
  return pdfBase64;
}

