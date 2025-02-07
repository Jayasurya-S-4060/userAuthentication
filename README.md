# User Authentication and Authorization with JWT

## Overview
This project implements user authentication and authorization using JWT in a Node.js application with Express.js and MongoDB.

## Endpoints & How to Test

### 1. User Registration
- **Method:** POST  
- **URL:** /api/register  
- **Body (JSON):**  
  {
    "userName": "testuser",
    "email": "test@example.com",
    "password": "testpassword"
  }
- **Response:**  
  {
    "message": "User successfully registered",
    "user": { "userName": "testuser", "email": "test@example.com" }
  }

### 2. User Login (Get JWT Token)
- **Method:** POST  
- **URL:** /api/login  
- **Body (JSON):**  
  {
    "email": "test@example.com",
    "password": "testpassword"
  }
- **Response:**  
  {
    "message": "User successfully logged in",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }

### 3. Get User Data (Protected Route - Requires JWT)
- **Method:** GET  
- **URL:** /api/user  
- **Headers:**  
  Authorization: Bearer <paste_token_here>
- **Response (If valid token):**  
  {
    "user": {
      "id": "64abcd1234ef56789",
      "userName": "testuser",
      "email": "test@example.com"
    }
  }
- **Response (If invalid/missing token):**  
  {
    "message": "Unauthorized: Invalid token"
  }

## Testing in Postman
1. **Register a user** (POST /api/register).  
2. **Login to get JWT token** (POST /api/login).  
3. **Copy the token** from the response.  
4. **Test the protected route** (GET /api/user) by adding the token in the `Authorization` header as `Bearer <token>`.
