# JobTrack Backend

This is the backend API for the JobTrack application. It is built with Node.js, Express, and MongoDB using Mongoose.

## Features

- Express server setup
- MongoDB connection via Mongoose
- JWT-ready authentication foundation
- Refresh token model and hashing utilities
- User schema with password hashing and validation
- Centralized error handling
- CORS and request logging middleware

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
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── refreshTokenModel.js
│   │   └── userModel.js
│   ├── schemas/
│   │   ├── refreshTokenSchema.js
│   │   └── userSchema.js
│   └── routes/
├── utils/
│   ├── AppError.js
│   └── tokenUtils.js
├── .env
├── .gitignore
├── package.json
├── README.md
└── package-lock.json
```

## Tech Stack

- Node.js
- Express
- MongoDB + Mongoose
- JWT
- bcryptjs
- dotenv
- cors
- morgan

## Environment Variables

Create a .env file in the root folder with the following values:

```env
PORT=5000
NODE_ENV=development
DATABASE_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=90d
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

## Authentication API

The authentication routes are available under `/api/v1/auth`:

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/signup` | Creates a user and sends a verification email. Returns `201` after email delivery. |
| GET | `/verify-email?token=<token>` | Verifies a user's email address. |
| POST | `/login` | Returns an access token for a verified user and sets a refresh-token cookie. |
| POST | `/refresh` | Rotates the refresh-token cookie and returns a new access token. |
| POST | `/logout` | Revokes the refresh token and clears its cookie. |

Signup request example:

```json
{
	"name": "Jane Doe",
	"email": "jane@example.com",
	"password": "your-password"
}
```

## Notes

This backend currently contains authentication and database setup, including:

- user and refresh token schemas/models
- token generation utilities
- signup and email verification flows
- centralized error handling

## Current Status

- Server bootstraps successfully
- MongoDB connection logic is configured
- Express app is initialized and running
- Authentication routes and controllers are implemented
