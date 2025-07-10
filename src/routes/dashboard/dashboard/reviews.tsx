import { useStore } from '@tanstack/react-form'
import { createFileRoute } from '@tanstack/react-router'
import type { Reviews } from '@/types/users'
import { authStore } from '@/store/authStore'
import { useReviewsByCustomerId } from '@/hooks/reviews'

export const Route = createFileRoute('/dashboard/dashboard/reviews')({
  component: RouteComponent,
})

function RouteComponent() {
  const { user } = useStore(authStore)
  const {data:reviews } = useReviewsByCustomerId(user.id)
  return <div>
    <h1 className="text-2xl font-bold">Reviews</h1>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Review</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comment</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {reviews?.map((review : Reviews) => (
            <tr key={review.id}>
              <td className="px-6 py-4 whitespace-nowrap">{review.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{review.vendor_id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{review.booking_id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{review.vehicle_id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{review.rating}</td>
              <td className="px-6 py-4 whitespace-nowrap">{review.comment}</td>
              <td className="px-6 py-4 whitespace-nowrap">{new Date(review.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
}
