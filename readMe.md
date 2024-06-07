# Realtime Analytics API

## Technologies Used:

- Node.js
- Express.js
- RabbitMQ
- Docker
- MongoDB
- Socket.io

## Prequel to Start the Server:

1. The **Docker Engine** needs to be running.
2. **Docker Compose** CLI is required.
3. Execute `docker compose up` in the project directory's command line to start the servers.

## API Host:

> http://localhost:5000/api

## Endpoints:

### /auth

- **POST**
- For getting an authentication token. Required to access the endpoints **[/quiz-results, /quiz-results/analytics]**.
- **Request body fields:** `email`, `password`
- **Default Dev Admin User credential:**
  - `email: admin@gmail.com`
  - `password: Password@1`
- **Default Dev Normal Users credentials:**
  - `email: user_1@gmail.com` to `user_4@gmail.com`
  - `password: Password@1`

### /auth/me

- **GET**
- For retrieving the current user profile.

### /users

- **POST**
- For creating a new user.
- **Request body fields:** `name`, `email`, `password`, `role` [optional]
- **Request body example:**

  ```json
  {
    "name": "test",
    "email": "test@gmail.com",
    "password": "Password@1"
  }
  ```

### /quiz-results

- **POST, GET**
- Admin access is **required** for GET. Any authenticated users can access POST.
- **Request body fields for POST:** `quiz_id`, `score`
- **Header for GET and POST:** `Authorization: token`
- **Request body example for POST:**

  ```json
  {
    "quiz_id": "random_id",
    "score": 40
  }
  ```

### /quiz-results/analytics

- **GET**
- **Admin access required.**
- **Header:** `Authorization: token`

## Websocket Host:

> ws://localhost:5000

- Access Token required
- Only Admin user can connect to socket
- **Header:** `Authorization: token`

**Note**: For simplicity, I have included the `.env` files in the repo. In production, the environment variables will be added manually.
