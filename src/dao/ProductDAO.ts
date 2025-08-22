export async function getProducts(env) {
  try {
    const {results} = await env.DB.prepare(
				" SELECT ART.ID,ART.NOMBRE,ART.CODIGO,ART.DESCRIPCION,ART.FIGURE_CLASS, " +
        " ART.IMG_SRC,ART.IMG_CLASS,ART.IMG_ON_CLICK,ART.DATA_CODIGO, " +
 	      " ART.DATA_NOMBRE,ART.DATA_DESCRIPCION,ART.FIGCAPTION,MIN(PRO.DATA_PRECIO) DATA_PRECIO,"  + 
        " COUNT(PAR.ID) TALLAS_COUNT" + 
			  " FROM ARTICULO AS ART " +
        " INNER JOIN PRODUCTO AS PRO ON PRO.ID_ARTICULO = ART.ID " + 
        " INNER JOIN PARAMETRO AS PAR ON PRO.ID_PARAMETRO = PAR.ID " + 
        " WHERE PAR.ESTADO=1 AND PRO.ESTADO = 1 " +
        " GROUP BY ART.ID,ART.NOMBRE,ART.CODIGO,ART.DESCRIPCION,ART.FIGURE_CLASS,"+
        " ART.IMG_SRC,ART.IMG_CLASS,ART.IMG_ON_CLICK,ART.DATA_CODIGO," +
 	      " ART.DATA_NOMBRE,ART.DATA_DESCRIPCION,ART.FIGCAPTION").all();
    return results;
  } catch (error) {
    console.error("Fallo la creación de un nuevo cliente", error);
    return {
      error: true,
      message: "Fallo la creación de un nuevo cliente",
      details: error,
    };
  }
}