import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import TransactionList from './TransactionList';
import Summary from './Summary';
import '../css/buttonAdd.css'; 

function Home() {
  const history = useHistory();

  const handleClick = () => {
    history.push('/transactionForm');
  };
  
  return (        
    <div>
      <h1>Resumen:</h1>
      <Summary />
      
      <h1>Transacciones:</h1>
      <TransactionList />
      <button className="button-add" onClick={handleClick}>+</button>
    </div>
  );
}

export default Home;
