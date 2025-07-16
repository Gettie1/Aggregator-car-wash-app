import { Link } from '@tanstack/react-router'
import { useStore } from '@tanstack/react-form'
import type { Bookings } from '@/types/users'
import { useVendors } from '@/hooks/vendors'
import { useCustomers } from '@/hooks/customers'
import { useBookings } from '@/hooks/bookings'
import { useServices } from '@/hooks/services'
import StatCard from '@/components/statCard'
import { authStore } from '@/store/authStore'

function AdminDashboardOverview() {
  const {user} = useStore(authStore)
  const { data: vendors } = useVendors()
  const { data: customers } = useCustomers()
  const { data: bookings } = useBookings()
  const { data: services } = useServices()

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold">Welcome back, {user.firstname} 👑</h1>
        <p className="text-sm text-gray-600">
          Here's a quick summary of your platform activity.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard icon="🏢" title="Total Vendors" value={vendors?.length || 0} />
        <StatCard icon="👥" title="Total Customers" value={customers?.length || 0} />
        <StatCard icon="📦" title="Bookings Made" value={bookings?.length || 0} />
        <StatCard icon="🛠️" title="Active Services" value={services?.length || 0} />
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Recent Bookings</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase tracking-wider text-left">
              <tr>
                <th className="px-4 py-2">Customer</th>
                <th className="px-4 py-2">Vendor</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Service</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y bg-white">
              {bookings?.map((booking: Bookings) => (
                <tr key={booking.id}>
                  <td className="px-4 py-2">{booking.customer}</td>
                  <td className="px-4 py-2">{booking.vendor}</td>
                  <td className="px-4 py-2">
                    {new Date(booking.scheduled_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">{booking.service}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        booking.status === 'confirmed'
                          ? 'bg-green-100 text-green-800'
                          : booking.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Admin Actions */}
      <div className="flex gap-4">
        <Link
          to="/dashboard/dashboard/vendors"
          className="px-6 py-3 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700"
        >
          View Vendors
        </Link>
        <Link
          to="/dashboard/dashboard/customers"
          className="px-6 py-3 border border-purple-600 text-purple-600 rounded-full font-medium hover:bg-purple-50"
        >
          View Customers
        </Link>
        <Link
          to="/dashboard/dashboard/AllBookings"
          className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700"
        >
          Manage Bookings
        </Link>
      </div>
    </div>
  )
}

export default AdminDashboardOverview
