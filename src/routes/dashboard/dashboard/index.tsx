import { createFileRoute } from '@tanstack/react-router'
import { useStore } from '@tanstack/react-form'
import AdminDashboardOverview from '@/components/dashboard/adminDashboard'
import CustomerDashboardOverview from '@/components/dashboard/customerDashboard'
import { authStore } from '@/store/authStore'

export const Route = createFileRoute('/dashboard/dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {
  // Display dashboard overview according to roles
  const { user } = useStore(authStore)
  if (user.role === 'customer') {
    return <CustomerDashboardOverview />
  }
  if (user.role === 'admin') {
    return <AdminDashboardOverview />
  }

  return <div>

    <CustomerDashboardOverview />
    <AdminDashboardOverview />
    {/* <Outlet /> */}
  </div>
}
