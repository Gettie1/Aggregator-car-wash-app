import { useStore } from '@tanstack/react-form'
import { createFileRoute } from '@tanstack/react-router'
import type { Services } from '@/types/users'
import { useServiceByVendorId } from '@/hooks/services'
import { authStore } from '@/store/authStore'

export const Route = createFileRoute('/dashboard/dashboard/services')({
  component: RouteComponent,
})

function RouteComponent() {
  const { user } = useStore(authStore)
  const { data: services } = useServiceByVendorId(user.id)
  return <div>
    <h2 className="text-lg font-bold mb-4">My Services</h2>
    {services && services.length > 0 ? (
      <div className="bg-white p-6 mt-8 rounded shadow">
        <ul className="list-disc pl-6">
          {services.map((service: Services) => (
            <li key={service.id} className="mb-2">
              <span className="font-semibold">{service.name}</span> - {service.description}
            </li>
          ))}
        </ul>
      </div>
    ) : (
      <p>No services found. Please add a service.</p>
    )}
    <div className="mt-6">
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Add New Service
      </button> 

  </div>
  </div>
}
