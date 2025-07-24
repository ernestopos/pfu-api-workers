export function convertirCentavosAPesos(centavos:any) {
  return (Number(centavos) / 100).toFixed(2);
}