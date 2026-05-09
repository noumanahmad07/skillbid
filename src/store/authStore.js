import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      
      login: async (email, password) => {
        set({ isLoading: true });
        // Simulate API call
        return new Promise((resolve) => {
          setTimeout(() => {
            const mockUser = {
              id: 'u1',
              name: email.split('@')[0],
              email: email,
              role: email.includes('lums') ? 'student' : 'buyer',
              university: email.includes('lums') ? 'LUMS' : null,
              bio: 'I am a talented student/business owner looking for opportunities.',
              avatar: null,
              memberSince: '2024-01-15',
              rating: 4.8,
              jobsDone: 12,
              totalEarned: 24500,
            };
            
            set({
              user: mockUser,
              token: 'mock-token-123',
              isAuthenticated: true,
              isLoading: false,
            });
            resolve({ ok: true, data: mockUser });
          }, 1000);
        });
      },
      
      register: async (data) => {
        set({ isLoading: true });
        return new Promise((resolve) => {
          setTimeout(() => {
            const newUser = {
              id: 'u' + Math.random().toString(36).substr(2, 5),
              ...data,
              isAuthenticated: true,
              memberSince: new Date().toISOString(),
              rating: 0,
              jobsDone: 0,
              totalEarned: 0,
            };
            set({
              user: newUser,
              token: 'mock-token-123',
              isAuthenticated: true,
              isLoading: false,
            });
            resolve({ ok: true, data: newUser });
          }, 1000);
        });
      },
      
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
        window.location.href = '/';
      },
      
      updateUser: (data) => {
        set((state) => ({
          user: { ...state.user, ...data }
        }));
      },
      
      restoreSession: () => {
        // Handled by persist middleware automatically
      },
    }),
    {
      name: 'skillbid-auth',
    }
  )
);
