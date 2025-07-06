import { Link, useRouterState } from '@tanstack/react-router'
import {
  Building2,
  CalendarCheck,
  LayoutDashboard,
  Settings,
  Star,
  User,
  Wrench,

} from 'lucide-react'
import { authStore } from '@/store/authStore'
import { Role } from '@/types/login'

export function DashboardSidebar() {
  const activeRoute = useRouterState({ select: (s) => s.location.pathname })

  // ✅ Get logged-in user role
  const { user } = authStore.state

  const linkClass = (path: string) =>
    `flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-200 ${
      activeRoute.startsWith(path) ? 'bg-gray-300 font-semibold' : ''
    }`

  return (
    <aside className="w-64 bg-gray-100 p-4 space-y-2">
      <Link to="/dashboard/dashboard/overview" className={linkClass('/dashboard/overview')}>
        <LayoutDashboard className="h-5 w-5" />
        Overview
      </Link>

      {/* Show to all roles (admin, vendor, user) */}
      <Link to="/dashboard/dashboard/profile" className={linkClass('/dashboard/profile')}>
        <User className="h-5 w-5" />
        Profile
      </Link>
      <Link to="/dashboard/dashboard/settings" className={linkClass('/dashboard/settings')}>
        <Settings className="h-5 w-5" />
        Settings
      </Link>

      {/* 👤 ADMIN ONLY */}
    {user.role===Role.ADMIN && (
        <>
          <Link to="/dashboard/dashboard/bookings" className={linkClass('/dashboard/bookings')}>
            <CalendarCheck className="h-5 w-5" />
            Bookings
          </Link>
          <Link to="/dashboard/dashboard/vendors" className={linkClass('/dashboard/vendors')}>
            <Building2 className="h-5 w-5" />
            Vendors
          </Link>
          <Link to="/dashboard/dashboard/customers" className={linkClass('/dashboard/users')}>
            <User className="h-5 w-5" />
            Customers
          </Link>
          <Link  to="/dashboard/dashboard/reviews" className={linkClass('/dashboard/reviews')}>
          <Star className="h-5 w-5" />
            Reviews
          </Link>
        </>
      )}

      {/* 🛠 VENDOR ONLY */}
      {user.role === Role.VENDOR && (
        <>
        <Link to="/dashboard/dashboard/services" className={linkClass('/dashboard/services')}>
          <Wrench className="h-5 w-5" />
          Services
        </Link>
        <Link to="/dashboard/dashboard/customers" className={linkClass('/dashboard/customers')} >
        <User className="h-5 w-5" />
        Customers
        </Link>
        <Link to="/dashboard/dashboard/reviews" className={linkClass('/dashboard/reviews')}>
          <Star className="h-5 w-5" />
          Reviews
        </Link>
        </>
      )}

      {/* ⭐ USER ONLY */}
      {user.role === Role.CUSTOMER && (
        <>
        <Link to="/dashboard/dashboard/bookings" className={linkClass('/dashboard/bookings')}>
          <CalendarCheck className="h-5 w-5" />
          My Bookings
        </Link>
        <Link to="/dashboard/dashboard/vehicles" className={linkClass('/dashboard/vehicles')}>
          <User className="h-5 w-5" />
          Vehicles
        </Link>
        <Link to="/dashboard/dashboard/reviews" className={linkClass('/dashboard/reviews')}>
          <Star className="h-5 w-5" />
          Reviews
        </Link>
        </>
      )}
    </aside>
  )
}
export default DashboardSidebar
