# ============================================
# BUILD REACT FRONTEND
# ============================================
FROM node:20-alpine AS frontend-build

WORKDIR /app/frontend

# Copy package.json only
COPY frontend/package.json ./

# Install dependencies
# IMPORTANT: Do NOT use npm ci because there is no package-lock.json
RUN npm install --no-audit --no-fund --package-lock=false

# Copy all frontend files
COPY frontend/ ./

# Create production React build
RUN npm run build


# ============================================
# BUILD SPRING BOOT BACKEND
# ============================================
FROM maven:3.9.9-eclipse-temurin-17 AS backend-build

WORKDIR /app

# Copy Maven configuration
COPY backend/pom.xml ./backend/pom.xml

# Download Maven dependencies
RUN mvn -f backend/pom.xml dependency:go-offline -B

# Copy backend source code
COPY backend/ ./backend/

# Copy React build into Spring Boot static resources
COPY --from=frontend-build /app/frontend/dist/ ./backend/src/main/resources/static/

# Build Spring Boot JAR
RUN mvn -f backend/pom.xml clean package -DskipTests


# ============================================
# PRODUCTION RUNTIME
# ============================================
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Copy Spring Boot JAR
COPY --from=backend-build /app/backend/target/*.jar app.jar

# Railway provides the PORT environment variable
EXPOSE 8080

ENV PORT=8080

# Start Spring Boot
ENTRYPOINT ["java", "-jar", "app.jar"]
