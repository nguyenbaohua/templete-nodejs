# Vehicles API Documentation

## Overview
API để quản lý vehicles (trucks) với authentication và filtering theo company_id và location_id.

## Base URL
```
http://localhost:3000/api
```

## Authentication
Tất cả endpoints đều yêu cầu JWT token trong header:
```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### 1. POST /api/vehicles
Lấy danh sách vehicles theo company_id và location_id.

**Request Body:**
```json
{
  "company_id": "1",
  "locaion_id": "1"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Vehicles retrieved successfully",
  "data": {
    "vehicles": [
      {
        "id": 1,
        "doorId": "0001",
        "palete": "palate 1",
        "location": "location 1",
        "info": "info 1",
        "company_id": 1,
        "locaion_id": 1
      }
    ],
    "total": 11,
    "filters": {
      "company_id": 1,
      "locaion_id": 1
    }
  }
}
```

### 2. GET /api/vehicles/all
Lấy tất cả vehicles (cho admin).

**Response:**
```json
{
  "success": true,
  "message": "All vehicles retrieved successfully",
  "data": {
    "vehicles": [...],
    "total": 12
  }
}
```

### 3. GET /api/vehicles/:id
Lấy vehicle theo ID.

**Response:**
```json
{
  "success": true,
  "message": "Vehicle retrieved successfully",
  "data": {
    "vehicle": {
      "id": 1,
      "doorId": "0001",
      "palete": "palate 1",
      "location": "location 1",
      "info": "info 1",
      "company_id": 1,
      "locaion_id": 1
    }
  }
}
```

## Error Responses

### Missing Fields (400)
```json
{
  "success": false,
  "message": "company_id and locaion_id are required"
}
```

### Invalid Numbers (400)
```json
{
  "success": false,
  "message": "company_id and locaion_id must be valid numbers"
}
```

### Vehicle Not Found (404)
```json
{
  "success": false,
  "message": "Vehicle not found"
}
```

### Unauthorized (401)
```json
{
  "success": false,
  "message": "Access token required"
}
```

## Testing Examples

### 1. Login để lấy token
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@example.com", "password": "admin123"}'
```

### 2. Lấy vehicles với company_id=1, location_id=1
```bash
curl -X POST http://localhost:3000/api/vehicles \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"company_id": "1", "locaion_id": "1"}'
```

### 3. Lấy tất cả vehicles
```bash
curl -X GET http://localhost:3000/api/vehicles/all \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 4. Lấy vehicle theo ID
```bash
curl -X GET http://localhost:3000/api/vehicles/1 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Mock Data Available

### Company ID = 1, Location ID = 1
- 11 vehicles (ID: 1, 2, 4, 5, 6, 7, 8, 9, 10, 11)

### Company ID = 2, Location ID = 2  
- 1 vehicle (ID: 3)

### Company ID = 1, Location ID = 2
- 1 vehicle (ID: 12)

## Frontend Integration Example

```javascript
// Login first
const loginResponse = await fetch('http://localhost:3000/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ email: 'admin@example.com', password: 'admin123' })
});

const loginData = await loginResponse.json();
const token = loginData.data.token;

// Get vehicles
const vehiclesResponse = await fetch('http://localhost:3000/api/vehicles', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({ 
    company_id: '1', 
    locaion_id: '1' 
  })
});

const vehiclesData = await vehiclesResponse.json();
console.log('Vehicles:', vehiclesData.data.vehicles);
```
