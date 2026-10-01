import { saveDB } from './ticketController.js';

export const NEXT_STATUS = {
  'Pending': ['In Progress', 'รับเรื่อง'],
  'In Progress': ['Resolved', 'แก้ไขเสร็จ']
};

export function advanceTicket(db, ticketId) {
  if (!db || !Array.isArray(db.tickets)) return null;

  const t = db.tickets.find(x => x.id === ticketId);
  if (!t || !NEXT_STATUS[t.status]) return null;

  t.status = NEXT_STATUS[t.status][0];
  t.updatedAt = new Date().toISOString();

  if (!Array.isArray(db.notifs)) {
    db.notifs = [];
  }

  db.notifs.unshift({
    id: 'N' + Date.now(),
    to: t.reporter,
    ticketId: t.id,
    read: false,
    time: t.updatedAt,
    text: `คำร้อง ${t.id} (${t.building} ${t.floor}) เปลี่ยนสถานะเป็น ${t.status}`
  });

  saveDB(db);
  return t;
}