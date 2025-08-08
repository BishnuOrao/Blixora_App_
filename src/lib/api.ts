// API base configuration
const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Helper function to create headers
const createHeaders = (includeAuth = false) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  if (includeAuth) {
    const token = getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  
  return headers;
};

// Generic API request function
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  console.log('🌐 HTTP: Making request to:', url);
  console.log('🌐 HTTP: Request options:', options);
  
  try {
    const response = await fetch(url, {
      headers: createHeaders(false),
      ...options,
    });
    
    console.log('🌐 HTTP: Response status:', response.status);
    console.log('🌐 HTTP: Response headers:', Object.fromEntries(response.headers.entries()));
    
    const data = await response.json();
    console.log('🌐 HTTP: Response data:', data);
    
    if (!response.ok) {
      console.error('🌐 HTTP: Request failed with status:', response.status);
      throw new Error(data.message || 'API request failed');
    }
    
    return data;
  } catch (error) {
    console.error('🌐 HTTP: Request error:', error);
    throw error;
  }
};

// Authenticated API request function
const authenticatedRequest = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      headers: createHeaders(true),
      ...options,
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      if (response.status === 401) {
        // Token expired or invalid, redirect to login
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        window.location.href = '/login';
        return;
      }
      throw new Error(data.message || 'API request failed');
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Auth API
export const authAPI = {
  // Register new user
  register: async (userData: {
    name: string;
    email: string;
    password: string;
    role?: string;
  }) => {
    console.log('🔥 API: Starting registration request with data:', userData);
    
    try {
      const result = await apiRequest('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      });
      
      console.log('✅ API: Registration request successful:', result);
      return result;
    } catch (error) {
      console.error('❌ API: Registration request failed:', error);
      throw error;
    }
  },

  // Login user
  login: async (credentials: { email: string; password: string }) => {
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    // Store token and user data
    if (response.success && response.data.token) {
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response;
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  // Get current user
  getCurrentUser: async () => {
    return authenticatedRequest('/auth/me');
  },

  // Update profile
  updateProfile: async (profileData: any) => {
    return authenticatedRequest('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },

  // Change password
  changePassword: async (passwordData: {
    currentPassword: string;
    newPassword: string;
  }) => {
    return authenticatedRequest('/auth/change-password', {
      method: 'PUT',
      body: JSON.stringify(passwordData),
    });
  },
};

// Simulations API
export const simulationsAPI = {
  // Get all simulations with filters
  getAll: async (params: {
    category?: string;
    level?: string;
    pricing?: string;
    search?: string;
    page?: number;
    limit?: number;
    sort?: string;
  } = {}) => {
    const queryString = new URLSearchParams(
      Object.entries(params).reduce((acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = String(value);
        }
        return acc;
      }, {} as Record<string, string>)
    ).toString();
    
    return apiRequest(`/simulations?${queryString}`);
  },

  // Get simulation by ID
  getById: async (id: string) => {
    return apiRequest(`/simulations/${id}`);
  },

  // Get simulations by category
  getByCategory: async (category: string, limit = 10) => {
    return apiRequest(`/simulations/category/${category}?limit=${limit}`);
  },

  // Get featured simulations
  getFeatured: async (limit = 6) => {
    return apiRequest(`/simulations/featured/list?limit=${limit}`);
  },

  // Search simulations
  search: async (searchData: {
    query?: string;
    filters?: any;
    sort?: string;
    page?: number;
    limit?: number;
  }) => {
    return apiRequest('/simulations/search', {
      method: 'POST',
      body: JSON.stringify(searchData),
    });
  },

  // Get simulation statistics (requires enrollment)
  getStats: async (id: string) => {
    return authenticatedRequest(`/simulations/${id}/stats`);
  },
};

// Enrollments API
export const enrollmentsAPI = {
  // Enroll in a simulation
  enroll: async (simulationId: string) => {
    return authenticatedRequest('/enrollments', {
      method: 'POST',
      body: JSON.stringify({ simulationId }),
    });
  },

  // Get user's enrollments
  getMy: async (params: {
    status?: string;
    page?: number;
    limit?: number;
  } = {}) => {
    const queryString = new URLSearchParams(
      Object.entries(params).reduce((acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = String(value);
        }
        return acc;
      }, {} as Record<string, string>)
    ).toString();
    
    return authenticatedRequest(`/enrollments/my?${queryString}`);
  },

  // Get specific enrollment
  getById: async (id: string) => {
    return authenticatedRequest(`/enrollments/${id}`);
  },

  // Update enrollment progress
  updateProgress: async (id: string, progressData: {
    moduleId: string;
    isCompleted?: boolean;
    timeSpent?: number;
    score?: number;
  }) => {
    return authenticatedRequest(`/enrollments/${id}/progress`, {
      method: 'PUT',
      body: JSON.stringify(progressData),
    });
  },

  // Complete enrollment
  complete: async (id: string) => {
    return authenticatedRequest(`/enrollments/${id}/complete`, {
      method: 'PUT',
    });
  },

  // Add feedback
  addFeedback: async (id: string, feedbackData: {
    rating: number;
    review?: string;
    wouldRecommend?: boolean;
  }) => {
    return authenticatedRequest(`/enrollments/${id}/feedback`, {
      method: 'PUT',
      body: JSON.stringify(feedbackData),
    });
  },

  // Withdraw from simulation
  withdraw: async (id: string) => {
    return authenticatedRequest(`/enrollments/${id}`, {
      method: 'DELETE',
    });
  },
};

// Admin API (admin only)
export const adminAPI = {
  // Get dashboard statistics
  getDashboard: async () => {
    return authenticatedRequest('/admin/dashboard');
  },

  // User management
  users: {
    getAll: async (params: any = {}) => {
      const queryString = new URLSearchParams(params).toString();
      return authenticatedRequest(`/admin/users?${queryString}`);
    },
    getById: async (id: string) => {
      return authenticatedRequest(`/admin/users/${id}`);
    },
    update: async (id: string, userData: any) => {
      return authenticatedRequest(`/admin/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(userData),
      });
    },
    delete: async (id: string) => {
      return authenticatedRequest(`/admin/users/${id}`, {
        method: 'DELETE',
      });
    },
  },

  // Simulation management
  simulations: {
    getAll: async (params: any = {}) => {
      const queryString = new URLSearchParams(params).toString();
      return authenticatedRequest(`/admin/simulations?${queryString}`);
    },
    create: async (simulationData: any) => {
      return authenticatedRequest('/admin/simulations', {
        method: 'POST',
        body: JSON.stringify(simulationData),
      });
    },
    update: async (id: string, simulationData: any) => {
      return authenticatedRequest(`/admin/simulations/${id}`, {
        method: 'PUT',
        body: JSON.stringify(simulationData),
      });
    },
    delete: async (id: string) => {
      return authenticatedRequest(`/admin/simulations/${id}`, {
        method: 'DELETE',
      });
    },
  },

  // Enrollment management
  enrollments: {
    getAll: async (params: any = {}) => {
      const queryString = new URLSearchParams(params).toString();
      return authenticatedRequest(`/admin/enrollments?${queryString}`);
    },
  },

  // Analytics
  getAnalytics: async (period = '30') => {
    return authenticatedRequest(`/admin/analytics?period=${period}`);
  },
};

// Health check
export const healthAPI = {
  check: async () => {
    return apiRequest('/health');
  },
};

// Helper functions for local storage
export const storageHelpers = {
  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
  
  getToken: () => {
    return localStorage.getItem('authToken');
  },
  
  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  },
  
  getUserRole: () => {
    const user = storageHelpers.getUser();
    return user?.role || 'user';
  },
  
  isAdmin: () => {
    return storageHelpers.getUserRole() === 'admin';
  },
  
  clear: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },
};
