export async function guardarFactura(env, invoiceData) {
  try {
    let ID_FACTURA = null;
    let ID_PRODUCTO=null;

    const { results } = await env.DB.prepare(
        " INSERT INTO FACTURA(ID_TRANSATION,CODIGO,ID_CLIENTE,VALOR_FACT,MONEDA,FECHA_VENTA,ESTADO,PAGADO,DEPARTAMENTO,CIUDAD,DIRECCION,ARTICULO_ENVIADO) " +
        " VALUES(null,?,?,?,?,?,?,?,?,?,?,?) ")
      .bind(
        invoiceData.codigo,
        invoiceData.id_cliente,
        invoiceData.valor_fact,
        invoiceData.moneda,
        new Date().toISOString(),
        invoiceData.estado,
        invoiceData.pagado,
        invoiceData.departamento,
        invoiceData.ciudad,
        invoiceData.direccion,
        invoiceData.articulo_enviado
      )
      .all();    
      
    let resultsFactura = await env.DB.prepare("SELECT ID FROM FACTURA WHERE CODIGO = ?")
      .bind(invoiceData.codigo)
      .all();                       
    
    if(resultsFactura.results && resultsFactura.results.length > 0){
      ID_FACTURA = resultsFactura.results[0].ID;
    }
    
    for (const item of invoiceData.detalles) {          
      let resultsProducto  = await env.DB.prepare(" SELECT PRO.ID AS ID " +
                                                  " FROM ARTICULO ART " +
                                                  " INNER JOIN PRODUCTO PRO ON PRO.ID_ARTICULO = ART.ID " +
                                                  " INNER JOIN PARAMETRO PAR ON PRO.ID_PARAMETRO = PAR.ID " +
                                                  " WHERE ART.ID = ? AND PAR.VALOR= ?")
      .bind(item.id,item.talla)
      .all();
      if(resultsProducto.results && resultsProducto.results.length > 0){
        ID_PRODUCTO = resultsProducto.results[0].ID;
      }
      let valorTotal = Number(item.precio) * Number(item.cantidad);        
      await env.DB.prepare(" INSERT INTO DETALL_FACTURA(ID_FACTURA,ID_PRODUCTO,CANTIDAD,VALOR_UNITARIO,VALOR_TOTAL) "+
                          " VALUES(?,?,?,?,?)"
      )
      .bind(ID_FACTURA,ID_PRODUCTO,item.cantidad,item.precio,valorTotal)
      .all();
    };

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
      await env.DB.prepare("UPDATE FACTURA SET ID_TRANSATION = ?,ESTADO = ?, PAGADO = ? WHERE CODIGO = ?")
      .bind(dataRequest.data.transaction.id,dataRequest.data.transaction.status,1,dataRequest.data.transaction.reference).all();
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

export async function obtenerEncabezadoFactura(env, reference) {
  try {
      const {results}  =  await env.DB.prepare("SELECT "+
                           " FACT.ID AS IDFACT,CLI.NOMBRE AS NOMBRECLIENTE,CLI.NUMERODOC,CLI.CORREO,FACT.ID_TRANSATION,FACT.CODIGO, " +
                           " FACT.FECHA_VENTA,FACT.VALOR_FACT,FACT.MONEDA,FACT.DEPARTAMENTO,FACT.CIUDAD,FACT.DIRECCION,FACT.ESTADO,FACT.ARTICULO_ENVIADO "+
                           " FROM FACTURA FACT " +
                           " INNER JOIN CLIENTE CLI ON CLI.ID = FACT.ID_CLIENTE " +
                           " WHERE FACT.CODIGO = ? ")
      .bind(reference).all();
      return results;
  } catch (error) {
    console.error("Fallo al obtener el encabezado de una factura", error);
    return {
      error: true,
      message: "Fallo al obtener el encabezado de una factura",
      details: error,
    };
  }
}

export async function obtenerDetalleFactura(env, idFact) {
  try {
      const {results}  = await env.DB.prepare(" SELECT "+
                                  " ART.CODIGO AS CODIGOARTICULO, ART.NOMBRE AS NOMBREARTICULO,ART.IMG_SRC,PAR.VALOR AS TALLAPRODUCTO,DETF.CANTIDAD,DETF.VALOR_UNITARIO,DETF.VALOR_TOTAL " +
                                  " FROM DETALL_FACTURA DETF " +
                                  " INNER JOIN PRODUCTO PRO ON PRO.ID = DETF.ID_PRODUCTO " +
                                  " INNER JOIN PARAMETRO PAR ON PRO.ID_PARAMETRO = PAR.ID " +
                                  " INNER JOIN ARTICULO ART ON ART.ID = PRO.ID_ARTICULO " +
                                  " WHERE DETF.ID_FACTURA = ? ")
      .bind(idFact).all();
      return results;    
  } catch (error) {
    console.error("Fallo al obtener el detalle de una factura", error);
    return {
      error: true,
      message: "Fallo al obtener el detalle de una factura",
      details: error,
    };
  }
}