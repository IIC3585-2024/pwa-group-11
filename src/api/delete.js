import db from '../services/db';

export const deleteById = async (model, id) => {
  try {
    if (model === "users") {
      await db.users.delete(id);
    } else if (model === "transactions") {
      await db.transactions.delete(id);
    } else {
      throw new Error(`Modelo desconocido: ${model}`);
    }

    console.log(`Registro eliminado correctamente (Modelo: ${model}, ID: ${id})`);
  } catch (error) {
    console.error(`Error al eliminar registro (Modelo: ${model}, ID: ${id}):`, error);
    throw error;
  }
};