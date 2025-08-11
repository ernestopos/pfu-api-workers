export async function saveCliente(env, client) {
  try {
    let ID_CLIENTE = null;

    const { results } = await env.DB.prepare(
      "SELECT * FROM CLIENTE WHERE NUMERODOC = ?"
    )
      .bind(client.clientid)
      .all();

    if (results.length === 0) {
      await env.DB.prepare("INSERT INTO CLIENTE(NOMBRE,NUMERODOC,TIPODOC,CORREO) VALUES (?, ?, ?, ?)")
      .bind(client.customer_name,      
            client.clientid,
            client.clientidtype,
            client.customer_email
        )
      .all();
     const { createClient } = await env.DB.prepare("SELECT * FROM CLIENTE WHERE NUMERODOC = ?").bind(client.clientid).all();
      ID_CLIENTE = createClient[0].ID;  
    }else{
      ID_CLIENTE = results[0].ID;
    }
    return {
      success: true,
      ID_CLIENTE:ID_CLIENTE,
      message: {
        message: "Cliente guardado correctamente",
        description: "Se guardaros los datos del cliente de forma correcta."        
      },
    };
  } catch (error) {
    console.error("Fallo la creación de un nuevo cliente", error);
    return {
      error: true,
      message: "Fallo la creación de un nuevo cliente",
      details: error,
    };
  }
}

export async function getNameCliente(env, email:String) {
  try {
    let clientName:String = ""
    const { results } = await env.DB.prepare(  "SELECT * FROM CLIENTE WHERE CORREO = ? "
    ).bind(email).all();

    if (results.length > 0) {
      clientName = String(results[0].NOMBRE);
    }
    return clientName;
  } catch (error) {
    console.error("Fallo al obtener el nombre del cliente", error);
    return {
      error: true,
      message: "Fallo al obtener el nombre del cliente",
      details: error,
    };
  }
}