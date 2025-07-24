import { Bool, OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { type AppContext, PaypalDonation, Message, WebhookWompiSchema } from "../types";
import { sendDonationEmail, sendDonationEmailText } from "../common/sendMail";
import { convertirJsonAWompiBase64, generateDonationPDF } from "../common/pdfGenerator";
import { convertirCentavosAPesos } from "../common/toolsapp";

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
            const pesosDonados = convertirCentavosAPesos(donateData.data.transaction.amount_in_cents);
            const donationPDF = await generateDonationPDF('PRUEBA', Number(pesosDonados), 'COL', new Date(), 'INV-12345');
            await sendDonationEmail(donateData.data.transaction.customer_email,donationPDF,'PRUEBA');
            return {
                success: true,
                message: {
                    message: "PDF generated successfully and email sent.",
                    description: "The PDF for the donation has been created and the email has been sent.",
                },
            };
        };
}