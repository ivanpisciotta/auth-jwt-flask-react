# JWT Authentication — Flask + React

A complete authentication flow: sign up, log in and a private page that only users with a valid token can see.

Built as part of the 4Geeks Academy Full Stack Developer program (2026).

## Stack

React (Vite) · Flask · SQLAlchemy · PostgreSQL · Flask-JWT-Extended

## How it works

**Backend**
- `POST /api/signup`: creates the user and hashes the password before saving it
- `POST /api/login`: checks the credentials and returns a JWT
- `GET /api/private`: protected with `@jwt_required()`
- Login returns the same error for an unknown email and a wrong password, so nobody can use it to find out which emails are registered

**Frontend**
- `Signup`, `Login` and `Private` pages
- All API calls go through one service (`authService.js`)
- Login and logout are handled in a single global store
- The private page checks the token with the backend each time it loads, instead of only looking for it in localStorage, and sends you back to `/login` if the check fails

## Run locally

Requirements: Python 3, Pipenv, Node.js, PostgreSQL.

```bash
# Backend
pipenv install
cp .env.example .env      # set DATABASE_URL and JWT_SECRET_KEY
pipenv run upgrade
pipenv run start

# Frontend (in another terminal)
npm install
npm run start
```
