import { createFileRoute } from '@tanstack/react-router'
// import { usePagination } from '@table-library/react-table-library/pagination'
import {  useState } from 'react'
import { toast } from 'sonner'
import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts';
import type { Bookings } from '@/types/users'
import { useBookings, useDeleteBooking } from '@/hooks/bookings'



export const Route = createFileRoute('/dashboard/dashboard/AllBookings')({
  component: RouteComponent,
})

function RouteComponent() {
  const [ search, setSearch ] = useState('')
  const { data:bookings} = useBookings()
  const deleteBookingMutation = useDeleteBooking()

  const handleDeleteBooking = (bookingId: number) => {
    if (confirm('Are you sure you want to delete this booking?')) {
      deleteBookingMutation.mutate(bookingId.toString())
    }
    toast.success('Booking deleted successfully!')
  }
 
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }
  
  if (!bookings) {
    return <div>No bookings found.</div>
  }
  return <>
    <div className="mt-8 flex justify-center">
      <PieChart width={400} height={300}>
        <Pie
          data={[
            { name: 'Pending', value: bookings.filter((b: Bookings) => b.status === 'pending').length },
            { name: 'Confirmed', value: bookings.filter((b: Bookings) => b.status === 'confirmed').length },
            // { name: 'Completed', value: bookings.filter((b: Bookings) => b.status === 'completed').length },
            { name: 'Cancelled', value: bookings.filter((b: Bookings)=> b.status === 'cancelled').length },
          ]}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label
        >
          {[
            { name: 'Pending', value: bookings.filter((b: Bookings)=> b.status === 'pending').length },
            { name: 'Confirmed', value: bookings.filter((b: Bookings) => b.status === 'confirmed').length },
            // { name: 'Completed', value: bookings.filter((b: Bookings) => b.status === 'completed').length },
            { name: 'Cancelled', value: bookings.filter((b: Bookings) => b.status === 'cancelled').length },
          ].map((entry, index) => (
            <Cell key={`cell-${index}`} fill={['#FFBB28', '#00C49F', '#0088FE', '#FF8042'][index % 4]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
    <h1 className='text-2xl font-bold mb-3'>All Bookings</h1>
    <div className="flex items-center justify-between mb-4">
      <input
        type="text"
        placeholder="Search for bookings..."
        value={search}
        onChange={handleSearch}
        className="border border-gray-300 rounded px-4 py-2" />
  <div className="mt-6 flex items-center justify-end"> 
      <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-2 rounded-lg shadow-sm"> 
        Total Bookings: <span className="font-bold">{bookings.length}</span> 
      </span>
    </div>
    </div>
    {/* <h2 className='font-bold text-xl'>Bookings</h2><h3 className="text-xl font-semi-bold mb-3">You can manage all Bookings</h3> */}
    {/* //     implement filtering */} 
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
            {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th> */}
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
          {bookings.map((booking: Bookings) => (
            <tr key={booking.id}>
              <td className="px-6 py-4 whitespace-nowrap">{booking.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{booking.customer}</td>
              <td className="px-6 py-4 whitespace-nowrap">{booking.vendor}</td>
              <td className="px-6 py-4 whitespace-nowrap">{booking.vehicle}</td>
              <td className="px-6 py-4 whitespace-nowrap">{booking.service}</td>
              <td className="px-6 py-4 whitespace-nowrap">{new Date(booking.scheduled_at).toLocaleDateString()}</td>
              <td className="px-6 py-4 whitespace-nowrap">{booking.location}</td>
              {/* <td className="px-6 py-4 whitespace-nowrap">{booking.duration}</td> */}
              <td className="px-6 py-4 whitespace-nowrap">{booking.payment_method}</td>
              <td className="px-6 py-4 whitespace-nowrap">{booking.payment_status}</td>
              <td className="px-6 py-4 whitespace-nowrap">{booking.status}</td>
              <td className="px-6 py-4 whitespace-nowrap">{new Date(booking.created_at).toLocaleDateString()}</td>
              <td className="px-6 py-4 whitespace-nowrap">{new Date(booking.updated_at).toLocaleDateString()}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button className="text-blue-600 hover:text-blue-800 font-semi-bold">Edit</button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button 
                onClick={() => handleDeleteBooking(booking.id)}
                className="text-red-600 hover:text-red-800 font-semi-bold">Delete</button>
              </td>

            </tr>
          ))}
        </tbody>
    </table>
    {/* Chart will be rendered below */}
    </div>
    {/* Pie Chart for Booking Status */}
  </>
}