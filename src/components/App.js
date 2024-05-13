import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import TransactionList from './TransactionList';
import Summary from './Summary';
import AddUser from './AddUsers';
import imagen from '../assets/icons8-add-30.png';
import { prefix_url } from '../config';
import { get } from '../api';
import '../css/buttonAdd.css'; 

function App() {
  const history = useHistory();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    get("users").then((response) => {
      setUsers(response);
  });
  }, []);

  const handleClick = () => {
    history.push(prefix_url + '/transactionForm');
  };

  return (        
    <div>
      <AddUser />
      <Summary />
      <TransactionList />
      <button className="button-add" onClick={handleClick} disabled={users.length === 0}>
        <img src={imagen} alt="Boton agregar transaccion" />
      </button>
      {/* <button className="button-add" onClick={handleClick}><img src={imagen} alt="Boton agregar transaccion" /></button> */}
    </div>
  );
}

export default App;
