export async function getCategorys(env, idCategory) {
  try {
    const { results } = await env.DB.prepare(
      " SELECT ART.NOMBRE,ART.CODIGO,ART.DESCRIPCION,ART.FIGURE_CLASS," +
        " ART.IMG_SRC,ART.IMG_CLASS,ART.IMG_ON_CLICK,ART.DATA_CODIGO, " +
        " ART.DATA_NOMBRE,ART.DATA_DESCRIPCION,ART.FIGCAPTION,MIN(PRO.DATA_PRECIO) DATA_PRECIO, " +
        " COUNT(PARAMETRO.ID) TALLAS_COUNT" +
        " FROM ARTICULO AS ART " +
        " INNER JOIN PRODUCTO AS PRO ON PRO.ID_ARTICULO = ART.ID " +
        " INNER JOIN PARAMETRO AS PAR ON PRO.ID_PARAMETRO = PAR.ID " +
        " INNER JOIN CATEGORIA AS CAT ON PRO.ID_CATEGORIA = CAT.ID " +
        " WHERE PAR.ESTADO=1 AND PRO.ESTADO = 1 AND CAT.ID = ? " +
        " GROUP BY ART.NOMBRE,ART.CODIGO,ART.DESCRIPCION,ART.FIGURE_CLASS, " +
        " ART.IMG_SRC,ART.IMG_CLASS,ART.IMG_ON_CLICK,ART.DATA_CODIGO, " +
        " ART.DATA_NOMBRE,ART.DATA_DESCRIPCION,ART.FIGCAPTION "
    )
      .bind(idCategory)
      .all();
    return results;
  } catch (error) {
    console.error("Fallo al obtener los productos por categoria", error);
    return {
      error: true,
      message: "Fallo al obtener los productos por categoria",
      details: error,
    };
  }
}

export async function getAllCategorys(env) {
  try {
    const { results } = await env.DB.prepare(" SELECT * from CATEGORIA").all();
    return results;
  } catch (error) {
    console.error("Fallo al obtener todas las categorias", error);
    return {
      error: true,
      message: "Fallo al obtener todas las categorias",
      details: error,
    };
  }
}
