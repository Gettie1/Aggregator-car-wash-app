import { Link } from "@tanstack/react-router"
import { useState } from "react"
import { useStore } from "@tanstack/react-form"
import BookingModal from "../modals/BookingModal"
import type { Bookings } from "@/types/users"
import StatCard from "@/components/statCard"
import { authStore } from "@/store/authStore"
import { useVehiclebyCustomerId } from "@/hooks/vehicle"
import { useReviewsByCustomerId } from "@/hooks/reviews"
import { useBookingsByCustomerId } from "@/hooks/bookings"

function CustomerDashboardOverview() {
  const [showBookingModal, setShowBookingModal] = useState(false)
  const { user } = useStore(authStore)

  const { data: vehicles } = useVehiclebyCustomerId(user.customerId ?? 0)
  const { data: bookings } = useBookingsByCustomerId(user.customerId ? Number(user.customerId) : 0)
  const { data: reviews } = useReviewsByCustomerId(user.customerId ?? 0)

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
        {bookings && bookings.length > 0 ? (
          (() => {
        const confirmedUpcoming = bookings
          .filter(
            (b: any) =>
          b.status === "confirmed" &&
          b.scheduled_at &&
          new Date(b.scheduled_at) > new Date()
          )
          .sort(
            (a: any, b: any) =>
          new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime()
          );
        const nextConfirmed = confirmedUpcoming[0];
        return nextConfirmed ? (
          <ul className="text-gray-700 space-y-1">
            <li>
          <strong>Service:</strong> {nextConfirmed.service?.name || "N/A"}
            </li>
            <li>
          <strong>Vehicle:</strong> {nextConfirmed.vehicle?.plate || nextConfirmed.vehicle?.model || "N/A"}
            </li>
            <li>
          <strong>Date & Time:</strong> {new Date(nextConfirmed.scheduled_at).toLocaleString()}
            </li>
            <li>
          <strong>Vendor:</strong> {nextConfirmed.vendor?.business_name || "N/A"}
            </li>
            <li>
          <strong>Location:</strong> {nextConfirmed.location || "Nairobi"}
            </li>
          </ul>
        ) : (
          <p className="text-gray-500">No upcoming confirmed bookings. Ready to book a wash?</p>
        );
          })()
        ) : (
          <p className="text-gray-500">No upcoming confirmed bookings. Ready to book a wash?</p>
        )}
      </div>

      {/* Recent Bookings */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Recent Bookings</h2>
        {bookings && bookings.length > 0 ? (
          <ul className="space-y-2">
            {bookings.map((booking: Bookings) => (
              <>
                <li key={booking.id} className="bg-white p-4 rounded shadow hover:shadow-lg transition flex justify-between items-center">
                  <div>
                  <strong className="text-gray-800">Booking ID: {booking.id}</strong>
                  <h3 className="font-semibold">{booking.service || "N/A"}</h3>
                  <p className="text-sm text-gray-600">
                    {new Date(booking.scheduled_at).toLocaleString()}
                  </p>
                  </div>
                    <p
                      className={`text-sm px-2 py-1 rounded 
                      ${
                        booking.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : booking.status === "confirmed"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                      }
                      `}
                    >
                      {booking.status}
                    </p>
                </li>
              </>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No recent bookings found.</p>
        )}
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
