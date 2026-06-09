# Backend Survey SaaS Platform

A production-ready Survey SaaS Backend built with Node.js, Express.js, TypeScript, and MongoDB. The platform enables organizations to create dynamic surveys, collect responses, analyze results, and manage users through a secure Role-Based Access Control (RBAC) system.

---

## Features

### Authentication & Authorization

* JWT Authentication (Access & Refresh Tokens)
* Email Verification
* Forgot Password
* Reset Password
* Secure Password Hashing (bcrypt)
* Protected Routes

### User Management

* User Registration
* User Login
* User Profile
* User Role Assignment

### RBAC (Role-Based Access Control)

* Roles Management
* Permissions Management
* Role Assignment
* Permission Middleware
* Role Middleware

### Audit Logging

* Track system activities
* User action history
* Resource change tracking

### Survey Engine

* Create Surveys
* Update Surveys
* Delete Surveys
* Publish Surveys
* Survey Settings

### Sections

* Create Survey Sections
* Reorder Sections
* Update Sections
* Delete Sections

### Questions

* Text Questions
* Textarea Questions
* Radio Questions
* Checkbox Questions
* Dropdown Questions
* Number Questions

### Rules Engine

* Conditional Logic
* Show/Hide Questions
* Require Questions
* Dynamic Survey Flow

### Responses

* Survey Submission
* Store Answers
* Anonymous Responses
* Authenticated Responses

### Analytics

* Dashboard Analytics
* Survey Analytics
* Response Statistics
* Response Trends
* Popular Survey Tracking

---

## Tech Stack

### Backend

* Node.js
* Express.js
* TypeScript

### Database

* MongoDB
* Mongoose

### Authentication

* JWT
* bcrypt

### Email

* Nodemailer

### Logging

* Morgan
* Custom Logger

### Architecture

* Controller-Service-Repository Pattern
* DTO Validation
* Modular Architecture
* Middleware-Based Security

---

## Project Structure

```text
src

├── config
├── shared

├── modules
│
├── auth
├── users
├── roles
├── permissions
├── audit-logs
│
├── surveys
├── sections
├── questions
├── rules
├── responses
├── analytics
│
└── scripts
```

---

## API Modules

### Auth

```http
POST   /api/v1/auth/register
GET    /api/v1/auth/verify-email
POST   /api/v1/auth/login
POST   /api/v1/auth/refresh-token
POST   /api/v1/auth/forgot-password
POST   /api/v1/auth/reset-password
POST   /api/v1/auth/logout
```

### Users

```http
GET    /api/v1/users
GET    /api/v1/users/me
GET    /api/v1/users/:id
PUT    /api/v1/users/:id/roles
```

### Roles

```http
GET    /api/v1/roles
GET    /api/v1/roles/:id
POST   /api/v1/roles
PUT    /api/v1/roles/:id
DELETE /api/v1/roles/:id
```

### Permissions

```http
GET    /api/v1/permissions
GET    /api/v1/permissions/:id
POST   /api/v1/permissions
PUT    /api/v1/permissions/:id
DELETE /api/v1/permissions/:id
```

### Surveys

```http
GET    /api/v1/surveys
GET    /api/v1/surveys/:id
GET    /api/v1/surveys/:id/details
POST   /api/v1/surveys
PUT    /api/v1/surveys/:id
DELETE /api/v1/surveys/:id
```

### Sections

```http
GET    /api/v1/sections/survey/:surveyId
GET    /api/v1/sections/:id
POST   /api/v1/sections
PUT    /api/v1/sections/:id
DELETE /api/v1/sections/:id
```

### Questions

```http
GET    /api/v1/questions/section/:sectionId
GET    /api/v1/questions/:id
POST   /api/v1/questions
PUT    /api/v1/questions/:id
DELETE /api/v1/questions/:id
```

### Rules

```http
GET    /api/v1/rules
GET    /api/v1/rules/survey/:surveyId
GET    /api/v1/rules/:id
POST   /api/v1/rules
PUT    /api/v1/rules/:id
DELETE /api/v1/rules/:id
```

### Responses

```http
GET    /api/v1/responses
GET    /api/v1/responses/:id
GET    /api/v1/responses/survey/:surveyId
POST   /api/v1/responses
DELETE /api/v1/responses/:id
```

### Analytics

```http
GET    /api/v1/analytics/dashboard
GET    /api/v1/analytics/survey/:surveyId
```

---

## Environment Variables

```env
NODE_ENV=development
PORT=4000

MONGO_URI=mongodb://localhost:27017/backend_saas

JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret

JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

CLIENT_URL=http://localhost:8080
```

---

## Installation

```bash
git clone https://github.com/your-username/backend-survey-saas-platform.git

cd backend-survey-saas-platform

npm install
```

---

## Run Development Server

```bash
npm run dev
```

---

## Build

```bash
npm run build
```

---

## Future Enhancements

* Subscription Management
* Payment Integration (Stripe/Razorpay)
* CSV Export
* Excel Export
* PDF Export
* Email Campaigns
* Webhooks
* Survey Templates
* Team Management
* Multi-Tenant Architecture

---

## Author

Yasowant Nayak

Software Developer | Full Stack Engineer

Bangalore, India
