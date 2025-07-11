import React from 'react';
import { createFileRoute } from '@tanstack/react-router'
import { useStore } from '@tanstack/react-form';
import { authStore } from '@/store/authStore';
import { useCustomer } from '@/hooks/customers';

export const Route = createFileRoute('/dashboard/dashboard/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  const {user} = useStore(authStore);
  const {data: customer} = useCustomer(user.id);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log('Profile data submitted:', data);
    } catch (error) {
      console.error('Error submitting profile data:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gray-50">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg">
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-4">
            <span className="text-4xl font-bold text-blue-600">
              {user.firstname[0]}
            </span>
          </div>
          <h1 className="text-2xl font-bold mb-1">Welcome, {user.firstname} 👋</h1>
          <p className="text-gray-600 text-lg">Here is your profile information:</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">First Name</label>
            <input
              type="text"
              name="firstname"
              defaultValue={user.firstname}
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 px-3 py-2 transition"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Last Name</label>
            <input
              type="text"
              name="lastname"
              defaultValue={user.lastname}
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 px-3 py-2 transition"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              defaultValue={user.email}
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 px-3 py-2 transition"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              defaultValue={customer?.profile?.phone}
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 px-3 py-2 transition"
              required
            />
          </div>
          <div className="flex gap-4 pt-2">
            <button
              type="button"
              className="w-1/2 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition font-semibold"
            >
              Edit Profile
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-1/2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition font-semibold ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
