import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { toast } from 'sonner'
import { useStore } from '@tanstack/react-form'
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import type { VehiclesDetails } from '@/types/users'
import { authStore } from '@/store/authStore'
import { useDeleteVehicle, useVehiclebyCustomerId } from '@/hooks/vehicle'
import VehiclesModal from '@/components/modals/VehiclesModal'

export const Route = createFileRoute('/dashboard/dashboard/vehicles')({
  component: RouteComponent,
})

function RouteComponent() {
  const { user } = useStore(authStore)
  const customerId = user.customerId
  const [showModal, setShowModal] = useState(false)
  const { data: vehicles, isLoading } = useVehiclebyCustomerId(customerId || 0)
  const handleDeleteMutation = useDeleteVehicle()

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE', '#00C49F']

  // Pie Chart Data
  const makeData = vehicles?.reduce((acc: any, vehicle: VehiclesDetails) => {
    const found = acc.find((item: any) => item.name === vehicle.make)
    if (found) {
      found.value += 1
    } else {
      acc.push({ name: vehicle.make, value: 1 })
    }
    return acc
  }, []) || []

  const handleDelete = (vehicleId: number) => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      handleDeleteMutation.mutate(vehicleId, {
        onSuccess: () => toast.success('Vehicle deleted successfully!'),
        onError: () => toast.error('Failed to delete vehicle.'),
      })
    }
  }

  if (isLoading) return <div>Loading vehicles...</div>

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">My Vehicles</h2>

      <div className="mb-4 flex items-center justify-between">
        <input
          type="text"
          placeholder="Search vehicles..."
          className="p-2 border border-gray-300 rounded"
        />
        <div className="mt-2">
          <button
            onClick={() => setShowModal(true)}
            className="p-2 bg-blue-500 text-white rounded"
          >
            Add Vehicle
          </button>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          Total Vehicles: {vehicles?.length || 0}
        </p>
      </div>

      {showModal && <VehiclesModal isOpen={true} onClose={() => setShowModal(false)} />}

      <div className="overflow-x-auto rounded-lg shadow mb-10">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-300">
              <th className="py-3 px-6 text-left font-semibold text-gray-900 border-b">Image</th>
              <th className="py-3 px-6 text-left font-semibold text-gray-900 border-b">License Plate</th>
              <th className="py-3 px-6 text-left font-semibold text-gray-900 border-b">Model</th>
              <th className="py-3 px-6 text-left font-semibold text-gray-900 border-b">Make</th>
              <th className="py-3 px-6 text-left font-semibold text-gray-900 border-b">Edit</th>
              <th className="py-3 px-6 text-left font-semibold text-gray-900 border-b">Delete</th>
            </tr>
          </thead>
          <tbody>
            {vehicles && vehicles.length > 0 ? (
              vehicles.map((vehicle: VehiclesDetails, idx: number) => (
                <tr
                  key={vehicle.id}
                  className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100 transition'}
                >
                  <td className="py-3 px-6 border-b">
                    {vehicle.image ? (
                      <img
                        src={vehicle.image}
                        alt="Vehicle"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-gray-500">No Image</span>
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-6 border-b">{vehicle.license_plate}</td>
                  <td className="py-3 px-6 border-b">{vehicle.model}</td>
                  <td className="py-3 px-6 border-b">{vehicle.make}</td>
                  <td className="py-3 px-6 border-b">
                    <button
                      onClick={() => setShowModal(true)}
                      className="text-blue-600 hover:text-blue-800 font-bold"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="py-3 px-6 border-b">
                    <button
                      onClick={() => handleDelete(Number(vehicle.id))}
                      className="ml-4 text-red-600 hover:text-red-800 font-bold"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-6 text-center text-gray-500">
                  No vehicles found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pie Chart Section */}
      <div className="bg-white p-6 rounded shadow-lg max-w-3xl mx-auto">
        <h3 className="text-lg font-semibold mb-4 text-center">Vehicle Make Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={makeData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {makeData.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
