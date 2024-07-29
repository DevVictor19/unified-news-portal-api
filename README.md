# Unified News Portal

## Description

An application designed to centralize the communication channel of a higher education institution.

## Motivation

Consider the following scenario: in a higher education institution, there are various courses and classes. Each course has a coordinator, and each class has teachers, leaders, vice-leaders, and students.

Each class uses WhatsApp groups as the main communication channel. These groups include the course coordinator, teachers, leaders, vice-leaders, and students.

Announcements from the coordination, institutional notices, potential strikes, internship opportunities, college events, etc., are all communicated through WhatsApp groups.

However, a major issue is that each class and period have their specific WhatsApp groups, which include only the members of that particular class.

This situation limits students from participating in projects and events of other classes within the institution simply because they are unaware of these events.

Another issue is the loss of job opportunities, as a student is limited to opportunities posted only in their communication channel.

In light of these problems, I conceived the idea of creating a <b>Unified News Portal</b> for the institution, aiming to integrate classes through a single communication channel.

## Objectives

- Provide a unified communication channel for the institution, allowing interaction between different courses and classes.
- Offer a more convenient alternative to using WhatsApp groups.

## Functional Requirements

### Authentication

- The system should allow users to create an account using an email and password.
- The system should validate the email for successful registration.
- The system should allow users to log in using a verified email and password.
- The system should allow password recovery via email after registration.

### Posts

- The system should require roles such as admin, coordinator, leader, vice-leader, or teacher to create a post in a category.
- The system should allow the creation of posts with text and photo or text and video.
- The system should allow users with permission to perform basic operations like creating, reading, deleting, and editing posts.
- The system should provide filtering categories to facilitate post viewing for students.
- The system should categorize posts, defining the type of post, area, course, class, and subject.
- The system should allow users to subscribe to specific categories.

### Communication

- The system should offer the user the option to enable communication methods: email and/or WhatsApp.
- The system should notify the user via email about a new post in the category if they have subscribed and enabled email communication.
- The system should notify the user via WhatsApp about a new post in the category if they have subscribed and enabled WhatsApp communication.

### Administration

- The system should have a reserved area for users with Admin roles.
- The system should allow the admin to view registered users.
- The system should allow the admin to create or remove users.
- The system should allow the admin to modify user roles.
- The system should allow admins to add, modify, and remove categories.
- The system should allow admins to add, modify, and remove posts.

## Non-Functional Requirements

- User data such as passwords and phone numbers should be stored encrypted to maintain user privacy.
- Authentication should use Cookies to protect the application from XSS attacks.
- The database should be NoSQL to support potential changes in data structure and improve filtering performance.
- The interface should be intuitive and easy to use.
- The interface should be responsive and adapt to desktops, tablets, and mobile phones.
- The application should have automated tests to ensure greater reliability in its operations and facilitate future maintenance.
- The application should use the clean architecture model to facilitate potential modifications in its scope and functionalities.

## Entity-Relationship Diagram (ERD)

<img src="./docs/images/DER.png" alt="diagrama entidade relacionamento" />

## Database Modeling (MongoDB)

<img src="./docs/images/relational-model.png" />

## Use Case Diagram

<img src="./docs/images/usecases-diagram.png" alt="diagrama de cassos de uso" />

## Running on Docker locally

### Prerequisites

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Creating the .env file

Create a file called `.env` in the root directory of the project and add the following environment variables:

```bash
# Database variables
DB_USER=admin
DB_PASSWORD=admin
DB_HOST=mongodb://admin:admin@mongo-pnu:27017/
DB_PORT=27017

# Server  variables
SERVER_PORT=3000
SERVER_URL=http://localhost:3000
SERVER_SECRET_KEY="secret key"

# Mail service variables
MAIL_NAME='Email Name'
MAIL_EMAIL=email@email.com
MAIL_PASSWORD=password
```

### Starting the application in development mode

Go to the project directory and run:

Linux / Mac:

```bash
docker compose -f docker-compose.dev.yaml up
```

Now you can access the application at http://localhost:3000/api and see the Swagger documentation.

You can use directly the endpoints on http://localhost:3000 or use the Swagger documentation to test them.

### Starting the application in production mode

Go to the project directory and run:

Linux / Mac:

```bash
docker compose -f docker-compose.prod.yaml up
```

Now you can access the application at http://localhost:3000 and use the endpoints.
