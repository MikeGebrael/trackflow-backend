# Project Overview

TrackFlow is a web application designed to optimize resource allocation and operational efficiency for mid-sized businesses. The platform enables businesses to manage employees, track service requests, and monitor tasks with role-based access control, automated notifications, analytics, and reporting.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)

## Features

- **Employee CRUD Operations**: Create, update, delete, and view employees.
- **Task Assignment**: Assign tasks to employees and track their completion.
- **Service Request Management**: Create and manage service requests, with priority and status tracking.
- **Authentication & Authorization**: JWT-based authentication and role-based access control for secure access. (Work In Progress)
- **Notification System**: Automated notifications for updates on tasks and service requests. (Work In Progress)
- **Analytics & Reporting**: Track service requests, tasks, and employee performance for better decision-making. (Work In Progress)

## Tech Stack

- **Backend**: NestJS, TypeScript, MongoDB
- **Frontend**: React.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)
- **ORM**: Mongoose

## Installation

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16.x or above)
- [MongoDB](https://www.mongodb.com/) running locally or remotely (via a service like MongoDB Atlas)

### Steps to Install

1. Clone the repository:
    ```bash
    git clone <https://github.com/Mike846/trackflow-backend.git>
    cd trackflow
    npm install
    ```

2. Start the Application:
    ```bash
    nest start
    ```

## API Endpoints

### Authentication

- **POST /employees/login**: Log in an employee (returns employee details)
  - Request Body: `{ "username": "string", "password": "string" }`

### Employees

- **GET /employees**: Retrieve a list of all employees
- **POST /employees/create**: Create a new employee
- **GET /employees/:id**: Retrieve employee details by ID
- **PUT /employees/:id**: Update employee details
- **DELETE /employees/:id**: Delete an employee

### Tasks

- **GET /tasks**: Retrieve all tasks
- **POST /tasks/create**: Create a new task
- **GET /tasks/:id**: Retrieve task details by ID
- **PUT /tasks/:id**: Update task details
- **DELETE /tasks/:id**: Delete a task
- **GET /tasks/employee/:employeeId**: Retrieve tasks assigned to a specific employee

### Notifications

- **GET /notifications**: Retrieve all notifications
- **POST /notifications/create**: Create a new notification
- **GET /notifications/:id**: Retrieve notification details by ID
- **PUT /notifications/:id**: Update notification details
- **DELETE /notifications/:id**: Delete a notification

## Database Schema

### Employee

The `Employee` schema stores employee details:

- `username`: Employee username
- `password`: Employee password
- `firstName`: First name of the employee
- `lastName`: Last name of the employee
- `email`: Employee email
- `role`: Role of the employee (Manager, Employee, Admin)
- `skills`: Array of employee skills
- `tasks`: Array of assigned tasks (references Task collection)

### Task

The `Task` schema represents a task assigned to an employee:

- `title`: Task title
- `description`: Task description
- `status`: Current status of the task (Pending, In Progress, Completed)
- `deadline`: Task deadline
- `assignedTo`: Employee assigned to the task (references Employee collection)
- `service`: Associated service (optional, references Service collection)
- `cost`: Cost associated with the task (default: 0)
- `time`: Time taken for the task (default: 0)
- `notifications`: Array of related notifications (references Notification collection)

### Notification

The `Notification` schema handles notifications for tasks and service requests:

- `message`: The notification message
- `recipient`: Employee to receive the notification (references Employee collection)
- `read`: Boolean indicating whether the notification has been read (default: false)
- `type`: Type of notification (e.g., task update, service request status change)
- `date`: Date the notification was created
