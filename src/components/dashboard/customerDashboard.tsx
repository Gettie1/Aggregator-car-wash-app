import { Link } from "@tanstack/react-router"
import { useState } from "react"
import BookingModal from "../bookings/BookingModal"
import StatCard from "@/components/statCard"
import { authStore } from "@/store/authStore"
import { useVehiclebyCustomerId } from "@/hooks/vehicle"
import { useReviewsByCustomerId } from "@/hooks/reviews"
import { useBookingsByCustomerId } from "@/hooks/bookings"

function CustomerDashboardOverview() {
  const [showBookingModal, setShowBookingModal] = useState(false)
  const { user } = authStore.state
  
  const customerId = user.customerId
  
  const { data: vehicles } = useVehiclebyCustomerId(customerId || '')
  const { data: bookings } = useBookingsByCustomerId(customerId || '')
  const { data: reviews } = useReviewsByCustomerId(user.id)
  
  // Helper function to safely get next booking
  const getNextBooking = () => {
    if (!bookings || bookings.length === 0) return null
    const now = new Date()
    return bookings.find(
      (b: any) =>
        b.scheduled_at &&
        new Date(b.scheduled_at) > now &&
        b.status !== "completed" &&
        b.status !== "cancelled"
    )
  }
  
  const nextBooking = getNextBooking()
  const completedBookings = bookings ? bookings.filter((b: any) => b.status === "completed") : []
  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="bg-white p-6 rounded shadow">
        <h1 className="text-xl font-bold">
          Welcome back, {user.firstname || "Customer"} 👋
        </h1>
        <p className="text-sm text-gray-600">
          Here's a quick look at your car wash activity.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard icon="🚗" title="Vehicles Linked" value={vehicles ? vehicles.length : 0} />
        <StatCard
          icon="📅"
          title="Upcoming Booking"
          value={nextBooking ? new Date(nextBooking.scheduled_at).toLocaleString() : "None"}
        />
        <StatCard
          icon="✅"
          title="Completed Bookings"
          value={completedBookings.length}
        />
        <StatCard icon="⭐" title="Reviews Submitted" value={reviews ? reviews.length : 0} />
      </div>

      {/* Next Booking Details */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Your Next Booking</h2>
        {nextBooking ? (
          <ul className="text-gray-700 space-y-1">
            <li>
              <strong>Service:</strong> {nextBooking.service?.name || "N/A"}
            </li>
            <li>
              <strong>Vehicle:</strong> {nextBooking.vehicle?.plate || nextBooking.vehicle?.model || "N/A"}
            </li>
            <li>
              <strong>Date & Time:</strong> {new Date(nextBooking.scheduled_at).toLocaleString()}
            </li>
            <li>
              <strong>Vendor:</strong> {nextBooking.vendor?.business_name || "N/A"}
            </li>
            <li>
              <strong>Location:</strong> {nextBooking.location || "Nairobi"}
            </li>
          </ul>
        ) : (
          <p className="text-gray-500">No upcoming bookings. Ready to book a wash?</p>
        )}
      </div>

      {/* Recent Bookings */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Recent Bookings</h2>
        <ul className="divide-y border rounded shadow bg-white">
          <li className="p-4 flex justify-between">
            <div>
              <div className="font-medium">June 24 - KCU 223D</div>
              <div className="text-sm text-gray-500">Interior & Exterior</div>
            </div>
            <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded">Completed</span>
          </li>
          <li className="p-4 flex justify-between">
            <div>
              <div className="font-medium">June 10 - KDK 121A</div>
              <div className="text-sm text-gray-500">Exterior Only</div>
            </div>
            <span className="bg-red-100 text-red-800 text-sm px-3 py-1 rounded">Cancelled</span>
          </li>
        </ul>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-4">
        <button
          type="button"
          className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700"
          onClick={() => setShowBookingModal(true)}
        >
          Book a Wash
        </button>
        {showBookingModal && (
          <BookingModal
            isOpen={true}
            onClose={() => setShowBookingModal(false)}
            // user={user}
            // vehicles={vehicles}
          />
        )}
        <Link
          to="/dashboard/dashboard/vehicles"
          className="px-6 py-3 border border-blue-600 text-blue-600 rounded-full font-medium hover:bg-blue-50"
        >
          Add Vehicle
        </Link>
      </div>
    </div>
  )
}

export default CustomerDashboardOverview
