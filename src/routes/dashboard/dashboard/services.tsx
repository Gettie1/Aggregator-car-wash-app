import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useStore } from '@tanstack/react-form'
import type { Services } from '@/types/users'
import { authStore } from '@/store/authStore'
import { useServices } from '@/hooks/services'

export const Route = createFileRoute('/dashboard/dashboard/services')({
  component: RouteComponent,
})

function RouteComponent() {
  const { user } = useStore(authStore)
  const navigate = useNavigate()
  const { data: services, isLoading } = useServices()
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] text-gray-500">
        <div className="loader mb-2"></div>
        <span>Loading services...</span>
        <style>{`
          .loader {
            border: 4px solid #f3f3f3;
            border-top: 4px solid #3498db;
            border-radius: 50%;
            width: 32px;
            height: 32px;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
          }
        `}</style>
      </div>
    )
  }
  if (!services || services.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] text-gray-500">
        <span className="text-xl text-red-700 mt-4">No services available.</span>
      </div>
    )
  }
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Available Services</h1>
      {/* button to review a service */}
      <div className="flex justify-center mb-4">
        <button
          onClick={() => navigate({ to: '/dashboard/dashboard/reviews' })}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Review a Service
        </button>
      </div>

    <div className="max-w-3xl mx-auto p-6 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-0 bg-gray-50 rounded-lg shadow">
          <thead>
            <tr>
              <th className="bg-gray-100 text-gray-700 font-semibold px-5 py-3 border-b-2 border-gray-200 text-left">Name</th>
              <th className="bg-gray-100 text-gray-700 font-semibold px-5 py-3 border-b-2 border-gray-200 text-left">Description</th>
              <th className="bg-gray-100 text-gray-700 font-semibold px-5 py-3 border-b-2 border-gray-200 text-left">Price</th>
              <th className="bg-gray-100 text-gray-700 font-semibold px-5 py-3 border-b-2 border-gray-200 text-left">Duration</th>
              <th className="bg-gray-100 text-gray-700 font-semibold px-5 py-3 border-b-2 border-gray-200 text-left">Vendor</th>
              <th className="bg-gray-100 text-gray-700 font-semibold px-5 py-3 border-b-2 border-gray-200 text-left">Actions</th>
              <th className="bg-gray-100 text-gray-700 font-semibold px-5 py-3 border-b-2 border-gray-200 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service: Services) => (
              <tr key={service.id} className="transition-colors hover:bg-gray-100">
                <td className="px-5 py-3 border-b border-gray-200 text-gray-600 bg-white">{service.name}</td>
                <td className="px-5 py-3 border-b border-gray-200 text-gray-600 bg-white">{service.description}</td>
                <td className="px-5 py-3 border-b border-gray-200 text-gray-600 bg-white">${service.price}</td>
                <td className="px-5 py-3 border-b border-gray-200 text-gray-600 bg-white">{service.duration} mins</td>
                <td className="px-5 py-3 border-b border-gray-200 text-gray-600 bg-white">{service.vendor.id}</td>
                <td className="px-5 py-3 border-b border-gray-200 text-gray-600 bg-white">
                  <button className="text-blue-600 hover:text-blue-800 font-semibold">Edit</button>
                  </td>
                  <td className="px-5 py-3 border-b border-gray-200 text-gray-600 bg-white">
                  <button className="ml-4 text-red-600 hover:text-red-800 font-semibold">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <style>{`
        .loader {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #3498db;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
      `}</style>
    </div>
    </>
  )
}
