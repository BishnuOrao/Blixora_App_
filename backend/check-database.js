const mongoose = require('mongoose');
require('dotenv').config();

async function checkDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Connected to MongoDB Atlas');
    console.log(`📊 Database: ${mongoose.connection.name}\n`);
    
    // Check collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📁 Collections in database:');
    collections.forEach(col => console.log(`  - ${col.name}`));
    
    // Define models
    const User = require('./models/User');
    const Simulation = require('./models/Simulation');
    const Enrollment = require('./models/Enrollment');
    
    // Count documents
    const userCount = await User.countDocuments();
    const simulationCount = await Simulation.countDocuments();
    const enrollmentCount = await Enrollment.countDocuments();
    
    console.log('\n📊 Document counts:');
    console.log(`  👥 Users: ${userCount}`);
    console.log(`  🎯 Simulations: ${simulationCount}`);
    console.log(`  📚 Enrollments: ${enrollmentCount}`);
    
    // Show admin user
    const adminUser = await User.findOne({ role: 'admin' });
    if (adminUser) {
      console.log('\n👑 Admin user found:');
      console.log(`  Name: ${adminUser.name}`);
      console.log(`  Email: ${adminUser.email}`);
    }
    
    // Show sample simulations
    const simulations = await Simulation.find().limit(3);
    if (simulations.length > 0) {
      console.log('\n🎯 Sample simulations:');
      simulations.forEach((sim, index) => {
        console.log(`  ${index + 1}. ${sim.title} (${sim.category})`);
      });
    }
    
    console.log('\n🎉 Database check complete!');
    
  } catch (error) {
    console.error('❌ Database check failed:', error.message);
  } finally {
    await mongoose.disconnect();
  }
}

checkDatabase();
