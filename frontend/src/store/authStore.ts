import { create } from 'zustand';
import axios from 'axios';

// Use your live Render URL
const API_URL = 'https://volleyball-mtaa-backend.onrender.com/api/v1/auth';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'community_member' | 'organizer' | 'super_admin';
  profilePhoto?: string;
  bio?: string;
  phone?: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  accessToken: string | null;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, phone: string, role: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: false,
  isAuthenticated: false,
  accessToken: null,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      const { user, accessToken } = response.data.data;
      
      // Store token in localStorage for persistence
      localStorage.setItem('accessToken', accessToken);
      
      set({ 
        user, 
        accessToken, 
        isAuthenticated: true, 
        isLoading: false 
      });
    } catch (error: any) {
      set({ 
        isLoading: false, 
        error: error.response?.data?.message || 'Login failed. Please try again.' 
      });
      throw error;
    }
  },

  register: async (name: string, email: string, password: string, phone: string, role: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/register`, { 
        name, email, password, phone, role 
      });
      const { user, accessToken } = response.data.data;
      
      localStorage.setItem('accessToken', accessToken);
      
      set({ 
        user, 
        accessToken, 
        isAuthenticated: true, 
        isLoading: false 
      });
    } catch (error: any) {
      set({ 
        isLoading: false, 
        error: error.response?.data?.message || 'Registration failed. Please try again.' 
      });
      throw error;
    }
  },

  logout: async () => {
    try {
      await axios.post(`${API_URL}/logout`);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('accessToken');
      set({ user: null, accessToken: null, isAuthenticated: false });
    }
  },

  checkAuth: async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      set({ isAuthenticated: false });
      return;
    }

    set({ isLoading: true });
    try {
      const response = await axios.get(`${API_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const { user } = response.data.data;
      set({ user, accessToken: token, isAuthenticated: true, isLoading: false });
    } catch (error) {
      localStorage.removeItem('accessToken');
      set({ user: null, accessToken: null, isAuthenticated: false, isLoading: false });
    }
  },
}));

// Initialize axios interceptor to attach token to all requests
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});