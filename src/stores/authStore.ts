import { create } from 'zustand'
import type { User } from '@/types'

interface AuthState {
  accessToken: string | null
  user: User | null
  setAccessToken: (token: string | null) => void
  setUser: (user: User | null) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: localStorage.getItem('access_token'),
  user: null,

  setAccessToken: (token: string | null) => {
    if (token) {
      localStorage.setItem('access_token', token)
    } else {
      localStorage.removeItem('access_token')
    }
    set({ accessToken: token })
  },

  setUser: (user: User | null) => set({ user }),

  clearAuth: () => {
    localStorage.removeItem('access_token')
    set({ accessToken: null, user: null })
  },
}))
