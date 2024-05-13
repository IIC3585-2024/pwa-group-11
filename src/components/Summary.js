import React, { useState, useEffect } from 'react';
import { getTransactionsByTransactionId, get, post } from '../api';
import { calculateDebt } from '../services/calculateFunctions';
import '../css/container.css'

function Summary() {
  const [transactions, setTransactions] = useState([]);
  const [transactions2, setTransactions2] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getTransactionsByTransactionId("transactions").then((response) => {
        setTransactions(Object.values(response));
    });
    get("users").then((response) => {
        setUsers(response);
    });
    get("transactions").then((response) => {
        setTransactions2(response);
    });
  }, []);

  const handleClick = (debt) => {
    const id = Date.now();
    const fecha = new Date();
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;
    const año = fecha.getFullYear(); 
    const fechaFormateada = `${año}-${mes}-${dia}`;
    const deudor = users.filter(user => user.id === parseFloat(debt[0]))[0]
    const acreedor = users.filter(user => user.id === parseFloat(debt[1]))[0]
    post("transactions", { transactionId: id,  name: "Pago Deuda", date: fechaFormateada, amount: 2*debt[2], paidBy: deudor.id, userId: deudor.id })
    .then(() => {
      console.log("exito");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
    post("transactions", { transactionId: id,  name: "Pago Deuda", date: fechaFormateada, amount: 0, paidBy: deudor.id, userId: acreedor.id })
    .then(() => {
      console.log("exito");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
    window.location.reload();
  };

  return (       
    <div className='flex-container'>
      {(transactions.length > 0 && users.length > 0)
      ? calculateDebt(transactions2, transactions).map((debt, index) => {
        if (debt[2] > 0) {
          return (<div className='flex-item2' key={index}>
            <h3>{users.filter(user => user.id === parseFloat(debt[0]))[0].name} debe a {users.filter(user => user.id === parseFloat(debt[1]))[0].name}: {debt[2]}</h3>
            <button onClick={() => handleClick(debt)} class="button button1">Saldar Deuda</button>
          </div>)}
      })
       : null}
    </div>
  );
}

export default Summary;
