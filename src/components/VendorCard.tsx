// components/VendorCard.tsx
import type { Services, Vendor } from "@/types/users"
import { useServiceByVendorId } from "@/hooks/services"

interface VendorCardProps {
  vendor: Vendor
}

export const VendorCard = ({ vendor }: VendorCardProps) => {
  const { data: vendorServices = [] } = useServiceByVendorId(vendor.vendor.id)

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-bold mb-2">{vendor.vendor.business_name}</h3>
      <p className="text-sm text-gray-500 mb-2">Vendor ID: {vendor.vendor.id}</p>

      {vendorServices.length === 0 ? (
        <p className="text-sm text-gray-400">No services found for this vendor.</p>
      ) : (
        <div className="space-y-2">
          {vendorServices.map((service: Services) => (
            <div key={service.id} className="border rounded-md p-2">
              <h4 className="font-semibold">{service.name}</h4>
              <p className="text-sm text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
