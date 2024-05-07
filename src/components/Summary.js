import React, { useState, useEffect } from 'react';
import { getTransactionsByTransactionId } from '../services/functions';

function Summary() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransactionsByTransactionId("transactions").then((response) => {
        setTransactions(Object.values(response));
    });
  }, []);
  
  return (        
    <div>
      
    </div>
  );
}

export default Summary;
