export const level = n => n >= 3 ? 'bad' : n >= 1 ? 'warn' : 'good';

export function getOpenCount(tickets, building, floor) {
  if (!Array.isArray(tickets)) return 0;
  return tickets.filter(t => 
    t && 
    t.building === building && 
    t.floor === floor && 
    t.status !== 'Resolved'
  ).length;
}

export function markNotificationsAsRead(db, userId) {
  if (!db || !Array.isArray(db.notifs)) return;
  db.notifs.forEach(n => {
    if (n && n.to === userId) n.read = true;
  });
}