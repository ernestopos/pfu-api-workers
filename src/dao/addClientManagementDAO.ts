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
        "SELECT * FROM CLIENTE WHERE NUMERODOC = ?"
      )
        .bind(client.clientid)
        .all();  

      if (results.length === 0) {
        await c.env.DB.prepare(
        "INSERT INTO CLIENTE(NOMBRE,NUMERODOC,TIPODOC,CORREO) VALUES (?, ?, ?, ?)"
          )
            .bind(
              client.customer_name,
              client.clientid,
              client.clientidtype,
              client.customer_email                            
            )
            .all();
      }

      await c.env.DB.prepare(
        "INSERT INTO DONACION(AMOUNT_IN_CENTS,CURRENCY,DATE,STATUS,CLIENTID) VALUES (?, ?, ?, ?, (SELECT ID FROM CLIENTE WHERE NUMERODOC = ?))"
      )
        .bind(
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
          message: "Cliente guardado correctamente.",
          description:
            "Se guardaros los datos del cliente de forma correcta.",
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
