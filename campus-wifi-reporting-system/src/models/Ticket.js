export const BUILDINGS = {
  'อาคารเรียนรวม': ['ชั้น 1', 'ชั้น 2', 'ชั้น 3', 'ชั้น 4', 'ชั้น 5'],
  'อาคารห้องสมุด': ['ชั้น 1', 'ชั้น 2', 'ชั้น 3', 'ชั้น 4'],
  'อาคารวิทยาศาสตร์': ['ชั้น 1', 'ชั้น 2', 'ชั้น 3', 'ชั้น 4', 'ชั้น 5', 'ชั้น 6'],
  'โรงอาหารกลาง': ['ชั้น 1', 'ชั้น 2'],
  'หอพักนักศึกษา': ['ชั้น 1', 'ชั้น 2', 'ชั้น 3', 'ชั้น 4', 'ชั้น 5']
};

export const STATUS_TH = { 
  'Pending': 'Pending', 
  'In Progress': 'In Progress', 
  'Resolved': 'Resolved' 
};

export class Ticket {
  constructor(seq, building, floor, issue, detail, hasPhoto, reporter) {
    this.id = 'TK-' + String(seq).padStart(4, '0');
    this.building = building;
    this.floor = floor;
    this.issue = issue;
    this.detail = detail;
    this.hasPhoto = hasPhoto;
    this.reporter = reporter;
    this.status = 'Pending';
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }
}