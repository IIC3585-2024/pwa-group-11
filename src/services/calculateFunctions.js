export const calculateDebt = (transactions, transactionsByEventId) => {
  const debits = {}; // Lista para rastrear las deudas de cada usuario
  const credits = {}; // Lista para rastrear los créditos de cada usuario

  // Calcular las deudas y créditos netos de cada usuario
  transactions.forEach(({ id, paidBy, userId, transactionId }) => {
    const transaction = transactionsByEventId.filter(transc => transc.transactionId === transactionId)[0];
    const amount = transaction.amount / transaction.usersId.length;
    debits[paidBy] = ((debits[paidBy] || 0) - parseFloat(amount));
    credits[userId] = (credits[userId] || 0) + parseFloat(amount);
  });

  // Inicializar listas de débiuserId y crédito ordenadas
  const debitList = Object.entries(debits).filter(([_, amount]) => amount < 0).sort((a, b) => a[1] - b[1]);
  const creditList = Object.entries(credits).filter(([_, amount]) => amount > 0).sort((a, b) => b[1] - a[1]);

  const transactionsSimplified = [];

  // Realizar transacciones hasta que ambas listas estén vacías
  while (debitList.length > 0 && creditList.length > 0) {
      const [debtor, debitAmount] = debitList[0];
      const [creditor, creditAmount] = creditList[0];
      
      const minAmount = Math.min(-debitAmount, creditAmount);
      debitList[0][1] += minAmount;
      creditList[0][1] -= minAmount;

      if (debtor !== creditor) {
        transactionsSimplified.push({ paidBy: debtor, userId: creditor, amount: minAmount });
      }

      // Eliminar elementos de las listas si las deudas o créditos se han saldado completamente
      if (debitList[0][1] === 0) debitList.shift();
      if (creditList[0][1] === 0) creditList.shift();
  }

  return simplifyDebts(transactionsSimplified);
};

// https://github.com/Shivashish1010/Simplify-Debts/blob/master/simplify_debts.py
const simplifyDebts = (transactions) => {
    const total = new Map();

    transactions.forEach(({userId, paidBy, amount}) => {
        total.set(userId, (total.get(userId) || 0) - amount);
        total.set(paidBy, (total.get(paidBy) || 0) + amount);
    });

    const credit = [];
    const debit = [];

    total.forEach((amount, name) => {
        if (amount > 0) {
            credit.push([-amount, name]);
        } else if (amount < 0) {
            debit.push([amount, name]);
        }
    });

    credit.sort((a, b) => b[0] - a[0]);
    debit.sort((a, b) => a[0] - b[0]);

    const answer = [];

    while (credit.length && debit.length) {
        const [creditValue, creditName] = credit.pop();
        const [debitValue, debitName] = debit.pop();

        if (creditValue < debitValue) {
            const amountLeft = creditValue - debitValue;
            answer.push([debitName, creditName, -debitValue]);
            credit.push([amountLeft, creditName]);
            credit.sort((a, b) => b[0] - a[0]);
        } else if (debitValue < creditValue) {
            const amountLeft = debitValue - creditValue;
            answer.push([debitName, creditName, -creditValue]);
            debit.push([amountLeft, debitName]);
            debit.sort((a, b) => a[0] - b[0]);
        } else {
            answer.push([debitName, creditName, -creditValue]);
        }
    }

    return answer;
};

