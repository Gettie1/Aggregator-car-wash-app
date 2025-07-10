import { useStore } from '@tanstack/react-form'
import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import type { VehiclesDetails } from '@/types/users'
import { useCreateVehicle, useDeleteVehicle, useVehiclebyCustomerId} from '@/hooks/vehicle'
import { authStore } from '@/store/authStore'

export const Route = createFileRoute('/dashboard/dashboard/vehicles')({
  component: RouteComponent,
})


function RouteComponent() {
  const [showModal, setShowModal] = useState(false)
  const {user} = useStore(authStore)
  const {data:vehicles} = useVehiclebyCustomerId(user.id)
 const addVehicleMutation = useCreateVehicle()

  const [formData, setFormData] = useState({
    plate_number: '',
    model: '',
    brand: '',
    color: '',
    year: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addVehicleMutation.mutate({
      ...formData,
      customer_id: user.id, // or let backend extract from JWT
    })
    setShowModal(false)
  }
   const deleteVehicleMutation = useDeleteVehicle()

  const handleDeleteVehicle = (vehicleId: number) => {
    if (confirm('Are you sure you want to delete the vehicle?')) {
      deleteVehicleMutation.mutate(vehicleId.toString())
    }
  }
  return (
    <div className="flex flex-col gap-4">
      {/* display vehicles in a table for a logged in user */}
      <h1 className="text-2xl font-bold">Vehicles</h1>
       <div className="flex items-center justify-between">
       <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Vehicle
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vehicle ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Make
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Model
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Year
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer ID
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {vehicles?.map((vehicle: VehiclesDetails) => (
              <tr key={vehicle.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {vehicle.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {vehicle.make}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {vehicle.model}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {vehicle.year}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {user.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={() => handleDeleteVehicle(vehicle.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* 🚗 Modal */}
      {showModal && (
  <div className="fixed inset-0 bg-opacity-30 flex justify-center items-center z-50">
    <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative">
      {/* ❌ Close Button */}
      <button
        onClick={() => setShowModal(false)}
        className="absolute top-2 right-3 text-gray-500 hover:text-gray-900 text-lg"
      >
        ×
      </button>

      {/* ✅ Card Header */}
      <h2 className="text-xl font-semibold mb-4">Add New Vehicle</h2>

      {/* ✅ Add Vehicle Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Plate Number</label>
          <input
            type="text"
            name="plate_number"
            value={formData.plate_number}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Model</label>
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Brand</label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Color</label>
          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Year</label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
          />
        </div>

        {/* ✅ Submit Button */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save Vehicle
          </button>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
  )
}
