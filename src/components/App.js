import React, { useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import TransactionList from './TransactionList';
import Summary from './Summary';
import imagen from '../assets/icons8-add-30.png';
import '../css/buttonAdd.css'; 
import {ToastContainer, Zoom} from "react-toastify";
import Notification from "../firebaseNotifications/Notification";
import { get } from '../api';
import AddUser from './AddUsers';

function App() {
  const history = useHistory();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    get("users").then((response) => {
      setUsers(response);
    });
  };

  const handleClick = () => {
    if (users.length === 0) {
      alert("No hay usuarios registrados, por favor registre al menos uno antes");
    } else {
      history.push('/transactionForm');
    }
  };
  
  return (        
    <div>
    <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Zoom}
        closeButton={false}
    />
      <Notification/>
      <AddUser onAddUser={loadUsers}/> 
      <h1>Resumen:</h1>
      <Summary />
      
      <h1>Transacciones:</h1>
      <TransactionList />
      <button className="button-add" onClick={handleClick}><img src={imagen} alt="Boton agregar transaccion" /></button> 
    </div>
  );
}

export default App;
