import { Bool, OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { Message, WebhookWompiSchema } from "../types";
import { convertirCentavosAPesos } from "../common/toolsapp";
import { generateAndDonationSend } from "../services/donationsServices";
import { actualizarEstadoFactura } from "../dao/InvoiceDAO";

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
    let respondeData = null;
    let shippingAddres = {};
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

    shippingAddres = dataRequest.data.transaction.shipping_address;

    if (shippingAddres == null) {
      await generateAndDonationSend(c.env, {
        amount: Number(
          convertirCentavosAPesos(dataRequest.data.transaction.amount_in_cents)
        ),
        email: dataRequest.data.transaction.customer_email,
      });
      respondeData = {
        success: true,
        message: {
          message: "PDF generated successfully and email sent.",
          description:
            "The PDF for the donation has been created and the email has been sent.",
        },
      };
    } else {
      actualizarEstadoFactura(c.env, dataRequest);
    }
    return respondeData;
  }
}
