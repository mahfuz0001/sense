# Anti-Tutorial Hell API Documentation

## Overview
The Anti-Tutorial Hell API provides endpoints for managing coding challenges, user progress, and learning paths. All API endpoints follow RESTful conventions and return JSON responses.

## Base URL
- Development: `http://localhost:3000/api`
- Production: `https://yourdomain.com/api`

## Authentication
Most endpoints require authentication using Supabase JWT tokens. Include the token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

## Rate Limiting
API endpoints are rate-limited to prevent abuse:
- General endpoints: 100 requests per minute
- Authentication endpoints: 5 requests per 15 minutes
- Admin endpoints: 10 requests per minute

## Error Handling
All errors follow a consistent format:
```json
{
  "error": {
    "message": "Error description",
    "code": "ERROR_CODE",
    "statusCode": 400,
    "details": {}
  }
}
```

## Endpoints

### Health Check
Check the health status of the application and its dependencies.

**GET /api/health**

Query Parameters:
- `detailed` (boolean): Include detailed health information
- `services` (string): Comma-separated list of services to check

Response:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "version": "1.0.0",
  "environment": "production",
  "uptime": 12345,
  "checks": [
    {
      "service": "database",
      "status": "healthy",
      "responseTime": 15
    }
  ],
  "summary": {
    "total": 4,
    "healthy": 4,
    "unhealthy": 0,
    "degraded": 0
  }
}
```

### Authentication

#### Sign In
Authenticate a user with email and password.

**POST /api/auth**
```json
{
  "action": "signin",
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "success": true,
  "message": "Authentication successful",
  "user": {
    "id": "user-uuid",
    "email": "user@example.com",
    "role": "user"
  },
  "session": {
    "access_token": "jwt-token",
    "refresh_token": "refresh-token",
    "expires_at": 1234567890
  }
}
```

#### Sign Up
Register a new user account.

**POST /api/auth**
```json
{
  "action": "signup",
  "email": "user@example.com",
  "password": "password123",
  "confirmPassword": "password123",
  "metadata": {
    "name": "John Doe"
  }
}
```

#### Sign Out
End the current user session.

**POST /api/auth**
```json
{
  "action": "signout"
}
```

#### Reset Password
Request a password reset link.

**POST /api/auth**
```json
{
  "action": "reset-password",
  "email": "user@example.com"
}
```

### Challenges

#### List Challenges
Retrieve a paginated list of coding challenges.

**GET /api/challenges**

Query Parameters:
- `category` (string): Filter by challenge category
- `difficulty` (string): Filter by difficulty (beginner, intermediate, advanced)
- `page` (number): Page number for pagination (default: 1)
- `limit` (number): Number of items per page (default: 20, max: 100)
- `search` (string): Search term for title/description

Response:
```json
{
  "challenges": [
    {
      "id": "challenge-uuid",
      "title": "Build a Responsive Grid",
      "description": "Create a responsive CSS grid layout",
      "difficulty": "beginner",
      "category": "CSS",
      "hints": 3,
      "created_at": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5,
    "hasNext": true,
    "hasPrev": false
  },
  "filters": {
    "category": "CSS",
    "difficulty": "beginner"
  },
  "meta": {
    "totalChallenges": 100,
    "categories": ["CSS", "JavaScript", "React"],
    "difficulties": ["beginner", "intermediate", "advanced"]
  }
}
```

For complete API documentation, see the full API.md file in the docs directory.