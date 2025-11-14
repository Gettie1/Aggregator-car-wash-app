import { useStore } from '@tanstack/react-form'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { toast } from 'sonner'
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { Bookings } from '@/types/users'
import { useBookingsByCustomerId, useDeleteBooking } from '@/hooks/bookings'
import { authStore } from '@/store/authStore'
import BookingModal from '@/components/modals/BookingModal'
import { useInitializePayment, useVerifyPayment } from '@/hooks/payments'
import { PaymentMethod } from '@/api/PaymentApi'
// import { useCustomer } from '@/hooks/customers'

export const Route = createFileRoute('/dashboard/dashboard/MyBookings')({
  component: RouteComponent,
})

function RouteComponent() {
  const [search, setSearch] = useState('')
  const {user} = useStore(authStore)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const { data: bookings, isLoading } = useBookingsByCustomerId(user.customerId ? Number(user.customerId) : 0)
  // const { data: customers } = useCustomer(user.customerId ? Number(user.customerId) : 0)
  console.log('user', user)
  const {mutateAsync: paymentMutation} = useInitializePayment()
  const {mutateAsync: verifyPayment} = useVerifyPayment()

  const handleInitiatePayment = async (bookingId: number) => {
    if (!user.email || !user.firstname || !user.lastname) {
      toast.error('Please ensure your profile is complete before making a payment.')
      return
    }
    const booking = bookings.find((b: Bookings) => b.id === bookingId)
    if (!booking) {
      toast.error('Booking not found')
      return
    }
    let price = booking.servicePrice || booking.price || 0
    if (typeof price === 'string') {
      price = parseFloat(price)
    }
    if (isNaN(price) || price <= 0) {
      toast.error('Invalid booking price. Please contact support.')
      return
    }
    const payload = {
email: user.email,
amount: Number(price),
first_name: user.firstname,
last_name: user.lastname,
booking_id: bookingId,
payment_method: PaymentMethod.CARD,
}
    console.log('Initiating payment with payload:', payload)
    try {

      const response = await paymentMutation(
        {
        email: user.email,
        amount: Number(price),
        first_name: user.firstname,
        last_name: user.lastname,
        booking_id: bookingId,
        payment_method: PaymentMethod.CARD,
      })
      const data = response.data
      window.location.href = data.data.authorization_url
      verifyPayment(data.data.paystack_reference)
    } catch (error) {
      console.error('Payment initiation failed:', error)
      toast.error('Failed to initiate payment. Please try again.')
    }
  }

  const deleteBookingMutation = useDeleteBooking()
  const handleDeleteBooking = (bookingId: number) => {
    if (confirm('Are you sure you want to delete this booking?')) {
      deleteBookingMutation.mutate(bookingId)
    }
    toast.success('Booking deleted successfully!')
  }

  const COLORS = ['#00C49F', '#FFBB28', '#FF8042', '#8884d8']

  // interface StatusCount {
  //   [status: string]: number
  // }

  // interface StatusDataItem {
  //   name: string
  //   value: number
  // }

  const statusData = Array.isArray(bookings)
  ? Object.entries(
      bookings.reduce((acc, booking) => {
        acc[booking.status] = (acc[booking.status] || 0) + 1
        return acc
      }, {} as Record<string, number>)
    ).map(([status, count]) => ({ name: status, value: count }))
  : []

const bookingsByDate = Array.isArray(bookings)
  ? bookings.reduce((acc, booking) => {
      const date = new Date(booking.created_at).toLocaleDateString()
      acc[date] = (acc[date] || 0) + 1
      return acc
    }, {} as Record<string, number>)
  : {}

const dateChartData = Object.entries(bookingsByDate).map(([date, count]) => ({
  date,
  count,
}))

const bookingsByService = Array.isArray(bookings)
  ? bookings.reduce((acc, booking) => {
      acc[booking.service] = (acc[booking.service] || 0) + 1
      return acc
    }, {} as Record<string, number>)
  : {}

const serviceChartData = Object.entries(bookingsByService).map(
  ([service, count]) => ({
    service,
    count,
  })
)


  if (isLoading) return <div>Loading...</div>
  if (!user.customerId) return <div>You must be logged in to view your bookings.</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">My Bookings</h2>
        {showBookingModal && (
          <div className="mb-6 w-full">
            <div className="bg-white border border-gray-200 w-full max-w-md rounded-lg shadow p-6">
              <BookingModal
                isOpen={true}
                onClose={() => setShowBookingModal(false)}
              />
            </div>
          </div>
        )}
        <button 
          onClick={() => setShowBookingModal(true)} 
          className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add Booking
        </button>
      </div>

      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          placeholder="Search by service..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full max-w-xs"
        />
      </div>
      <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 shadow rounded">
          <h4 className="text-lg font-semibold mb-2">Bookings by Status</h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60}>
                {statusData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 shadow rounded">
          <h4 className="text-lg font-semibold mb-2">Bookings Over Time</h4>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={dateChartData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 shadow rounded">
          <h4 className="text-lg font-semibold mb-2">Bookings per Service</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={serviceChartData}>
              <XAxis dataKey="service" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#00C49F" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <button className='rounded-full p-2'>Total Bookings: {bookings.length}</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {bookings
          .filter((booking: Bookings) =>
            booking.service.toLowerCase().includes(search.toLowerCase())
          )
          .map((booking: Bookings) => (
            <div
              key={booking.id}
              className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition duration-300 border border-gray-100"
            >
              <h3 className="text-xl font-bold text-blue-700 mb-3 text-center">
                {booking.service}
              </h3>
              <div className="mb-4 space-y-1 text-center">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Date:</span>{' '}
                  {new Date(booking.created_at).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Time:</span>{' '}
                  {new Date(booking.scheduled_at).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium"></span>{' '}
                  <span
                    className={`px-2 py-1 rounded ${
                      booking.status === 'confirmed'
                        ? 'bg-green-100 text-green-700'
                        : booking.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {booking.status}
                  </span>
                </p>
              </div>
              <div className="flex justify-center gap-4 mt-4 p-1 text-sm">
                {booking.status === 'pending' && (
                  <button
                    onClick={() => handleInitiatePayment(booking.id)}
                    className="bg-green-600 text-white text-sm px-3 rounded-lg hover:bg-green-700 transition"
                  >
                    Pay Now
                  </button>
                )}

                <button
                  onClick={() => setShowBookingModal(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Details
                </button>
                <button
                  onClick={() => handleDeleteBooking(booking.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
      </div>
      {bookings.length === 0 && (
        <p className="text-gray-500">No bookings found.</p>
      )}
    </div>
  )
}
