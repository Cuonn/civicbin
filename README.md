# CivicBin — Waste Management Reporting System

CivicBin is a full-stack web application for reporting and managing 
public waste bin status. Residents can view nearby bins and report 
overflowing ones; Coordinators manage bin records and triage incoming 
reports.

## Setup

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account (or local MongoDB instance)

### Clone the repository
```bash
git clone https://github.com/Cuonn/civicbin.git
cd civicbin
```

### Configure environment variable
Create `backend/.env` (see `backend/.env.example`).
Create `frontend/.env` (see `frontend/.env.example`).

### Install all dependencies (root, backend, frontend)
```bash
npm run install-all
```

### Run the app
Run:
```bash
npm start
```

### Creating a Coordinator account
Registration always creates a "Resident" account (role is assigned 
server-side for security — it is never accepted from client input). 
To create a Coordinator account:
1. Register normally through the app
2. Open MongoDB Compass, connect to the database, open the `users` collection
3. Find the user by email and change the `role` field from "Resident" to "Coordinator"
4. Log out and log back in on the app

## Architecture Summary

- **Backend**: Node.js / Express, MongoDB Atlas via Mongoose, JWT authentication, bcrypt password hashing
- **Frontend**: React (Create React App), Tailwind CSS, React Router
- **Roles**: Resident (view bins, submit/track reports) and Coordinator (manage bins, triage reports) - enforced via `protect` and `requireRole` middleware
- **Data models**: `User` (with name, email, password, role), `Bin` (hinId, location, type, fill status, next collection date), `Report` (linked to bin and resident, overflow flag, notes, status)
- **Hosting**: AWS EC2 (Ubuntu)

## Known Limitations

- No photo upload for reports - retained in Figma design as the intended production feature, but excluded here since proper photo storage requires cloud integration beyond this scope. The optional "overflowing" flag and notes field provide sufficient severity signal for Coordinator triage in the meantime.
- No automated test suite - verified manually throughout development.
- Coordinator accounts are provisioned manually via MongoDB Compass; there is no public Coordinator self-registration.

### Deployment URL
http://13.236.86.194:3000