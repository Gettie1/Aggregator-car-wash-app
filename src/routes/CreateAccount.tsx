import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react';

export const Route = createFileRoute('/CreateAccount')({
  component: RouteComponent,
})

function RouteComponent() {
  const [activeForm, setActiveForm] = useState<'admin' | 'vendor' | 'customer'>('admin');

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md space-y-6">
      {/* Button Group */}
      <div className="flex justify-between space-x-2">
        <button
          className={`px-4 py-2 rounded font-semibold ${
            activeForm === 'admin' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setActiveForm('admin')}
        >
          Admin
        </button>
        <button
          className={`px-4 py-2 rounded font-semibold ${
            activeForm === 'vendor' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setActiveForm('vendor')}
        >
          Vendor
        </button>
        <button
          className={`px-4 py-2 rounded font-semibold ${
            activeForm === 'customer' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setActiveForm('customer')}
        >
          Customer
        </button>
      </div>

      {/* Form Section */}
      <form className="space-y-4">
        {activeForm === 'admin' && (
          <>
            <input className="w-full p-2 border rounded" placeholder="Admin Email" />
            <input className="w-full p-2 border rounded" placeholder="Admin Role" />
          </>
        )}

        {activeForm === 'vendor' && (
          <>
            <input className="w-full p-2 border rounded" placeholder="Vendor Business Name" />
            <input className="w-full p-2 border rounded" placeholder="Business Tax ID" />
            <input className="w-full p-2 border rounded" placeholder="Vendor Status" />
            <input className="w-full p-2 border rounded" placeholder="Vendor Phone Number" />
            <input className="w-full p-2 border rounded" placeholder="Vendor Address" />
          </>
        )}

        {activeForm === 'customer' && (
          <>
            <input className="w-full p-2 border rounded" placeholder="Full Name" />
            <input className="w-full p-2 border rounded" placeholder="Phone Number" />
          </>
        )}

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default RouteComponent;