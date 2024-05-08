import db from '../services/db';

export const deleteById = async (model, id) => {
  try {
    if (model === "users") {
      await db.users.delete(id);
    } else if (model === "transactions") {
      await db.transactions.delete(id);
    }
  } catch (error) {
      console.error(`Error función deleteById`, error);
      throw error;
  }
};