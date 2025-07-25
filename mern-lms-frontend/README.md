# MERN LMS Frontend

This is the frontend for the MERN LMS project, built with React, Vite, and Tailwind CSS.

---

## Features

- Responsive UI for students and instructors
- Client-side routing with React Router
- Authentication and protected routes
- Connects to backend API for data
- Real-time updates with Socket.io-client
- Form validation and error handling
- Accessibility and cross-browser/device support

---

## Setup Instructions

1. **Clone the repository:**
   ```sh
   git clone <https://github.com/AlfonceMweu/mern-lms-frontend.git>
   cd mern-lms-frontend
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set API URL in `.env`:**
   ```
   VITE_API_URL=http://localhost:5000
   ```
  
4. **Run the development server:**
   ```sh
   npm run dev
   ```

---

## Testing

- **Unit tests:**  
  ```sh
  npm test
  ```
- **E2E tests (Cypress):**  
  ```sh
  npm run cypress
  ```

---

## Deployment

- Deploy to Vercel or Netlify.
- Set `VITE_API_URL` in your deployment environment variables.

---

## License

MIT
