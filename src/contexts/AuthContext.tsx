import React, { createContext, useContext, useEffect, useState } from 'react';
import { authAPI, storageHelpers } from '@/lib/api';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  profile?: {
    avatar?: string;
    bio?: string;
    skills?: string[];
    experience?: 'beginner' | 'intermediate' | 'advanced';
  };
  stats?: {
    simulationsCompleted: number;
    totalLearningHours: number;
    averageScore: number;
    badges: string[];
  };
  isActive: boolean;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<any>;
  register: (userData: {
    name: string;
    email: string;
    password: string;
  }) => Promise<any>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = storageHelpers.getToken();
      const storedUser = storageHelpers.getUser();

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(storedUser);
        
        // Verify token is still valid by fetching current user
        try {
          const response = await authAPI.getCurrentUser();
          if (response.success) {
            setUser(response.data.user);
            localStorage.setItem('user', JSON.stringify(response.data.user));
          } else {
            // Token is invalid, clear storage
            logout();
          }
        } catch (error) {
          console.error('Token verification failed:', error);
          logout();
        }
      }
      
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await authAPI.login({ email, password });
      
      if (response.success) {
        setUser(response.data.user);
        setToken(response.data.token);
        return response;
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: {
    name: string;
    email: string;
    password: string;
  }) => {
    console.log('🔐 AuthContext register called with:', {
      name: userData.name,
      email: userData.email,
      password: '[HIDDEN]'
    });
    
    setLoading(true);
    try {
      console.log('📡 Calling authAPI.register...');
      const response = await authAPI.register(userData);
      console.log('📥 authAPI.register response:', {
        success: response.success,
        userId: response.data?.user?._id,
        message: response.message
      });
      
      if (response.success) {
        console.log('✅ Registration successful, updating local state...');
        setUser(response.data.user);
        setToken(response.data.token);
        console.log('✅ Local state updated');
        return response;
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (error) {
      console.error('❌ Registration error in AuthContext:', error);
      throw error;
    } finally {
      setLoading(false);
      console.log('🏁 AuthContext register completed');
    }
  };

  const logout = () => {
    authAPI.logout();
    setUser(null);
    setToken(null);
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!token && !!user,
    isAdmin: user?.role === 'admin',
    loading,
    login,
    register,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
