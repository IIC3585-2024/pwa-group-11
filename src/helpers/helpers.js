export function validateFormData(transactionName, transactionDate, transactionAmount, transactionPaidBy, users) {

  if (!transactionName.trim()) {
    return {validate: false, error: 'El nombre del evento es requerido'};
  }

  if (!transactionDate) {
    return {validate: false, error: 'La fecha es requerida'};
  }

  if (!transactionAmount) {
    return {validate: false, error: 'El monto es requerido'};
  } else if (isNaN(transactionAmount)) {
    return {validate: false, error: 'El monto debe ser un número'};
  }

  if (!transactionPaidBy) {
    return {validate: false, error: 'El pagador es requerido'};
  }

  if (users.length === 0) {
    return {validate: false, error: 'Debe agregar al menos un usuario'};
  }

  return {validate: true, error: 'Datos correctos'};
}

export function validateUserData(userName) {

  if (!/^[a-zA-Z0-9]+$/.test(userName)) {
    return {validate: false, error: 'El nombre del usuario es incorrecto'};
  }

  return {validate: true, error: 'Datos correctos'};
}