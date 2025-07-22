import { useStore } from '@tanstack/react-form'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { toast } from 'sonner'
import type { Bookings } from '@/types/users'
import { useBookingsByCustomerId, useDeleteBooking } from '@/hooks/bookings'
import { authStore } from '@/store/authStore'
import BookingModal from '@/components/modals/BookingModal'
import { useInitializePayment, useVerifyPayment } from '@/hooks/payments'
import { PaymentMethod } from '@/api/PaymentApi'
import { useCustomer } from '@/hooks/customers'

export const Route = createFileRoute('/dashboard/dashboard/MyBookings')({
  component: RouteComponent,
})

function RouteComponent() {
  const [search, setSearch] = useState('')
  const {user} = useStore(authStore)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const { data: bookings, isLoading } = useBookingsByCustomerId(user.customerId ? Number(user.customerId) : 0)
  const { data: customers } = useCustomer(user.customerId ? String(user.customerId) : '')
  console.log('Customer data:', customers)
  console.log('Bookings data:', bookings)

  const {mutateAsync: paymentMutation} = useInitializePayment()
  const {mutateAsync: verifyPayment} = useVerifyPayment()

  const handleInitiatePayment = async (bookingId: number) => {
    if (!user.email || !user.firstname || !user.lastname) {
      toast.error('Please ensure your profile is complete before making a payment.')
      return
    }
    // Log the booking ID and user details for debugging
    console.log('User details:', {
      email: user.email,
      first_name: user.firstname,
      last_name: user.lastname,
    })
    console.log(`Initiating payment for booking ID: ${bookingId}`)
    
    // Find the booking by ID
    const booking = bookings.find((b: Bookings) => b.id === bookingId)
    if (!booking) {
      toast.error('Booking not found')
      return
    }
    
    // Fetch the price from the service and ensure it's a valid number
    let price = booking.servicePrice || booking.price || 0
    
    // Convert to number if it's a string
    if (typeof price === 'string') {
      price = parseFloat(price)
    }
    
    // Validate that price is a valid number
    if (isNaN(price) || price <= 0) {
      toast.error('Invalid booking price. Please contact support.')
      console.error('Invalid price for booking:', { bookingId, price, booking })
      return
    }
    
    console.log(`Price for booking ID ${bookingId}:`, price, typeof price)

    try {
      const response = await paymentMutation({
        email: user.email,
        amount: Number(price), // Ensure it's a number
        first_name: user.firstname,
        last_name: user.lastname,
        phone_number: customers?.phone_number || '', // Fetch phone number from customers hook
        booking_id: bookingId,
        payment_method: PaymentMethod.CARD, // Default to card payment
      })
      const data = response.data
      // Redirect to the payment URL
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

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (!user.customerId) {
    return <div>You must be logged in to view your bookings.</div>
  }

  return <div>
    <div className="flex items-center justify-between mb-4">
    <h2 className="text-2xl font-bold mb-6 text-gray-800">My Bookings</h2>
    {showBookingModal && (
      <div className="mb-6 w-full">
  <div className="bg-white border border-gray-200 w-full max-w-md rounded-lg shadow p-6">

        <BookingModal
        isOpen={true}
        onClose={() => setShowBookingModal(false)}
        // user={user}
        // vehicles={vehicles}
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
    <div className="mb-4 flex items-center justify-between">
    <input
      type="text"
      placeholder="Search bookings..."
      onChange={(e) => setSearch(e.target.value)}
      value={search}
      className="mb-4 p-2 border rounded"
    />
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
    {/* )} */}
  </div>
}
