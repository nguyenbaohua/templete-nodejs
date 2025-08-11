const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

// Test data
const testUsers = [
  { email: 'admin@example.com', password: 'admin123' },
  { email: 'user@example.com', password: 'user123' },
  { email: 'manager@example.com', password: 'manager123' }
];

async function testAPI() {
  console.log('🧪 Testing Node.js Backend API\n');

  // Test 1: Health Check
  console.log('1. Testing Health Check...');
  try {
    const healthResponse = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Health Check:', healthResponse.data);
  } catch (error) {
    console.log('❌ Health Check failed:', error.message);
  }

  // Test 2: Login with valid credentials
  console.log('\n2. Testing Login with valid credentials...');
  for (const user of testUsers) {
    try {
      const loginResponse = await axios.post(`${BASE_URL}/api/auth/login`, user);
      console.log(`✅ Login successful for ${user.email}:`);
      console.log(`   User: ${loginResponse.data.data.user.firstName} ${loginResponse.data.data.user.lastName}`);
      console.log(`   Role: ${loginResponse.data.data.user.role}`);
      console.log(`   Token: ${loginResponse.data.data.token.substring(0, 50)}...`);
      
      // Test 3: Get profile with token
      console.log('\n3. Testing Profile with token...');
      const profileResponse = await axios.get(`${BASE_URL}/api/auth/profile`, {
        headers: {
          'Authorization': `Bearer ${loginResponse.data.data.token}`
        }
      });
      console.log(`✅ Profile retrieved for ${user.email}:`);
      console.log(`   User: ${profileResponse.data.data.user.firstName} ${profileResponse.data.data.user.lastName}`);
      console.log(`   Email: ${profileResponse.data.data.user.email}`);
      console.log(`   Active: ${profileResponse.data.data.user.isActive}`);
      
    } catch (error) {
      console.log(`❌ Login failed for ${user.email}:`, error.response?.data?.message || error.message);
    }
  }

  // Test 4: Login with invalid credentials
  console.log('\n4. Testing Login with invalid credentials...');
  try {
    await axios.post(`${BASE_URL}/api/auth/login`, {
      email: 'wrong@example.com',
      password: 'wrongpass'
    });
  } catch (error) {
    console.log('✅ Invalid credentials properly rejected:', error.response.data.message);
  }

  // Test 5: Login with missing fields
  console.log('\n5. Testing Login with missing fields...');
  try {
    await axios.post(`${BASE_URL}/api/auth/login`, {
      email: 'admin@example.com'
      // missing password
    });
  } catch (error) {
    console.log('✅ Missing fields properly rejected:', error.response.data.message);
  }

  // Test 6: Profile without token
  console.log('\n6. Testing Profile without token...');
  try {
    await axios.get(`${BASE_URL}/api/auth/profile`);
  } catch (error) {
    console.log('✅ Profile access without token properly rejected:', error.response.data.message);
  }

  console.log('\n🎉 API Testing Complete!');
}

// Run tests
testAPI().catch(console.error);
