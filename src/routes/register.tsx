import { useForm } from '@tanstack/react-form'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

const formSchema = z.object({
  firstname: z.string().min(1, 'First name is required').max(50, 'First name must be less than 50 characters'),
  lastname: z.string().min(1, 'Last name is required').max(50, 'Last name must be less than 50 characters'),
  role: z.enum(['customer', 'vendor', 'admin'], {
    errorMap: () => ({ message: 'Role must be one of customer, vendor, or admin' }),
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
  const form = useForm({
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
      role: 'customer', 
      password: '',
    } as FormSchema,
    onSubmit: async ({ value }) => {
      // Handle form submission logic here
      console.log('Form submitted:', value)
    },
  })

  return <div>

  </div>
}
