import { useStore } from '@tanstack/react-form'
import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { toast } from 'sonner'
import type { Services } from '@/types/users'
import { useCreateService, useServiceByVendorId } from '@/hooks/services'
import { authStore } from '@/store/authStore'

export const Route = createFileRoute('/dashboard/dashboard/services')({
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
    // vendorId: user.vendorId || '',
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
      // ...formData,
      vendorId: user.vendorId,
    })
    toast.success('Service created successfully!')
    console.log('Service created:', formData)
    setShowModal(false)
  }

  if (isLoading) return <div className="text-gray-600 text-center py-6">Loading services...</div>
  if (!services || services.length === 0) return <p className="text-gray-500 text-center py-6">No Services yet</p>

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">My Services</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service: Services) => (
          <div
            key={service.id}
            className="bg-white shadow-md rounded-2xl p-5 hover:shadow-lg transition duration-300"
          >
            <h3 className="text-lg font-semibold text-blue-600 mb-2">{service.name}</h3>
            <p className="text-gray-700 mb-3">{service.description}</p>

            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Price:</strong> ${service.price}</p>
              <p><strong>Duration:</strong> {service.duration} mins</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => setShowModal(true)}
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
      >
        + Add New Service
      </button>
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Add New Service</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Service Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration (mins)</label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Add Service
              </button>
            </form>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 w-full text-gray-600 hover:text-gray-800"
            >
              Close
            </button>

    </div>
          </div>
        )}
      </div>
  )
}
