import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useStore } from '@tanstack/react-form'
// import type { Services, Vendor } from '@/types/users'
import type { Vendor } from '@/types/users'
import { useCreateVendor, useDeleteVendor, useVendors } from '@/hooks/vendors'
import { authStore } from '@/store/authStore'
// import { useServiceByVendorId, useServices } from '@/hooks/services'
import { VendorCard } from '@/components/VendorCard'

export const Route = createFileRoute('/dashboard/dashboard/vendors')({
  component: RouteComponent,
})


function RouteComponent() {
  const [ showModal, setShowModal ] = useState(false)
  const { user } = useStore(authStore)
  const { data: vendors } = useVendors()
  // const { data: vendor} = useVendor(user.id)
  // const { data: services} = useServices() 
  
  // const { data: vendorServices } = useServiceByVendorId(vendor.vendor.id)
  const addVendorMutation = useCreateVendor()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    businessName: '',
    status: 'active',
    businessAddress: '',
    taxId: '',
  })
  const deleteVendorMutation = useDeleteVendor()
  const handleDeleteVendor = (vendorId:string) => {
    if (confirm('Are you sure you want to delete the vendor?')) {
      deleteVendorMutation.mutate(vendorId.toString())
    }
  }
  if (!vendors) {
    return <div>Loading vendors...</div>
  }
  if (vendors.length === 0) {
    return <div>No vendors found. Please add a vendor.</div>
  }
  // setShowModal(false)
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addVendorMutation.mutate({
      ...formData,
      userId: user.id, // or let backend extract from JWT
    })
  }
  return <div>
    <h1 className="text-2xl font-bold">Vendors</h1>
    {/* <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onclose}></div> */}
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Business Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tax ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {vendors?.map((vendor: Vendor) => (
            <tr key={vendor.vendor.id}>
              <td className="px-6 py-4 whitespace-nowrap">{vendor.vendor.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{vendor.firstName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{vendor.lastName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{vendor.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{vendor.vendor.business_name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{vendor.vendor.status}</td>
              <td className="px-6 py-4 whitespace-nowrap">{vendor.vendor.business_address}</td>
              <td className="px-6 py-4 whitespace-nowrap">{vendor.vendor.tax_id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={() => handleDeleteVendor(vendor.vendor.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {showModal && (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        {/* <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"> */}
          {/* </div> */}
          <h2 className="text-xl font-semibold mb-4">Add Vendor</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Business Name</label>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-1 block w-50 border-full rounded-full"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Business Address</label>
              <input
                type="text"
                name="businessAddress"
                value={formData.businessAddress}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Tax ID</label>
              <input
                type="text"
                name="taxId"
                value={formData.taxId}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Add Vendor
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="ml-2 bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
  </div>
          </form>
        </div>
      </div>
    )}
    <button
      onClick={() => setShowModal(true)}
      className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      Add New Vendor
    </button>
    {/* fetch and display servces using vendor  vendor name/id */}
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Services by Vendor</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {vendors?.map((vendor: Vendor) => (
  <VendorCard key={vendor.vendor.id} vendor={vendor} />
))}
      
      </div>
    </div>
  </div>

}
