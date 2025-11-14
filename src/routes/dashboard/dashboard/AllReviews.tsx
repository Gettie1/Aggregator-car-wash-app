import { createFileRoute } from '@tanstack/react-router'
// import { useStore } from '@tanstack/react-form'
import { toast } from 'sonner'
import { groupBy } from 'lodash'
import {
CartesianGrid,
Legend,
Line,
LineChart,
ResponsiveContainer,
Tooltip,
XAxis,
YAxis,
} from 'recharts'
import type { Reviews } from '@/types/users'
// import { authStore } from '@/store/authStore'
import { useDeleteReview, useReviews } from '@/hooks/reviews'

export const Route = createFileRoute('/dashboard/dashboard/AllReviews')({
  component: RouteComponent,
})

function RouteComponent() {
    // const { user } = useStore(authStore)
    const { data: reviews = [] } = useReviews()

// Group reviews by vendor and date
const vendorRatingData: Record<string, Array<{ date: string; rating: number }>> = {}

if (reviews) {
  const grouped = groupBy(reviews, (review: Reviews) =>
    `${review.vendor?.business_name}-${new Date(review.created_at).toISOString().slice(0, 10)}`
  )

  for (const key in grouped) {
    const [vendorName, date] = key.split('-')
    const group = grouped[key]
    const avgRating = group.reduce((sum, r) => sum + r.rating, 0) / group.length

    if (typeof vendorRatingData[vendorName] === 'undefined') {
      vendorRatingData[vendorName] = []
    }

    vendorRatingData[vendorName].push({
      date,
      rating: parseFloat(avgRating.toFixed(2)),
    })
  }
}
console.log(reviews)
// Normalize data to have one record per date with all vendors
const allDates = Array.from(
  new Set(reviews.map((r: Reviews) => new Date(r.created_at).toISOString().slice(0, 10)))
).sort()

const chartData = allDates.map((date) => {
  const row: any = { date }
  for (const vendor in vendorRatingData) {
    const found = vendorRatingData[vendor].find((r) => r.date === date)
    row[vendor] = found?.rating ?? null
  }
  return row
})
console.log(chartData)

    const deleteReviewMutation = useDeleteReview()
    const handleDelete = (reviewId: number) => {
        if (window.confirm('Are you sure you want to delete this review?')) {
            deleteReviewMutation.mutate(reviewId)
        }
        toast.success('Review deleted successfully!')
    }
    if (!reviews) {
        return <div>No reviews found.</div>
    }
    return (
        <div>
            <h1 className="text-2xl font-bold">Manage Reviews</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comment</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {reviews.map((review: Reviews) => (
                            <tr key={review.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{review.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{review.customer_id}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{review.vendor?.business_name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{review.service?.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{review.vehicle?.license_plate}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{review.rating}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{review.comment || 'No Comment'}</td>
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
            <div className="mt-12">
  <h2 className="text-xl font-bold mb-4">📈 Average Rating by Vendor Over Time</h2>
  <ResponsiveContainer width="100%" height={400}>
    <LineChart data={chartData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis domain={[0, 5]} allowDecimals />
      <Tooltip />
      <Legend />
      {Object.keys(vendorRatingData).map((vendor, idx) => (
        <Line
          key={vendor}
          type="monotone"
          dataKey={vendor}
          name={vendor}
          stroke={['#8884d8', '#82ca9d', '#ff7300', '#00C49F'][idx % 4]} // Color palette
          connectNulls
        />
      ))}
    </LineChart>
  </ResponsiveContainer>
</div>

        </div>
    )

 
}
