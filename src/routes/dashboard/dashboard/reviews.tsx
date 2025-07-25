import { useStore } from '@tanstack/react-form'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { toast } from 'sonner'
import type { Review, Reviews } from '@/types/users'
import { authStore } from '@/store/authStore'
import { useDeleteReview, useReviewsByCustomerId} from '@/hooks/reviews'
import ReviewsModal from '@/components/modals/ReviewsModal'

export const Route = createFileRoute('/dashboard/dashboard/reviews')({
  component: RouteComponent,
})

function RouteComponent() {
  const { user } = useStore(authStore)
  const {data:reviews } = useReviewsByCustomerId(user.customerId ?? 0)
  const deleteReviewMutation = useDeleteReview()
  const [isOpenModal, setIsOpenModal] = useState(false)

  const handleDelete = (reviewId: number) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      deleteReviewMutation.mutate(reviewId)
    }
    toast.success('Review deleted successfully!')
  }
  if (!reviews || reviews.length === 0) {
    return <div className="text-gray-500 text-center py-6">No reviews yet</div>
  }
  return <div>
    <div className="mt-6 flex flex-row items-center justify-between">
    <h1 className="text-2xl font-bold">Submitted Reviews</h1>
      <div className="mb-4 flex items-center justify-between">
        <input
          type="text"
          placeholder="Search reviews..."
          className="p-2 border border-gray-300 rounded"
          // onChange={handleSearchChange} // Implement search functionality if needed
        />
      </div>
      <button
        onClick={() => setIsOpenModal(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Reviews
      </button>
      {isOpenModal && (
        <ReviewsModal
          isOpen={isOpenModal}
          onClose={() => setIsOpenModal(false)}
        />
      )}
    </div>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">vendor Nme</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comment</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {reviews?.map((review : Review) => (
            <tr key={review.id}>
              <td className="px-6 py-4 whitespace-nowrap">{review.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{review.vendor}</td>
              <td className="px-6 py-4 whitespace-nowrap">{review.service}</td>
              <td className="px-6 py-4 whitespace-nowrap">{review.vehicle}</td>
              <td className="px-6 py-4 whitespace-nowrap">{review.rating}</td>
              <td className="px-6 py-4 whitespace-nowrap">{review.comment || 'No comment'}</td>
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
      {reviews?.map((review: Reviews) => (
        <div key={review.customer_id}
          className="bg-white  rounded-lg p-4 flex flex-col items-center space-x-4"
        >
          <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center text-xl font-bold text-blue-700">
            {review.customer?.firstname ?? 'U'}
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


