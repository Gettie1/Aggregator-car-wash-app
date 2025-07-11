import { Link } from "@tanstack/react-router"
import { useStore } from "@tanstack/react-form"
import { useState } from "react"
import BookingModal from "../bookings/BookingModal"
import StatCard from "@/components/statCard"
// import { User } from "@/types/auth"
import { authStore } from "@/store/authStore"
import { useVehiclebyCustomerId } from "@/hooks/vehicle"
import { useReviewsByCustomerId } from "@/hooks/reviews"

function CustomerDashboardOverview() {
  const [showBookingModal, setShowBookingModal] = useState(false)
  const { user } = useStore(authStore)
  const { data: vehicles } = useVehiclebyCustomerId(user.id)
  const {  data: bookings, } = useVehiclebyCustomerId(user.id)
  const { data: reviews } = useReviewsByCustomerId(user.id)
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
          value={
        bookings && bookings.length > 0
          ? (() => {
          const now = new Date();
          const upcoming = bookings.find(
            (b: any) =>
              b.scheduled_at &&
              new Date(b.scheduled_at) > now &&
              b.status !== "completed" &&
              b.status !== "cancelled"
          );
          return upcoming
            ? new Date(upcoming.scheduled_at).toLocaleString()
            : "None";
            })()
          : "None"
          }
        />
        <StatCard
          icon="✅"
          title="Completed Bookings"
          value={
        bookings
          ? bookings.filter((b: any) => b.status === "completed").length
          : 0
          }
        />
        <StatCard icon="⭐" title="Reviews Submitted" value={reviews ? reviews.length : 0} />
      </div>

      {/* Next Booking Details */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Your Next Booking</h2>
        <ul className="text-gray-700 space-y-1">
          <strong>Service:</strong> {bookings && bookings.length > 0 && bookings[0].service ? bookings[0].service.name : "N/A"}
            <li>
            <strong>Vehicle:</strong>{" "}
            {bookings && bookings.length > 0 && bookings[0].vehicle
              ? bookings[0].vehicle.plate || bookings[0].vehicle.model
              : "N/A"}
            </li>
            <li>
            <strong>Date & Time:</strong>{" "}
            {bookings && bookings.length > 0 && bookings[0].time
              ? new Date(bookings[0].scheduled_at).toLocaleString()
              : "N/A"}
            </li>
            <li>
            <strong>Vendor:</strong>{" "}
            {bookings && bookings.length > 0 && bookings[0].vendor
              ? bookings[0].vendor.bussiness_name
              : "N/A"}
            </li>
            <li>
            <strong>Location:</strong>{" "}
            {bookings && bookings.length > 0 && bookings[0].location
              ? bookings[0].location
              : "Nairobi"}
            </li>
        </ul>
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
