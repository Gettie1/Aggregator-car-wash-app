import { useMutation } from "@tanstack/react-query"
import type { LoginData, LoginResponse } from "@/types/login"
import { login } from "@/api/loginApi"
import { authActions } from "@/store/authStore"

export const uselogin = () => {
    return useMutation<LoginResponse, Error, LoginData >({
        mutationKey: ['login'],
        mutationFn: login,
        onSuccess: (data) => {
            // Handle successful login, e.g., store token, redirect, etc.
            console.log('Login successful:', data)
            authActions.setUser({
                user: { 
                    id: data.user.id,
                    role: data.user.role,
                    email: data.user.email,
                    firstname: data.user.firstname,
                    lastname: data.user.lastname
                },
                accessToken: data.accessToken,
                refreshToken: data.refreshToken
            } as LoginResponse
                )
        },
        onError: (error) => {
            // Handle login error, e.g., show error message
            console.error('Login failed:', error)
        }
    })
}