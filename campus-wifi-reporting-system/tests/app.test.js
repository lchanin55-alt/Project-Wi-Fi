import { User } from '../src/models/User.js';
import { login, logout } from '../src/controllers/authController.js';
import { createTicket } from '../src/controllers/ticketController.js';
import { advanceTicket } from '../src/controllers/adminController.js';
import { level, getOpenCount } from '../src/controllers/networkController.js';

describe('ใบงานที่ 5: Testing & QA Suite (10 Test Cases)', () => {

  test('TC-01: ตรวจสอบรูปแบบอีเมล @psru.ac.th ถูกต้อง', () => {
    expect(User.isValidEmail('65123456@psru.ac.th')).toBe(true);
  });

  test('TC-02: ปฏิเสธเมื่อใช้อีเมลภายนอก เช่น @gmail.com', () => {
    expect(User.isValidEmail('user@gmail.com')).toBe(false);
  });

  test('TC-03: เข้าสู่ระบบสำเร็จเมื่อระบุอีเมล @psru.ac.th', () => {
    const user = login('student@psru.ac.th', 'student');
    expect(user.id).toBe('student@psru.ac.th');
  });

  test('TC-04: ไม่อนุญาตให้เข้าสู่ระบบหากไม่ใช่โดเมนมหาวิทยาลัย', () => {
    expect(() => login('test@other.com', 'student')).toThrow();
  });

  test('TC-05: สร้างใบแจ้งซ่อมเน็ตช้า (Ticket) ได้สำเร็จ', () => {
    const mockDB = { tickets: [], notifs: [], seq: 0 };
    const ticket = createTicket(mockDB, 'อาคารเรียนรวม', 'ชั้น 2', 'เน็ตช้า', 'รายละเอียด', false, 'student@psru.ac.th');
    expect(ticket.id).toBe('TK-0001');
  });

  test('TC-06: ประเมินระดับความหนาแน่นเครือข่ายเป็น "bad" เมื่อใบแจ้งซ่อม >= 3', () => {
    expect(level(3)).toBe('bad');
  });

  test('TC-07: นับเฉพาะ Ticket ที่ยังแก้ไขไม่เสร็จ', () => {
    const mockTickets = [
      { building: 'อาคารเรียนรวม', floor: 'ชั้น 1', status: 'Pending' },
      { building: 'อาคารเรียนรวม', floor: 'ชั้น 1', status: 'Resolved' }
    ];
    expect(getOpenCount(mockTickets, 'อาคารเรียนรวม', 'ชั้น 1')).toBe(1);
  });

  test('TC-08: เจ้าหน้าที่ IT เลื่อนสถานะเป็น In Progress', () => {
    const mockDB = {
      tickets: [{ id: 'TK-0001', building: 'อาคารเรียนรวม', floor: 'ชั้น 1', status: 'Pending', reporter: 'student@psru.ac.th' }],
      notifs: []
    };
    const updated = advanceTicket(mockDB, 'TK-0001');
    expect(updated.status).toBe('In Progress');
  });

  test('TC-09: สร้างการแจ้งเตือนไปยังผู้แจ้งเมื่อ IT อัปเดตสถานะ', () => {
    const mockDB = {
      tickets: [{ id: 'TK-0001', building: 'อาคารเรียนรวม', floor: 'ชั้น 1', status: 'Pending', reporter: 'student@psru.ac.th' }],
      notifs: []
    };
    advanceTicket(mockDB, 'TK-0001');
    expect(mockDB.notifs.length).toBe(1);
  });

  test('TC-10: ออกจากระบบสำเร็จ ล้างข้อมูล Session', () => {
    login('student@psru.ac.th', 'student');
    logout();
    expect(sessionStorage.getItem('cwrs_user')).toBeNull();
  });

});