import { createFileRoute } from '@tanstack/react-router';
import React from 'react';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import type { JSX } from 'react';
import type { Vendor } from '@/types/users';
import { useVendors } from '@/hooks/vendors';

const COLORS = {
  active: '#34D399', // green
  inactive: '#FBBF24', // yellow
  pending: '#D1D5DB', // gray
};

export const Route = createFileRoute('/dashboard/dashboard/vendors')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: vendors } = useVendors();

  if (!vendors) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-pulse text-lg text-gray-500 bg-white p-8 rounded-xl shadow-lg">
          Loading vendors...
        </div>
      </div>
    );
  }

  const total = vendors.length;
  const active = vendors.filter((v: Vendor) => v.status === 'active').length;
  const inactive = vendors.filter((v: Vendor) => v.status === 'inactive').length;
  const pending = vendors.filter((v: Vendor) => v.status !== 'active' && v.status !== 'inactive').length;

  const pieData = [
    { name: 'Active', value: active, status: 'active' },
    { name: 'Inactive', value: inactive, status: 'inactive' },
    { name: 'Pending', value: pending, status: 'pending' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-2xl space-y-10">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight flex items-center justify-between">
        <span className="inline-block bg-gradient-to-r from-blue-400 via-yellow-300 to-gray-300 bg-clip-text text-transparent">
          Manage All Vendors
        </span>
        <button
          className="ml-4 p-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          onClick={() => window.location.reload()}
        >
          Add Vendor
        </button>
      </h1>

      {/* Analytics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatCard label="Total Vendors" value={total} icon="users" />
        <StatCard label="Active Vendors" value={active} color="text-green-600" icon="check-circle" />
        <StatCard label="Inactive Vendors" value={inactive} color="text-yellow-600" icon="pause-circle" />
      </div>

      {/* Chart */}
      <div className="bg-white p-8 rounded-2xl shadow-lg flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 min-w-[250px]">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Vendor Status Distribution</h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={70}
                label={({ name, percent }) =>
                  `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`
                }
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.status as keyof typeof COLORS]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1 flex flex-col gap-4">
          {pieData.map((item) => (
            <div key={item.status} className="flex items-center gap-3">
              <span
                className={`inline-block w-4 h-4 rounded-full`}
                style={{ background: COLORS[item.status as keyof typeof COLORS] }}
              />
              <span className="font-medium text-gray-700">{item.name}</span>
              <span className="ml-auto text-gray-500">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Vendor List */}
      <div>
        <h2 className="text-2xl font-bold mb-5 text-gray-900">Vendor List</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vendors.map((vendor: Vendor) => (
            <li
              key={vendor.id}
              className="p-6 border border-gray-100 rounded-2xl shadow-md bg-white hover:shadow-xl transition-all duration-200 group"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-200 via-yellow-100 to-gray-200 flex items-center justify-center text-lg font-bold text-gray-700">
                    {vendor.profile.firstName[0]}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-green-600 transition">
                      {vendor.profile.firstName} {vendor.profile.lastName}
                    </h3>
                    <p className="text-xs text-gray-500">{vendor.profile.email}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{vendor.business_name}</p>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold capitalize w-fit
                    ${vendor.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : vendor.status === 'inactive'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-200 text-gray-700'
                    }`}
                >
                  {vendor.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Simple icon mapping for StatCard
const icons: Record<string, JSX.Element> = {
  users: (
    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20h6M3 20h5v-2a4 4 0 013-3.87M16 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  'check-circle': (
    <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M12 22a10 10 0 100-20 10 10 0 000 20z" />
    </svg>
  ),
  'pause-circle': (
    <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={2} />
      <rect x="9" y="9" width="2" height="6" rx="1" fill="currentColor" />
      <rect x="13" y="9" width="2" height="6" rx="1" fill="currentColor" />
    </svg>
  ),
};

function StatCard({
  label,
  value,
  color = 'text-gray-800',
  icon,
}: {
  label: string;
  value: number;
  color?: string;
  icon?: string;
}) {
  return (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-100 to-white shadow-md text-center flex flex-col items-center gap-2">
      {icon && <div>{icons[icon]}</div>}
      <p className="text-sm text-gray-500">{label}</p>
      <h3 className={`text-3xl font-extrabold mt-1 ${color}`}>{value}</h3>
    </div>
  );
}
