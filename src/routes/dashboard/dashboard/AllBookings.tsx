import { createFileRoute } from '@tanstack/react-router'
// import { usePagination } from '@table-library/react-table-library/pagination'
import type { Bookings } from '@/types/users'
import { useBookings } from '@/hooks/bookings'

export const Route = createFileRoute('/dashboard/dashboard/AllBookings')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data:bookings} = useBookings()
  if (!bookings) {
    return <div>No bookings found.</div>
  }
  // const pagination = usePagination()

  return <div>
    <h2 className='font-bold text-2xl'>Bookings</h2>
    <h3 className="text-xl font-semi-bold mb-3">You can manage all Bookings</h3>
    {/* implement filtering */}

    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scheduled Time</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated At</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {bookings.map((booking:Bookings) => (
            <tr key={booking.id}>
              <td className="px-6 py-4 whitespace-nowrap">{booking.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{booking.customer}</td>
              <td className="px-6 py-4 whitespace-nowrap">{booking.vendor}</td>
              <td className="px-6 py-4 whitespace-nowrap">{booking.vehicle}</td>
              <td className="px-6 py-4 whitespace-nowrap">{booking.service}</td>
              <td className="px-6 py-4 whitespace-nowrap">{new Date(booking.scheduled_at).toLocaleDateString()}</td>
              <td className="px-6 py-4 whitespace-nowrap">{booking.location}</td>
              <td className="px-6 py-4 whitespace-nowrap">{booking.duration}</td>
              <td className="px-6 py-4 whitespace-nowrap">{booking.payment_method}</td>
              <td className="px-6 py-4 whitespace-nowrap">{booking.payment_status}</td>
              <td className="px-6 py-4 whitespace-nowrap">{booking.status}</td>
              <td className="px-6 py-4 whitespace-nowrap">{new Date(booking.created_at).toLocaleDateString()}</td>
              <td className="px-6 py-4 whitespace-nowrap">{new Date(booking.updated_at).toLocaleDateString()}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button className="text-blue-600 hover:text-blue-800 font-semi-bold">Edit</button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button className="text-red-600 hover:text-red-800 font-semi-bold">Delete</button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="mt-6 flex items-center justify-end">
      <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-2 rounded-lg shadow-sm">
      Total Bookings: <span className="font-bold">{bookings.length}</span>
      </span>
    </div>
  </div>
}
