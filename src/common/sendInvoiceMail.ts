import { Security } from "./security";
export async function sendInvoiceEmail(toEmail,equipo,datosFactura,sw:number) {
  try {
    const apiKey = Security.RESEND_API_KEY;
    let detalle = "";
    let datosenvio = "";
    let encabezadoCorreo="";
    if(sw === 1){
      encabezadoCorreo=`<tr>
                  <td style="font-size: 16px; color: #333333;">
                    <p>Hola <strong>${datosFactura.encabezado.NOMBRECLIENTE}</strong>,</p>
                    <p style="font-size: 15px; line-height: 1.5; color:#444;">
                      ¡Gracias por tu compra! 🙌  
                      Cada adquisición que realizas no solo te acerca a un gran producto, sino que también impulsa nuestro objetivo social, 
                      ayudando a transformar vidas y cumplir sueños.
                    </p>
                  </td>
                </tr>`;
    }else{
      encabezadoCorreo=`<tr>
                  <td style="font-size: 16px; color: #333333;">
                    <p style="font-size: 15px; line-height: 1.5; color:#444;">
                      ¡${equipo}! Cada compra es una nueva oportunidad para brillar. El cliente confía en nosotros, hagamos que su experiencia sea impecable ✨🚀.
                    </p>
                  </td>
                </tr>`;
    }
    datosFactura.detalle.forEach((producto) => {
      detalle =
        detalle +
        `<tr>
                  <td>
                    <table width="100%" border="0" cellspacing="0" cellpadding="10" style="border:1px solid #ddd; border-radius:6px;">
                      <tr style="background-color:#f9f9f9;">
                        <th align="center">Foto</th>  
                        <th align="left">Producto</th>                        
                        <th align="right">Cantidad</th>
                        <th align="right">Precio</th>
                        <th align="right">SubTotal</th>
                      </tr>
                      <tr>
                        <td><img src="${producto.IMG_SRC}" alt="Producto" width="100" height="100" style="border-radius:4px;"></td>
                        <td>${producto.CODIGOARTICULO} - ${producto.NOMBREARTICULO}</td>
                        <td align="center">${producto.CANTIDAD}</td>
                        <td align="right">${producto.VALOR_UNITARIO}</td>
                        <td align="right">${producto.VALOR_TOTAL}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p style="font-family: Arial, sans-serif; font-size:16px; font-weight:bold; color:#222; text-align:right; margin-top:-10px;">
                      Total Factura: $ ${datosFactura.encabezado.VALOR_FACT}
                    </p>
                  </td>
                </tr>
                `;
    });
    datosenvio =
        datosenvio +
        `<tr>
                  <tr>
                  <td style="padding-top:20px; font-size:14px; color:#555;">
                    <p><strong>Dirección de entrega:</strong></p>
                    <p>Departamento: ${datosFactura.encabezado.DEPARTAMENTO}</p>
                    <p>Ciudad: ${datosFactura.encabezado.CIUDAD}</p>
                    <p>Dirección: ${datosFactura.encabezado.DIRECCION}</p>                    
                    <p style="font-size:13px; color:#777;">
                      Nota: Los costos de envío serán asumidos por el cliente bajo modalidad de pago contra entrega.
                    </p>
                  </td>
                </tr>
                `;
    
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: Security.EMAIL_FROM,
        to: [toEmail],
        subject:
          "PFU - Confirmación de la Factura :" + datosFactura.encabezado.CODIGO,
        html:
        `<div style="text-align:center; padding:20px;">
            <img src="https://www.peerkals.com/wp/wp-content/uploads/2025/07/PFU-Logo_blanco.png" alt="Logo Fundación PFU" width="120" style="margin-bottom:10px;">
            <h1 style="font-family: Arial, sans-serif; color:#333; margin:0;">PFU - Peerkals Foundation</h1>
        </div>
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="padding: 20px 0;">
              <table width="600" border="0" cellspacing="0" cellpadding="20" style="background-color: #ffffff; border-radius: 8px;">
                <tr>
                  <td align="right" style="font-size: 12px; color: #888888;">
                    <span>${datosFactura.encabezado.FECHA_VENTA}</span>
                  </td>
                </tr>` + encabezadoCorreo +
                `<tr>
                  <td style="border-top: 2px solid #eee; padding-top:20px;">
                    <h2 style="margin:0; color:#333;">Factura N° ${datosFactura.encabezado.CODIGO}</h2>
                  </td>
                </tr>` +
          detalle +
          ` 
          ` +
          datosenvio +
          `                
                <tr>
                  <td align="center" style="font-size:12px; color:#aaaaaa; padding-top:20px;">
                    © 2025 Nuestra Tienda - Todos los derechos reservados
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      `}),
    });
    const result = await res.json(); 
    return result;
  } catch (error) {
    console.error("Error sending donation email:", error);
    return {
      error: true,
      message: "Fallo al enviar el correo",
      details: error,
    };
  }
}