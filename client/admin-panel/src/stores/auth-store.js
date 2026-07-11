import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../api/client.js';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,

      login: async (email, password) => {
        const { data } = await api.post('/auth/login', { email, password });
        set({
          user: data.data.user,
          token: data.data.accessToken,
          refreshToken: data.data.refreshToken,
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({
          user: null,
          token: null,
          refreshToken: null,
          isAuthenticated: false,
        });
      },
    }),
    { name: 'ergon-auth' },
  ),
);
