export const saveEvent = (event) => {
  const events = JSON.parse(localStorage.getItem('events')) || [];
  events.push(event);
  localStorage.setItem('events', JSON.stringify(events));
};

export const getEvents = () => {
  return JSON.parse(localStorage.getItem('events')) || [];
};
