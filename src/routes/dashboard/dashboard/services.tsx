import { createFileRoute, useNavigate } from '@tanstack/react-router'
// import { useStore } from '@tanstack/react-form'
import { useMemo } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

// import { toast } from 'sonner'
import type { Services } from '@/types/users'
// import { authStore } from '@/store/authStore'
import { useServices } from '@/hooks/services'
// import { useDeleteService, useServices } from '@/hooks/services'

export const Route = createFileRoute('/dashboard/dashboard/services')({
  component: RouteComponent,
})

function RouteComponent() {
  // const { user } = useStore(authStore)
  const navigate = useNavigate()
  const { data: services, isLoading } = useServices()
  // const deleteServiceMutation = useDeleteService()
  // const handleDelete = (serviceId: number) => {
  //   deleteServiceMutation.mutate(serviceId, {
  //     onSuccess: () => {
  //       toast.success('Service deleted successfully!')
  // //     },
  //     onError: (error) => {
  //       toast.error(`Failed to delete service: ${error.message}`)
  //     },
  //   })
  // }

  const formatPrice = (value: number) =>
    new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
    }).format(value)

  const priceData = useMemo(() => {
    return services?.map((s: Services) => ({
      name: s.name,
      price: s.price,
    })) || []
  }, [services])

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
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Available Services
      </h1>

      <div className="flex justify-center mb-4">
        <button
          onClick={() => navigate({ to: '/dashboard/dashboard/reviews' })}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Review a Service
        </button>
      </div>

      {/* 📊 Bar Chart */}
      <div className="max-w-4xl mx-auto my-8 p-4 bg-white rounded shadow">
        <h2 className="text-lg font-bold mb-2 text-center">
          Service Pricing Overview
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={priceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="price" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Table */}
      <div className="max-w-5xl mx-auto p-6 bg-white rounded shadow">
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-0 bg-gray-50 rounded-lg shadow">
            <thead>
              <tr>
                <th className="bg-gray-100 text-gray-700 font-semibold px-5 py-3 border-b-2 border-gray-200 text-left">
                  Name
                </th>
                <th className="bg-gray-100 text-gray-700 font-semibold px-5 py-3 border-b-2 border-gray-200 text-left">
                  Description
                </th>
                <th className="bg-gray-100 text-gray-700 font-semibold px-5 py-3 border-b-2 border-gray-200 text-left">
                  Price
                </th>
                <th className="bg-gray-100 text-gray-700 font-semibold px-5 py-3 border-b-2 border-gray-200 text-left">
                  Duration
                </th>
                <th className="bg-gray-100 text-gray-700 font-semibold px-5 py-3 border-b-2 border-gray-200 text-left">
                  Vendor
                </th>
                <th
                  colSpan={2}
                  className="bg-gray-100 text-gray-700 font-semibold px-5 py-3 border-b-2 border-gray-200 text-left"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
                {services.map((service: Services, index: number) => (
                <tr
                  key={service.id}
                  className={`${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  } transition-colors hover:bg-gray-100`}
                >
                  <td className="px-5 py-3 border-b border-gray-200 text-gray-600">
                  {service.name}
                  </td>
                  <td className="px-5 py-3 border-b border-gray-200 text-gray-600 max-w-xs whitespace-normal break-words">
                  {service.description}
                  </td>
                  <td className="px-5 py-3 border-b border-gray-200 text-gray-600">
                  {formatPrice(service.price)}
                  </td>
                  <td className="px-5 py-3 border-b border-gray-200 text-gray-600">
                  {service.duration} mins
                  </td>
                  <td className="px-5 py-3 border-b border-gray-200 text-gray-600">
                  {service.vendor.id}
                  </td>
                  <td
                  colSpan={2}
                  className="px-5 py-3 border-b border-gray-200 text-gray-600"
                  >
                  <div className="flex space-x-4">
                    <button className="text-green-600 hover:text-blue-800 font-semibold">
                    More Details
                    </button>
                    {/* <button
                    className="text-red-600 hover:text-red-800 font-semibold"
                    onClick={() => handleDelete(service.id)}
                    >
                    Delete */}
                    {/* {/* </button> */}
                  </div> 
                  </td>
                </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
