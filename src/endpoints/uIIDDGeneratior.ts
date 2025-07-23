import { Bool, OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { type AppContext, PaypalDonation, Message } from "../types";

export class UIIDDGeneratior extends OpenAPIRoute{
    schema = {
		tags: ["Generate UIIDD Transaction ID"],
		summary: "Generate UIIDD Transaction ID",
		responses: {
			"200": {
				description: "UIIDD Transaction ID generated successfully",
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
            return {
                success: true,
                result: {
                    id: await generateUIIDD()
                },
                message: {
                    message: "UIIDD Transaction ID generated successfully",
                    description: "The UIIDD Transaction ID has been generated successfully.",
                },
            };
        };
}

export async function generateUIIDD() {
  const seg1 = Math.random().toString(16).substring(2, 8);
  const seg2 = crypto.randomUUID().split('-')[1] + crypto.randomUUID().split('-')[2];
  const seg3 = Date.now().toString(36);
  return `${seg1}-${seg2}-${seg3}`;  
}