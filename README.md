# Smart Student Hub (MVP)

A centralized platform for HEIs to catalog, validate, and showcase student achievements.

## Tech Stack
- Frontend: Next.js (React)
- Backend: Express.js (Node)
- Database: MongoDB (Mongoose)
- Auth: JWT
- File Uploads: Multer (local, can be swapped with S3 later)
- PDF: pdfkit (simple placeholder generation)

## Monorepo Structure
```
StudentHub/
  backend/
    src/
      config/
      models/
      middleware/
      routes/
    package.json
    .env.example
  frontend/
    public/
    src/
      pages/
      components/
      lib/
    package.json
    .env.local.example
```

## Quick Start

1) Prereqs
- Node 18+
- MongoDB connection string

2) Backend Setup
```
cd backend
cp .env.example .env   # fill values
npm install
npm run dev
```

3) Frontend Setup
```
cd frontend
cp .env.local.example .env.local  # fill values
npm install
npm run dev
```

## .env Configuration
Backend `.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/studenthub
JWT_SECRET=supersecretchange
CLIENT_URL=http://localhost:3000
BASE_URL=http://localhost:5000
```

Frontend `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Default Roles
- student
- faculty
- admin

## API Overview
- Auth: `/api/auth/register`, `/api/auth/login`, `/api/auth/me`
- Activities (student): `/api/activities` (GET/POST), `/api/activities/:id` (PATCH/DELETE)
- Approvals (faculty/admin): `/api/approvals/pending` (GET), `/api/approvals/:id/approve` (POST), `/api/approvals/:id/reject` (POST)
- Portfolio: `/api/portfolio/:userId` (GET JSON), `/api/portfolio/:userId/pdf` (GET PDF), `/api/portfolio/:userId/public` (GET public minimal JSON)
- Reports (admin): `/api/reports/summary`, `/api/reports/activities.csv`

## Notes
- This is an MVP. File storage is local and unsecured for production use; swap to S3 or other object storage with signed URLs for production.
- Add proper rate limiting, input validation (e.g., zod/joi), and production logging for a real deployment.
- For deployment, containerize backend and frontend separately or use a single reverse proxy.
