import { sendDonationEmail } from "../common/sendMail";
import { getNameCliente } from "../dao/ClientDAO";
import { actualizarEstadoFactura, guardarFactura } from "../dao/InvoiceDAO";


export async function generacionFactura(env, invoiceData) {
  try {
      guardarFactura(env, invoiceData);      
      //await sendDonationEmail(email_address, donationPDF,name);
      return {
        success: true,
        message: {
            message: "Invoice generated successfully and email sent.",
            description: "Invoice generated successfully and email sent for customer.",
        },
      };
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