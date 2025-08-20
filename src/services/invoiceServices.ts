import { sendInvoiceEmail } from "../common/sendInvoiceMail";
import {
  actualizarEstadoFactura,
  guardarFactura,
  obtenerEncabezadoFactura,
  obtenerDetalleFactura,
} from "../dao/InvoiceDAO";
import { getCorreosFacturación } from "../dao/ParametersDAO";

export async function generacionFactura(env, invoiceData) {
  try {
    let result = guardarFactura(env, invoiceData);
    //await sendDonationEmail(email_address, donationPDF,name);
    return result;
  } catch (error) {
    console.error("Fallo la creación de una nueva Factura", error);
    return {
      error: true,
      message: "Fallo la creación de una nueva Factura",
      details: error,
    };
  }
}

export async function actualizarFactura(env, invoiceData) {
  try {
    actualizarEstadoFactura(env, invoiceData);
    return {
      success: true,
      message: {
        message: "Invoice updated successfully and email sent.",
        description: "Invoice updated successfully and email sent.",
      },
    };
  } catch (error) {
    console.error("Fallo la actualización de la Factura", error);
    return {
      error: true,
      message: "Fallo la actualización de la Factura",
      details: error,
    };
  }
}

export async function enviarCorreoConfirmacionFactura(env, dataRequest) {
  try {
    let encabezado = await obtenerEncabezadoFactura(
      env,
      dataRequest.data.transaction.reference
    );
    if (encabezado.length > 0) {
      let detalle = await obtenerDetalleFactura(env, encabezado[0].IDFACT);
      let datosFactura = {
        encabezado: encabezado[0],
        detalle: detalle,
      };
      await env.DB.prepare(" INSERT INTO PRUEBA(DATOS) VALUE(?)").bind(dataRequest).all();
      await env.DB.prepare(" INSERT INTO PRUEBA(DATOS) VALUE(?)").bind(dataRequest.data.transaction.shipping_address).all();
      await sendInvoiceEmail(dataRequest.data.transaction.shipping_address,dataRequest.data.transaction.shipping_address, datosFactura, 1);
      let correos = await getCorreosFacturación(env);
      console.log(correos);
      for (const correo of correos) {
        await sendInvoiceEmail(correo.EMAIL,correo.TEAM, datosFactura, 0);
      }
    }
    return {
      success: true,
      message: {
        message: "Invoice updated successfully and email sent.",
        description: "Invoice updated successfully and email sent.",
      },
    };
  } catch (error) {
    console.error("Fallo la actualización de la Factura", error);
    return {
      error: true,
      message: "Fallo la actualización de la Factura",
      details: error,
    };
  }
}
