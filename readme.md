# Event Planner

A **MERN stack** application for managing events. Users can **add, edit, delete, and list events**, with each event containing a **title, description, date, and category**. The app also supports filtering events by category.

---

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Folder Structure](#folder-structure)
- [Installation](#installation)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [License](#license)

---

## Features

- Full **CRUD** functionality for events
- Filter events by **category** (e.g., Work, Personal)
- Validation:
  - `title` and `date` are required
  - `category` must be selected from a predefined set
- Responsive UI using **React**, **Vite**, **TypeScript**, and **Material-UI**
- RESTful API with **Node.js**, **Express**, and **MongoDB**

---

## Technologies

**Frontend:**

- React.js
- Vite
- TypeScript
- Material-UI
- Axios (for API calls)

**Backend:**

- Node.js
- Express.js
- MongoDB (via Mongoose)
- CORS
- Dotenv

---

## Folder Structure

### Backend

```

backend/
├─ src/
│  ├─ controllers/   # Route handlers
│  ├─ db/            # MongoDB connection
│  ├─ middleware/    # Validation & error handling
│  ├─ models/        # Mongoose models
│  ├─ router/        # Express routes
│  └─ utils/         # Utility functions
├─ app.js            # Express app setup
└─ index.js          # Server entry point

```

### Frontend

```

frontend/
├─ public/           # Static files
├─ src/
│  ├─ assets/        # Images, icons, etc.
│  ├─ components/    # React components
│  ├─ context/       # React context providers
│  ├─ mockdata/      # Mock data for development
│  ├─ pages/         # Application pages
│  ├─ routes/        # Route definitions
│  └─ types/         # TypeScript types
├─ app.tsx           # Main app component
├─ index.css         # Global styles
└─ main.tsx          # React entry point

````

---

## Installation

### Backend

1. Navigate to the backend folder:

```bash
cd backend
````

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the backend root:

```env
MONGODB_URL=mongodb://127.0.0.1:27017/event-planner
PORT=3000
CORS_ORIGIN=http://localhost:5173
```

4. Start the backend server:

```bash
npm run dev
```

The backend will run on `http://localhost:3000`.

---

### Frontend

1. Navigate to the frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the frontend root:

```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

4. Start the frontend server:

```bash
npm run dev
```

The frontend will run on `http://localhost:5173`.

---

## Usage

1. Open the frontend URL (`http://localhost:5173`)
2. Add a new event using the form (Title, Description, Date, Category)
3. View the list of events
4. Edit or delete events as needed
5. Filter events by category using the dropdown

---

## Environment Variables

### Backend `.env`

```env
MONGODB_URL=mongodb://127.0.0.1:27017/event-planner
PORT=3000
CORS_ORIGIN=http://localhost:5173
```

### Frontend `.env`

```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
```
