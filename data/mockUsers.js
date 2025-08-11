// Mock user data for testing
const mockUsers = [
  {
    id: 1,
    email: 'admin@example.com',
    password: 'admin123',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    avatar: 'https://via.placeholder.com/150/FF6B6B/FFFFFF?text=A',
    createdAt: '2024-01-01T00:00:00.000Z',
    lastLogin: '2024-01-15T10:30:00.000Z',
    isActive: true
  },
  {
    id: 2,
    email: 'user@example.com',
    password: 'user123',
    firstName: 'John',
    lastName: 'Doe',
    role: 'user',
    avatar: 'https://via.placeholder.com/150/4ECDC4/FFFFFF?text=J',
    createdAt: '2024-01-02T00:00:00.000Z',
    lastLogin: '2024-01-14T15:45:00.000Z',
    isActive: true
  },
  {
    id: 3,
    email: 'manager@example.com',
    password: 'manager123',
    firstName: 'Jane',
    lastName: 'Smith',
    role: 'manager',
    avatar: 'https://via.placeholder.com/150/45B7D1/FFFFFF?text=J',
    createdAt: '2024-01-03T00:00:00.000Z',
    lastLogin: '2024-01-13T09:20:00.000Z',
    isActive: true
  },
  {
    id: 4,
    email: 'test@example.com',
    password: 'test123',
    firstName: 'Test',
    lastName: 'User',
    role: 'user',
    avatar: 'https://via.placeholder.com/150/96CEB4/FFFFFF?text=T',
    createdAt: '2024-01-04T00:00:00.000Z',
    lastLogin: '2024-01-12T14:15:00.000Z',
    isActive: false
  }
];

module.exports = { mockUsers };
