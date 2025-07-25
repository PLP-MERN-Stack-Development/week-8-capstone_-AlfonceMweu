# MERN LMS

A full-stack Learning Management System built with MongoDB, Express, React, and Node.js.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technical Architecture](#technical-architecture)
- [Setup Instructions](#setup-instructions)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [API Documentation](#api-documentation)
- [User Guide](#user-guide)
- [Testing and Quality Assurance](#testing-and-quality-assurance)
- [Deployment](#deployment)
- [Future Improvements](#future-improvements)
- [Demo](#demo)
- [License](#license)

---

## Overview

MERN LMS is a modern platform for managing courses, lessons, and user progress. It supports real-time updates, authentication, and a responsive UI for both students and instructors.

---

## Features

- User registration and authentication (JWT)
- Role-based access (student, instructor, admin)
- Create, update, and view courses and lessons
- Progress tracking for students
- Real-time course updates with Socket.io
- Responsive UI with React, Vite, and Tailwind CSS
- RESTful API with Express.js and MongoDB
- Comprehensive testing (unit, integration, E2E)
- Accessibility and cross-browser/device support

---

## Technical Architecture

- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Express.js + MongoDB + Socket.io
- **Authentication:** JWT
- **Real-time:** Socket.io for course updates
- **Testing:** Jest, Supertest, Cypress

---

## Setup Instructions

### Backend

```sh
cd mern-lms-backend
npm install
npm run dev
```

Set environment variables in `.env`:
```
MONGO_URI=your_mongodb_uri
PORT=5000
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

---

## API Documentation

- `POST /api/users/register` – Register a new user
- `POST /api/users/login` – Login
- `GET /api/courses` – List all courses
- `GET /api/courses/:id` – Get course details
- `POST /api/courses` – Create a course (instructor/admin)
- `PUT /api/courses/:id` – Update a course (instructor/admin)
- `DELETE /api/courses/:id` – Delete a course (admin)

---

## User Guide

- **Register:** Create an account as a student or instructor.
- **Login:** Access your dashboard.
- **Browse Courses:** View available courses and their lessons.
- **Track Progress:** Mark lessons as completed and view your progress.
- **Instructors:** Create and update courses and lessons in real time.

---

## Testing and Quality Assurance

- **Unit Tests:** Jest for backend and frontend components.
- **Integration Tests:** Supertest for API endpoints.
- **E2E Tests:** Cypress for user flows (register, login, view courses).
- **Manual Testing:** Performed on Chrome, Firefox, Edge, Safari, and mobile devices.
- **Accessibility:** Checked with Lighthouse and axe DevTools.
- **CI/CD:** Automated tests run on GitHub Actions.

---

## Deployment

- **Frontend:** [Live Frontend](https://vercel.com/alfonce-mweus-projects/mern-lms-frontend/GYdciXZSNsABV4jeBGqBk8Byb9zr)
- **Backend:** [Live Backend](https://vercel.com/alfonce-mweus-projects/mern-lms-backend/35yFapQKiDhPmAnthuuK3AR9Bud9)

---

## Future Improvements

- Add quizzes and assignments
- Role-based dashboards
- Enhanced mobile experience
- More granular progress tracking
- Improved accessibility

---

## Demo

![Screenshot](Screenshot%202025-07-23%20003525.png)

---

## License

MIT
