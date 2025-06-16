import { create } from 'zustand';
import { User } from '../types/Auth';

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  socialLogin: (user: User) => void;
}

export const authStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  user: null,
  login: (user: User) => set({ isLoggedIn: true, user }),
  logout: () => set({ isLoggedIn: false, user: null }),
  socialLogin: (user: User) => set({ isLoggedIn: true, user }),
}));