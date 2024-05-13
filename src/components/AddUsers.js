import React, { useState, useEffect } from 'react';
import { validateUserData } from '../helpers/helpers';
import { post } from '../api';

function AddUser({ onAddUser }) {
  const [showModal, setShowModal] = useState(false);
  const [newUserName, setNewUserName] = useState('');

  const handleAddUserClick = () => {
    setShowModal(true);
  };


  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalSubmit = async () => {
    try {
      const { validate, error } = validateUserData(newUserName);

      if (!validate) {
        alert(error);
        return;
      }
      await post("users", { name: newUserName });
      onAddUser();
      setShowModal(false);
      setNewUserName('');
    } catch (error) {
      console.error('Error al agregar el usuario:', error);
    }
  };

  return (        
    <div>
      <button onClick={handleAddUserClick}>Agregar Usuario</button>

      {/* Modal para agregar usuario */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleModalClose}>&times;</span>
            <input
              type="text"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              placeholder="Nombre del nuevo usuario"
              required
            />
            <button onClick={handleModalSubmit}>Agregar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddUser;