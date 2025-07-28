import { useStore } from "@tanstack/react-form";
import { useState } from "react";
import { toast } from "sonner";
import type { VehiclesDetails, VendorDetails } from "@/types/users";
import { authStore } from "@/store/authStore";
import { useVendors } from "@/hooks/vendors";
import { useVehiclebyCustomerId } from "@/hooks/vehicle";
import { useServiceByVendorId } from "@/hooks/services";
import { useCreateBooking } from "@/hooks/bookings";

export interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const { data: vendors } = useVendors();
  const { user } = useStore(authStore);
  const { data: vehicles } = useVehiclebyCustomerId(user.customerId ?? 0);
  const [selectedVendor, setSelectedVendor] = useState<number | null>(null);
  const { data: services } = useServiceByVendorId(selectedVendor ?? 0);

  const [formData, setFormData] = useState({
    customerId: user.customerId,
    vehiclePlateNo: "",
    vendorName: "",
    serviceName: "",
    scheduled_at: "",
    payment_method: "cash", // Default payment method
  });

  const handleCreateBookingMutation = useCreateBooking();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    
    e.preventDefault();
    handleCreateBookingMutation.mutate({ ...formData });
    setFormData({
      customerId: user.customerId,
      vehiclePlateNo: "",
      vendorName: "",
      serviceName: "",
      scheduled_at: "",
      payment_method: "cash",
    });
    onClose();
    toast.success("Booking created successfully!");
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Floating modal box */}
      <div className="absolute z-50 top-24 left-1/2 -translate-x-1/2 flex items-center justify-center w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-md p-8 w-full border border-gray-200">
          <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">Book a Wash</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Customer Id</label>
              <input
                type="text"
                value={user.customerId}
                readOnly
                className="block w-full p-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle</label>
              <select
                name="vehiclePlateNo"
                value={formData.vehiclePlateNo}
                onChange={handleChange}
                className="block w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="">Select Vehicle</option>
                {vehicles && vehicles.length > 0 ? (
                  vehicles.map((vehicle: VehiclesDetails) => (
                    <option key={vehicle.id} value={vehicle.license_plate}>
                      {vehicle.license_plate} - {vehicle.make} {vehicle.model}
                    </option>
                  ))
                ) : (
                  <option disabled>No vehicles found</option>
                )}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Vendor</label>
              <select
                name="vendorName"
                value={formData.vendorName}
                onChange={(e) => {
                  handleChange(e);
                  const selectedVendorData = vendors?.find((vendor: VendorDetails) => vendor.business_name === e.target.value);
                  setSelectedVendor(selectedVendorData?.id ?? null);
                }}
                className="block w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="">Select Vendor</option>
                {Array.isArray(vendors) && vendors.length > 0 ? (
                  vendors.map((vendor: VendorDetails) => (
                    <option key={vendor.business_name} value={vendor.business_name}>
                      {vendor.business_name}
                    </option>
                  ))
                ) : (
                  <option disabled>No vendors found</option>
                )}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
              <select
                name="serviceName"
                value={formData.serviceName}
                onChange={handleChange}
                className="block w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="">Select Service</option>
                {services && services.length > 0 ? (
                  services.map((service: { id: string; name: string }) => (
                    <option key={service.id} value={service.name}>
                      {service.name}
                    </option>
                  ))
                ) : (
                  <option disabled>No services found</option>
                )}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date & Time</label>
              <input
                type="datetime-local"
                name="scheduled_at"
                value={formData.scheduled_at}
                onChange={e => setFormData({ ...formData, scheduled_at: e.target.value })}
                className="block w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
              <select
                name="payment_method"
                value={formData.payment_method}
                onChange={handleChange}
                className="block w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="">Select Payment Method</option>
                <option value="cash">Cash</option>
                <option value="credit_card">Card</option>
                <option value="mobile_money">Mobile Money</option>
              </select>
            </div>
            <div className="flex items-center justify-between mt-6">
              <button
                type="submit"
                className="bg-blue-600 px-4 py-2 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Book Now
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-100 transition"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default BookingModal;
