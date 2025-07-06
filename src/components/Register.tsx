import z from 'zod'

const formSchema = z.object({
    firstname: z.string().min(1, 'First name is required').max(50, 'First name must be less than 50 characters'),
    lastname: z.string().min(1, 'Last name is required').max(50, 'Last name must be less than 50 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Confirm password must be at least 6 characters'),
}).refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
});
type FormSchema = z.infer<typeof formSchema>;


function Register() {
    
  return (
    <div>Register</div>
  )
}

export default Register
