const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('../models/User');
const Simulation = require('../models/Simulation');

const setupDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Connected to MongoDB');

    // Create admin user
    const adminExists = await User.findOne({ email: process.env.ADMIN_EMAIL });
    if (!adminExists) {
      const admin = new User({
        name: 'Admin User',
        email: process.env.ADMIN_EMAIL,
        passwordHash: process.env.ADMIN_PASSWORD,
        role: 'admin',
        profile: {
          bio: 'System Administrator for Blixora Labs',
          experience: 'advanced'
        }
      });
      
      await admin.save();
      console.log('✅ Admin user created');
    } else {
      console.log('ℹ️  Admin user already exists');
    }

    // Create sample simulations
    const simulationsData = [
      {
        title: 'Introduction to Machine Learning',
        description: 'Learn the fundamentals of machine learning with hands-on Python exercises and real-world datasets.',
        category: 'ai-machine-learning',
        level: 'beginner',
        duration: 8,
        content: {
          modules: [
            {
              title: 'What is Machine Learning?',
              description: 'Understanding the basics and types of ML',
              estimatedTime: 60,
              resources: ['Video: ML Overview', 'Reading: ML Types']
            },
            {
              title: 'Linear Regression',
              description: 'Your first ML algorithm',
              estimatedTime: 120,
              resources: ['Jupyter Notebook', 'Dataset: House Prices']
            },
            {
              title: 'Classification Algorithms',
              description: 'Decision trees and logistic regression',
              estimatedTime: 180,
              resources: ['Python Code Examples', 'Practice Dataset']
            }
          ],
          prerequisites: ['Basic Python knowledge', 'High school mathematics'],
          learningObjectives: [
            'Understand ML concepts',
            'Implement basic algorithms',
            'Evaluate model performance'
          ],
          tools: ['Python', 'Jupyter Notebook', 'Scikit-learn', 'Pandas']
        },
        media: {
          thumbnail: 'https://example.com/ml-thumb.jpg',
          video: 'https://example.com/ml-intro.mp4'
        },
        pricing: {
          type: 'free',
          price: 0
        },
        tags: ['machine-learning', 'python', 'beginner', 'data-science'],
        createdBy: adminExists?._id || (await User.findOne({ role: 'admin' }))._id
      },
      {
        title: 'Cybersecurity Fundamentals',
        description: 'Master the essentials of cybersecurity including threat analysis, risk assessment, and security frameworks.',
        category: 'cybersecurity',
        level: 'intermediate',
        duration: 12,
        content: {
          modules: [
            {
              title: 'Security Threats Landscape',
              description: 'Understanding modern cyber threats',
              estimatedTime: 90,
              resources: ['Case Studies', 'Threat Reports']
            },
            {
              title: 'Network Security',
              description: 'Firewalls, VPNs, and network monitoring',
              estimatedTime: 150,
              resources: ['Virtual Lab', 'Wireshark Tutorial']
            },
            {
              title: 'Incident Response',
              description: 'How to respond to security incidents',
              estimatedTime: 120,
              resources: ['Simulation Environment', 'Response Playbooks']
            }
          ],
          prerequisites: ['Basic networking knowledge', 'Understanding of operating systems'],
          learningObjectives: [
            'Identify security threats',
            'Implement security controls',
            'Develop incident response plans'
          ],
          tools: ['Wireshark', 'Nmap', 'Metasploit', 'SIEM Tools']
        },
        pricing: {
          type: 'premium',
          price: 49.99
        },
        tags: ['cybersecurity', 'network-security', 'intermediate'],
        createdBy: adminExists?._id || (await User.findOne({ role: 'admin' }))._id
      },
      {
        title: 'AWS Cloud Architecture',
        description: 'Design and deploy scalable applications on Amazon Web Services cloud platform.',
        category: 'cloud-computing',
        level: 'advanced',
        duration: 15,
        content: {
          modules: [
            {
              title: 'AWS Core Services',
              description: 'EC2, S3, RDS, and Lambda fundamentals',
              estimatedTime: 180,
              resources: ['AWS Console Access', 'Hands-on Labs']
            },
            {
              title: 'Serverless Architecture',
              description: 'Building with Lambda and API Gateway',
              estimatedTime: 200,
              resources: ['Code Templates', 'Real Project']
            },
            {
              title: 'DevOps on AWS',
              description: 'CI/CD pipelines and infrastructure as code',
              estimatedTime: 220,
              resources: ['CloudFormation Templates', 'CodePipeline Setup']
            }
          ],
          prerequisites: ['Cloud computing basics', 'Programming experience', 'Linux command line'],
          learningObjectives: [
            'Design cloud architectures',
            'Implement serverless solutions',
            'Set up CI/CD pipelines'
          ],
          tools: ['AWS Console', 'AWS CLI', 'CloudFormation', 'Docker']
        },
        pricing: {
          type: 'pro',
          price: 99.99
        },
        tags: ['aws', 'cloud-computing', 'serverless', 'advanced'],
        createdBy: adminExists?._id || (await User.findOne({ role: 'admin' }))._id
      },
      {
        title: 'React.js Full-Stack Development',
        description: 'Build modern web applications with React, Node.js, and MongoDB.',
        category: 'web-development',
        level: 'intermediate',
        duration: 10,
        content: {
          modules: [
            {
              title: 'React Fundamentals',
              description: 'Components, props, state, and hooks',
              estimatedTime: 150,
              resources: ['Code Playground', 'Interactive Examples']
            },
            {
              title: 'Backend Development',
              description: 'Node.js, Express.js, and REST APIs',
              estimatedTime: 180,
              resources: ['API Templates', 'Database Setup Guide']
            },
            {
              title: 'Full-Stack Integration',
              description: 'Connecting frontend and backend',
              estimatedTime: 200,
              resources: ['Complete Project', 'Deployment Guide']
            }
          ],
          prerequisites: ['JavaScript ES6+', 'HTML/CSS', 'Basic programming concepts'],
          learningObjectives: [
            'Build React applications',
            'Create REST APIs',
            'Deploy full-stack apps'
          ],
          tools: ['React', 'Node.js', 'Express.js', 'MongoDB', 'VS Code']
        },
        pricing: {
          type: 'free',
          price: 0
        },
        tags: ['react', 'nodejs', 'mongodb', 'full-stack', 'web-development'],
        createdBy: adminExists?._id || (await User.findOne({ role: 'admin' }))._id
      },
      {
        title: 'Data Science with Python',
        description: 'Comprehensive data science course covering analysis, visualization, and machine learning.',
        category: 'data-science',
        level: 'intermediate',
        duration: 14,
        content: {
          modules: [
            {
              title: 'Data Analysis with Pandas',
              description: 'Data manipulation and exploration',
              estimatedTime: 120,
              resources: ['Jupyter Notebooks', 'Sample Datasets']
            },
            {
              title: 'Data Visualization',
              description: 'Creating insights with Matplotlib and Seaborn',
              estimatedTime: 100,
              resources: ['Visualization Examples', 'Practice Datasets']
            },
            {
              title: 'Statistical Analysis',
              description: 'Hypothesis testing and statistical modeling',
              estimatedTime: 140,
              resources: ['Statistical Tests Guide', 'R Integration']
            }
          ],
          prerequisites: ['Python programming', 'Basic statistics', 'Mathematics'],
          learningObjectives: [
            'Analyze complex datasets',
            'Create compelling visualizations',
            'Apply statistical methods'
          ],
          tools: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Jupyter']
        },
        pricing: {
          type: 'premium',
          price: 59.99
        },
        tags: ['data-science', 'python', 'pandas', 'statistics', 'visualization'],
        createdBy: adminExists?._id || (await User.findOne({ role: 'admin' }))._id
      }
    ];

    // Create simulations if they don't exist
    for (const simData of simulationsData) {
      const exists = await Simulation.findOne({ title: simData.title });
      if (!exists) {
        const simulation = new Simulation(simData);
        await simulation.save();
        console.log(`✅ Created simulation: ${simData.title}`);
      } else {
        console.log(`ℹ️  Simulation already exists: ${simData.title}`);
      }
    }

    console.log('🎉 Database setup completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`👥 Total Users: ${await User.countDocuments()}`);
    console.log(`🎯 Total Simulations: ${await Simulation.countDocuments()}`);
    console.log('\n🚀 You can now start the server with: npm run dev');

  } catch (error) {
    console.error('❌ Database setup failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('📝 Database connection closed');
  }
};

// Run the setup
setupDatabase();
