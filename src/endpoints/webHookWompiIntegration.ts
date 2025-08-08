import { Bool, OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { Message, WebhookWompiSchema } from "../types";
import { sendDonationEmail } from "../common/sendMail";
import { generateDonationPDF } from "../common/pdfGenerator";
import { convertirCentavosAPesos } from "../common/toolsapp";

export class webHookWompiIntegration extends OpenAPIRoute {
  schema = {
    tags: ["Wompi Webhooks"],
    summary: "Receive transaction status updates from Wompi",
    description:
      "This endpoint handles webhook notifications from Wompi for transaction updates.",
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
        description:
          "PDF generated successfully and email sent for Wompi donation platform.",
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
    const dataRequest = data.body;
    let clientName: string = "";
	let respondeData = null;

    if (
      dataRequest.event !== "transaction.updated" &&
      dataRequest.event !== "nequi_token.updated" &&
      dataRequest.event !== "bancolombia_transfer_token.updated"
    ) {
      return new Response("Event not supported", { status: 200 });
    }

    if (dataRequest.data.transaction.status !== "APPROVED") {
      return new Response("Status not supported, right now", { status: 200 });
    }

    const source = dataRequest.data.transaction.shipping_address;

    if (!source?.trim()) {      
		const { results } = await c.env.DB.prepare("SELECT * FROM CLIENTE WHERE CORREO = ?")
	  	.bind(dataRequest.data.transaction.customer_email)
        .all();

      if (results.length > 0) {
        clientName = results[0].NOMBRE;
      }
      const donationPDF = await generateDonationPDF(clientName,Number(convertirCentavosAPesos(dataRequest.data.transaction.amount_in_cents)));
      await sendDonationEmail(dataRequest.data.transaction.customer_email,donationPDF,clientName);
      respondeData = {
        success: true,
        message: {
          message: "PDF generated successfully and email sent.",
          description: "The PDF for the donation has been created and the email has been sent.",
        },
      };
    }else{

	}
	return respondeData;
  }
}
