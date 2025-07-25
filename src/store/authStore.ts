import {Store} from '@tanstack/store'
import type { LoginResponse } from '@/types/auth'

const initialState: LoginResponse = {
  isVerified: false,
  user:{
        id: 0,
        role: '', // Default role set to CUSTOMER
        email: '',
        firstname: '',
        lastname: '',
        phone: '', 
        customerId: undefined,
        vendorId: undefined, // Optional, can be added later
  }, 
    accessToken: '',
    refreshToken: '',
    // hydrated: false, // Indicates whether the state has been initialized from localStorage
}

export const authStore: Store<LoginResponse> = new Store<LoginResponse>(initialState)
export const authActions = {
    setUser: (data: LoginResponse) => {
        // Backend doesn't return isVerified, but we know user is verified if they can login
        const processedData = {
            ...data,
            isVerified: true, // Set to true since successful login means verified
            user:
            {
              id: data.user.id,
              role: data.user.role,
                email: data.user.email,
                firstname: data.user.firstname,
                lastname: data.user.lastname,
                image: data.user.image || '', // Optional, can be added later
                phone: data.user.phone || '', // Ensure phone is a string, default to empty if undefined
                customerId: typeof data.user.customerId === 'number' ? data.user.customerId : undefined, // Ensure number or undefined
                vendorId: typeof data.user.vendorId === 'number' ? data.user.vendorId : undefined, // Ensure number or undefined
            }
        }
        
        console.log('✅ Auth data received and stored:', processedData)
        
        authStore.setState(processedData)
        localStorage.setItem('auth', JSON.stringify(processedData))
    },
    clearUser: () => {
        authStore.setState(initialState)
        localStorage.removeItem('auth')
    },
        initializeUser: () => {
            const storedUser = localStorage.getItem('auth')
            if (storedUser) {
                try {
                    const parsedUser = JSON.parse(storedUser)
                    authStore.setState(parsedUser)
                } catch (error) {
                    console.error('Error parsing stored auth data:', error)
                    authStore.setState(initialState)
                }
            } else {
                authStore.setState(initialState)
            }
        },
    }


    authActions.initializeUser() // Initialize user state from localStorage on app start