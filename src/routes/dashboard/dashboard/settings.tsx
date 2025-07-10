import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/dashboard/settings')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
    <h1 className="text-2xl font-bold mb-4">Settings</h1>
    <p>Manage your account settings here.</p>
    {/* Add more content or components as needed */}
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-2">Account Settings</h2>
      <p>Update your profile information, change your password, and manage your account preferences.</p>
     {/* add buttons to update profile or change password */}
      <div className="mt-4 space-y-2 flex flex-col sm:flex-row sm:space-x-2 *:space-y-0 sm:space-y-0">
        <button className="px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600">Update Profile</button>
        <button className="px-4 py-2 bg-green-500 text-white font-bold rounded hover:bg-green-600">Change Password</button>
      </div>

  </div>
  </div>
}
