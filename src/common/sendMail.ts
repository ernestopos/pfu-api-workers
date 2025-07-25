
import { Security } from "./security";
export async function sendDonationEmail(toEmail, pdfBase64, donorName) {
  
  try {  
  const apiKey = Security.RESEND_API_KEY;
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: Security.EMAIL_FROM,
      to: [toEmail],
      subject: 'Certificado de Donación - PFU',
      html: `
        <table width="100%" cellpadding="0" cellspacing="0" style="padding: 40px 0; font-family: Arial, sans-serif;">
        <tr>
            <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #005baa; padding: 30px; border-radius: 8px;">
                <tr>
                <td align="left" style="color: #ffffff;">
                    <p>Hola ${donorName},</p>
                    <h2 style="margin-top: 0; color: #ffffff;">La Fundación - PFU Peerkals Fundation</h2>
                    <p style="margin-bottom: 20px; color: #ffffff;">
                    agradece tu valiosa contribución. Tu generosidad impulsa nuestro propósito de transformar vidas a través de la tecnología y la educación. 
                    <br /><br />
                    Adjuntamos a este correo el certificado oficial de tu donación.
                    </p>
                </td>
                </tr>
            </table>
            </td>
        </tr>
        <tr>
            <td align="center" style="padding-top: 20px;">
            <img src="https://cdn1.site-media.eu/images/0/17352501/PFU-Logo_blanco-GxBlRzv5qp7Lsp-cXOtV1g.png" alt="Logo Fundación PFU" width="120" style="display: block;" />
            </td>
        </tr>
    </table>
      `,
      attachments: [
        {
          filename: 'certificado_donacion.pdf',
          content: pdfBase64,
          contentType: 'application/pdf'
        }
      ]
    })
  });
  const result = await res.json();
  console.log("Correo enviado correctamente");
  return result;
} catch (error) {
  console.error("Error sending donation email:", error);
  return { error: true, message: 'Fallo al enviar el correo', details: error };
}
};

export async function sendDonationEmailText(toEmail, encodedBase64, donorName) {
  
  try {  
  const apiKey = Security.RESEND_API_KEY;
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: Security.EMAIL_FROM,
      to: [toEmail],
      subject: 'Certificado de Donación - PFU',
      html: `
        <table width="100%" cellpadding="0" cellspacing="0" style="padding: 40px 0; font-family: Arial, sans-serif;">
        <tr>
            <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #005baa; padding: 30px; border-radius: 8px;">
                <tr>
                <td align="left" style="color: #ffffff;">
                    <p>Hola ${donorName}, </p>
                    <h2 style="margin-top: 0; color: #ffffff;">La Fundación - PFU Peerkals Fundation</h2>
                    <p style="margin-bottom: 20px; color: #ffffff;">
                    agradece tu valiosa contribución. Tu generosidad impulsa nuestro propósito de transformar vidas a través de la tecnología y la educación. 
                    <br /><br />
                    Adjuntamos a este correo el certificado oficial de tu donación.
                    </p>
                </td>
                </tr>
            </table>
            </td>
        </tr>
        <tr>
            <td align="center" style="padding-top: 20px;">
            <img src="https://cdn1.site-media.eu/images/0/17352501/PFU-Logo_blanco-GxBlRzv5qp7Lsp-cXOtV1g.png" alt="Logo Fundación PFU" width="120" style="display: block;" />
            </td>
        </tr>
    </table>
      `,
      attachments: [
      {
        filename: 'wompi_data.txt',
        content: encodedBase64,
        encoding: 'base64',
      }
    ]
    })
  });
  const result = await res.json();
  console.log("Correo enviado correctamente");
  return result;
} catch (error) {
  console.error("Error sending donation email:", error);
  return { error: true, message: 'Fallo al enviar el correo', details: error };
}
};