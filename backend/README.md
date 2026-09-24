# JobTrack Backend

The JobTrack backend is a Node.js API for authentication, job tracking, and resume management. It uses Express, MongoDB, and Mongoose, with JWT access tokens and HTTP-only refresh-token cookies.

## Features

- User signup, email verification, login, logout, and token refresh
- JWT-protected routes with refresh-token rotation and revocation
- MongoDB persistence through Mongoose models and schemas
- Job application support with company and resume references
- Authenticated resume uploads with PDF and DOCX support
- Static serving of uploaded resume files
- Centralized application error handling
- CORS, JSON parsing, cookies, and Morgan request logging

## Tech Stack

- Node.js and Express
- MongoDB and Mongoose
- JWT and bcryptjs
- Nodemailer
- Multer
- express-validator
- cookie-parser, CORS, Morgan, and dotenv

## Getting Started

### Prerequisites

- Node.js 18 or newer
- A MongoDB database
- SMTP credentials for email verification

### Installation

```bash
npm install
```

Create a `.env` file in the project root:

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

Start the API in development mode with:

```bash
npm run dev
```

Start it normally with:

```bash
npm start
```

The default port is `5000`. Uploaded files are served from `/uploads` and stored in `uploads/resumes`.

## API

All API routes are versioned under `/api/v1`. Protected routes require:

```http
Authorization: Bearer <access_token>
```

### Authentication

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/v1/auth/signup` | Registers a user and sends an email verification link. |
| GET | `/api/v1/auth/verify-email?token=<token>` | Verifies a user's email address. |
| POST | `/api/v1/auth/login` | Authenticates a verified user and sets a refresh-token cookie. |
| POST | `/api/v1/auth/refresh` | Rotates the refresh token and returns a new access token. |
| POST | `/api/v1/auth/logout` | Revokes the refresh token and clears the cookie. |
| GET | `/api/v1/auth/me` | Protected authentication check. |

### Resumes

Resume routes require authentication. Uploads use `multipart/form-data` with a file field named `resume` and an optional `name` field.

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/v1/resumes` | Uploads a PDF or DOCX resume. Maximum size: 5 MB. |
| PATCH | `/api/v1/resumes/:id/default` | Sets one of the user's resumes as the default. |

### Signup Example

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "your-password"
}
```

## Project Structure

```text
backend/
├── src/
│   ├── app.js                 # Express app and route registration
│   ├── server.js              # Database connection and server startup
│   ├── config/                # Database configuration
│   ├── controllers/           # Request handlers
│   ├── middleware/            # Auth, upload, validation, and errors
│   ├── models/                # Mongoose models
│   ├── routes/                # API route definitions
│   └── schemas/               # Mongoose schemas
├── uploads/resumes/           # Stored resume uploads
├── utils/                     # Errors, cookies, email, and tokens
├── package.json
├── package-lock.json
└── README.md
```

## Status

Authentication and the first resume-management endpoints are implemented. Job application, company, interview, activity, notification, and dashboard functionality remains under active development.
