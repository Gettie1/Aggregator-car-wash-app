import { useMutation } from "@tanstack/react-query"
import type { LoginData, LoginResponse, registerData, registerResponse } from "@/types/auth"
import { login, register } from "@/api/AuthApi"

export const uselogin = () => {
    return useMutation<LoginResponse, Error, LoginData >({
        mutationKey: ['login'],
        mutationFn: login,
        onSuccess: (data) => {
            // Debug: Log the exact response structure
            console.log('🔍 Raw login response from backend:', data)
            console.log('🔍 User object:', data.user)
            console.log('🔍 User ID:', data.user.id)
            console.log('🔍 User Role:', data.user.role)
            console.log('🔍 Customer ID:', data.user.customerId)
            console.log('🔍 Vendor ID:', data.user.vendorId)
            console.log('🔍 Full user object keys:', Object.keys(data.user))
            
            // The signin component will handle setting the user data
            // authActions.setUser(data) is called from the signin component
            console.log('Login successful:', data)
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
// export const useProfile = () => {
//     return useQuery({
//         queryfn: getProfile,
//     })
// }