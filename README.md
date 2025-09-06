# Node.js Backend Template

A complete Node.js backend template with authentication API, JWT tokens, and mock user data.

## Features

- ✅ Express.js server with security middleware
- ✅ JWT-based authentication
- ✅ Login API with user data and token response
- ✅ Mock user data for testing
- ✅ Protected routes with middleware
- ✅ Rate limiting and CORS configuration
- ✅ Environment variable configuration
- ✅ Error handling and validation

## Project Structure

```
├── server.js              # Main server file
├── package.json           # Dependencies and scripts
├── config.env             # Environment variables
├── README.md              # Project documentation
├── routes/
│   ├── auth.js           # Authentication routes
│   └── vehicles.js       # Vehicles routes
├── middleware/
│   └── auth.js           # Authentication middleware
└── data/
    ├── mockUsers.js      # Mock user data
    └── mockVehicles.js   # Mock vehicles data
```

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Edit `config.env` file with your settings:

```env
PORT=3000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

### 3. Start the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### Authentication

#### POST `/api/auth/login`
Login with email and password.

**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "email": "admin@example.com",
      "firstName": "Admin",
      "lastName": "User",
      "role": "admin",
      "avatar": "https://via.placeholder.com/150/FF6B6B/FFFFFF?text=A",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "lastLogin": "2024-01-15T10:30:00.000Z",
      "isActive": true
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### GET `/api/auth/profile`
Get current user profile (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

#### POST `/api/auth/logout`
Logout endpoint (client-side token removal).

### Vehicles

#### POST `/api/vehicles`
Get vehicles by company_id and location_id (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

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

#### GET `/api/vehicles/all`
Get all vehicles (requires authentication).

#### GET `/api/vehicles/:id`
Get vehicle by ID (requires authentication).

### Health Check

#### GET `/health`
Server health check endpoint.

## Mock Users

The following users are available for testing:

| Email | Password | Role | Status |
|-------|----------|------|--------|
| admin@example.com | admin123 | admin | active |
| user@example.com | user123 | user | active |
| manager@example.com | manager123 | manager | active |
| test@example.com | test123 | user | inactive |

## Testing the API

### Using curl

**Login:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@example.com", "password": "admin123"}'
```

**Get Profile (with token):**
```bash
curl -X GET http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Using Postman

1. Import the following collection:
   - **POST** `{{baseUrl}}/api/auth/login`
   - **GET** `{{baseUrl}}/api/auth/profile`
   - **POST** `{{baseUrl}}/api/auth/logout`

2. Set environment variable:
   - `baseUrl`: `http://localhost:3000`

## Security Features

- **Helmet.js**: Security headers
- **CORS**: Cross-origin resource sharing
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **JWT**: Secure token-based authentication
- **Input Validation**: Request body validation
- **Error Handling**: Comprehensive error responses

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 3000 |
| `JWT_SECRET` | JWT signing secret | Required |
| `NODE_ENV` | Environment mode | development |

## Dependencies

### Production
- `express`: Web framework
- `jsonwebtoken`: JWT token handling
- `bcryptjs`: Password hashing
- `cors`: Cross-origin resource sharing
- `dotenv`: Environment variable loading
- `helmet`: Security headers
- `express-rate-limit`: Rate limiting

### Development
- `nodemon`: Auto-restart on file changes

## License

ISC

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request
