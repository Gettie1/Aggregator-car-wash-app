import { createFileRoute } from '@tanstack/react-router'
import type { Customer } from '@/types/users';
import { useCustomers } from '@/hooks/customers';

export const Route = createFileRoute('/dashboard/dashboard/customers')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: customers, isLoading } = useCustomers();
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></span>
        <span className="ml-4 text-lg text-gray-600">Loading customers...</span>
      </div>
    );
  }
  if (!customers || customers.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500 text-lg">
        No customers found.
      </div>
    );
  }
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-blue-700 mb-1">Customers</h1>
          <p className="text-gray-500">Manage all customers here.</p>
        </div>
        <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-semibold shadow">
          Total: {customers.length}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {customers.map((customer: Customer) => (
          <div
            key={customer.email}
            className="bg-gradient-to-br from-blue-50 to-white shadow-lg rounded-xl p-6 flex flex-col gap-4 border border-blue-100 hover:shadow-2xl transition-shadow duration-200"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold shadow">
                {customer.firstName[0]}
                {customer.lastName[0]}
              </div>
              <div>
                <div className="font-semibold text-lg text-blue-800">
                  {customer.firstName} {customer.lastName}
                </div>
                <div className="text-xs text-gray-400">{customer.email}</div>
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Address</label>
              <div className="flex items-center bg-gray-100 rounded px-2 py-1 text-sm">
                <svg className="w-4 h-4 text-blue-400 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 12.414a4 4 0 10-5.657 5.657l4.243 4.243a8 8 0 0011.314-11.314l-4.243-4.243a4 4 0 00-5.657 5.657l4.243 4.243z" />
                </svg>
                <span>{customer.customer.address}</span>
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Phone Number</label>
              <div className="flex items-center bg-gray-100 rounded px-2 py-1 text-sm">
                <svg className="w-4 h-4 text-blue-400 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm0 10a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2zm10-10a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zm0 10a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                <span>{customer.customer.phone_number}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
