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

## Notes

This backend currently contains the foundation for authentication and database setup, including:

- user and refresh token schemas/models
- token generation utilities
- signup and email verification controller placeholders
- centralized error handling

The project is in an early backend-setup stage and is ready to be extended with routes, auth logic, and controller logic for the full JobTrack feature set.

## Current Status

- Server bootstraps successfully
- MongoDB connection logic is configured
- Express app is initialized and running
- Authentication-related scaffolding is in place
- Routes are still pending implementation
