import { get } from '../api/functions';

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

export const getUsersById = async (model) => {
    try {
      const users = await get("users")      
      return users;
    } catch (error) {
      console.error('Error al recuperar usuarios:', error);
    }
};