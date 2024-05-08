import React from 'react';
import { useHistory } from 'react-router-dom';
import TransactionList from './TransactionList';
import Summary from './Summary';
import imagen from '../assets/icons8-add-30.png';
import '../css/buttonAdd.css'; 

function App() {
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
      <button className="button-add" onClick={handleClick}><img src={imagen} alt="Boton agregar transaccion" /></button>
    </div>
  );
}

export default App;
