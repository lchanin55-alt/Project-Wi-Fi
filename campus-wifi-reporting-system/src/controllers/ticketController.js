import { Ticket } from '../models/Ticket.js';

const DB_KEY = 'cwrs_v1';

export function loadDB() {
  try {
    const raw = localStorage.getItem(DB_KEY);
    if (!raw) return { tickets: [], notifs: [], seq: 0 };
    
    const parsed = JSON.parse(raw);
    return {
      tickets: Array.isArray(parsed.tickets) ? parsed.tickets : [],
      notifs: Array.isArray(parsed.notifs) ? parsed.notifs : [],
      seq: parsed.seq || 0
    };
  } catch (e) {
    return { tickets: [], notifs: [], seq: 0 };
  }
}

export function saveDB(db) {
  try {
    if (!db) return;
    if (!Array.isArray(db.tickets)) db.tickets = [];
    if (!Array.isArray(db.notifs)) db.notifs = [];
    localStorage.setItem(DB_KEY, JSON.stringify(db));
  } catch (e) {
    console.error('Save DB Error:', e);
  }
}

export function createTicket(db, building, floor, issue, detail, hasPhoto, reporter) {
  if (!db) db = loadDB();
  if (!Array.isArray(db.tickets)) db.tickets = [];
  
  db.seq = (db.seq || 0) + 1;
  const newTicket = new Ticket(db.seq, building, floor, issue, detail, hasPhoto, reporter);
  
  db.tickets.unshift(newTicket);
  saveDB(db);
  return newTicket;
}