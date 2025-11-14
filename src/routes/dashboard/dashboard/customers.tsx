import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { toast } from 'sonner';
import type { Customer } from '@/types/users';
import { useCustomers, useDeleteCustomerProfile, useEditCustomerProfile } from '@/hooks/customers';
import CustomerModal from '@/components/modals/CustomerModal';
import EditCustomerModal from '@/components/modals/EditCustomerModal';
// import { authStore } from '@/store/authStore';

export const Route = createFileRoute('/dashboard/dashboard/customers')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: customers, isLoading, refetch } = useCustomers();
  const [isOpenCustomerModal, setIsOpenCustomerModal] = useState(false);
  const [isOpenEditCustomerModal, setIsOpenEditCustomerModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const deleteCustomerMutation = useDeleteCustomerProfile();
  const updateCustomerMutation = useEditCustomerProfile();

  
  const handleEditClick = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsOpenEditCustomerModal(true);
  };

  const handleSaveEdit = (updatedCustomer: Customer) => {
    if (!selectedCustomer?.customer?.id) return;

    updateCustomerMutation.mutate(
      {
        customerId: selectedCustomer.customer.id,
        firstName: updatedCustomer.firstName,
        lastName: updatedCustomer.lastName,
        email: updatedCustomer.email,
        phone: updatedCustomer.customer?.phone ?? '',
        address: updatedCustomer.customer?.address ?? ''
      },
      {
        onSuccess: () => {
          toast.success('Customer updated successfully!');
          setIsOpenEditCustomerModal(false);
          setSelectedCustomer(null);
          refetch(); // Refresh the customer list
        },
        onError: (error) => {
          toast.error(error.message || 'Failed to update customer. Please try again.');
        },
      }
    );
  };
  const handleDelete = (customerId: number) => {
    if (!window.confirm('Are you sure you want to delete this customer?')) return;
    deleteCustomerMutation.mutate(customerId, {
      onSuccess: () => {
        toast.success('Customer deleted successfully!');
        refetch(); // Refetch customers after deletion
      },
      onError: (error) => {
        toast.error(
          error.message || 'Failed to delete customer. Please try again.'
        );
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 text-blue-600">
        <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></span>
        <span className="ml-4 text-lg">Loading customers...</span>
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

  const validCustomers = customers.filter(
    (c: Customer) => c.customer?.address && c.customer.phone
  );

  return (
    <div className="gap-6 p-4">
      {/* Header + Analytics */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <p className="text-gray-500 text-2xl">Manage your customers.</p>
      <button 
      onClick={() => setIsOpenCustomerModal(true)}
      className="m-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
        + Customer
      </button>
      <CustomerModal isOpen={isOpenCustomerModal} onClose={() => setIsOpenCustomerModal(false)} />
      <EditCustomerModal
        isOpen={isOpenEditCustomerModal}
        onClose={() => setIsOpenEditCustomerModal(false)}
        customer={selectedCustomer}
        onSave={handleSaveEdit}
      />
        </div>
        <div className="flex gap-4">
          <StatCard label="Total Customers" value={customers.length} />
          <StatCard label="Valid Profiles" value={validCustomers.length} color="text-green-600" />
           
        </div>
      </div>

      {/* Customer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {customers.map((customer: Customer) => (
          <div
            key={customer.email}
            className="bg-white border border-blue-100 rounded-xl p-5 shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold">
                {customer.firstName[0]}
                {customer.lastName[0]}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-800">
                  {customer.firstName} {customer.lastName}
                </h3>
                <p className="text-sm text-gray-500">{customer.email}</p>
              </div>
            </div>
            <DetailItem
              label="Address"
              value={customer.customer?.address ?? undefined}
              icon="location"
            />
            <DetailItem
              label="Phone"
              value={customer.customer?.phone ?? undefined}
              icon="phone"
            />
            <div className='gap-2 flex flex-row justify-between items-center'>
            {/*  */}
            <button 
              className="mt-2 px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
              onClick={() => handleEditClick(customer)}
            >
              Edit
            </button>
            <button
              className="mt-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
              onClick={() => {
                if (customer.customer?.id !== undefined) {
                  handleDelete(customer.customer.id);
                } else {
                  toast.error('Customer ID is missing.');
                }
              }}
            >
              Delete
            </button>
            </div>
          </div>
        ))}
    </div>

      {/* Recent Signups */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold text-blue-700 mb-4">🕒 Recent Sign-ups</h2>
        <ul className="divide-y divide-gray-200">
          {customers.slice(0, 5).map((recentCustomer: Customer) => (
            <li
              key={recentCustomer.customer?.id}
              className="py-3 flex justify-between items-center"
            >
              <div>
                <p className="font-medium text-gray-800">
                  {recentCustomer.firstName} {recentCustomer.lastName}
                </p>
                <p className="text-sm text-gray-500">
                  {recentCustomer.customer?.created_at
                    ? new Date(recentCustomer.customer.created_at).toLocaleDateString()
                    : 'N/A'}
                </p>
              </div>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                New
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// 💠 Stat Summary Card
function StatCard({
  label,
  value,
  color = 'text-blue-700',
}: {
  label: string;
  value: number;
  color?: string;
}) {
  return (
    <div className="bg-blue-50 rounded-lg px-4 py-2 shadow-sm text-center">
      <p className="text-xs text-gray-500">{label}</p>
      <p className={`text-xl font-bold ${color}`}>{value}</p>
    </div>
  );
}

// 💠 Detail Field with Icon
function DetailItem({
  label,
  value,
  icon,
}: {
  label: string;
  value?: string;
  icon: 'location' | 'phone';
}) {
  const icons = {
    location: (
      <svg className="w-4 h-4 text-blue-400 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.656 0 3-1.567 3-3.5S13.656 4 12 4 9 5.567 9 7.5 10.344 11 12 11z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 11v9" />
      </svg>
    ),
    phone: (
      <svg className="w-4 h-4 text-blue-400 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h2l3 5-2 3 5 5 3-2 5 3v2a2 2 0 01-2 2h-1C9 22 2 15 2 6V5a2 2 0 012-2z" />
      </svg>
    ),
  };

  return (
    <div className="mt-2">
      <label className="block text-xs text-gray-500 mb-1">{label}</label>
      <div className="flex items-center bg-gray-100 rounded px-2 py-1 text-sm text-gray-700">
        {icons[icon]}
        <span>{value || 'N/A'}</span>
      </div>
    </div>
  );
}
