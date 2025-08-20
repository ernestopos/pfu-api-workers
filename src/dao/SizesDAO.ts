export async function getArticleSizes(env, idArt) {
  try {
    const {results} = await env.DB.prepare(
				" SELECT PAR.ID,PAR.NOMBRE,PAR.VALOR " +
        " FROM ARTICULO ART " +
        " INNER JOIN PRODUCTO PRO ON PRO.ID_ARTICULO = ART.ID " +
        " INNER JOIN PARAMETRO PAR ON PRO.ID_PARAMETRO = PAR.ID " +
        " WHERE ART.ID = ? ").bind(idArt).all();
    return results;
  } catch (error) {
    console.error("Fallo al buscar las tallas de un articulo", error);
    return {
      error: true,
      message: "Fallo al buscar las tallas de un articulo",
      details: error,
    };
  }
}