# Blixora Labs Backend API

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Environment Setup:**
Copy `.env` file and update variables:
```bash
# Database
MONGODB_URI=mongodb://localhost:27017/blixora_labs

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# Server
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:8080

# Admin Credentials
ADMIN_EMAIL=admin@blixoralabs.com
ADMIN_PASSWORD=Admin@123
```

3. **Setup Database:**
```bash
npm run setup-db
```

4. **Start Development Server:**
```bash
npm run dev
```

## 📊 Database Schema

### Users
```javascript
{
  name: String,
  email: String (unique),
  passwordHash: String,
  role: 'user' | 'admin',
  profile: {
    avatar: String,
    bio: String,
    skills: [String],
    experience: 'beginner' | 'intermediate' | 'advanced'
  },
  stats: {
    simulationsCompleted: Number,
    totalLearningHours: Number,
    averageScore: Number
  },
  isActive: Boolean,
  createdAt: Date
}
```

### Simulations
```javascript
{
  title: String,
  description: String,
  category: String, // ai-machine-learning, cybersecurity, etc.
  level: 'beginner' | 'intermediate' | 'advanced',
  duration: Number, // hours
  content: {
    modules: [Module],
    prerequisites: [String],
    learningObjectives: [String],
    tools: [String]
  },
  pricing: {
    type: 'free' | 'premium' | 'pro',
    price: Number
  },
  metrics: {
    enrollments: Number,
    completions: Number,
    averageRating: Number
  },
  createdBy: ObjectId,
  isActive: Boolean
}
```

### Enrollments
```javascript
{
  userId: ObjectId,
  simulationId: ObjectId,
  status: 'enrolled' | 'in-progress' | 'completed' | 'paused' | 'dropped',
  progress: {
    completedModules: [String],
    percentageComplete: Number,
    timeSpent: Number
  },
  performance: {
    score: Number,
    assessments: [Assessment]
  },
  feedback: {
    rating: Number,
    review: String,
    wouldRecommend: Boolean
  },
  enrolledAt: Date,
  completedAt: Date
}
```

## 🛣️ API Routes

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile
- `PUT /api/auth/change-password` - Change password

### Simulations
- `GET /api/simulations` - Get all simulations (with filtering)
- `GET /api/simulations/:id` - Get simulation by ID
- `GET /api/simulations/category/:category` - Get by category
- `GET /api/simulations/featured/list` - Get featured simulations
- `POST /api/simulations/search` - Advanced search

### Enrollments
- `POST /api/enrollments` - Enroll in simulation
- `GET /api/enrollments/my` - Get user's enrollments
- `GET /api/enrollments/:id` - Get specific enrollment
- `PUT /api/enrollments/:id/progress` - Update progress
- `PUT /api/enrollments/:id/complete` - Complete simulation
- `PUT /api/enrollments/:id/feedback` - Add feedback
- `DELETE /api/enrollments/:id` - Withdraw from simulation

### Admin Routes (Admin only)
- `GET /api/admin/dashboard` - Dashboard statistics
- `GET /api/admin/users` - Manage users
- `GET /api/admin/simulations` - Manage simulations
- `POST /api/admin/simulations` - Create simulation
- `GET /api/admin/enrollments` - View all enrollments
- `GET /api/admin/analytics` - Analytics data

## 🔒 Security Features

- JWT Authentication
- Password hashing with bcrypt
- Input validation with Joi
- Rate limiting
- CORS configuration
- Helmet security headers
- Role-based access control

## 🧪 Testing the API

### Register a new user:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Get simulations:
```bash
curl http://localhost:5000/api/simulations
```

## 📝 Sample Data

The setup script creates:
- 1 Admin user
- 5 Sample simulations across different categories
- Ready-to-use data for testing

## 🔧 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/blixora_labs |
| `JWT_SECRET` | JWT signing secret | Required |
| `JWT_EXPIRE` | JWT expiration time | 7d |
| `NODE_ENV` | Environment | development |
| `FRONTEND_URL` | Frontend URL for CORS | http://localhost:8080 |

## 🎯 Next Steps

1. Connect frontend to backend APIs
2. Add file upload for simulation media
3. Implement real-time notifications
4. Add email verification
5. Set up payment processing for premium simulations
