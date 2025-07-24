import { Bool, OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { type AppContext, PaypalDonation, Message } from "../types";
import { generateUIIDD } from "../common/security";

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