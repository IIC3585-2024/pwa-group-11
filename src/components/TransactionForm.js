import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { get, post, getUserByName } from '../api';
import { validateFormData } from '../helpers/helpers';
import '../css/transactionForm.css'; 

function TransactionForm() {
    const history = useHistory();
    const [transactionName, setTransactionName] = useState('');
    const [transactionDate, setTransactionDate] = useState('');
    const [transactionAmount, setTransactionAmount] = useState('');
    const [transactionPaidBy, setTransactionPaidBy] = useState('');
    const [users, setUsers] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    useEffect(() => {
        get("users").then((response) => {
            setAllUsers(response);
            setTransactionPaidBy(response[0].name);
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const id = Date.now();

        const { validate, error } = validateFormData(transactionName, transactionDate, transactionAmount, transactionPaidBy, users);

        if (!validate) {
            alert(error);
            return;
        } 
        users.map(async (user) => {
            const userIdPaidBy = await getUserByName(transactionPaidBy);
            const userId = await getUserByName(user);
            await post("transactions", { transactionId: id,  name: transactionName, date: transactionDate, amount: transactionAmount, paidBy: userIdPaidBy.id, userId: userId.id });
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

    const handleAddUser = (user) => {
        setUsers([...users, user]);
        setDropdownVisible(false);
    };

    const handleRemoveUser = (index) => {
        const newUsers = [...users];
        newUsers.splice(index, 1);
        setUsers(newUsers);
    };

    return (
        <div className="transaction-form-container">
            <button onClick={handleClickBack} className="button back-button">Atrás</button>
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

                <label>Pagado por:</label>
                <select
                    value={transactionPaidBy}
                    onChange={e => setTransactionPaidBy(e.target.value)}
                    required
                >
                    {allUsers.map(user => (
                        <option key={user.id} value={user.name}>{user.name}</option>
                    ))}
                </select>

                <label>Participantes:</label>
                <div className="users-list">
                    {users.map((user, index) => (
                        <div key={index} className="user-item">
                            <span>{user}</span>
                            <button onClick={() => handleRemoveUser(index)}>X</button>
                        </div>
                    ))}
                </div>

                <div className="add-user-dropdown">
                    <button  onClick={(e) => { e.preventDefault(); setDropdownVisible(!dropdownVisible); }}>Agregar usuario</button>
                    {dropdownVisible && (
                        <select onChange={e => handleAddUser(e.target.value)}>
                            <option value="">Selecciona un usuario</option>
                            {allUsers.map(user => (
                                <option key={user.id} value={user.name}>{user.name}</option>
                            ))}
                        </select>
                    )}  
                </div>
                <button type="submit" className="button button1">Add transaction</button>
            </form>
        </div>
    );
}

export default TransactionForm;
