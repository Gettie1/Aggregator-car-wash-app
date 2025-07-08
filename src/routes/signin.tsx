// import { Input } from '@/components/ui/input'
// import { Button } from '@/components/ui/button'
import { Link, createFileRoute, useRouter } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'

import { z } from 'zod'
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa'
import { toast } from 'react-hot-toast'
import { authActions } from '../store/authStore' // <-- Update this path based on your actual file structure
import { uselogin } from '@/hooks/auth'
// import { authActions } from '@/store/auth' // <-- Add this import, adjust the path as needed
// import { authActions } from '@store/authStore' // <-- Adjust the path as needed based on your project structure

const formSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string(),
})
export type FormData = z.infer<typeof formSchema>
const validateField = <T,>(value: T, schema: z.ZodType<T>) => {
  const result = schema.safeParse(value)
  if (!result.success) {
    return result.error.issues[0].message || 'validation error'
  }
  return undefined
}

export const Route = createFileRoute('/signin')({
  component: SigninComponent,
})

function SigninComponent() {
  const router = useRouter()
  const mutate = uselogin()
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    } as FormData,
    onSubmit: ({value}) => {
      mutate.mutate(value,{
        onSuccess: (data) => {
          authActions.setUser({
            isVerified: data.isVerified,
            user: {
              id: data.user.id,
              role: data.user.role,
              email: data.user.email,
              firstname: data.user.firstname,
              lastname: data.user.lastname,
            },
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          })
          console.log('Login successful:', data)
            // Replace alert with a toast notification
            toast.success('Login successful! Redirecting to dashboard...')
          router.navigate({ to: '/dashboard/dashboard' })
        },
        onError: (error) => {
          console.error('Login error:', error)
          toast.error('Login failed. Please check your credentials and try again.')
          alert('Login failed. Please check your credentials and try again.')
        },
      })

    }
  })
  return (
   
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
        className="w-full max-w-md space-y-6 bg-white p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-center text-2xl font-bold text-green-700">
          Login to Your Account
        </h2>

        {/* Email Field */}
        <form.Field
          name="email"
          validators={{
            onChange: ({ value }) => {
              if (!value) return 'Email is required'
              if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email address'
            },
          }}
        >
          {(field) => (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-green-500">
                <FaEnvelope className="text-gray-400 mr-2" />
                <input
                  type="email"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={() => validateField(field.state.value, z.string().email('Invalid email address'))}
                  placeholder="enter your email"
                  className="w-full outline-none"
                />
              </div>
              {field.state.meta.errors.length > 0 && (
                <p className="mt-1 text-sm text-red-600">
                  {field.state.meta.errors[0]}
                </p>
              )}
            </div>
          )}
        </form.Field>

        {/* Password Field */}
        <form.Field
          name="password"
          validators={{
            onChange: ({ value }) => {
              if (!value) return 'Password is required'
              if (value.length < 6) return 'Must be at least 6 characters'
            },
            onBlur: ({ value }) => validateField(value, z.string().min(6, 'Password must be at least 6 characters')),
          }}
        >
          {(field) => (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-green-500">
                <FaLock className="text-gray-400 mr-2" />
                <input
                  type="password"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="••••••••"
                  className="w-full outline-none"
                />
              </div>
              {field.state.meta.errors.length > 0 && (
                <p className="mt-1 text-sm text-red-600">
                  {field.state.meta.errors[0]}
                </p>
              )}
            </div>
          )}
        </form.Field>

        {/* Submit Button */}
        <button
          type="submit"
          // disabled={form.formState.isSubmitting}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-green-600 py-2 text-white hover:bg-green-700 transition"
        >
          <FaSignInAlt />
          Login
        </button>

        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{' '}
          <Link
            to="/register"
            className="text-green-600 hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  )
}