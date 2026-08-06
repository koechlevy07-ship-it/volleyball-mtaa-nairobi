import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'community_member' | 'organizer' | 'super_admin';
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    set({ isLoading: true });
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Mock successful login
    set({
      user: {
        id: '1',
        name: 'John Mwangi',
        email: email,
        role: 'community_member',
      },
      isAuthenticated: true,
      isLoading: false,
    });
  },

  register: async (name: string, email: string, password: string, role: string) => {
    set({ isLoading: true });
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Mock successful registration
    set({
      user: {
        id: '2',
        name: name,
        email: email,
        role: role as any,
      },
      isAuthenticated: true,
      isLoading: false,
    });
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));