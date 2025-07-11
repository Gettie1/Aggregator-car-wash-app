import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/dashboard/dashboard/settings')({
  component: SettingsPage,
});

function SettingsPage() {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-10">
      <h1 className="text-3xl font-bold text-gray-800">⚙️ Settings</h1>

      {/* Account Section */}
      <section className="bg-white shadow rounded-lg p-6 space-y-4 border">
        <h2 className="text-xl font-semibold text-gray-800">Account Settings</h2>
        <p className="text-sm text-gray-600">Manage your profile and credentials.</p>
        <div className="flex flex-wrap gap-4">
          <button
            className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            onClick={() => navigate({ to: '/dashboard/dashboard/profile' })}
          >
            ✏️ Update Profile
          </button>
          <button
            className="px-5 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
            onClick={() => setShowChangePassword(true)}
          >
            🔐 Change Password
          </button>
        </div>
      </section>

      {/* Notifications Section */}
      <section className="bg-white shadow rounded-lg p-6 space-y-4 border">
        <h2 className="text-xl font-semibold text-gray-800">Notification Preferences</h2>
        <p className="text-sm text-gray-600">Choose how you want to be notified.</p>
        <div className="space-y-2">
          <label className="flex items-center space-x-3">
            <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
            <span>Email Notifications</span>
          </label>
          <label className="flex items-center space-x-3">
            <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
            <span>SMS Alerts</span>
          </label>
        </div>
      </section>

      {/* Danger Zone */}
      <section className="bg-white shadow rounded-lg p-6 border">
        <h2 className="text-xl font-semibold text-red-600">⚠️ Danger Zone</h2>
        <p className="text-sm text-red-400 mb-4">Permanently delete your account. This action is irreversible.</p>
        <button className="px-5 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition">
          🗑️ Delete Account
        </button>
      </section>

      {/* Change Password Modal */}
      {showChangePassword && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 animate-fade-in">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Change Password</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Current Password</label>
                <input
                  type="password"
                  className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">New Password</label>
                <input
                  type="password"
                  className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input
                  type="password"
                  className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                  onClick={() => setShowChangePassword(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
