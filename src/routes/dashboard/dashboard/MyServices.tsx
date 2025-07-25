import { useStore } from '@tanstack/react-form'
import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { toast } from 'sonner'
import type { Services } from '@/types/users'
import { useCreateService, useServiceByVendorId } from '@/hooks/services'
import { authStore } from '@/store/authStore'

export const Route = createFileRoute('/dashboard/dashboard/MyServices')({
  component: RouteComponent,
})

function RouteComponent() {
  const { user } = useStore(authStore)
  const [showModal, setShowModal] = useState(false)
  const { data: services, isLoading } = useServiceByVendorId(user.vendorId ?? 0)
  const addServiceMutation = useCreateService()

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addServiceMutation.mutate({
      name: formData.name,
      description: formData.description,
      price: Number(formData.price),
      duration: Number(formData.duration),
      vendorId: user.vendorId,
    })
    toast.success('Service created successfully!')
    setFormData({ name: '', description: '', price: '', duration: '' })
    setShowModal(false)
  }

  if (isLoading) {
    return <div className="text-gray-600 text-center py-10">Loading services...</div>
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-blue-800">My Services</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service: Services) => (
          <div
            key={service.id}
            className="bg-white border border-gray-200 shadow-sm rounded-2xl p-5 hover:shadow-lg transition duration-300"
          >
            <h3 className="text-lg font-semibold text-blue-600 mb-2">{service.name}</h3>
            <p className="text-gray-700 mb-4 line-clamp-2">{service.description}</p>
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>💰 Price:</strong> ${service.price}</p>
              <p><strong>⏱️ Duration:</strong> {service.duration} mins</p>
            </div>
          </div>
        ))}

        {/* Add Service Button Card */}
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center bg-gradient-to-br from-blue-50 to-white border-dashed border-2 border-blue-300 rounded-2xl p-5 text-blue-600 hover:bg-blue-50 hover:shadow transition duration-300"
        >
          + Add New Service
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Add New Service</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Service Name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Textarea
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
              <Input
                label="Price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                required
              />
              <Input
                label="Duration (mins)"
                name="duration"
                type="number"
                value={formData.duration}
                onChange={handleChange}
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Add Service
              </button>
            </form>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 text-sm text-gray-600 hover:text-gray-800 w-full text-center"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// 🔧 Input Field Component
function Input({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div>
      <label className="block text-sm text-gray-700 mb-1">{label}</label>
      <input
        {...props}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
}

// 🔧 Textarea Field Component
function Textarea({ label, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  return (
    <div>
      <label className="block text-sm text-gray-700 mb-1">{label}</label>
      <textarea
        {...props}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        rows={3}
      />
    </div>
  )
}

