import { Bool, OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { type AppContext, PaypalDonation, Message } from "../types";
import { sendDonationEmail } from "../common/sendMail";
import { generateDonationPDF } from "../common/pdfGenerator";

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

    async handle(c) {
            const data = await this.getValidatedData<typeof this.schema>();
            const donateData = data.body;
            const donationPDF = await generateDonationPDF(donateData.resource.payer.name.given_name, Number(donateData.resource.purchase_units[0].amount.value), 'USD', new Date(), 'INV-12345');
            
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