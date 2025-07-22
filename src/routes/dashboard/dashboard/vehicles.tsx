import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { toast } from 'sonner'
import { useStore } from '@tanstack/react-form'
import type { VehiclesDetails } from '@/types/users'
import { authStore } from '@/store/authStore'
import { useDeleteVehicle, useVehiclebyCustomerId } from '@/hooks/vehicle'
import VehiclesModal from '@/components/modals/VehiclesModal'

export const Route = createFileRoute('/dashboard/dashboard/vehicles')({
  component: RouteComponent,
})

function RouteComponent() {
  const {user} = useStore(authStore)
  const customerId = user.customerId; // Access customer ID from authStore
  const [showModal, setShowModal] = useState(false);
  const {data: vehicles, isLoading} = useVehiclebyCustomerId(customerId || 0) // Ensure customerId is a number;
  const handleDeleteMutation = useDeleteVehicle();
  const handleDelete = (vehicleId: number) => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      handleDeleteMutation.mutate(vehicleId, {
        onSuccess: () => {
          toast.success('Vehicle deleted successfully!');
        },
        onError: () => {
          toast.error('Failed to delete vehicle.');
        }
      });
    }
  }


  if (isLoading) {
    return <div>Loading vehicles...</div>
  }
  if (!vehicles || vehicles.length === 0) {
    return <div>No vehicles found for this customer.</div>
  }
  return <div>
    <h2 className="text-2xl font-bold mb-6 text-gray-800">My Vehicles</h2>
   {/* display in a table */}
    <div className="mb-4 flex items-center justify-between">
      <input
        type="text"
        placeholder="Search vehicles..."
        className="p-2 border border-gray-300 rounded"
        // onChange={handleSearchChange} // Implement search functionality if needed
      />
      <div className="mt-2">
        <button
          onClick={() => setShowModal(true)}
          className="p-2 bg-blue-500 text-white rounded">Add Vehicle</button>
      </div>
      {showModal && (
        <VehiclesModal
          isOpen={true}
          onClose={() => setShowModal(false)}
          // user={user} // Pass user data if needed
        />
      )}
      {/* total */}
      <p className="mt-2 text-sm text-gray-600">Total Vehicles: {vehicles.length}</p>
    </div>
  <div className="overflow-x-auto rounded-lg shadow">
    <table className="min-w-full bg-white border border-gray-200">
     <thead>
      <tr className="bg-gray-300">
        <th className="py-3 px-6 text-left font-semibold text-gray-900 border-b">License Plate</th>
        <th className="py-3 px-6 text-left font-semibold text-gray-900 border-b">Model</th>
        <th className="py-3 px-6 text-left font-semibold text-gray-900 border-b">Make</th>
        <th className="py-3 px-6 text-left font-semibold text-gray-900 border-b">Actions</th>
      </tr>
     </thead>
     <tbody>
      {vehicles.map((vehicle: VehiclesDetails, idx: number) => (
        <tr
         key={vehicle.id}
         className={idx % 2 === 0 ? "bg-white" : "bg-gray-50 hover:bg-gray-100 transition"}
        >
         <td className="py-3 px-6 border-b">{vehicle.license_plate}</td>
         <td className="py-3 px-6 border-b">{vehicle.model}</td>
         <td className="py-3 px-6 border-b">{vehicle.make}</td>
         <td className="py-3 px-6 border-b">
            <button
              onClick={() => handleDelete(Number(vehicle.id))}
              className="ml-4 text-red-600 hover:text-red-800 font-bold"
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
     </tbody>
    </table>
  </div>
  </div>
}
