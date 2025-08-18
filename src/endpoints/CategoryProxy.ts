import { Bool, OpenAPIRoute } from "chanfana";
import { z } from "zod";
import {  Message } from "../types";
import { getCategorys } from "../dao/CategoryDAO";

export class CategoryProxy extends OpenAPIRoute {
  schema = {
    tags: ["Generate CATEGORY LIST"],
    summary: "Generate CATEGORY LIST",
    request: {
      params: z.object({
        id: z.number().int().nonnegative(),
      }),
    },
    responses: {
      "200": {
        description: "Generate CATEGORY LIST successfully",
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
	const  categoryId  = data.params;
	const results = await getCategorys(c.env, categoryId.id);
    return {
      success: true,
      result: results,
      message: {
        message: "Generate PRODUCT LIST generated successfully",
        description: "Generate PRODUCT LIST has been generated successfully.",
      },
    };
  }
}
