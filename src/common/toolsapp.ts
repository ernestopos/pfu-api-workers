export function convertirCentavosAPesos(centavos:any) {
  return (Number(centavos) / 100).toFixed(2);
}

export function formatDateToDDMMYYYY(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Los meses van de 0 a 11
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}