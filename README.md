# FastAPI MySQL Fullstack Application

This is an educational demo project showing how to build a fullstack application using FastAPI with MySQL database integration.

## Project Structure

```
fastapi-mysql-app/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py             # FastAPI application entry point
│   │   ├── database.py         # Database connection and session management
│   │   ├── models.py           # SQLAlchemy models (ORM)
│   │   ├── schemas.py          # Pydantic models for validation
│   │   ├── crud.py             # CRUD operations
│   │   └── api/
│   │       ├── __init__.py
│   │       └── endpoints/
│   │           ├── __init__.py
│   │           └── students.py  # API endpoints for students
│   ├── requirements.txt
│   └── .env                    # Environment variables
├── frontend/
│   ├── static/
│   │   ├── css/
│   │   │   └── styles.css
│   │   └── js/
│   │       └── app.js          # Frontend JavaScript for API interaction
│   └── templates/
│       ├── base.html           # Base template with common layout
│       └── index.html          # Main page template
└── README.md
```

## Features

- FastAPI backend with RESTful API endpoints
- SQLAlchemy ORM for database operations
- Pydantic models for data validation
- Frontend with HTML templates and JavaScript
- CRUD operations for student management
- Responsive design with CSS

## Setup Instructions

### 1. Database Setup

First, set up the MySQL database:

```bash
# Login to MySQL
mysql -u root -p

# Run the SQL script
# Copy and paste the content from sql-setup.sql or run:
mysql -u root -p < sql-setup.sql
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install requirements
pip install -r requirements.txt

# Configure environment variables
# Copy the example .env file and update with your MySQL credentials
cp .env.example .env
# Edit .env with your database credentials

# Run the application
uvicorn app.main:app --reload
```

### 3. ```.env``` file
Create new file name ```.env``` inside ```backend/```:
```bash

DB_USER=root
DB_PASSWORD=your_password
DB_HOST=your_ip
DB_PORT=your_port
DB_NAME=your_database_name
```

### 4. Accessing the Application

Once the application is running:

1. Open your web browser and navigate to: `http://localhost:8000`
2. You should see the Student Management System interface
3. The API documentation is available at: `http://localhost:8000/docs`

## Key Components Explained

### Backend

- **database.py**: Sets up the SQLAlchemy connection to MySQL
- **models.py**: Defines the database tables as SQLAlchemy models
- **schemas.py**: Defines Pydantic models for request/response validation
- **crud.py**: Contains database operation functions
- **main.py**: The FastAPI application entry point
- **students.py**: API endpoint routes for student management

### Frontend

- **base.html**: Base template with common layout elements
- **index.html**: Main page template with student management interface
- **styles.css**: Styling for the application
- **app.js**: JavaScript for interacting with the API endpoints

## API Endpoints

| Method | URL                  | Description           |
|--------|----------------------|-----------------------|
| GET    | /api/students        | List all students     |
| GET    | /api/students/{id}   | Get a single student  |
| POST   | /api/students        | Create a new student  |
| PUT    | /api/students/{id}   | Update a student      |
| DELETE | /api/students/{id}   | Delete a student      |

## Educational Value

This project demonstrates:

1. FastAPI application structure
2. SQLAlchemy ORM usage with MySQL
3. RESTful API design
4. Frontend-Backend integration
5. CRUD operations implementation
6. Form handling and validation
7. Responsive UI design

## Extending the Project

Some ideas for extending this project:

1. Add authentication and user management
2. Add pagination for the student list
3. Implement filtering and sorting
4. Add more student data fields
5. Create additional related entities (courses, grades, etc.)
6. Add file upload for student photos
7. Implement data visualization with charts