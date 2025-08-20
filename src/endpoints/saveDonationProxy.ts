import { Bool, OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { Message, DonationSchema } from "../types";
import { saveDonacion } from "../dao/DonationDAO";

export class SaveDonationProxy extends OpenAPIRoute {
  schema = {
    tags: ["Save Dontation Proxy"],
    summary: "Manage donations",
    description:
      "This endpoint handles donation processing.",
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
          "Donations saved successfully",
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
      const donation = data.body;
      const donacionResult = await saveDonacion(c.env,donation);
      return donacionResult;       
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
