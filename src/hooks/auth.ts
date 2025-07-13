import { useMutation } from "@tanstack/react-query"
import type { LoginData, LoginResponse, registerData, registerResponse } from "@/types/auth"
import { login, register } from "@/api/AuthApi"
import { authActions } from "@/store/authStore"

export const uselogin = () => {
    return useMutation<LoginResponse, Error, LoginData >({
        mutationKey: ['login'],
        mutationFn: login,
        onSuccess: (data) => {
            // Handle successful login, e.g., store token, redirect, etc.
            console.log('Login successful:', data)
            authActions.setUser(data)
            //     user: { 
            //         id: data.user.id,
            //         role: data.user.role,
            //         email: data.user.email,
            //         firstname: data.user.firstname,
            //         lastname: data.user.lastname,
            //         phone: data.user.phone, // Optional, can be added later
            //         customerId: data.user.customerId, // Optional, can be added later
            //         vendorId: data.user.vendorId, // Optional, can be added later
            //     },
            //     accessToken: data.accessToken,
            //     refreshToken: data.refreshToken
            // } as LoginResponse
            //     )
        },
        onError: (error) => {
            // Handle login error, e.g., show error message
            console.error('Login failed:', error)
        }
    })
}
export const useRegister = () => {
    return useMutation<registerResponse, Error, registerData>({
        mutationKey: ['signup'],
        mutationFn: register,
         onSuccess: (data) => {
                console.log('Account Created successfully', data)
                // Optionally handle success, e.g., redirect to login or show a success message
            },
            onError: (error) => {
                console.error('Registration failed:', error)
                // Optionally handle error, e.g., show an error message
            }
        }
    )
}