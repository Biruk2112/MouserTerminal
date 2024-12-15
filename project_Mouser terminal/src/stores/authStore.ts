import create from 'zustand';

interface AuthState {
  user: null | { email: string };
  isAuthenticated: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (credentials) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    set({ user: { email: credentials.email }, isAuthenticated: true });
  },
  logout: () => set({ user: null, isAuthenticated: false }),
}));