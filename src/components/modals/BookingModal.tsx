import { useStore } from "@tanstack/react-form";
import { useState } from "react";
import type { VehiclesDetails, Vendor, VendorDetails } from "@/types/users";
// import type { User } from "@/types/auth";
import { authStore } from "@/store/authStore";
import { useVendors } from "@/hooks/vendors";
import { useCustomer } from "@/hooks/customers";
import { useVehiclebyCustomerId } from "@/hooks/vehicle";

export interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  // user: User;
  // vehicles: any[]; // Replace with actual vehicle type
}


function BookingModal({ isOpen, onClose}: BookingModalProps) {
  const {data: vendors} = useVendors();
  const { user: authUser } = useStore(authStore);
  const {data: customers} = useCustomer(authUser.customerId || "");
  const {data: vehicles} = useVehiclebyCustomerId(authUser.customerId || "");
  const [selectedVendor, setSelectedVendor] = useState<string>("");
  
  // Debug logging
  console.log('🔍 AuthUser:', authUser);
  console.log('🔍 AuthUser customerId:', authUser.customerId);
  console.log('🔍 Vehicles data:', vehicles);
  console.log('🔍 Vehicles length:', vehicles?.length);
  
  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* display booking data in a form for a user to a booking */}
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4">Book a Wash</h2>
            <form onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Customer Id</label>
              <input
                type="text"
                value={authUser.customerId}
                readOnly
                className="mt-1 block p-1 w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 m-1">Vehicle</label>
              
              <select className="mt-1 block p-1 w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option value="">Select Vehicle</option>
                {vehicles && vehicles.length > 0 ? (
                  vehicles.map((vehicle: VehiclesDetails) => (
                    <option key={vehicle.id} value={vehicle.id}>
                      {vehicle.license_plate} - {vehicle.make} {vehicle.model}
                    </option>
                  ))
                ) : (
                  <option disabled>No vehicles found</option>
                )}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 m-1">Vendor</label>
              <select
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={selectedVendor}
                onChange={e => setSelectedVendor(e.target.value)}
              >
                <option value="">Select Vendor</option>
                {Array.isArray(vendors) && vendors.length > 0 ? (
                  vendors.map((vendor: VendorDetails) => (
                    <option key={vendor.id} value={vendor.id}>
                      {vendor.business_name}
                    </option>
                  ))
                ) : (
                  <option disabled>No vendors found</option>
                )}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                placeholder="Enter Location"
                className="mt-1 block w-full p-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm m-1 font-medium text-gray-700">Service Type</label>
                <select className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option value="">Select Service</option>
                {vendors &&
                  vendors
                  .find((vendor: VendorDetails) => vendor.id === Number(selectedVendor))
                  ?.services?.map((service: { id: string; name: string }) => (
                    <option key={service.id} value={service.id}>
                    {service.name}
                    </option>
                  ))}
                </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700  m-1">Date & Time</label>
              <input type="datetime-local" className="mt-1 block w-full border-gray-300 rounded-md p-1 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
            </div>
            <div className="mb-4 flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-600 p-2 text-white py-2 rounded-md hover:bg-blue-700"
              >
                Book Now
              </button>
              <button onClick={onClose} className="mt-4 text-sm text-gray-600 hover:text-gray-900 ">
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
                  
  )
}

export default BookingModal