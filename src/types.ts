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

export const PntegrityTemplate = z.object({
  currency: z.string(),
  amount: z.string().regex(/^[0-9]+(\.[0-9]{2})?$/)
});

export const PaypalDonation = z.object({
  id: z.string(),
  create_time: z.string().datetime(),
  resource_type: z.literal("checkout-order"),
  event_type: z.literal("CHECKOUT.ORDER.APPROVED"),
  summary: z.string(),
  resource: z.object({
    update_time: z.string().datetime(),
    create_time: z.string().datetime(),
    id: z.string(),
    intent: z.literal("CAPTURE"),
    status: z.literal("APPROVED"),
    payer: z.object({
      name: z.object({
        given_name: z.string(),
        surname: z.string()
      }),
      email_address: z.string().email(),
      payer_id: z.string()
    }),
    purchase_units: z.array(
      z.object({
        reference_id: z.string(),
        amount: z.object({
          currency_code: z.string(),
          value: z.string().regex(/^[0-9]+(\.[0-9]{2})?$/)
        }),
        payee: z.object({
          email_address: z.string().email()
        }),
        shipping: z.object({
          method: z.string(),
          address: z.object({
            address_line_1: z.string(),
            address_line_2: z.string().optional(),
            admin_area_2: z.string(),
            admin_area_1: z.string(),
            postal_code: z.string(),
            country_code: z.string()
          })
        })
      })
    ),
    links: z.array(
      z.object({
        href: z.string().url(),
        rel: z.string().optional(),
        method: z.string()
      })
    )
  }),
  links: z.array(
    z.object({
      href: z.string().url(),
      rel: z.string(),
      method: z.string(),
      encType: z.string().optional()
    })
  ),
  event_version: z.string(),
  resource_version: z.string()
});

export const Message = z.object({
	message: Str(),
	description: Str()
});
