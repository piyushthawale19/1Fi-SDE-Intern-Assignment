import { create } from 'zustand';
import { authService } from '@/services/authService';

interface User {
  id: string;
  email: string;
  name: string | null;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isHydrated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  setHydrated: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: authService.getToken(),
  isHydrated: false,
  login: (user, token) => {
    authService.setToken(token);
    set({ user, token });
  },
  logout: () => {
    authService.clearToken();
    set({ user: null, token: null });
  },
  setHydrated: (value) => set({ isHydrated: value }),
}));
