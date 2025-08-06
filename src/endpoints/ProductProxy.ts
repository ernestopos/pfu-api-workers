import { Bool, OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { Message } from "../types";

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
			
		   const {results} = await c.env.DB.prepare(
				" SELECT ART.*,PAR.NOMBRE, PAR.VALOR, PRO.DATA_PRECIO " +
				" FROM ARTICULO AS ART " +
				" INNER JOIN PRODUCTO AS PRO ON PRO.ID_ARTICULO = ART.ID" +
				" INNER JOIN PARAMETRO AS PAR ON PRO.ID_PARAMETRO = PAR.ID" +
				" WHERE PAR.ESTADO=1 AND PRO.ESTADO = 1"
			).all();
		    
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