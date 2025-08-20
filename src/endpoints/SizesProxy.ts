import { Bool, OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { Message } from "../types";
import { getArticleSizes } from "../dao/SizesDAO";

export class SizesProxy extends OpenAPIRoute {
  schema = {
    tags: ["Generate ARTICLE SIZES LIST"],
    summary: "Generate ARTICLE SIZES LIST",
    request: {
      params: z.object({
        id: z.number().int().nonnegative(),
      }),
    },
    responses: {
      "200": {
        description: "Generate ARTICLE SIZES LIST successfully",
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
    const  productId  = data.params;
	const results = await getArticleSizes(c.env, productId.id);
    return {
      success: true,
      result: results,
      message: {
        message: "Generate ARTICLE SIZES LIST has been generated successfully",
        description: "Generate ARTICLE SIZES LIST has been generated successfully.",
      },
    };
  }
}