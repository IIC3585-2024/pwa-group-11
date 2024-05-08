import React, { useState, useEffect } from 'react';
import { getTransactionsByTransactionId, get } from '../api';
import { calculateDebt } from '../services/functions';

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
  
  return (        
    <div>
      {(transactions.length > 0 && users.length > 0)
      ? calculateDebt(transactions2, transactions).map((debt, index) => {
        return <div key={index}>
          <h3>{users.filter(user => user.id === parseFloat(debt[0]))[0].name} debe a {users.filter(user => user.id === parseFloat(debt[1]))[0].name}: {debt[2]}</h3>
        </div>
      })
       : null}
      
    </div>
  );
}

export default Summary;
