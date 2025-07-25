# MERN LMS

## Overview
A Learning Management System built with MongoDB, Express, React, and Node.js.

## Setup Instructions

### Backend
```sh
cd mern-lms-backend
npm install
npm run dev
```
Set environment variables in `.env`:
```
MONGO_URI=mongodb://localhost:27017/mern-blog
PORT=5000
JWT_SECRET=mySuperSecretKey123!@#
```

### Frontend
```sh
cd mern-lms-frontend
npm install
npm run dev
```
Set API URL in `.env`:
```
VITE_API_URL=https://vercel.com/alfonce-mweus-projects/mern-lms-backend/35yFapQKiDhPmAnthuuK3AR9Bud9
```

## API Documentation
- `POST /api/users/register` – Register a new user
- `POST /api/users/login` – Login
- `GET /api/courses` – List courses
- `GET /api/courses/:id` – Course details
- `PUT /api/courses/:id` – Update course (instructor/admin)

## User Guide
- Register and login as a student or instructor.
- Browse courses, view lessons, and track progress.
- Instructors can create and update courses.

## Technical Architecture
- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Express.js + MongoDB + Socket.io
- **Authentication:** JWT
- **Real-time:** Socket.io for course updates

## Deployment
- **Frontend:** https://vercel.com/alfonce-mweus-projects/mern-lms-frontend/GYdciXZSNsABV4jeBGqBk8Byb9zr
- **Backend:** https://vercel.com/alfonce-mweus-projects/mern-lms-backend/35yFapQKiDhPmAnthuuK3AR9Bud9

## Demo

![alt text](<Screenshot 2025-07-23 003525.png>)
