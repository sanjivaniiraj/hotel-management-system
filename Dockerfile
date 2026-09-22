# ---------- Build React ----------
FROM node:20-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# ---------- Build Spring Boot ----------
FROM maven:3.9.9-eclipse-temurin-17 AS backend-build
WORKDIR /app
COPY backend/pom.xml backend/pom.xml
RUN mvn -f backend/pom.xml dependency:go-offline -B
COPY backend/ backend/
COPY --from=frontend-build /app/frontend/dist/ backend/src/main/resources/static/
RUN mvn -f backend/pom.xml clean package -DskipTests

# ---------- Runtime ----------
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=backend-build /app/backend/target/*.jar app.jar
EXPOSE 8080
ENV PORT=8080
ENTRYPOINT ["java", "-jar", "app.jar"]
