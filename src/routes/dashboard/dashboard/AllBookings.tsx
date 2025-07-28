import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { toast } from 'sonner'
import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts'
import type { Bookings } from '@/types/users'
import { useBookings, useDeleteBooking, useUpdateBookingStatus } from '@/hooks/bookings'

export const Route = createFileRoute('/dashboard/dashboard/AllBookings')({
  component: RouteComponent,
})

function RouteComponent() {
  const [search, setSearch] = useState('')
  const { data: bookings } = useBookings()
  const updateBookingMutation = useUpdateBookingStatus()
  const deleteBookingMutation = useDeleteBooking()

  const handleDeleteBooking = (bookingId: number) => {
    if (confirm('Are you sure you want to delete this booking?')) {
      deleteBookingMutation.mutate(bookingId)
      toast.success('Booking deleted successfully!')
    }
  }
  const handleUpdateBooking = (bookingId: number, status: string) => {
    updateBookingMutation.mutate({ id: bookingId, status })
    toast.success(`Booking status updated to ${status}!`)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  if (!bookings) {
    return <div className="text-center text-gray-500 mt-10">No bookings found.</div>
  }

  // Filter bookings by search
  const filteredBookings = bookings.filter((booking: Bookings) =>
    Object.values(booking)
      .join(' ')
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  const pieData = [
    { name: 'Pending', value: bookings.filter((b: Bookings) => b.status === 'pending').length },
    { name: 'Confirmed', value: bookings.filter((b: Bookings) => b.status === 'confirmed').length },
    { name: 'Cancelled', value: bookings.filter((b: Bookings) => b.status === 'cancelled').length },
  ]
  const pieColors = ['#FFBB28', '#00C49F', '#FF8042']

  return (
    <div className="">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-8">
        <div className="flex-1 flex flex-col items-center md:items-start">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">Overview of the Booking Status</h2>
          <PieChart width={420} height={240}>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} (${((percent ?? 0) * 100).toFixed(0)}%)`}
            >
              {pieData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
        <div className="flex-1 flex flex-col items-center md:items-end gap-4">
          <span className="inline-block bg-blue-100 text-blue-800 text-base font-semibold px-4 py-2 rounded-lg shadow">
            Total Bookings: <span className="font-bold">{bookings.length}</span>
          </span>
          <input
            type="text"
            placeholder="Search for bookings..."
            value={search}
            onChange={handleSearch}
            className="border border-gray-300 rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">ID</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">Customer ID</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">Vendor</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">Vehicle</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">Service</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">Scheduled Time</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">Payment Method</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">Payment Status</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">Status</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">Created At</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">Updated At</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">Edit</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">Delete</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {filteredBookings.length === 0 ? (
              <tr>
                <td colSpan={13} className="text-center py-8 text-gray-400">
                  No bookings match your search.
                </td>
              </tr>
            ) : (
              filteredBookings.map((booking: Bookings) => (
                <tr key={booking.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 whitespace-nowrap">{booking.id}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{booking.customer}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{booking.vendor}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{booking.vehicle}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{booking.service}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{new Date(booking.scheduled_at).toLocaleDateString()}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className={
                        (booking.payment_method === 'credit_card' || booking.payment_method === 'debit_card')
                          ? 'bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold'
                          : booking.payment_method === 'cash'
                          ? 'bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold'
                          : 'bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-semibold'
                      }
                    >
                      {booking.payment_method}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className={
                        booking.payment_status === 'paid'
                          ? 'bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold'
                          : booking.payment_status === 'unpaid'
                          ? 'bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-semibold'
                          : 'bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold'
                      }
                    >
                      {booking.payment_status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className={
                        booking.status === 'confirmed'
                          ? 'bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold'
                          : booking.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-semibold'
                          : 'bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-semibold'
                      }
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">{new Date(booking.created_at).toLocaleDateString()}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{new Date(booking.updated_at).toLocaleDateString()}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <button
                      onClick={() => handleUpdateBooking(booking.id, 'confirmed')}
                     className="text-blue-600 hover:text-blue-800 font-semibold transition">Edit</button>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <button
                      onClick={() => handleDeleteBooking(booking.id)}
                      className="rounded-full p-2 bg-red-400 hover:bg-red-200 text-red-600 hover:text-red-800 transition"
                      title="Delete booking"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}