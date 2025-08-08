export async function saveCliente(env, client) {
  try {
      const {results} = await env.DB.prepare(
        "SELECT * FROM CLIENTE WHERE NUMERODOC = ?"
      )
        .bind(client.clientid)
        .all();  

      if (results.length === 0) {
        await env.DB.prepare(
        "INSERT INTO CLIENTE(NOMBRE,NUMERODOC,TIPODOC,CORREO) VALUES (?, ?, ?, ?)"
          ).bind(
              client.customer_name,
              client.clientid,
              client.clientidtype,
              client.customer_email                            
            ).all();
      }
      return {
        success: true,
        message: {
          message: "Cliente guardado correctamente",
          description:
            "Se guardaros los datos del cliente de forma correcta.",
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