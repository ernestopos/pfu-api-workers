import { Bool, OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { Message, DonationSchema } from "../types";

export class AddClientManagementDAO extends OpenAPIRoute {
  schema = {
    tags: ["Client Management"],
    summary: "Manage client data and donations",
    description:
      "This endpoint handles client data management and donation processing.",
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
      const {results} = await c.env.DB.prepare(
        "SELECT * FROM donations WHERE customer_email = ?"
      )
        .bind(client.customer_email)
        .all();  

      if (results.length > 0) {
        return new Response("El cliente ya se encuentra registrado", { status: 400 });
      }

      await c.env.DB.prepare(
        "INSERT INTO donations(customer_email, reference, customer_name, amount_in_cents, currency, date, status, clientid) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
      )
        .bind(
          client.customer_email,
          client.reference,
          client.customer_name,
          client.amount_in_cents,
          client.currency,
          new Date().toISOString(),
          client.status,
          client.clientid
        )
        .all();

      return {
        success: true,
        message: {
          message: "Cliente creaado correctamente.",
          description:
            "Se creo el cliente de forma correcta y se guardo en la base de datos.",
        },
      };
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
