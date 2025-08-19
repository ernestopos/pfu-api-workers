export async function getCorreosFacturación(env) {
  try {
    const {results} = await env.DB.prepare(
				" SELECT PARA.NOMBRE AS TEAM,PARA.VALOR AS EMAIL " +
        " FROM PARAMETRO PARA " +
        " WHERE PARA.AGRUPADOR='EMAIL_FACT'").all()
    return results;
  } catch (error) {
    console.error("Fallo la obtención de los correos de envío despues de la facturación", error);
    return {
      error: true,
      message: "Fallo la obtención de los correos de envío despues de la facturación",
      details: error,
    };
  }
}