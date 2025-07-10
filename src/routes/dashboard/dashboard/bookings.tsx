import { createFileRoute } from '@tanstack/react-router'
import UserDashboardOverview from '@/components/overview'

export const Route = createFileRoute('/dashboard/dashboard/bookings')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
    {/* <h1 className="text-2xl font-bold mb-4">Bookings</h1>
    <p>Manage your bookings here.</p> */}
    <UserDashboardOverview />
  </div>
}
