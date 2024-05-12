import Dexie from 'dexie';

class MyAppDatabase extends Dexie {
  constructor() {
    super('SplitDB'); 
    this.version(1).stores({
      users: "++id, name",
      transactions: "++id, eventId, name, date, amount, paidBy, userId"
    });
  }
}

const db = new MyAppDatabase();

export default db;

// await Dexie.delete('SplitDB');
