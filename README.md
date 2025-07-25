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
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
```

### Frontend
```sh
cd mern-lms-frontend
npm install
npm run dev
```
Set API URL in `.env`:
```
VITE_API_URL=https://your-backend-url
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
- **Frontend:** [Vercel/Netlify URL]
- **Backend:** [Render/Railway/Heroku URL]

## Demo
- [Video link]
- ![Screenshot](screenshot.png)

![alt text](<Screenshot 2025-07-23 003525.png>)