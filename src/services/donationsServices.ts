import { generateDonationPDF } from "../common/pdfGenerator";
import { sendDonationEmail } from "../common/sendMail";

export async function sendPDFDonation(data) {
  try {      
			const donationPDF = await generateDonationPDF(data);
      await sendDonationEmail(data.resource.payer.email_address, donationPDF,data.resource.payer.name.given_name);
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

export async function generateAndDonationSend(data) {
  
}