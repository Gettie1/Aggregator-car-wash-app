import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/dashboard/settings')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
    <h1 className="text-2xl font-bold mb-4">Settings</h1>
    <p>Manage your account settings here.</p>
    {/* Add more content or components as needed */}

  </div>
}
