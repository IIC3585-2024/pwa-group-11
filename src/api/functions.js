import db from '../db';

export const get = async (model) => {
    try {
      if (model === "users") {
        const modelFromDB = await db.users.toArray();
        return modelFromDB;
      } else if (model === "transactions") {
        const modelFromDB = await db.transactions.toArray();
        return modelFromDB;
      }
    } catch (error) {
      console.error('Error función get:', error);
    }
};

export const post = async (model, obj) => {
  try {
    
    if (model === "users") {
      const userExists = await db.users.where('name').equals(obj.name).toArray();
      if (userExists.length === 0) {
        const userId = await db.users.add(obj);
        return userId;
      }
      return userExists[0].id;
    } else if (model === "transactions") {
      db.transactions.add(obj);
    }
  } catch (error) {
    console.error('Error función post:', error);
  }
};

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

export const getUserByName = async (name) => {
  try {
    const userExists = await db.users.where('name').equals(name).toArray();
    if (userExists.length > 0) {
      return userExists[0];
    }
  } catch (error) {
    console.error('Error al recuperar usuarios por nombre:', error);
  }
};

export const getUserById = async (id) => {
  try {
    const userExists = await db.users.where('id').equals(id).toArray();
    if (userExists.length > 0) {
      return userExists[0];
    }
  } catch (error) {
    console.error('Error al recuperar usuarios por id:', error);
  }
};