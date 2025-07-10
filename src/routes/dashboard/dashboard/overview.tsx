import { createFileRoute } from '@tanstack/react-router'
import UserDashboardOverview from '@/components/overview'

export const Route = createFileRoute('/dashboard/dashboard/overview')({
  component: RouteComponent,
})

function RouteComponent() {
  console.log( 'dashboard overview');
  return <div>
    {/* <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>
    <p>Welcome to the dashboard overview page. Here you can see your stats and manage your account.</p> */}
    {/* Add more content or components as needed */}
    <UserDashboardOverview />
  </div>
}
