export const MAIL_RE = /^[a-z0-9._%+-]+@psru\.ac\.th$/i;

export const ROLE_TH = { 
  student: 'นักศึกษา', 
  staff: 'บุคลากร', 
  it: 'เจ้าหน้าที่ IT' 
};

export class User {
  constructor(id, role, name = '') {
    this.id = id;
    this.email = id;
    this.role = role;
    this.name = name || id.split('@')[0];
  }

  static isValidEmail(email) {
    return MAIL_RE.test(email);
  }
}