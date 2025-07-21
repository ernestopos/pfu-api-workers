import { DateTime, Str } from "chanfana";
import type { Context } from "hono";
import { z } from "zod";

export type AppContext = Context<{ Bindings: Env }>;

export const Task = z.object({
	name: Str({ example: "lorem" }),
	slug: Str(),
	description: Str({ required: false }),
	completed: z.boolean().default(false),
	due_date: DateTime(),
});


export const PaypalDonation = z.object({
  id: z.string(),
  event_type: z.string(),
  resource: z.object({
    id: z.string(),
    status: z.string(),
    amount: z.object({
      currency_code: z.string(),
      value: z.string(),
    }),
    payer: z.object({
      name: z.object({
        given_name: z.string(),
        surname: z.string(),
      }),
      email_address: z.string().email(),
      payer_id: z.string(),
    }),
    create_time: z.string().datetime(),
  }),
});

export const Message = z.object({
	message: Str(),
	description: Str()
});
