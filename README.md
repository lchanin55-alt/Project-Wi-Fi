# 📶 Campus Wi-Fi Reporting & Monitoring System
**ระบบแจ้งปัญหาและติดตามสถานะ Wi-Fi มหาวิทยาลัย**

ระบบเว็บแอปพลิเคชันสำหรับอำนวยความสะดวกให้นิสิต บุคลากร และเจ้าหน้าที่ IT ในการแจ้งปัญหา ปรับปรุง และติดตามสถานะเครือข่าย Wi-Fi แบบ Real-time ภายในมหาวิทยาลัย

---

## 📌 คุณสมบัติหลักของระบบ (Key Features)

- **FR-01 Authentication (SSO):** รองรับการล็อกอินเข้าใช้งานผ่านบัญชีมหาวิทยาลัย (Student / Staff Account)[cite: 7, 9]
- **FR-02 Issue Reporting:** แบบฟอร์มแจ้งปัญหาอินเทอร์เน็ต สามารถระบุตึก ชั้น ประเภทปัญหา และแนบรูปภาพประกอบได้[cite: 7, 9]
- **FR-03 Ticket Management:** ระบบคิวงานสำหรับเจ้าหน้าที่ IT เพื่อกดรับเรื่อง และอัปเดตสถานะการแก้ไข (Pending -> In Progress -> Resolved)[cite: 7, 9]
- **FR-04 Network Status Map:** แสดงแผนที่และสถานะเครือข่ายแยกตามโซน/อาคาร (สีเขียว = ปกติ, สีเหลือง = หนาแน่น, สีแดง = มีปัญหา)[cite: 7, 9]
- **FR-05 Real-time Notification:** ส่งการแจ้งเตือนไปยังผู้แจ้งเมื่อปัญหาได้รับการแก้ไขเรียบร้อยแล้ว[cite: 7, 9]

---

## 📁 โครงสร้างโปรเจกต์ (Project Structure)

```text
campus-wifi-reporting/
│
├── index.html                    <-- (หรืออยู่ใน src/views/)
├── login.html
├── register.html
├── report.html
├── it-dashboard.html
├── qa-report.html
├── style.css                     <-- ไฟล์ Styling รวมของระบบ
│
└── src/
    ├── models/
    │   ├── User.js               <-- Model กำหนดโครงสร้างผู้ใช้/Regex อีเมล
    │   └── Ticket.js             <-- Model กำหนดข้อมูลใบแจ้งซ่อมและรายชื่ออาคาร
    │
    ├── controllers/
    │   ├── authController.js     <-- ระบบ ล็อกอิน/สมัครสมาชิก/สิทธิ์ ( Admin: admin@psru.ac.th / 1111 )
    │   ├── ticketController.js   <-- ระบบ บันทึก/โหลดคำร้องแจ้งปัญหา (DB)
    │   ├── adminController.js    <-- ระบบ อัปเดตสถานะสำหรับ IT
    │   └── networkController.js  <-- ระบบ คำนวณความหนาแน่นและแจ้งเตือน
    │
    └── views/                   <-- (กรณีที่แยก HTML ไว้ในโฟลเดอร์ views)
        ├── index.html
        ├── login.html
        ├── register.html
        ├── report.html
        └── it-dashboard.html
