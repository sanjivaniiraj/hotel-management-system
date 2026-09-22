# ==========================================
# 1. BUILD REACT FRONTEND
# ==========================================
FROM node:20-alpine AS frontend-build

WORKDIR /app/frontend

# Copy package files
COPY frontend/package.json ./

# Install dependencies WITHOUT npm ci
RUN npm install --no-audit --no-fund --package-lock=false

# Copy frontend source
COPY frontend/ ./

# Build React
RUN npm run build


# ==========================================
# 2. BUILD SPRING BOOT BACKEND
# ==========================================
FROM maven:3.9.9-eclipse-temurin-17 AS backend-build

WORKDIR /app

# Copy Maven configuration
COPY backend/pom.xml ./backend/pom.xml

# Download Maven dependencies
RUN mvn -f backend/pom.xml dependency:go-offline -B

# Copy backend source
COPY backend/ ./backend/

# Copy React production build into Spring Boot static folder
COPY --from=frontend-build /app/frontend/dist/ ./backend/src/main/resources/static/

# Build Spring Boot application
RUN mvn -f backend/pom.xml clean package -DskipTests


# ==========================================
# 3. RUN APPLICATION
# ==========================================
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Copy generated Spring Boot JAR
COPY --from=backend-build /app/backend/target/*.jar app.jar

# Railway provides PORT automatically
EXPOSE 8080

ENV PORT=8080

# Start Spring Boot
ENTRYPOINT ["java", "-jar", "app.jar"]
