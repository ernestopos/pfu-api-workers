import { Bool, OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { FacturaSchema, Message } from "../types";
import { generacionFactura } from "../services/invoiceServices";

export class InvoiceProxy extends OpenAPIRoute{
    schema = {
		tags: ["Create a new Invoice"],
		summary: "This capacity handle the checkout process and create a new client if it don't exist and a create new invoice",
		request: {
					body: {
						content: {
							"application/json": {
								schema: FacturaSchema,
							},
						},
					},
				},
		responses: {
			"200": {
				description: "Process checkout executed succeeds",
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
        const invoiceData = data.body;
		return await generacionFactura(c.env, invoiceData);		
    };
}