const axios = require('axios');

async function testAPI() {
  try {
    console.log('🧪 Testing Blixora Labs API...\n');
    
    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const health = await axios.get('http://localhost:5000/api/health');
    console.log('✅ Health check:', health.data.message);
    
    // Test simulations endpoint
    console.log('\n2. Testing simulations endpoint...');
    const simulations = await axios.get('http://localhost:5000/api/simulations');
    console.log(`✅ Found ${simulations.data.data.simulations.length} simulations`);
    
    if (simulations.data.data.simulations.length > 0) {
      console.log('\n📚 Sample simulations:');
      simulations.data.data.simulations.slice(0, 3).forEach((sim, index) => {
        console.log(`${index + 1}. ${sim.title} (${sim.category}, ${sim.level})`);
      });
    }
    
    // Test register endpoint
    console.log('\n3. Testing user registration...');
    const testUser = {
      name: 'Test User',
      email: `test${Date.now()}@example.com`,
      password: 'password123'
    };
    
    const registerResponse = await axios.post('http://localhost:5000/api/auth/register', testUser);
    console.log('✅ User registration successful:', registerResponse.data.data.user.name);
    
    // Test login with the registered user
    console.log('\n4. Testing user login...');
    const loginResponse = await axios.post('http://localhost:5000/api/auth/login', {
      email: testUser.email,
      password: testUser.password
    });
    console.log('✅ User login successful:', loginResponse.data.data.user.name);
    
    console.log('\n🎉 All API tests passed! Your backend is working perfectly!');
    
  } catch (error) {
    console.error('❌ API test failed:', error.response?.data?.message || error.message);
  }
}

testAPI();
