# FUTURE_FS_01 — Portfolio

## Project Structure

```
FUTURE_FS_01/
├── frontend/          ← React + Vite (your portfolio UI)
│   ├── src/
│   └── index.html
└── backend/           ← Node.js + Express + MongoDB
    ├── src/
    │   ├── config/
    │   │   ├── email.js      ← Nodemailer (Gmail)
    │   │   └── upload.js     ← Multer (image upload)
    │   ├── controllers/
    │   ├── middleware/
    │   ├── models/
    │   └── routes/
    └── uploads/              ← Created automatically for uploaded images
```

---

## Backend Setup

### 1. Install dependencies
```bash
cd backend
npm install
```

### 2. Configure `.env`
Edit `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/Portfolio
JWT_SECRET=your_secret_here

ADMIN_EMAIL=wstellawambui@gmail.com
ADMIN_PASSWORD=Nyumba@2001

EMAIL_USER=wstellawambui@gmail.com
EMAIL_PASS=your_gmail_app_password   ← See below
EMAIL_TO=wstellawambui@gmail.com
```

### 3. Get Gmail App Password (for contact form emails)
1. Go to https://myaccount.google.com/apppasswords
2. Select "Mail" and generate a password
3. Paste it as `EMAIL_PASS` in `.env`

### 4. Create Admin Account (run once)
Start the server, then call:
```bash
curl -X POST http://localhost:5000/api/auth/seed
```
Or use Postman / your browser's network tab.

### 5. Start the backend
```bash
npm run dev
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend connects to `http://localhost:5000/api` by default.

To point to a deployed backend, create `frontend/.env`:
```env
VITE_API_URL=https://your-backend-url.com/api
```

---

## Features

### Projects (Admin Dashboard)
- ✅ Add project — name, description, category, year, tech stack, GitHub/Live URL
- ✅ Upload project image (file OR URL)
- ✅ Edit any project field including the photo
- ✅ Delete project (removes uploaded file too)
- ✅ Mark as Featured

### Contact Form
- ✅ Real-time field validation (name, email, subject, message)
- ✅ Saves submission to MongoDB
- ✅ Sends email notification to your Gmail
- ✅ Admin can view, mark-as-read, reply, and delete messages

### Authentication
- JWT-based admin login (7-day token)
- Protected routes for all write operations

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /api/projects | — | List all projects |
| POST | /api/projects | Admin | Add project (multipart/form-data) |
| PUT | /api/projects/:id | Admin | Update project |
| DELETE | /api/projects/:id | Admin | Delete project |
| POST | /api/contact | — | Submit contact form |
| GET | /api/contact | Admin | View all messages |
| PATCH | /api/contact/:id/read | Admin | Mark message as read |
| DELETE | /api/contact/:id | Admin | Delete message |
| POST | /api/auth/login | — | Admin login |
| POST | /api/auth/seed | — | Create admin (run once) |
