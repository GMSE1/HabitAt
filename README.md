<<<<<<< HEAD
# HabitAt 🌱

A full-stack habit tracking application that helps users build and maintain consistent daily routines. Users can create an account, define personal habits, log daily completions, and track streaks over time.

---

## Features

- JWT-based user authentication (register, login, logout)
- Create, update, and delete personal habits
- Log daily habit completions
- Ownership protection — users can only access their own habits
- React frontend with protected routes and conditional rendering

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Python, Flask, SQLAlchemy, Flask-Migrate |
| Auth | Flask-JWT-Extended, Flask-Bcrypt |
| Frontend | React, React Router v6 |
| Database | SQLite |
| Other | Flask-CORS |

---

## Setup Instructions

### Prerequisites
- Python 3.8+
- Node.js 16+
- Pipenv

---

### Backend Setup
```bash
# From the root of the project
cd server
pipenv install
pipenv shell
export FLASK_APP=app.py
flask db upgrade
python app.py
```

The Flask server will run on `http://localhost:5555`

---

### Frontend Setup
```bash
# From the root of the project
cd client
npm install
npm start
```

The React app will run on `http://localhost:3000`

---

## API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | /auth/register | Register a new user |
| POST | /auth/login | Login and receive JWT token |
| GET | /auth/me | Get current logged-in user |

### Habits
| Method | Endpoint | Description |
|---|---|---|
| GET | /api/habits | Get all habits for current user |
| POST | /api/habits | Create a new habit |
| PATCH | /api/habits/:id | Update a habit |
| DELETE | /api/habits/:id | Delete a habit |

### Logs
| Method | Endpoint | Description |
|---|---|---|
| GET | /api/habits/:id/logs | Get all logs for a habit |
| POST | /api/habits/:id/logs | Log a habit completion for today |

---

## Project Structure
```
HabitAt/
├── server/
│   ├── app.py
│   ├── config.py
│   ├── models.py
│   ├── seed.py
│   └── routes/
│       ├── auth.py
│       ├── habits.py
│       └── logs.py
├── client/
│   └── src/
│       ├── App.js
│       └── components/
│           ├── Login.js
│           ├── Register.js
│           ├── Dashboard.js
│           ├── HabitForm.js
│           └── HabitCard.js
└── README.md
```

---

## Author

Greg — Flatiron School Software Engineering Capstone
=======
# HabitAt
A full-stack habit tracking application designed for anyone looking to build consistency in their daily routine — students, professionals, or anyone working toward self-improvement goals.
>>>>>>> 573af0c13d42a277028f087dbd78d9ce71c4f4d5
