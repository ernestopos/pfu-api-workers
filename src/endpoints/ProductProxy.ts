import { Bool, OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { Message } from "../types";
import { getProducts } from "../dao/ProductDAO";

export class ProductProxy extends OpenAPIRoute{
    schema = {
		tags: ["Generate PRODUCT LIST"],
		summary: "Generate PRODUCT LIST",
		responses: {
			"200": {
				description: "Generate PRODUCT LIST successfully",
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
		   const results = await getProducts(c.env);		    
		    return {
                success: true,
                result: results,
                message: {
                    message: "Generate PRODUCT LIST generated successfully",
                    description: "Generate PRODUCT LIST has been generated successfully.",
                },
            };
    };
}