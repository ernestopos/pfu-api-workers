import { Bool, OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { Message, DonationSchema } from "../types";
import { saveCliente } from "../dao/ClientDAO";

export class AddClienProxy extends OpenAPIRoute {
  schema = {
    tags: ["Client Management"],
    summary: "Manage client data",
    description:
      "This endpoint handles client data management",
    request: {
      body: {
        content: {
          "application/json": {
            schema: DonationSchema,
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
    try {
      const data = await this.getValidatedData<typeof this.schema>();
      const client = data.body;
      return saveCliente(c.env,client);      
    } catch (error) {
      console.error("Fallo la creación de un nuevo cliente", error);
      return {
        error: true,
        message: "Fallo la creación de un nuevo cliente",
        details: error,
      };
    }
  }
}
