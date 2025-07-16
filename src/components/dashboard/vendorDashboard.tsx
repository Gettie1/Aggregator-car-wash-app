import { Link } from "@tanstack/react-router";
import type { Bookings } from "@/types/users";
import { authStore } from "@/store/authStore";
import StatCard from "@/components/statCard";
import { useServiceByVendorId } from "@/hooks/services";
import { useBookings } from "@/hooks/bookings";
import { useReviews } from "@/hooks/reviews";
import { useVendor } from "@/hooks/vendors";

function VendorDashboardOverview() {
  const { user } = authStore.state;
  const vendorId = user.vendorId;
  
  const { data: vendorData } = useVendor(vendorId || '');
  const { data: services } = useServiceByVendorId(vendorId || '');
  const { data: bookings } = useBookings();
  const { data: reviews } = useReviews();

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold">Welcome, {user.firstname} 👋</h1>
        <p className="text-sm mt-1">Manage your services and bookings with ease.</p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon="🛠️" title="Services Offered" value={services?.length || 0} />
        <StatCard icon="📆" title="Total Bookings" value={bookings?.length || 0} />
        <StatCard icon="⭐" title="Total Reviews" value={reviews?.length || 0} />
        <StatCard icon="📈" title="Active Status" value={vendorData?.vendor?.status || "Active"} />
      </div>

      {/* Recent Bookings (Example Layout) */}
      <div className="bg-white rounded shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Bookings</h2>
        <ul className="divide-y divide-gray-200">
          {bookings?.slice(0, 3).map((b: Bookings) => (
            <li key={b.id} className="py-3 flex justify-between">
              <div>
                <p className="font-medium">Service: {b.service || "N/A"}</p>
                <p className="text-sm text-gray-500">Date: {new Date(b.scheduled_at).toLocaleString()}</p>
              </div>
                <span
                className={`text-sm p-1 rounded-full flex items-center justify-center min-w-[90px] ${
                  b.status === 'confirmed'
                  ? 'bg-green-100 text-green-700'
                  : b.status === 'cancelled'
                  ? 'bg-red-100 text-red-700'
                  : 'bg-yellow-100 text-yellow-700'
                }`}
                style={{ textAlign: "center" }}
                >
                {b.status}
                </span>
            </li>
          )) || <p className="text-gray-400">No bookings found</p>}
        </ul>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-4">
        <Link
          to="/dashboard/dashboard/services"
          className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700"
        >
          Add New Service
        </Link>
        <Link
          to="/dashboard/dashboard/bookings"
          className="px-6 py-3 border border-blue-600 text-blue-600 rounded-full font-medium hover:bg-blue-50"
        >
          View All Bookings
        </Link>
      </div>
    </div>
  );
}

export default VendorDashboardOverview;
