# MERN LMS Backend

This is the backend API for the MERN LMS project, built with Express.js, MongoDB, and Socket.io.

---

## Features

- RESTful API for courses, lessons, and users
- JWT authentication and role-based access
- Real-time updates with Socket.io
- Middleware for logging, validation, and security
- Comprehensive unit and integration tests (Jest, Supertest)

---

## Setup Instructions

1. **Clone the repository:**
   ```sh
   git clone <https://github.com/AlfonceMweu/mern-lms-backend.git>
   cd mern-lms-backend
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set environment variables in `.env`:**
   ```
  MONGO_URI=mongodb://localhost:27017/mern-blog
PORT=5000
JWT_SECRET=mySuperSecretKey123!@#
   ```

4. **Run the server:**
   ```sh
   npm run dev
   ```

---

## API Endpoints

- `POST /api/users/register` – Register a new user
- `POST /api/users/login` – Login
- `GET /api/courses` – List all courses
- `GET /api/courses/:id` – Get course details
- `POST /api/courses` – Create a course (instructor/admin)
- `PUT /api/courses/:id` – Update a course (instructor/admin)
- `DELETE /api/courses/:id` – Delete a course (admin)

---

## Testing

- **Run all tests:**
  ```sh
  npm test
  ```

---

## Deployment

- Deploy to Render, Railway, Heroku, or similar.
- Set environment variables in your deployment dashboard.

---

## License

MIT