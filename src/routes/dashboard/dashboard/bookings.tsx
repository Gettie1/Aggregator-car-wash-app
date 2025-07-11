import { createFileRoute } from '@tanstack/react-router'
import { useStore } from '@tanstack/react-form'
import type { Bookings } from '@/types/users'
import { useBookingsByVendorId } from '@/hooks/bookings'
import { authStore } from '@/store/authStore'

export const Route = createFileRoute('/dashboard/dashboard/bookings')({
  component: VendorBookingsSection,
})

function VendorBookingsSection() {
  const { user } = useStore(authStore)
  const { data: bookings, isLoading } = useBookingsByVendorId(user.id)

  if (isLoading) return <p>Loading bookings...</p>
  if (!bookings || bookings.length === 0) return <p>No bookings yet.</p>

  return (
    <div className="container mx-auto p-4">
      <h1 className='text-2xl font-bold mb-4'>Bookings</h1>
    <div className="bg-white p-6 mt-8 rounded shadow">
      <h2 className="text-lg font-bold mb-4">Manage Bookings</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Vehicle</th>
              <th className="px-4 py-2">Service</th>
              <th className="px-4 py-2">Location</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Payment</th>
              <th className="px-4 py-2">Actions</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y">
            {bookings.map((booking: Bookings) => (
              <tr key={booking.id}>
                <td className="px-4 py-2">{booking.id}</td>
                <td className="px-4 py-2">{booking.vehicle}</td>
                <td className="px-4 py-2">{booking.service}</td>
                <td className="px-4 py-2">{booking.location}</td>
                <td className="px-4 py-2">
                  {new Date(booking.scheduled_at).toLocaleString()}
                </td>
                <td className="px-4 py-2 capitalize">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      booking.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : booking.status === 'confirmed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>
                <td className="px-4 py-2 capitalize">{booking.payment_status}</td>
                <td className="px-4 py-2">
                  <button className="text-blue-600 hover:underline text-sm">Edit</button>
                </td>
                  <td className="px-4 py-2">
                  <button className="text-red-600 hover:underline ml-2 text-sm">Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <div className="mt-6 flex items-center justify-end">
      <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-2 rounded-lg shadow-sm">
        Total Bookings: <span className="font-bold">{bookings.length}</span>
      </span>
    </div>
    </div>
  )
}

export default VendorBookingsSection

