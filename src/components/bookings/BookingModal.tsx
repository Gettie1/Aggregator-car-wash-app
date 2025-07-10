import { useStore } from "@tanstack/react-form";
import type { VendorDetails } from "@/types/users";
// import type { User } from "@/types/auth";
import { authStore } from "@/store/authStore";
import { useVendors } from "@/hooks/vendors";

export interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  // user: User;
  // vehicles: any[]; // Replace with actual vehicle type
}

function BookingModal({ isOpen, onClose}: BookingModalProps) {
  const {data: vendors} = useVendors();
  const { user: authUser } = useStore(authStore);
  if (!isOpen) {
    return null;
  }

  return (
    <div>
      {/* display booking data in a form for a user to a booking */}
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4">Book a Wash</h2>
          <form>
            <div>
              <label className="block text-sm font-medium text-gray-700">Customer Name</label>
              <input
                type="text"
                value={`${authUser.id}`}
                readOnly
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Vehicle</label>
              <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option value="">Select Vehicle</option>
                {/* Replace with actual vehicle options */} 
                <option value="">Select Vehicle</option>
              </select>
            </div>
            <div>
              {/* vendor name  choose option from existing vendors*/}
              <label className="block text-sm font-medium text-gray-700">Vendor</label>
              <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500">
                {/* <option value="">Select Vendor</option> */}
                {vendors && vendors.map((vendor: VendorDetails) => (
                  <option key={vendor.id} value={vendor.id}>
                  {vendor.business_name} | {vendor.business_address} | {vendor.status}
                  </option>
                ))}
              </select>
              
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                placeholder="Enter Location"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Service Type</label>
              <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option value="">Select Service</option>
                <option value="full">Full Body Wash</option>
                <option value="exterior">Exterior Only</option>
                <option value="interior">Interior & Exterior</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Date & Time</label>
              <input type="datetime-local" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500" />
            </div>
            <button 
            onSubmit={(e) => e.preventDefault()}
            type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
              Book Now
            </button>
          </form>
          <button onClick={onClose} className="mt-4 text-sm text-gray-600 hover:text-gray-900">
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default BookingModal