export async function guardarFactura(env, invoiceData) {
  try {
    const {results} = await env.DB.prepare("INSERT INTO FACTURA(ID_TRANSATION,CODIGO,ID_CLIENTE,VALOR_FACT,MONEDA,FECHA_VENTA,ESTADO,PAGADO,DEPARTAMENTO,CIUDAD,DIRECCION,ARTICULO_ENVIADO) "+
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
			invoiceData.articulo_enviado)
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

export async function actualizarEstadoFactura(env, dataRequest) {
  try {
    const {results} = await env.DB.prepare("UPDATE FACTURA SET ID_TRANSATION = ?,ESTADO = ?, PAGADO = ? WHERE CODIGO = ?"+
			" VALUES (?,?,?,?)"
		)
		.bind(dataRequest.data.transaction.id,"PAGADO",1,dataRequest.data.reference)
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