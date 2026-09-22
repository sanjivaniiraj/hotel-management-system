# Hotel Management System — Railway Ready

Full-stack Hotel Management System with:

- React frontend
- Java 17 + Spring Boot backend
- MySQL database
- JWT authentication
- USER and ADMIN roles
- Room search/filter
- Room booking and cancellation
- Booking history
- Admin dashboard
- Room CRUD
- User/booking statistics
- Single Railway application deployment

## Architecture

Railway
├── MySQL service
└── Hotel app service
    ├── Spring Boot API
    └── React frontend (served by Spring Boot)

The React build is packaged into the Spring Boot JAR, so you only need one application service.

## Deploy to Railway

### 1. Push this project to GitHub

Upload the contents of this project to a GitHub repository.

### 2. Create a Railway project

In Railway:

1. Create a new project.
2. Add a MySQL database service.
3. Add this GitHub repository as the application service.
4. Railway will detect the root `Dockerfile`.

### 3. Connect MySQL

In the application service, add/reference these variables:

DB_URL = jdbc:mysql://${MYSQLHOST}:${MYSQLPORT}/${MYSQLDATABASE}?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
DB_USERNAME = ${MYSQLUSER}
DB_PASSWORD = ${MYSQLPASSWORD}

If Railway's MySQL service exposes these variables automatically, you can reference them directly in the app service variables.

Also set:

JWT_SECRET = a-long-random-secret-at-least-32-characters
CORS_ORIGINS = *

The application uses the Railway `PORT` automatically.

### 4. Deploy

Deploy the application service. The Docker build will:

1. Install frontend dependencies.
2. Build the React app.
3. Copy the React `dist` into Spring Boot static resources.
4. Build the Spring Boot JAR.
5. Run the JAR.

After deployment, open the generated Railway public domain.

## Admin login

Demo admin:

Email: admin@hotel.com
Password: Admin@123

Change the admin credentials before using this in a real/production environment.

## Local development

Backend:

```bash
cd backend
mvn spring-boot:run
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

For local development, the frontend can use `VITE_API_URL=http://localhost:8080/api`.

## Important

For production, replace the development JWT secret and demo admin password with secure values.
