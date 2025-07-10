import {Store} from '@tanstack/store'
import type { LoginResponse } from '@/types/auth'

const initialState: LoginResponse = {
  isVerified: false,
  user:{
        id: '',
        role: '', // Default role, can be changed after login
        email: '',
        firstname: '',
        lastname: '',
  }, // Initially undefined, will be set after login
    accessToken: '',
    refreshToken: '',
    // hydrated: false, // Indicates whether the state has been initialized from localStorage
}

export const authStore: Store<LoginResponse> = new Store<LoginResponse>(initialState)
export const authActions = {
    setUser: (data: LoginResponse) => {
        authStore.setState(data)
        localStorage.setItem('auth', JSON.stringify(data))
    },
    clearUser: () => {
        authStore.setState(initialState)
        localStorage.removeItem('auth')
    },
        initializeUser: () => {
            const storedUser = localStorage.getItem('auth')
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser)
                authStore.setState(parsedUser)
            } else {
                authStore.setState(initialState)
            }
        },
    }


    authActions.initializeUser() // Initialize user state from localStorage on app start