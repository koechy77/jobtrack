# JobTrack Backend

This is the backend API for the JobTrack application. It is built with Node.js, Express, and MongoDB using Mongoose, and it currently focuses on user authentication, email verification, and token-based session management.

## Features

- Express server setup with JSON parsing, CORS, cookie support, and request logging
- MongoDB connection via Mongoose
- User signup, login, logout, and token refresh flow
- Email verification for newly registered users
- JWT access-token protection for authenticated routes
- Secure refresh-token cookies with revocation support
- Centralized error handling and application-level validation
- Domain models for users, companies, and job applications

## Tech Stack

- Node.js
- Express
- MongoDB + Mongoose
- JWT
- bcryptjs
- Nodemailer
- cookie-parser
- CORS
- Morgan
- dotenv

## Project Structure

```text
backend/
├── src/
│   ├── app.js
│   ├── server.js
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── authController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── applicationModel.js
│   │   ├── companyModel.js
│   │   ├── refreshTokenModel.js
│   │   └── userModel.js
│   ├── routes/
│   │   └── authRoutes.js
│   └── schemas/
│       ├── applicationSchema.js
│       ├── companySchema.js
│       ├── refreshTokenSchema.js
│       └── userSchema.js
├── utils/
│   ├── AppError.js
│   ├── cookieUtils.js
│   ├── email.js
│   └── tokenUtils.js
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── .env.example (if used in your local setup)
```

## Environment Variables

Create a `.env` file in the project root with the following values:

```env
PORT=5000
NODE_ENV=development
DATABASE_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1h
EMAIL_HOST=your_smtp_host
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your_smtp_username
EMAIL_PASSWORD=your_smtp_password
EMAIL_FROM=your_from_email
```

## Installation

```bash
npm install
```

## Run the Server

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

## API Overview

The app exposes the authentication service under `/api/v1/auth`.

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/v1/auth/signup` | Registers a new user and sends an email verification link. |
| GET | `/api/v1/auth/verify-email?token=<token>` | Verifies a user's email using the token from the email link. |
| POST | `/api/v1/auth/login` | Authenticates a verified user and returns an access token. Also sets the refresh-token cookie. |
| POST | `/api/v1/auth/refresh` | Validates the refresh-token cookie and rotates it to issue a new access token. |
| POST | `/api/v1/auth/logout` | Revokes the refresh token and clears the cookie. |
| GET | `/api/v1/auth/me` | Protected route that returns the authenticated user's profile access confirmation. |

### Signup Request Example

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "your-password"
}
```

### Example Auth Header for Protected Routes

```http
Authorization: Bearer <access_token>
```

## Current Status

The backend is currently in the authentication and account-management phase. It includes:

- user model and schema with encrypted password handling
- email verification flow
- JWT-based access tokens and refresh-token rotation
- protected-route middleware
- backend models for companies and job applications

## Notes

This project is still evolving toward full job-tracking functionality. The next phase is expected to include CRUD APIs for job applications, company management, and user dashboard features.
