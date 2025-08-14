# Blixora Labs - Simulation Portal

![Blixora Labs Logo](public/blixora-logo.png)

A cutting-edge simulation platform connecting professionals with advanced simulation technologies. Built with modern web technologies and a focus on seamless user experience.

## 🚀 Features

- **User Authentication**: Secure JWT-based authentication system
- **Simulation Catalog**: Browse and discover various simulation offerings
- **Course Management**: Interactive course enrollment and tracking
- **Real-time Dashboard**: Monitor your progress and achievements
- **Responsive Design**: Optimized for all device sizes
- **Professional UI**: Modern interface built with shadcn/ui components

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Vite** - Fast development server and build tool
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Beautiful, accessible UI components
- **React Router** - Client-side routing

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB Atlas** - Cloud database
- **JWT** - JSON Web Token authentication
- **bcryptjs** - Password hashing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/blixora-sim-portal.git
cd blixora-sim-portal
```

### 2. Install Dependencies

#### Frontend Dependencies
```bash
npm install
```

#### Backend Dependencies
```bash
cd backend
npm install
cd ..
```

### 3. Environment Setup

Create a `.env` file in the backend directory:

```env
# MongoDB Connection
MONGODB_URI=your_mongodb_atlas_connection_string

# JWT Secret
JWT_SECRET=your_jwt_secret_key

# Server Configuration
PORT=5000
NODE_ENV=development
```

### 4. Database Setup

Run the database setup script:

```bash
cd backend
node scripts/setupDatabase.js
```

### 5. Start Development Servers

#### Start Backend Server
```bash
cd backend
npm start
```
The backend will run on `http://localhost:5000`

#### Start Frontend Development Server
```bash
# In the root directory
npm run dev
```
The frontend will run on `http://localhost:8080`

## 📁 Project Structure

```
blixora-sim-portal/
├── src/                    # Frontend source code
│   ├── components/         # Reusable UI components
│   ├── pages/             # Page components
│   ├── contexts/          # React contexts
│   ├── hooks/             # Custom hooks
│   ├── lib/               # Utility functions
│   └── assets/            # Static assets
├── backend/               # Backend source code
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── middleware/        # Express middleware
│   └── scripts/           # Setup scripts
├── public/                # Public assets
└── docs/                  # Documentation
```

## 🔧 Available Scripts

### Frontend Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend Scripts
- `npm start` - Start backend server
- `npm run dev` - Start with nodemon
- `npm test` - Run tests

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Simulations
- `GET /api/simulations` - Get all simulations
- `GET /api/simulations/:id` - Get simulation by ID
- `POST /api/simulations` - Create new simulation (Admin)

### Enrollments
- `POST /api/enrollments` - Enroll in simulation
- `GET /api/enrollments/user/:userId` - Get user enrollments

## 🎨 UI Components

The project uses shadcn/ui components for a consistent design system:
- Navigation with responsive menu
- Authentication forms with validation
- Dashboard cards and metrics
- Interactive tables and modals
- Toast notifications

## 🔒 Authentication Flow

1. User registers with email and password
2. Backend validates and creates user account
3. JWT token issued upon successful login
4. Token stored in localStorage for session management
5. Protected routes require valid authentication

## 🌐 Deployment

### Frontend Deployment
The frontend can be deployed to platforms like:
- Vercel
- Netlify
- GitHub Pages

### Backend Deployment
The backend can be deployed to:
- Heroku
- Railway
- DigitalOcean

### Environment Variables for Production
Ensure all environment variables are properly configured for production deployment.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, email support@blixoralabs.com or create an issue in this repository.

## 🙏 Acknowledgments

- Developed by the Blixora Labs development team
- Built with modern React and Node.js technologies
- UI components powered by shadcn/ui and Tailwind CSS

---

**Blixora Labs** - Empowering the future through simulation technology

<img width="1919" height="879" alt="image" src="https://github.com/user-attachments/assets/ca50b9ac-6ed9-4ad2-86e7-3ad0f78263f0" />

<img width="1902" height="874" alt="image" src="https://github.com/user-attachments/assets/9d8e879c-65d9-49f3-9f36-3a46353ddd27" />

<img width="1889" height="806" alt="image" src="https://github.com/user-attachments/assets/3f2be0fc-6d9f-4680-a0f2-bea15782a783" />
#Dashboard
<img width="1894" height="875" alt="image" src="https://github.com/user-attachments/assets/a9cd4377-742a-4be3-b158-ce708c4263ae" />

<img width="1891" height="868" alt="image" src="https://github.com/user-attachments/assets/e0cf8e84-c08c-4768-9980-2e4ea348e1db" />








