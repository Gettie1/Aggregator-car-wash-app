import React from 'react';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/dashboard/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  const [isLoading, setIsLoading] = React.useState(false);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      // Simulate an API call to save the profile data
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log('Profile data submitted:', data);
      // Redirect or show success message here
    } catch (error) {
      console.error('Error submitting profile data:', error);
      // Handle error (e.g., show error message)
    } finally {
      setIsLoading(false);
    }
  }
      return  <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-center mb-6">Complete Your Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
            I am a *
          </label>
          <select
            name="role"
            id="role"
            required
            className="auth-input-field"
          >
            <option value="">Select your role</option>
            <option value="customer">Customer</option>
            <option value="vendor">Service Provider</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            className="auth-input-field"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            className="auth-input-field"
            placeholder="Enter your phone number"
          />
        </div>

        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <input
            type="text"
            name="city"
            id="city"
            className="auth-input-field"
            placeholder="Enter your city"
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <textarea
            name="address"
            id="address"
            rows={3}
            className="auth-input-field"
            placeholder="Enter your address"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="auth-button"
        >
          {isLoading ? "Creating Profile..." : "Complete Setup"}
        </button>
      </form>
  </div>
}
