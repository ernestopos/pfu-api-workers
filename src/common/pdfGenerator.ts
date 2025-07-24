import jsPDF from "jspdf";

export async function generateDonationPDF(donorName: string, amount: number, currency: string, date: Date, invoiceId: string) {
  const doc = new jsPDF({orientation: 'portrait', unit: 'pt', format: 'a4' });

  // Título
  doc.setFontSize(18);
  const logoUrl = 'https://cdn1.site-media.eu/images/0/17352501/PFU-Logo_blanco-GxBlRzv5qp7Lsp-cXOtV1g.png';
  const logoBase64 = await loadImageAsDataUrl(logoUrl);
  doc.addImage(logoBase64, 'PNG', 40, 40, 120, 100);
  
  // Título y contenido
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('CERTIFICADO DE DONACIÓN', doc.internal.pageSize.getWidth() / 2, 180, { align: 'center' });

  doc.setDrawColor(0);
  doc.line(40, 200, doc.internal.pageSize.getWidth() - 40, 200);

  doc.setFontSize(14);
  doc.setFont('times', 'normal');
  const content = `La Fundación PFU - Peerkals Fundations, certifica que el(la) señor(a) ${donorName} ha realizado una donación por un valor de $${amount.toLocaleString()} COP el día ${date}.
Este aporte contribuye a la formación tecnológica de jóvenes en situación de vulnerabilidad, promoviendo caminos de vida con propósito.`;
  doc.text(content, 60, 240, { maxWidth: doc.internal.pageSize.getWidth() - 120, align: 'justify' });
  doc.setFont('helvetica', 'italic');
  doc.text('Atentamente,', 60, 350);

  const firmaUrl = 'https://cdn1.site-media.eu/images/0/17796467/FirmaRepresentanteLegal-cF5cCYrKop2w8u2dHJkBEg.jpg';
  const firmaBase64 = await loadImageAsDataUrl(firmaUrl);
  doc.addImage(firmaBase64, 'PNG', 60, 350, 200, 160);

  doc.text('_________________________________', 60, 560);
  doc.text('Ing. Ernesto Enrique Posada Pulido,', 60, 580);
  doc.text('Representante Legal,', 60, 600);
  doc.text('Fundación PFU - Peerkals Fundation', 60, 620);
  doc.text('NIT: 901955282-7', 60, 640);
  doc.setFontSize(10);
  doc.text('Cra 47 #84-200 | pfu.info@peerkals.com | www.peerkals.com', doc.internal.pageSize.getWidth() / 2, 800, { align: 'center' });
  const base64 = doc.output('datauristring').split(',')[1];
  return base64;
}

async function loadImageAsDataUrl(url: string): Promise<string> {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  const contentType = response.headers.get("content-type") || "image/png";
  const base64String = arrayBufferToBase64(buffer);
  return `data:${contentType};base64,${base64String}`;
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export function convertirJsonAWompiBase64(data: any): string {
   const jsonString = JSON.stringify(data, null, 2);
   return btoa(unescape(encodeURIComponent(jsonString)));
}