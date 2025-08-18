import { Bool, OpenAPIRoute } from "chanfana";
import { z } from "zod";
import {  Message } from "../types";
import { getAllCategorys } from "../dao/CategoryDAO";

export class AllCategoryProxy extends OpenAPIRoute {
  schema = {
    tags: ["Generate LIST WITH ALL CATEGORY"],
    summary: "Generate LIST WITH ALL CATEGORY",
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
    const results = await getAllCategorys(c.env);
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
