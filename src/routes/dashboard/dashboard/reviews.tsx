import { useStore } from '@tanstack/react-form'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { toast } from 'sonner'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { Review } from '@/types/users'
import { authStore } from '@/store/authStore'
import { useDeleteReview, useReviewsByCustomerId } from '@/hooks/reviews'
import ReviewsModal from '@/components/modals/ReviewsModal'

export const Route = createFileRoute('/dashboard/dashboard/reviews')({
  component: RouteComponent,
})

function RouteComponent() {
  const { user } = useStore(authStore)
  const { data: reviews } = useReviewsByCustomerId(user.customerId ?? 0)
  const deleteReviewMutation = useDeleteReview()
  const [isOpenModal, setIsOpenModal] = useState(false)

  const handleDelete = (reviewId: number) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      deleteReviewMutation.mutate(reviewId)
      toast.success('Review deleted successfully!')
    }
  }

  // Prepare chart data
  const ratingData = [1, 2, 3, 4, 5].map(rating => ({
    rating: rating.toString(),
    count: reviews?.filter((r: Review) => r.rating === rating).length ?? 0,
  }))

  if (!reviews || reviews.length === 0) {
    return <div className="text-gray-500 text-center py-6">No reviews yet</div>
  }

  return (
    <div>
      <div className="mt-6 flex flex-row items-center justify-between">
        <h1 className="text-2xl font-bold">Submitted Reviews</h1>
        <div className="mb-4 flex items-center justify-between">
          <input
            type="text"
            placeholder="Search reviews..."
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          onClick={() => setIsOpenModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Reviews
        </button>
        {isOpenModal && (
          <ReviewsModal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} />
        )}
      </div>

      {/* Reviews Table */}
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comment</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reviews.map((review: Review) => (
              <tr key={review.id}>
                <td className="px-6 py-4 whitespace-nowrap">{review.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{review.vendor}</td>
                <td className="px-6 py-4 whitespace-nowrap">{review.service}</td>
                <td className="px-6 py-4 whitespace-nowrap">{review.rating}</td>
                <td className="px-6 py-4 whitespace-nowrap">{review.comment || 'No comment'}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(review.created_at).toLocaleDateString()}
                </td>
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

      {/* Rating Analytics Graph */}
      <div className="mt-10 bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Rating Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={ratingData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="rating" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
