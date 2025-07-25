import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useStore } from "@tanstack/react-form";
import BookingModal from "../modals/BookingModal";
import type { Bookings } from "@/types/users";
import StatCard from "@/components/statCard";
import { authStore } from "@/store/authStore";
import { useVehiclebyCustomerId } from "@/hooks/vehicle";
import { useReviewsByCustomerId } from "@/hooks/reviews";
import { useBookingsByCustomerId } from "@/hooks/bookings";

function CustomerDashboardOverview() {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const { user } = useStore(authStore);

  const { data: vehicles } = useVehiclebyCustomerId(user.customerId ?? 0);
  const { data: bookings } = useBookingsByCustomerId(user.customerId ? Number(user.customerId) : 0);
  const { data: reviews } = useReviewsByCustomerId(user.customerId ?? 0);

  // Helper function to safely get next booking
  const getNextBooking = () => {
    if (!bookings || bookings.length === 0) return null;
    const now = new Date();
    return bookings.find(
      (b: any) =>
        b.scheduled_at &&
        new Date(b.scheduled_at) > now &&
        b.status !== "completed" &&
        b.status !== "cancelled"
    );
  };

  const nextBooking = getNextBooking();
  const completedBookings = bookings ? bookings.filter((b: any) => b.status === "completed") : [];

  return (
    <div className="space-y-10 max-w-5xl mx-auto px-4 py-8">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 p-8 rounded-2xl shadow flex flex-col gap-2 text-white">
        <h1 className="text-2xl font-bold">
          Welcome back, {user.firstname || "Customer"} 👋
        </h1>
        <p className="text-base opacity-90">
          Here&apos;s a quick look at your car wash activity.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
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
      <div className="bg-white p-8 rounded-2xl shadow flex flex-col gap-4">
        <h2 className="text-xl font-semibold mb-2 text-blue-700">Your Next Booking</h2>
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
              <ul className="text-gray-700 space-y-2">
                <li>
                  <span className="font-medium text-gray-900">Service:</span>{" "}
                  {nextConfirmed.service?.name || "N/A"}
                </li>
                <li>
                  <span className="font-medium text-gray-900">Vehicle:</span>{" "}
                  {nextConfirmed.vehicle?.plate || nextConfirmed.vehicle?.model || "N/A"}
                </li>
                <li>
                  <span className="font-medium text-gray-900">Date & Time:</span>{" "}
                  {new Date(nextConfirmed.scheduled_at).toLocaleString()}
                </li>
                <li>
                  <span className="font-medium text-gray-900">Vendor:</span>{" "}
                  {nextConfirmed.vendor?.business_name || "N/A"}
                </li>
                <li>
                  <span className="font-medium text-gray-900">Location:</span>{" "}
                  {nextConfirmed.location || "Nairobi"}
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
      <div className="bg-white p-8 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4 text-blue-700">Recent Bookings</h2>
        {bookings && bookings.length > 0 ? (
          <ul className="space-y-3">
            {bookings.slice(0, 5).map((booking: Bookings) => (
              <li
                key={booking.id}
                className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition flex justify-between items-center border border-gray-100"
              >
                <div>
                  <span className="block text-sm text-gray-500">Booking ID: {booking.id}</span>
                  <h3 className="font-semibold text-lg text-blue-800">
                    {typeof booking.service === "string"
                      ? booking.service
                      : booking.service?.name || "N/A"}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {new Date(booking.scheduled_at).toLocaleString()}
                  </p>
                </div>
                <span
                  className={`text-xs px-3 py-1 rounded-full font-semibold
                    ${
                      booking.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : booking.status === "confirmed"
                        ? "bg-green-100 text-green-700"
                        // : booking.status === "completed"
                        // ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-700"
                    }
                  `}
                >
                  {booking.status}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No recent bookings found.</p>
        )}
      </div>

      {/* Quick Actions */}
      <div className="flex flex-col md:flex-row gap-4 justify-end">
        <button
          type="button"
          className="px-8 py-3 bg-blue-600 text-white rounded-full font-semibold shadow hover:bg-blue-700 transition"
          onClick={() => setShowBookingModal(true)}
        >
          Book a Wash
        </button>
        {showBookingModal && (
          <BookingModal
            isOpen={true}
            onClose={() => setShowBookingModal(false)}
          />
        )}
        <Link
          to="/dashboard/dashboard/vehicles"
          className="px-8 py-3 border border-blue-600 text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition"
        >
          Add Vehicle
        </Link>
      </div>
    </div>
  );
}

export default CustomerDashboardOverview;
