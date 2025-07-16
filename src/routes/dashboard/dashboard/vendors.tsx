import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useStore } from '@tanstack/react-form'
// import type { Services, Vendor } from '@/types/users'
import type { Vendor } from '@/types/users'
import { useCreateVendor, useDeleteVendor, useVendors } from '@/hooks/vendors'
import { authStore } from '@/store/authStore'
// import { useServiceByVendorId, useServices } from '@/hooks/services'
import { VendorCard } from '@/components/VendorCard'
import { useRegister } from '@/hooks/auth'
import { Role } from '@/types/auth'

export const Route = createFileRoute('/dashboard/dashboard/vendors')({
  component: RouteComponent,
})


function RouteComponent() {
  const [showModal, setShowModal] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [creationStep, setCreationStep] = useState('')
  const { data: vendors } = useVendors()
  const createProfileMutation = useRegister()
  const addVendorMutation = useCreateVendor()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    business_name: '',
    status: 'active',
    business_address: '',
    tax_id: '',
  })
  const deleteVendorMutation = useDeleteVendor()

  const handleDeleteVendor = (vendorId: string) => {
    if (confirm('Are you sure you want to delete the vendor?')) {
      deleteVendorMutation.mutate(vendorId.toString())
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsCreating(true) // Start loading state
    
    try {
      // Step 1: Create the user profile first
      setCreationStep('Creating user profile...')
      console.log('🔄 Creating user profile...')
      console.log('🔄 Profile data being sent:', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: '[HIDDEN]',
        role: Role.VENDOR,
        phone: formData.phone,
      })
      
      const createdUser = await createProfileMutation.mutateAsync({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        role: Role.VENDOR,
        phone: formData.phone,
      })
      
      console.log('✅ Profile created successfully:', createdUser)
      console.log('🔍 Raw createdUser response type:', typeof createdUser)
      console.log('🔍 Profile keys:', Object.keys(createdUser))
      console.log('🔍 Complete createdUser object:', JSON.stringify(createdUser, null, 2))
      
      // Step 2: Validate the response structure
      if (!createdUser.id) {
        console.error('❌ Profile.user is null or undefined')
        console.error('❌ Profile structure:', createdUser)
        throw new Error('Profile creation failed: No user object in response')
      }      
      console.log('🔍 Profile user ID:', createdUser.id)
      console.log('🔍 Profile user object:', createdUser)
      
      // Step 3: Extract user ID with runtime safety
      console.log('🔍 Profile user ID:', createdUser.id)
      console.log('🔍 Profile user object:', createdUser)
      
      const userId = createdUser.id
      console.log('🔍 Extracted userId:', userId, 'Type:', typeof userId)
      console.log("📤 Creating vendor with:", {
      profileId: userId,
      business_name: formData.business_name,
      status: formData.status,
      business_address: formData.business_address,
      tax_id: formData.tax_id,
      phone: formData.phone,
    });
      
      if (!userId) {
        console.error('❌ No user ID found in createdUser response')
        console.error('❌ Profile structure:', JSON.stringify(createdUser, null, 2))
        throw new Error('Profile creation failed: No user ID returned')
      }
      
      // Step 3: Create the vendor record using the profile ID
      setCreationStep('Creating vendor account...')
      console.log('🔄 Creating vendor record with user ID:', userId)
      try{
      const vendor = await addVendorMutation.mutateAsync({
        // first_name: formData.firstName,
        // last_name: formData.lastName,
        // email: formData.email,
        phone: formData.phone,
        business_name: formData.business_name,
        status: formData.status,
        business_address: formData.business_address,
        tax_id: formData.tax_id,
        profileId: userId, // 🎯 Using the profile ID here!
      });
      console.log("✅ Vendor created:", vendor);
    } catch (err) {
      console.error('❌ Error creating vendor:', err)
    }
      console.log('✅ Vendor created successfully!')
      setCreationStep('Complete!')
      
      // Step 4: Reset form and close modal
      setTimeout(() => {
        setShowModal(false)
        setCreationStep('')
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          phone: '',
          business_name: '',
          status: 'active',
          business_address: '',
          tax_id: '',
          // profileId: '', // Reset profileId if needed
        })
      }, 1000)
      
    } catch (err) {
      console.error('❌ Error creating vendor:', err)
      console.error('❌ Error details:', {
        message: err instanceof Error ? err.message : 'Unknown error',
        stack: err instanceof Error ? err.stack : undefined,
        formData: formData
      })
      
      setCreationStep('Error occurred')
      
      // Show user-friendly error message
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred'
      alert(`Failed to create vendor: ${errorMessage}`)
    } finally {
      setTimeout(() => {
        setIsCreating(false)
        setCreationStep('')
      }, 1000)
    }
  }

  if (!vendors) {
    return <div>Loading vendors...</div>
  }

  // Debug the vendors data structure
  console.log('🔍 Vendors array:', vendors)
  console.log('🔍 First vendor:', vendors[0])
  vendors.forEach((vendor: any, index: number) => {
    console.log(`🔍 Vendor ${index}:`, vendor)
    if (!vendor.vendor) {
      console.error(`❌ Vendor ${index} has null vendor property:`, vendor)
    }
  })

  // Filter out vendors with null vendor property (defensive programming)
  const validVendors = vendors.filter((vendor: any) => vendor && vendor.vendor) as Array<Vendor>
  console.log('🔍 Valid vendors after filtering:', validVendors)

  if (validVendors.length === 0) {
    return <div>No valid vendors found. Some vendor records may be incomplete.</div>
  }

  return (
    <div>
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
            {validVendors.map((vendor: Vendor) => (
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
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Business Name</label>
                <input
                  type="text"
                  name="business_name"
                  value={formData.business_name}
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
                  name="business_address"
                  value={formData.business_address}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Tax ID</label>
                <input
                  type="text"
                  name="tax_id"
                  value={formData.tax_id}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={isCreating}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCreating ? (creationStep || 'Creating...') : 'Add Vendor'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  disabled={isCreating}
                  className="ml-2 bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
              
              {/* Progress Indicator */}
              {isCreating && creationStep && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                    <span className="text-sm text-blue-700">{creationStep}</span>
                  </div>
                </div>
              )}
              {/* 
                If your backend expects a user profile to exist before creating a vendor,
                you should ensure the profile is created first. 
                Otherwise, the POST /vendors will return 400 Bad Request.
                Check your backend requirements and error messages for more details.
              */}
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
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-6 text-center text-blue-700">Services Provided by Each Vendor</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {validVendors.map((vendor: Vendor) => (
        <VendorCard key={vendor.vendor.id} vendor={vendor} />
          ))}
        </div>
      </div>
    </div>
  )
}
