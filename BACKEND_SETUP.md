# 🚀 Blixora Labs - Complete Backend Setup

## ✅ **What's Been Created**

### **📁 Backend Structure**
```
backend/
├── 📄 package.json           # Dependencies and scripts
├── 📄 .env                   # Environment variables
├── 📄 server.js              # Main server file
├── 📄 README.md              # Documentation
├── 📁 models/                # Database schemas
│   ├── User.js               # User model with auth
│   ├── Simulation.js         # Simulation courses
│   └── Enrollment.js         # User enrollments
├── 📁 middleware/            # Express middleware
│   ├── auth.js               # JWT authentication
│   ├── errorHandler.js       # Error handling
│   └── validation.js         # Input validation
├── 📁 routes/                # API endpoints
│   ├── auth.js               # Authentication routes
│   ├── simulations.js        # Simulation management
│   ├── enrollments.js        # Enrollment system
│   └── admin.js              # Admin panel routes
└── 📁 scripts/
    └── setupDatabase.js      # Database seeding
```

### **🔧 Technologies Used**
- **Express.js** - Web framework
- **MongoDB + Mongoose** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Joi** - Input validation
- **CORS** - Cross-origin requests
- **Helmet** - Security headers
- **Rate limiting** - API protection

## 🎯 **Database Schema**

### **👤 Users Collection**
```javascript
{
  _id: ObjectId,
  name: "John Doe",
  email: "john@example.com",
  passwordHash: "hashed_password",
  role: "user" | "admin",
  profile: {
    avatar: "url",
    bio: "About me",
    skills: ["JavaScript", "React"],
    experience: "intermediate"
  },
  stats: {
    simulationsCompleted: 5,
    totalLearningHours: 45,
    averageScore: 87,
    badges: ["Quick Learner"]
  },
  isActive: true,
  createdAt: Date,
  updatedAt: Date
}
```

### **🎯 Simulations Collection**
```javascript
{
  _id: ObjectId,
  title: "Introduction to Machine Learning",
  description: "Learn ML fundamentals...",
  category: "ai-machine-learning",
  level: "beginner",
  duration: 8, // hours
  content: {
    modules: [{
      title: "What is ML?",
      description: "Basic concepts",
      estimatedTime: 60,
      resources: ["Video", "Reading"]
    }],
    prerequisites: ["Python basics"],
    learningObjectives: ["Understand ML"],
    tools: ["Python", "Jupyter"]
  },
  pricing: {
    type: "free",
    price: 0
  },
  metrics: {
    enrollments: 1250,
    completions: 980,
    averageRating: 4.5,
    totalReviews: 156
  },
  tags: ["ml", "python", "beginner"],
  createdBy: ObjectId,
  isActive: true
}
```

### **📚 Enrollments Collection**
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  simulationId: ObjectId,
  status: "in-progress",
  progress: {
    completedModules: ["module1", "module2"],
    percentageComplete: 65,
    timeSpent: 180, // minutes
    lastAccessed: Date
  },
  performance: {
    score: 85,
    assessments: [{
      moduleId: "module1",
      score: 90,
      completedAt: Date
    }]
  },
  feedback: {
    rating: 5,
    review: "Great course!",
    wouldRecommend: true,
    reviewDate: Date
  },
  enrolledAt: Date,
  completedAt: Date
}
```

## 🛣️ **API Endpoints**

### **🔐 Authentication (`/api/auth`)**
- `POST /register` - Register new user
- `POST /login` - Login user  
- `GET /me` - Get current user
- `PUT /profile` - Update profile
- `PUT /change-password` - Change password

### **🎯 Simulations (`/api/simulations`)**
- `GET /` - Get all simulations (with filtering)
- `GET /:id` - Get simulation by ID
- `GET /category/:category` - Get by category
- `GET /featured/list` - Get featured simulations
- `POST /search` - Advanced search
- `GET /:id/stats` - Get simulation statistics

### **📚 Enrollments (`/api/enrollments`)**
- `POST /` - Enroll in simulation
- `GET /my` - Get user's enrollments
- `GET /:id` - Get specific enrollment
- `PUT /:id/progress` - Update progress
- `PUT /:id/complete` - Complete simulation
- `PUT /:id/feedback` - Add review/rating
- `DELETE /:id` - Withdraw from simulation

### **⚡ Admin (`/api/admin`) - Admin Only**
- `GET /dashboard` - Dashboard stats
- `GET /users` - Manage users
- `GET /simulations` - Manage simulations
- `POST /simulations` - Create simulation
- `GET /enrollments` - View all enrollments
- `GET /analytics` - Analytics data

## 🚀 **How to Start**

### **1. Install Dependencies**
```bash
cd backend
npm install
```

### **2. Setup MongoDB**
```bash
# Option 1: Local MongoDB
# Install MongoDB locally and start the service

# Option 2: MongoDB Atlas (Cloud)
# Create account at https://cloud.mongodb.com
# Update MONGODB_URI in .env file
```

### **3. Configure Environment**
Update `.env` file:
```bash
MONGODB_URI=mongodb://localhost:27017/blixora_labs
JWT_SECRET=your-super-secret-key
ADMIN_EMAIL=admin@blixoralabs.com
ADMIN_PASSWORD=Admin@123
```

### **4. Setup Database with Sample Data**
```bash
npm run setup-db
```

### **5. Start Development Server**
```bash
npm run dev
```

Server runs on: `http://localhost:5000`

## 🧪 **Testing the API**

### **Health Check**
```bash
curl http://localhost:5000/api/health
```

### **Register User**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### **Login**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### **Get Simulations**
```bash
curl http://localhost:5000/api/simulations
```

## 📱 **Frontend Integration**

### **Created Files:**
- `src/lib/api.ts` - API service functions
- `src/contexts/AuthContext.tsx` - Authentication state
- Updated `src/App.tsx` - Added AuthProvider
- Updated `src/pages/Login.tsx` - Real API integration

### **Available Functions:**
```typescript
// Authentication
authAPI.login(email, password)
authAPI.register(userData)
authAPI.getCurrentUser()

// Simulations
simulationsAPI.getAll(filters)
simulationsAPI.getById(id)
simulationsAPI.getFeatured()

// Enrollments
enrollmentsAPI.enroll(simulationId)
enrollmentsAPI.getMy()
enrollmentsAPI.updateProgress(id, progress)

// Admin (admin only)
adminAPI.getDashboard()
adminAPI.users.getAll()
adminAPI.simulations.create(data)
```

## 🎯 **Sample Data Created**

### **Admin User**
- Email: `admin@blixoralabs.com`
- Password: `Admin@123`
- Role: `admin`

### **5 Sample Simulations**
1. **Introduction to Machine Learning** (Free, Beginner)
2. **Cybersecurity Fundamentals** (Premium, Intermediate)  
3. **AWS Cloud Architecture** (Pro, Advanced)
4. **React.js Full-Stack Development** (Free, Intermediate)
5. **Data Science with Python** (Premium, Intermediate)

## 🔒 **Security Features**

- ✅ **JWT Authentication** with expiration
- ✅ **Password hashing** with bcrypt (12 rounds)
- ✅ **Input validation** with Joi schemas
- ✅ **Rate limiting** (100 requests/15 min)
- ✅ **CORS protection** 
- ✅ **Security headers** with Helmet
- ✅ **Role-based access control**
- ✅ **Error handling** middleware

## 🎉 **Next Steps**

1. **Start both servers:**
   ```bash
   # Frontend (Terminal 1)
   cd blixora-sim-portal
   npm run dev

   # Backend (Terminal 2)  
   cd blixora-sim-portal/backend
   npm run dev
   ```

2. **Test the integration:**
   - Visit: `http://localhost:8080`
   - Login with: `admin@blixoralabs.com` / `Admin@123`
   - Browse simulations and enroll

3. **Customize:**
   - Add more simulations
   - Customize UI components
   - Add payment integration
   - Implement real-time features

**🎯 Your Blixora Labs simulation portal is now fully connected with a robust backend!** 🚀
