const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

async function testVehiclesAPI() {
  console.log('🚛 Testing Vehicles API\n');

  try {
    // Test 1: Health Check
    console.log('1. Testing Health Check...');
    const healthResponse = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Health Check:', healthResponse.data);

    // Test 2: Login to get token
    console.log('\n2. Testing Login...');
    const loginResponse = await axios.post(`${BASE_URL}/api/auth/login`, {
      email: 'admin@example.com',
      password: 'admin123'
    });
    console.log('✅ Login successful');
    const token = loginResponse.data.data.token;

    // Test 3: Get vehicles with company_id=1 and location_id=1
    console.log('\n3. Testing Get Vehicles (company_id=1, location_id=1)...');
    const vehiclesResponse = await axios.post(`${BASE_URL}/api/vehicles`, {
      company_id: '1',
      locaion_id: '1'
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    console.log('✅ Vehicles retrieved successfully');
    console.log(`   Total vehicles: ${vehiclesResponse.data.data.total}`);
    console.log(`   First vehicle: ${vehiclesResponse.data.data.vehicles[0]?.doorId || 'None'}`);

    // Test 4: Get vehicles with company_id=2 and location_id=2
    console.log('\n4. Testing Get Vehicles (company_id=2, location_id=2)...');
    const vehiclesResponse2 = await axios.post(`${BASE_URL}/api/vehicles`, {
      company_id: '2',
      locaion_id: '2'
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    console.log('✅ Vehicles retrieved successfully');
    console.log(`   Total vehicles: ${vehiclesResponse2.data.data.total}`);
    console.log(`   First vehicle: ${vehiclesResponse2.data.data.vehicles[0]?.doorId || 'None'}`);

    // Test 5: Get all vehicles
    console.log('\n5. Testing Get All Vehicles...');
    const allVehiclesResponse = await axios.get(`${BASE_URL}/api/vehicles/all`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('✅ All vehicles retrieved successfully');
    console.log(`   Total vehicles: ${allVehiclesResponse.data.data.total}`);

    // Test 6: Get vehicle by ID
    console.log('\n6. Testing Get Vehicle by ID...');
    const vehicleByIdResponse = await axios.get(`${BASE_URL}/api/vehicles/1`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('✅ Vehicle by ID retrieved successfully');
    console.log(`   Vehicle: ${vehicleByIdResponse.data.data.vehicle.doorId}`);

    // Test 7: Test validation - missing fields
    console.log('\n7. Testing Validation - Missing Fields...');
    try {
      await axios.post(`${BASE_URL}/api/vehicles`, {
        company_id: '1'
        // missing locaion_id
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      console.log('✅ Validation working:', error.response.data.message);
    }

    // Test 8: Test validation - invalid numbers
    console.log('\n8. Testing Validation - Invalid Numbers...');
    try {
      await axios.post(`${BASE_URL}/api/vehicles`, {
        company_id: 'abc',
        locaion_id: 'xyz'
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      console.log('✅ Number validation working:', error.response.data.message);
    }

    console.log('\n🎉 Vehicles API Testing Complete!');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

// Run tests
testVehiclesAPI();
