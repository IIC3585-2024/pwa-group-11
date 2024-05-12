import db from '../services/db';

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