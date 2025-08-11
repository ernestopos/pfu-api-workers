export async function guardarFactura(env, invoiceData) {
  try {
    let ID_FACTURA = null;
    let ID_ARTICULO = null;
    let ID_PARAMETRO=null;
    let ID_PRODUCTO=null;

    const { results } = await env.DB.prepare(
      "INSERT INTO FACTURA(ID_TRANSATION,CODIGO,ID_CLIENTE,VALOR_FACT,MONEDA,FECHA_VENTA,ESTADO,PAGADO,DEPARTAMENTO,CIUDAD,DIRECCION,ARTICULO_ENVIADO) " +
        " VALUES (-1,?,?,?,?,?,?,?,?,?,?,?)"
    )
      .bind(
        invoiceData.codigo,
        invoiceData.id_cliente,
        invoiceData.valor_fact,
        invoiceData.moneda,
        invoiceData.fecha_venta,
        invoiceData.estado,
        invoiceData.pagado,
        invoiceData.departamento,
        invoiceData.ciudad,
        invoiceData.direccion,
        invoiceData.articulo_enviado
      )
      .all();

    const { resultsFactura } = await env.DB.prepare(
      "SELECT ID FROM FACTURA WHERE CODIGO = ?"
    )
      .bind(invoiceData.codigo)
      .all();

    if (resultsFactura.length > 0) {
      ID_FACTURA = resultsFactura[0].ID;
    }

    invoiceData.shoppingCar.forEach(async(item) => {

      const { resultsArticulo } = await env.DB.prepare("SELECT ID FROM ARTICULO WHERE CODIGO = ?"
      ).bind(item.codigo).all();
      if(resultsArticulo.length>0){
          ID_ARTICULO = resultsArticulo[0].ID;          
      }

      const { resultsParametro } = await env.DB.prepare("SELECT ID FROM PARAMETRO WHERE VALOR = ? AND NOMBRE ='Talla' AND AGRUPADOR='Talla'"
      ).bind(item.talla).all();
      if(resultsParametro.length>0){
          ID_PARAMETRO = resultsParametro[0].ID;          
      }

      const { resultsProducto } = await env.DB.prepare("SELECT ID FROM PRODUCTO WHERE ID_ARTICULO = ? AND ID_PARAMETRO =?"
      )
      .bind(ID_ARTICULO)
      .bind(ID_PARAMETRO)
      .all();
      if(resultsProducto.length>0){
          ID_PRODUCTO = resultsProducto[0].ID;          
      }

      const { resultsDetalleFactura } = 
      await env.DB.prepare(" INSERT INTO DETALL_FACTURA(ID_FACTURA,ID_PRODUCTO,CANTIDAD,VALOR_UNITARIO,VALOR_TOTAL) "+
                          " VALUES(?,?,?,?,?)"
      )
      .bind(ID_FACTURA)
      .bind(ID_PRODUCTO)
      .bind(item.cantidad)
      .bind(item.precio)
      .bind(item.precio*item.cantidad)
      .all();
    });

    return {
      success: true,
      message: {
        message: "Factura guardada correctamente",
        description: "Se guardaron correctamenta los datos de facturación.",
      },
    };
  } catch (error) {
    console.error("Fallo la creación de una nueva factura", error);
    return {
      error: true,
      message: "Fallo la creación de una nueva factura",
      details: error,
    };
  }
}

export async function actualizarEstadoFactura(env, dataRequest) {
  try {
    const { results } = await env.DB.prepare(
      "UPDATE FACTURA SET ID_TRANSATION = ?,ESTADO = ?, PAGADO = ? WHERE CODIGO = ?" +
        " VALUES (?,?,?,?)"
    )
      .bind(
        dataRequest.data.transaction.id,
        "PAGADO",
        1,
        dataRequest.data.reference
      )
      .all();
    return {
      success: true,
      message: {
        message: "Factura guardada correctamente",
        description: "Se guardaron correctamenta los datos de facturación.",
      },
    };
  } catch (error) {
    console.error("Fallo la creación de una nueva factura", error);
    return {
      error: true,
      message: "Fallo la creación de una nueva factura",
      details: error,
    };
  }
}