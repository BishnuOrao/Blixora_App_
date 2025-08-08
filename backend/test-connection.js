const mongoose = require('mongoose');
require('dotenv').config();

async function testConnection() {
  try {
    console.log('🔄 Connecting to MongoDB Atlas...');
    console.log('URI:', process.env.MONGODB_URI?.replace(/\/\/.*@/, '//****:****@'));
    
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Connected to MongoDB Atlas successfully!');
    console.log(`📊 Database: ${mongoose.connection.name}`);
    console.log(`🌐 Host: ${mongoose.connection.host}`);
    
    // Test creating a simple document
    const testSchema = new mongoose.Schema({ message: String });
    const TestModel = mongoose.model('Test', testSchema);
    
    const testDoc = new TestModel({ message: 'Hello from Blixora Labs!' });
    await testDoc.save();
    console.log('✅ Test document created successfully!');
    
    // Clean up test document
    await TestModel.deleteOne({ _id: testDoc._id });
    console.log('✅ Test document removed!');
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('📝 Connection closed');
  }
}

testConnection();
