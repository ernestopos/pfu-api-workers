export async function saveDonacion(env, donacion) {
  try {
      await env.DB.prepare(
      " INSERT INTO DONACION(AMOUNT_IN_CENTS,CURRENCY,DATE,STATUS,CLIENTID) "+ 
      " VALUES (?, ?, ?, ?, (SELECT ID FROM CLIENTE WHERE NUMERODOC = ?))")
      .bind(
        donacion.amount_in_cents,
        donacion.currency,
        new Date().toISOString(),
        donacion.status,
        donacion.clientid
      ).all();

      return {
        error: false,
        message: "Donación agragada correctamente"        
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