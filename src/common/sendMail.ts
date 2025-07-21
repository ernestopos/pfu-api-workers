
import { Security } from "./security";
export async function sendDonationEmail(toEmail, pdfBase64, donorName) {
  
  try {  
  console.log("Inicio del proceso de envío de correo electrónico");
  const apiKey = Security.RESEND_API_KEY;
  console.log("API Key:", apiKey); 

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
        <p>Hola ${donorName},</p>
        <p>Gracias por tu generosa donación a la Fundación PFU.</p>
        <p>Adjunto encontrarás tu certificado de donación en formato PDF.</p>
        <p>¡Gracias por apoyar esta causa!</p>
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
  console.log("Resultado del envío de correo:", result);
  return result;
} catch (error) {
  console.error("Error sending donation email:", error);
  return { error: true, message: 'Fallo al enviar el correo', details: error };
}
};