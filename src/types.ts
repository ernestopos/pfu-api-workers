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

export const DonationSchema = z.object({
  reference: z.string().max(50),
  customer_name: z.string().max(100),
  customer_email: z.string().email().max(100),
  amount_in_cents: z.number().int().nonnegative(),
  currency: z.string().max(10),
  date: z.coerce.date(),
  status: z.string().max(20),
  clientid: z.number().int().nonnegative(),
  clientidtype:z.string().max(20)
});

export const WebhookWompiSchema = z.object({
  event: z.literal("transaction.updated"),
  data: z.object({
    transaction: z.object({
      id: z.string(),
      amount_in_cents: z.number(),
      reference: z.string(),
      customer_email: z.string().email(),
      currency: z.string(),
      payment_method_type: z.string(),
      redirect_url: z.string().url(),
      status: z.string(),
      shipping_address: z.any().nullable(),
      payment_link_id: z.any().nullable(),
      payment_source_id: z.any().nullable(),
    }),
  }),
  environment: z.string(),
  signature: z.object({
    properties: z.array(z.string()),
    checksum: z.string(),
  }),
  timestamp: z.number(),
  sent_at: z.string(),
});

export const PntegrityTemplate = z.object({
  currency: z.string(),
  amount: z.string().regex(/^[0-9]+(\.[0-9]{2})?$/)
});

/* ZOD PARA MANEJO DE FACTURAS */
const DetalleFacturaSchema = z.object({
  id_producto: z.number().int().positive("ID del producto inválido"),
  cantidad: z.number().int().positive("Cantidad inválida"),
  valor_unitario: z.number().int().nonnegative(),
  valor_total: z.number().int().nonnegative()
});

export const FacturaSchema = z.object({
  id_transaction: z.number().int().optional(), // porque a veces puede generarse después
  codigo: z.string().min(1).max(200),
  id_cliente: z.number().int().positive(),
  valor_fact: z.number().int().positive(),
  moneda: z.string().min(1).max(100),
  fecha_venta: z.string().datetime(), // formato ISO 8601
  estado: z.string().min(1).max(10),
  pagado: z.number().int().min(0).max(1), // 0 = no pagado, 1 = pagado
  departamento: z.string().min(1).max(100),
  ciudad: z.string().min(1).max(200),
  direccion: z.string().min(1).max(300),
  articulo_enviado: z.number().int().min(0).max(1), // 0 = no enviado, 1 = enviado
  detalles: z.array(DetalleFacturaSchema).min(1, "Debe tener al menos un detalle")
});

/* FIN MANEJO DE FACTURAS*/

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

/** Zod para el manejo del carrito de compra */
const ClienteSchema = z.object({
  ID: z.number().int().nonnegative(),
  NOMBRE: z.string().max(250),
  NUMERODOC: z.string().max(100),
  TIPODOC: z.string().max(100),
  CORREO: z.string().max(250)
});

export const parametroSchema = z.object({
  ID: z.number().optional(),
  NOMBRE: z.string().max(100),
  DESCRIPCION: z.string().max(100),
  VALOR: z.string().max(100),
  AGRUPADOR: z.string().max(100),
  ESTADO: z.number()
});

export const articuloSchema = z.object({
  ID: z.number().optional(),
  NOMBRE: z.string().max(100),
  CODIGO: z.string().max(100),
  DESCRIPCION: z.string().max(100),
  FIGURE_CLASS: z.string().max(250),
  IMG_SRC: z.string().max(250),
  IMG_ALT: z.string().max(250),
  IMG_CLASS: z.string().max(250),
  IMG_ON_CLICK: z.string().max(250),
  DATA_CODIGO: z.string().max(250),
  DATA_NOMBRE: z.string().max(250),
  DATA_DESCRIPCION: z.string().max(250),
  FIGCAPTION: z.string().max(250),
  ESTADO: z.number()
});

export const productoSchema = z.object({
  ID: z.number().optional(),
  ID_ARTICULO: z.number(),
  ID_PARAMETRO: z.number(),
  DATA_PRECIO: z.number(),
  ESTADO: z.number()
});

export const facturaSchema = z.object({
  ID: z.number().optional(),
  CODIGO: z.string().max(200),
  ID_CLIENTE: z.number(),
  VALOR_FACT: z.number(),
  MONEDA: z.string().max(100),
  FECHA_VENTA: z.string(), // Puedes usar z.coerce.date() si usas Date
  ESTADO: z.string().max(10),
  PAGADO: z.number(),
  ARTICULO_ENVIADO: z.string().max(100)
});

export const detallFacturaSchema = z.object({
  ID: z.number().optional(),
  ID_FACTURA: z.number(),
  ID_PRODUCTO: z.number(),
  CANTIDAD: z.number(),
  VALOR_UNITARIO: z.number(),
  VALOR_TOTAL: z.number()
});