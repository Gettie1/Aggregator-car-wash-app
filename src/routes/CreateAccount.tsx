import { useForm, useStore } from '@tanstack/react-form'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { z } from 'zod'
import { useCreateCustomer } from '@/hooks/customers'
import { useCreateVendor } from '@/hooks/vendors'
import { authStore } from '@/store/authStore'

export const Route = createFileRoute('/CreateAccount')({
  component: RouteComponent,
})

function RouteComponent() {
  const { user } = useStore(authStore)
  const navigate = useNavigate()
  const createCustomer = useCreateCustomer()
  const createVendor = useCreateVendor()

  // Define schemas
  const baseSchema = z.object({
    phone: z.string().min(10, 'Phone must be at least 10 digits'),
    address: z.string().min(3, 'Address is required'),
    profile: z.number(),
  })

  const vendorSchema = baseSchema.extend({
    business_name: z.string().min(1, 'Business name is required'),
    location: z.string().min(1, 'Location is required'),
  })

  type CustomerFormSchema = z.infer<typeof baseSchema>
  type VendorFormSchema = z.infer<typeof vendorSchema>
  type AdminFormSchema = z.infer<typeof baseSchema>

  let defaultValues: CustomerFormSchema | VendorFormSchema | AdminFormSchema
  let schema: typeof baseSchema | typeof vendorSchema

  if (user.role === 'vendor') {
    schema = vendorSchema
    defaultValues = {
      phone: '',
      address: '',
      business_name: '',
      location: '',
      profile: Number(user.id),
    }
  } else {
    schema = baseSchema
    defaultValues = {
      phone: '',
      address: '',
      profile: Number(user.id),
    }
  }

  // Reusable validation function
  const validateField = <T,>(value: T, fieldSchema: z.ZodType<T>) => {
    const result = fieldSchema.safeParse(value)
    return result.success ? undefined : result.error.issues[0]?.message
  }

  const form = useForm({
    defaultValues,
    onSubmit: ({ value }) => {
      const payload = { ...value, profile: user.id }

      if (user.role === 'vendor') {
        createVendor.mutate(payload, {
          onSuccess: () => navigate({ to: '/signin' }),
        })
      } else if (user.role === 'customer') {
        createCustomer.mutate(payload, {
          onSuccess: () => navigate({ to: '/signin' }),
        })
      } else {
        navigate({ to: '/signin' })
      }
    },
  })

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-6">Complete Your {user.role} Profile</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
        className="space-y-4"
      >
        {/* Phone */}
        <form.Field
          name="phone"
          validators={{
            onBlur: ({ value }) =>
              validateField(value, z.string().min(10, 'Phone must be at least 10 digits')),
          }}
        >
          {(field) => (
            <div>
              <label>Phone</label>
              <input
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />
              {field.state.meta.errors[0] && (
                <p className="text-red-600">{field.state.meta.errors[0]}</p>
              )}
            </div>
          )}
        </form.Field>

        {/* Address */}
        <form.Field
          name="address"
          validators={{
            onBlur: ({ value }) =>
              validateField(value, z.string().min(3, 'Address is required')),
          }}
        >
          {(field) => (
            <div>
              <label>Address</label>
              <input
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />
              {field.state.meta.errors[0] && (
                <p className="text-red-600">{field.state.meta.errors[0]}</p>
              )}
            </div>
          )}
        </form.Field>

        {/* Vendor-only fields */}
        {user.role === 'vendor' && (
          <>
            <form.Field
              name="business_name"
              validators={{
                onBlur: ({ value }) =>
                  validateField(value, z.string().min(1, 'Business name is required')),
              }}
            >
              {(field) => (
                <div>
                  <label>Business Name</label>
                  <input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                  />
                  {field.state.meta.errors[0] && (
                    <p className="text-red-600">{field.state.meta.errors[0]}</p>
                  )}
                </div>
              )}
            </form.Field>

            <form.Field
              name="location"
              validators={{
                onBlur: ({ value }) =>
                  validateField(value, z.string().min(1, 'Location is required')),
              }}
            >
              {(field) => (
                <div>
                  <label>Location</label>
                  <input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                  />
                  {field.state.meta.errors[0] && (
                    <p className="text-red-600">{field.state.meta.errors[0]}</p>
                  )}
                </div>
              )}
            </form.Field>
          </>
        )}

        {/* Admin note */}
        {user.role === 'admin' && (
          <p className="text-sm text-gray-600">No extra fields for admin.</p>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  )
}
