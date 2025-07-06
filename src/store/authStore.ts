import {Store} from '@tanstack/store'
import type { LoginResponse } from '@/types/login'
import { Role } from '@/types/login'

const initialState: LoginResponse = {
  isVerified: false,
  user: {
    id: '',
    role: Role.CUSTOMER, // Default role set to CUSTOMER
    email: '',
    firstname: '',
    lastname: '',
  },
    accessToken: '',
    refreshToken: '',
}

export const authStore = new Store<LoginResponse>(initialState)
export const authActions = {
    setUser: (data: LoginResponse) => {
        authStore.setState(data)
        localStorage.setItem('auth', JSON.stringify(data))
    },
    clearUser: () => {
        authStore.setState(initialState)
        localStorage.removeItem('auth')
    },
    // updateUser: (user: Partial<LoginResponse>) => {
    //     authStore.setState((prev) => ({
    //     ...prev,
    //     ...user,
    //     }))
        //     localStorage.setItem('auth_user', JSON.stringify(authStore.setState()))
        // },
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