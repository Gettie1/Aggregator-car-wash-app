import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useCreateCustomerProfile, useCustomers } from '@/hooks/customers'

export interface CustomerModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CustomerModal({ isOpen, onClose }: CustomerModalProps) {
  const mutation = useCreateCustomerProfile()
  const { refetch } = useCustomers()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    address: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate(formData, {
      onSuccess: () => {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          phone: '',
          address: '',
        })
        toast.success('Customer profile created successfully!')
        refetch(); // Refetch customers after creation
        // Delay closing to allow toast to show
        setTimeout(onClose, 500)
      },
      onError: (error: any) => {
        toast.error(
          error?.message || 'Failed to create customer profile. Please try again.'
        )
      }
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-auto">
        <h2 className="text-lg font-semibold mb-4">Create New Customer</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          {[
            { label: 'First Name', name: 'firstName', type: 'text' },
            { label: 'Last Name', name: 'lastName', type: 'text' },
            { label: 'Email', name: 'email', type: 'email' },
            { label: 'Password', name: 'password', type: 'password' },
            { label: 'Phone Number', name: 'phone', type: 'text' },
            { label: 'Address', name: 'address', type: 'text' },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                value={(formData as any)[field.name]}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>
          ))}
            <div className="flex flex-row justify-between gap-3">
              <button
              type="submit"
              className="px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-normal text-sm"
              >
              Create
              </button>
              <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 font-normal text-sm"
              >
              Close
              </button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default CustomerModal
