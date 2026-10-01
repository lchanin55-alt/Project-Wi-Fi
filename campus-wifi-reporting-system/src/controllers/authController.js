import { User, MAIL_RE } from '../models/User.js';

const USERS_DB_KEY = 'cwrs_registered_users';
const CURRENT_USER_KEY = 'cwrs_user';

// สร้างบัญชี Admin / IT เริ่มต้นอัตโนมัติหากยังไม่มีในระบบ
export function initDefaultAdmin() {
  const users = getRegisteredUsers();
  const adminEmail = 'admin@psru.ac.th';
  
  const exists = users.some(u => u.email === adminEmail);
  if (!exists) {
    users.push({
      id: adminEmail,
      name: 'เจ้าหน้าที่ IT (Admin)',
      email: adminEmail,
      password: '1111',
      role: 'admin',
      registeredAt: new Date().toISOString()
    });
    localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
  }
}

export function getRegisteredUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_DB_KEY)) || [];
  } catch (e) {
    return [];
  }
}

export function registerUser(name, email, password, role = 'student') {
  if (!name || !email || !password) {
    throw new Error('กรุณากรอกข้อมูลให้ครบถ้วน');
  }

  const cleanEmail = email.trim().toLowerCase();

  if (!MAIL_RE.test(cleanEmail)) {
    throw new Error('สามารถสมัครได้เฉพาะอีเมลมหาวิทยาลัย (@psru.ac.th) เท่านั้น');
  }

  if (password.length < 6) {
    throw new Error('รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร');
  }

  const users = getRegisteredUsers();
  const isDuplicate = users.some(u => u.email === cleanEmail);
  if (isDuplicate) {
    throw new Error('อีเมลนี้ถูกลงทะเบียนเข้าใช้งานแล้ว');
  }

  const newUser = {
    id: cleanEmail,
    name: name.trim(),
    email: cleanEmail,
    password: password,
    role: role,
    registeredAt: new Date().toISOString()
  };

  users.push(newUser);
  localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
  return newUser;
}

export function loginUser(email, password) {
  initDefaultAdmin(); // ตรวจสอบและสร้าง Admin อัตโนมัติก่อนเช็กล็อกอิน

  if (!email || !password) {
    throw new Error('กรุณากรอกอีเมลและรหัสผ่าน');
  }

  const cleanEmail = email.trim().toLowerCase();

  if (!MAIL_RE.test(cleanEmail)) {
    throw new Error('กรุณาใช้อีเมลมหาวิทยาลัย (@psru.ac.th) ในการเข้าสู่ระบบ');
  }

  const users = getRegisteredUsers();
  const user = users.find(u => u.email === cleanEmail && u.password === password);

  if (!user) {
    throw new Error('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
  }

  const sessionData = {
    id: user.email,
    name: user.name,
    email: user.email,
    role: user.role
  };

  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionData));
  sessionStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionData));
  return sessionData;
}

export function loadMe() {
  try {
    const raw = localStorage.getItem(CURRENT_USER_KEY) || sessionStorage.getItem(CURRENT_USER_KEY);
    if (!raw) return null;
    const u = JSON.parse(raw);
    return u && MAIL_RE.test(u.email || u.id) ? u : null;
  } catch (e) {
    return null;
  }
}

export function logout() {
  localStorage.removeItem(CURRENT_USER_KEY);
  sessionStorage.removeItem(CURRENT_USER_KEY);
}

// ฟังก์ชันสลับไปหน้าเข้าสู่ระบบตามเงื่อนไขสิทธิ์การใช้งาน
export function requireLoginForSection(targetUrl, requiredRole = null) {
  const user = loadMe();
  
  if (!user) {
    alert('กรุณาเข้าสู่ระบบก่อนเข้าใช้งาน');
    window.location.href = `login.html?redirect=${encodeURIComponent(targetUrl)}`;
    return false;
  }

  if (requiredRole && user.role !== requiredRole) {
    alert(`ระบบนี้สำหรับสิทธิ์ ${requiredRole} เท่านั้น กรุณาเข้าสู่ระบบด้วยบัญชีเจ้าหน้าที่ IT`);
    logout();
    window.location.href = `login.html?redirect=${encodeURIComponent(targetUrl)}`;
    return false;
  }

  window.location.href = targetUrl;
  return true;
}