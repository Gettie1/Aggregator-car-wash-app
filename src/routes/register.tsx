import { useForm } from '@tanstack/react-form'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { z } from 'zod'
import { Role } from '@/types/auth'
import { useRegister } from '@/hooks/auth'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const formSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50, 'First name must be less than 50 characters'),
  lastName: z.string().min(1, 'Last name is required').max(50, 'Last name must be less than 50 characters'),
  role: z.nativeEnum(Role, {
    errorMap: () => ({ message: 'Role must be customer, vendor, or admin' }),
  }), 
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export type FormSchema = z.infer<typeof formSchema>

const validateField = <T,>(value:T, schema:z.ZodType<T>) =>{
  const result = schema.safeParse(value)
  if (!result.success) {
    return result.error.issues[0].message|| 'validation error'
  }
  return undefined
}

export const Route = createFileRoute('/register')({
  component: RegisterComponent,
})

function RegisterComponent() {
  const { mutate } = useRegister() // <-- Use the custom hook for registration
  const router = useRouter() // <-- Use the router to navigate after successful registration
  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      role: 'customer', 
      password: '',
    } as FormSchema,
    onSubmit: ({ value }) => {
         const mappedRole = value.role // 🔁 convert 'customer' → 'CUSTOMER'

  mutate({ ...value, role: mappedRole }, {
    onSuccess: () => {
      router.navigate({ to: '/CreateAccount' })
    },
    onError: (err: any) => {
      console.error('Registration failed:', err)
    },
  })
    }
  })

  return <>
    <Navbar />
   <div className='flex min-h-screen items-center justify-center bg-gray-100 p-4'>
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
      className='w-full max-w-md space-y-6 bg-white p-8 rounded-lg shadow-lg'
    >
      <h2 className='text-2xl font-bold text-center'>Sign Up</h2>
      <form.Field 
        name="firstName"
        validators={{
          onChange:({value})=> {
            if(!value) return 'First name is required'
          }
        }}
        >
          {(field) => (
            <div>
              <label className='block text-sm font-medium text-gray-700'>First Name</label>
              <div className='mt-1'>
              <input
                type='text'
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value as Role)}
                onBlur={() => validateField(field.state.value, z.string().min(1, 'First name is required').max(50, 'First name must be less than 50 characters'))}
                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm'
                placeholder='Enter your first name'
              />
            </div>
            { field.state.meta.errors.length > 0 && (
              <p className='mt-1 text-sm text-red-600'>
                {field.state.meta.errors[0]}
              </p>
            )}
            </div>
          )}
        </form.Field>

      <form.Field 
        name="lastName"
        validators={{
          onChange:({value})=> {
            if(!value) return 'Last name is required'
          }
        }}
        >
          {(field) => (
            <div>
              <label className='block text-sm font-medium text-gray-700'>Last Name</label>
              <div className='mt-1'>
              <input
                type='text'
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={() => validateField(field.state.value, z.string().min(1, 'Last name is required').max(50, 'Last name must be less than 50 characters'))}
                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm'
                placeholder='Enter your last name'
              />
            </div>
            { field.state.meta.errors.length > 0 && (
              <p className='mt-1 text-sm text-red-600'>
                {field.state.meta.errors[0]}
              </p>
            )}
            </div>
          )}
        </form.Field>
      <form.Field
        name="email"
        validators={{
          onChange: ({ value }) => {
            if (!value) return 'Email is required'
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email address'
          },
          onBlur: ({ value }) => validateField(value, z.string().email('Invalid email address')),
        }}
      >
        {(field) => (
          <div>
            <label className='block text-sm font-medium text-gray-700'>Email</label>
            <div className='mt-1'>
              <input
                type='email'
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm'
                placeholder='Enter your email'
              />
            </div>
            {field.state.meta.errors.length > 0 && (
              <p className='mt-1 text-sm text-red-600'>
                {field.state.meta.errors[0]}
              </p>
            )}
          </div>
        )}
      </form.Field>
      <form.Field
        name="role"
        validators={{}}
      >
        {(field) => (
          <div>
            <label className='block text-sm font-medium text-gray-700'>Role</label>
            <div className='mt-1'>
              <select
                value={field.state.value}
                onChange={(e) => field.handleChange( e.target.value as Role)}
                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm'
              >
                <option value='customer'>customer</option>
                <option value='vendor'>vendor</option>
                <option value='admin'>admin</option>
              </select>
            </div>
            {field.state.meta.errors.length > 0 && (
              <p className='mt-1 text-sm text-red-600'>
                {field.state.meta.errors[0]}
              </p>
            )}
          </div>
        )}
      </form.Field>
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
            <label className='block text-sm font-medium text-gray-700'>Password</label>
            <div className='mt-1'>
              <input
                type='password'
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm'
                placeholder='••••••••'
              />
            </div>
            {field.state.meta.errors.length > 0 && (
              <p className='mt-1 text-sm text-red-600'>
                {field.state.meta.errors[0]}
              </p>
            )}
          </div>
        )}
      </form.Field>
      <button
        type='submit'
        className='w-full bg-green-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
      >
        Sign Up
      </button>
      <p className='text-center text-sm text-gray-600'>
        Already have an account?{' '}
        <a href="/signin" className='text-green-600 hover:text-green-700'>
          Sign In
        </a>
      </p>
    </form>
            
        
  </div>
  <Footer/>
  </>
}
