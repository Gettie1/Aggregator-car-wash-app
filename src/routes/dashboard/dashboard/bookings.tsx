import { createFileRoute } from '@tanstack/react-router'
import { useStore } from '@tanstack/react-form'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { toast } from 'sonner';
import { useState } from 'react';
import type { Bookings } from '@/types/users'
import { useBookingsByVendorId, useCreateBooking, useUpdateBookingStatus } from '@/hooks/bookings'
import { authStore } from '@/store/authStore'

export const Route = createFileRoute('/dashboard/dashboard/bookings')({
  component: VendorBookingsSection,
})

function VendorBookingsSection() {
  const { user } = useStore(authStore)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    customerId: 0,
    vendorName: '',
    serviceName: '',
    scheduled_at: '',
    payment_method: '',
  })
  
  // Debug the user object
  console.log('🔍 Full user object:', user)
  console.log('🔍 User vendorId:', user.vendorId)
  console.log('🔍 User vendorId type:', typeof user.vendorId)
  console.log('🔍 User role:', user.role)

  const updateStatusMutation = useUpdateBookingStatus()
  const handleStatusUpdate = (bookingId: number, status: string) => {
    updateStatusMutation.mutate({ id: bookingId, status })
  }
  const createBookingMutation = useCreateBooking()
  // const handleCreateBooking = () => {
  //   setFormData({
  //     vendorName: '',
  //     serviceName: '',
  //     customerId: 0,
  //     scheduled_at: '',
  //     payment_method: 'credit_card',
  //   })
  //   setShowModal(true)
  // }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createBookingMutation.mutate({
      ...formData,
      customerId: Number(formData.customerId), // Ensure customerId is a number
      // vendorId: user.vendorId, // Ensure vendorId is included

    })
    toast.success('Booking created successfully!')
    // Add your booking creation logic here
    console.log('Booking data submitted:', formData)
    setShowModal(false)
  }
  // Check if user has vendorId before making the query
  if (!user.vendorId) {
    return (
      <div className="container mx-auto p-4">
        <h1 className='text-2xl font-bold mb-4'>Bookings</h1>
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <p className="text-yellow-800">
            No vendor ID found. Please ensure you are logged in as a vendor.
          </p>
          <p className="text-sm text-yellow-600 mt-2">
            Current role: {user.role || 'Not set'}
          </p>
        </div>
      </div>
    )
  }
  
  const { data: bookings, isLoading } = useBookingsByVendorId(user.vendorId)

 if (isLoading) {
  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        {/* <h1 className="text-2xl font-bold">Bookings</h1> */}
        <button
          onClick={() => setShowModal(true)}
         className="bg-blue-500 text-white px-4 py-2 rounded shadow">
          + Booking
        </button>
      </div>
      <p>Loading bookings...</p>
    </div>
  )
}

if (!bookings || bookings.length === 0) {
  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        {/* <h1 className="text-2xl font-bold">Bookings</h1> */}
        <button
          onClick={() => setShowModal(true)}
         className="bg-blue-500 text-white px-4 py-2 rounded shadow">
          + Booking
        </button>
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add Booking</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Id</label>
                <input
                  type="text"
                  name="customerId"
                  value={formData.customerId}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Vendor Name</label>
                <input
                  type="text"
                  name="vendorName"
                  value={formData.vendorName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
{/*       
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle</label>
                <input
                  type="text"
                  name="vehiclePlateNo"
                  value={formData.vehiclePlateNo}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                /> */}
              {/* </div> */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
                <input
                  type="text"
                  name="serviceName"
                  value={formData.serviceName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Scheduled Time</label>
                <input
                  type="datetime-local"
                  name="scheduled_at"
                  value={formData.scheduled_at}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
             
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                <select
                  name="payment_method"
                  value={formData.payment_method}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="credit_card">Credit Card</option>
                  <option value="mobile_money">Mobile Money</option>
                  <option value="cash">Cash</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
              >
                Add Booking
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
      <p>No bookings yet.</p>
    </div>
  )
}

  const statusCounts = bookings.reduce((acc: Record<string, number>, booking: Bookings) => {
  const status = booking.status;
  acc[status] = (acc[status] || 0) + 1;
  return acc;
}, {});

// Convert the grouped object to an array for Recharts
const statusChartData = Object.entries(statusCounts).map(([status, count]) => ({
  status,
  count,
}));

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className='text-2xl font-bold'>Bookings</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded shadow"
        >
          + Booking
        </button>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add Booking</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Id</label>
                <input
                  type="text"
                  name="customerId"
                  value={formData.customerId}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Vendor Name</label>
                <input
                  type="text"
                  name="vendorName"
                  value={formData.vendorName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
                <input
                  type="text"
                  name="serviceName"
                  value={formData.serviceName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Scheduled Time</label>
                <input
                  type="datetime-local"
                  name="scheduled_at"
                  value={formData.scheduled_at}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                <select
                  name="payment_method"
                  value={formData.payment_method}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="credit_card">Credit Card</option>
                  <option value="mobile_money">Mobile Money</option>
                  <option value="cash">Cash</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
              >
                Add Booking
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
      {/* <h1 className='text-2xl font-bold mb-4'>Bookings</h1> */}
      <div className="bg-white p-6 rounded shadow mb-8">
      <h2 className="text-lg font-semibold mb-4">Bookings by Status</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={statusChartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="status" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
      <div className="flex items-center justify-between">
      <span className=" bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-2 rounded-lg shadow-sm mt-6 flex items-center justify-end">
        Total Bookings: <span className="font-bold">{bookings.length}</span>
      </span>
    </div>
    <div className="bg-white p-6 mt-8 rounded shadow">
      {/* <h2 className="text-lg font-bold mb-4">Manage Bookings</h2> */}

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
              <th className="px-4 py-2">Payment Method</th>
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
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    booking.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : booking.status === 'confirmed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {booking.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  {booking.payment_status === 'paid' ? (
                    <span className="text-green-600">Paid</span>
                  ) : (
                    <span className="text-red-600">Unpaid</span>
                  )}
                </td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    booking.payment_method === 'credit_card'
                      ? 'bg-blue-100 text-blue-800'
                      : booking.payment_method === 'debit_card'
                      ? 'bg-green-100 text-green-800'
                      : booking.payment_method === 'cash'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {booking.payment_method}
                  </span>
                </td>
               <td className="px-4 py-2 space-x-2">
  {booking.status === 'pending' && (
    <>
      <button
        onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
        className="text-green-600 hover:underline text-sm"
      >
        Confirm
      </button>
      <button
        onClick={() => handleStatusUpdate(booking.id, 'cancelled')}
        className="text-red-600 hover:underline text-sm"
      >
        Cancel
      </button>
    </>
  )}
  {booking.status === 'confirmed' && (
    <button
      onClick={() => handleStatusUpdate(booking.id, 'cancelled')}
      className="text-red-600 hover:underline text-sm"
    >
      Cancel
    </button>
  )}
</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  )
}

export default VendorBookingsSection

