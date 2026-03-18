import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { api } from '../api/client'
import { clearTabOnboarding, newLoginSessionId } from '../utils/tabOnboarding'

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      loginSessionId: null,
      status: 'idle',
      error: null,

      logout: () => {
        api.clearAuthToken()
        set((prev) => {
          if (prev.loginSessionId) clearTabOnboarding(prev.loginSessionId)
          return { user: null, token: null, loginSessionId: null, status: 'idle', error: null }
        })
      },

      signup: async ({ username, email, password }) => {
        set({ status: 'loading', error: null })
        try {
          const user = await api.signup({ username, email, password })
          set({ user, token: null, loginSessionId: newLoginSessionId(), status: 'authenticated', error: null })
          return user
        } catch (e) {
          set({ status: 'error', error: e.message || 'Signup failed' })
          throw e
        }
      },

      login: async ({ usernameOrEmail, password }) => {
        set({ status: 'loading', error: null })
        try {
          const { token, user } = await api.login({ usernameOrEmail, password })
          set({ user, token, loginSessionId: newLoginSessionId(), status: 'authenticated', error: null })
          return { token, user }
        } catch (e) {
          set({ status: 'error', error: e.message || 'Login failed' })
          throw e
        }
      },
    }),
    {
      name: 'lobes-auth',
      version: 1,
    }
  )
)

