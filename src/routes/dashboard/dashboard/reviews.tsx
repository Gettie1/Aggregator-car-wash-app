import { useStore } from '@tanstack/react-form'
import { createFileRoute } from '@tanstack/react-router'
import { toast } from 'sonner'
import type { Reviews } from '@/types/users'
import { authStore } from '@/store/authStore'
import { useDeleteReview, useReviewsByVendorId } from '@/hooks/reviews'

export const Route = createFileRoute('/dashboard/dashboard/reviews')({
  component: RouteComponent,
})

function RouteComponent() {
  const { user } = useStore(authStore)
  const {data:reviews } = useReviewsByVendorId(user.vendorId || '')
  const deleteReviewMutation = useDeleteReview()
  const handleDelete = (reviewId: number) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      deleteReviewMutation.mutate(reviewId.toString())
    }
    toast.success('Review deleted successfully!')
  }
  if (!reviews || reviews.length === 0) {
    return <div className="text-gray-500 text-center py-6">No reviews yet</div>
  }
  return <div>
    <h1 className="text-2xl font-bold">Reviews</h1>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comment</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {reviews?.map((review : Reviews) => (
            <tr key={review.id}>
              <td className="px-6 py-4 whitespace-nowrap">{review.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{review.customer_id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{review.booking_id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{review.vehicle?.license_plate}</td>
              <td className="px-6 py-4 whitespace-nowrap">{review.rating}</td>
              <td className="px-6 py-4 whitespace-nowrap">{review.comment}</td>
              <td className="px-6 py-4 whitespace-nowrap">{new Date(review.created_at).toLocaleDateString()}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => handleDelete(review.id)}
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
    {/* customer profile cards */}
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {reviews?.map((review: Reviews)=> (
        <div key={review.customer_id} 
         className="bg-white  rounded-lg p-4 flex flex-col items-center space-x-4"
          >
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center text-xl font-bold text-blue-700">
              {review.customer?.firstname?? 'U'}
            </div>
            <div>
              <p className="text-lg font-semibold">
                {review.customer?.firstname} {review.customer?.lastname}
              </p>
              <p className="text-sm text-gray-500">{review.customer?.email}</p>
              <p className="text-xs text-gray-400">ID: {review.customer_id}</p>
              <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, index) => (
                      <span key={index}>
                   {index < review.rating ? '⭐' : '☆'}
                   </span>
                     ))}
              </div>

              <p className="text-sm text-gray-600">{review.comment}</p>
            </div>
          </div>
        ))}
      </div>
  </div>
}


