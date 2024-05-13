import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { post, getUserByName } from '../api';
import '../css/transactionForm.css'; 

function TransactionForm() {
    const history = useHistory();
    const [transactionName, setTransactionName] = useState('');
    const [transactionDate, setTransactionDate] = useState('');
    const [transactionAmount, setTransactionAmount] = useState('');
    const [transactionPaidBy, setTransactionPaidBy] = useState('');
    const [users, setUsers] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const id = Date.now();
        
        users.map(async (user) => {
            post("users", { name: user }).then(async (response) => {
                const userIdPaidBy = await getUserByName(transactionPaidBy);
                await post("transactions", { transactionId: id,  name: transactionName, date: transactionDate, amount: transactionAmount, paidBy: userIdPaidBy.id, userId: response });
            });
        });
          
        setTransactionName('');
        setTransactionDate('');
        setTransactionAmount('');
        setTransactionPaidBy('');
        setUsers([]);
        history.push('/');
    };

    const handleClickBack = () => {
        history.goBack();
    };

    return (
        <div className="transaction-form-container">
            <button onClick={handleClickBack} class="button back-button">Atrás</button>
            <h1 className="tittle-text">Nueva transacción</h1>
            <form onSubmit={handleSubmit} className="transaction-form">
                <input
                    type="text"
                    value={transactionName}
                    onChange={e => setTransactionName(e.target.value)}
                    placeholder="Enter transaction name"
                    required
                />
                <input
                    type="date"
                    value={transactionDate}
                    onChange={e => setTransactionDate(e.target.value)}
                    required
                />
                <input
                    type="number"
                    value={transactionAmount}
                    onChange={e => setTransactionAmount(e.target.value)}
                    placeholder="Enter transaction amount"
                    required
                />
                <input
                    type="text"
                    value={transactionPaidBy}
                    onChange={e => setTransactionPaidBy(e.target.value)}
                    placeholder="Enter transaction paid by"
                    required
                />
                <input
                    type="text"
                    value={users}
                    onChange={e => setUsers(e.target.value.split(','))}
                    placeholder="Enter transaction users"
                    required
                />
                <button type="submit" class="button button1">Add transaction</button>
            </form>
        </div>
    );
}

export default TransactionForm;
