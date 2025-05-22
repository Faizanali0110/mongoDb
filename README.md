# Student Registration Application

A simple student registration application built with Next.js and MongoDB.

## Features

- User registration form with name and email fields
- MongoDB integration for data storage
- Responsive UI with modern design
- Form validation and error handling

## Setup Instructions

### Prerequisites

- Node.js (v14 or later)
- MongoDB connection string

### Environment Setup

Create a `.env.local` file in the root directory with the following content:

```
MONGODB_URI=your_mongodb_connection_string
```

Replace `your_mongodb_connection_string` with your actual MongoDB connection string.

### Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Deployment

This application is configured for deployment on Vercel. Simply push your code to a Git repository and import it into Vercel.

## API Endpoints

- `POST /api/add-user` - Adds a new user to the database
  - Request body: `{ "name": "string", "email": "string" }`
  - Response: `{ "message": "User added successfully!" }` (200) or error message (500)
