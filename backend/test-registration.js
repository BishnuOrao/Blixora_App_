// Simple test to verify backend connectivity and user registration
const testBackend = async () => {
  const API_BASE = 'http://localhost:5000/api';
  
  console.log('🔄 Testing Blixora Labs Backend Connection...\n');
  
  try {
    // Test 1: Health check
    console.log('1. Testing health endpoint...');
    const healthResponse = await fetch(`${API_BASE}/health`);
    if (healthResponse.ok) {
      const healthData = await healthResponse.json();
      console.log('✅ Backend is running:', healthData.message);
    } else {
      throw new Error('Health check failed');
    }
    
    // Test 2: Try to register a user
    console.log('\n2. Testing user registration...');
    const testUser = {
      name: 'Test User ' + Date.now(),
      email: `test${Date.now()}@example.com`,
      password: 'password123'
    };
    
    console.log('Registering user:', testUser.email);
    
    const registerResponse = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testUser)
    });
    
    const registerData = await registerResponse.json();
    
    if (registerResponse.ok && registerData.success) {
      console.log('✅ User registration successful!');
      console.log('User ID:', registerData.data.user._id);
      console.log('User name:', registerData.data.user.name);
      console.log('User email:', registerData.data.user.email);
      console.log('Token received:', registerData.data.token ? 'Yes' : 'No');
      
      // Test 3: Try to login with the registered user
      console.log('\n3. Testing user login...');
      const loginResponse = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: testUser.email,
          password: testUser.password
        })
      });
      
      const loginData = await loginResponse.json();
      
      if (loginResponse.ok && loginData.success) {
        console.log('✅ User login successful!');
        console.log('Welcome back:', loginData.data.user.name);
      } else {
        console.log('❌ Login failed:', loginData.message);
      }
      
    } else {
      console.log('❌ Registration failed:', registerData.message);
      console.log('Response status:', registerResponse.status);
      console.log('Full response:', registerData);
    }
    
    console.log('\n🎉 Backend test completed!');
    
  } catch (error) {
    console.error('❌ Backend test failed:', error.message);
    console.log('\n🔧 Troubleshooting tips:');
    console.log('- Make sure backend server is running on port 5000');
    console.log('- Check if MongoDB Atlas is connected');
    console.log('- Verify environment variables in .env file');
  }
};

// Run the test
if (typeof window === 'undefined') {
  // Node.js environment
  const fetch = require('node-fetch');
  testBackend();
} else {
  // Browser environment
  testBackend();
}
