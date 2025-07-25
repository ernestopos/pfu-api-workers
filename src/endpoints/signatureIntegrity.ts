import { Bool, OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { type AppContext, PntegrityTemplate, Message } from "../types";
import { generateUIIDD, hashSHA256, Security } from "../common/security";

export class SignatureIntegrity extends OpenAPIRoute{
    schema = {
		tags: ["Generate signature integrity"],
		summary: "Generate signature integrity for wompi transactions",
		request: {
			body: {
				content: {
					"application/json": {
						schema: PntegrityTemplate,
					},
				},
			},
		},
		responses: {
			"200": {
				description: "Generate signature integrity successfully",
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
            const uiid = await generateUIIDD();
            const data = await this.getValidatedData<typeof this.schema>();
            const donateData = data.body;
            const signatureIntegrity = await generateSignatureIntegrity(donateData.currency, donateData.amount, uiid);
            
            const json = JSON.stringify({
            success: true,
              result: {
                id: uiid,
                signatureIntegrity: signatureIntegrity,
              },
              message: {
                message: "Signature integrity generated successfully.",
                description: "The signature integrity for the donation has been created successfully.",
              },
            });

          return new Response(json, {
            status: 200,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
              "Access-Control-Allow-Headers": "Content-Type",
            },
          });            
        };
}

async function generateSignatureIntegrity(currency: string, amount: string, uiid:string) {
  const rawValue=uiid.concat(amount).concat(currency).concat(Security.SECRET_KEY_TEST.toString());  
  const hash = hashSHA256(rawValue);
  return hash;
}