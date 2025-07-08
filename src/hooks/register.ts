import { useMutation } from "@tanstack/react-query"
import { SignUp } from "@/api/profileApi"


export const useSignUp = () => {
    return useMutation({
       mutationKey:['signup'], 
       mutationFn: SignUp,
       onSuccess: (data) => 
        console.log('Account Created successfully',data)
    })
}