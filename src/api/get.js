import db from '../services/db';

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

export const getTransactionsByTransactionId = async (model) => {
  try {
    const transactions = await get("transactions")
    const transactionsGrouped = {};


    for (const transaction of transactions) {
      if (!transactionsGrouped[transaction.transactionId]) {
        transactionsGrouped[transaction.transactionId] = {
          transactionId: transaction.transactionId,
          name: transaction.name,
          date: transaction.date,
          amount: transaction.amount,
          paidBy: transaction.paidBy,
          usersId: [transaction.userId] // Hacemos una lista por usersId
        };
      } else {
        transactionsGrouped[transaction.transactionId].usersId.push(transaction.userId);
      }
    }
    
    return transactionsGrouped;
  } catch (error) {
    console.error('Error al recuperar transactionos:', error);
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
