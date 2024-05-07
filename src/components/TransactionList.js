import React, { useEffect, useState } from 'react';
import { getTransactionsByTransactionId, getUsersById } from '../services/functions';

function TransactionList() {
    const [transactions, setTransactions] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getTransactionsByTransactionId("transactions").then((response) => {
            setTransactions(Object.values(response));
        });
        getUsersById("users").then((response) => {
            setUsers(response);
        });
    }, [transactions]);

    return (
        <ul>
            {transactions.map(transaction => (
                <li key={transaction.transactionId}>
                Nombre: {transaction.name} <br />
                Fecha: {transaction.date} <br />
                Total: {transaction.amount} <br />
                Pagado por: {users.map((user) => {
                        if (user.id === transaction.paidBy) {
                            return user.name;
                        }
                    })} <br />
                Participantes: <ul>
                    {users.map((user) => {
                        if (transaction.usersId.includes(user.id)) {
                            return <li key={user.id}>{user.name}</li>;
                        }
                    })}
                </ul>
            </li>
            ))}
        </ul>
    );
}

export default TransactionList;
