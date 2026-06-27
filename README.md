# CampusSync

CampusSync is a role-based Smart Campus Management System developed to simplify academic administration and student interactions through a modern and responsive web application.

## Features

### Authentication

* Secure Login and Logout
* Role-Based Access Control (Admin & Student)
* JWT Authentication
* Password Encryption using bcryptjs

### Admin Dashboard

* Manage Students
* Create and Update Timetable
* Manage Attendance Records
* Upload Assignments (PDF)
* Upload Study Notes
* Publish Notices
* Edit Profile Information

### Student Dashboard

* View Timetable
* Track Attendance Percentage
* Download Assignments
* Access Study Notes
* Read Notices
* Manage Profile

### Additional Features

* Responsive Mobile Sidebar
* Search Functionality
* PDF Upload and Download
* Attendance Analytics
* Professional UI Design

## Tech Stack

### Frontend

* Next.js
* React.js
* Tailwind CSS
* Axios
* Lucide React
* Chart.js

### Backend

* Node.js
* Express.js
* JWT
* bcryptjs
* Multer

### Database

* MySQL

### Deployment

* Frontend: Vercel
* Backend: Railway
* Database: Railway MySQL

## Project Structure

```text
CampusSync
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── routes
│   ├── uploads
│   └── package.json
│
├── frontend
│   ├── app
│   ├── components
│   ├── public
│   └── package.json
│
└── README.md
```

## Installation

Clone the repository

```bash
git clone https://github.com/himakshi0510/CampusSync.git
```

Install dependencies

```bash
cd frontend
npm install

cd ../backend
npm install
```

Run Frontend

```bash
cd frontend
npm run dev
```

Run Backend

```bash
cd backend
npm start
```

## Author

Himakshi Bansal


