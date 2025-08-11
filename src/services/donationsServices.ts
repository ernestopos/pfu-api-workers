import { generateDonationPDF } from "../common/pdfGenerator";
import { sendDonationEmail } from "../common/sendMail";
import { getNameCliente } from "../dao/ClientDAO";


export async function sendPDFDonation(name:String, amount:number,email_address:String) {
  try {      
			const donationPDF = await generateDonationPDF(name,amount);
      await sendDonationEmail(email_address, donationPDF,name);
      return {
        success: true,
        message: {
            message: "PDF generated successfully and email sent.",
            description: "The PDF for the donation has been created and the email has been sent.",
        },
      };
    } catch (error) {
      console.error("Fallo la creación de un nuevo cliente", error);
      return {
        error: true,
        message: "Fallo la creación de un nuevo cliente",
        details: error,
      };
    }
}

/***
 * Metodo de negocio que permite generar y enviar un certificado en formato PDF
 */
export async function generateAndDonationSend(env, data) {
  try {
      let name = await getNameCliente(env,data.email);  
      return await sendPDFDonation(String(name), data.amount,data.email);			
    } catch (error) {
      console.error("Fallo el envío del certificado al cliente", error);
      return {
        success: false,
        message: "Fallo el envío del certificado al cliente",
        details: error,
      };
    }
}