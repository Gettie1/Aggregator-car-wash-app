import { useStore } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router"
import { toast } from "sonner";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useMemo } from 'react';
import type { Reviews } from "@/types/users";
import { useDeleteReview, useReviewsByVendorId } from "@/hooks/reviews";
import { authStore } from "@/store/authStore";


export const Route = createFileRoute("/dashboard/dashboard/MyReviews")({
  component: RouteComponent,
});
function RouteComponent() {
  const { user } = useStore(authStore);
  const { data: reviews, isLoading } = useReviewsByVendorId(user.vendorId ?? 0);
  const deleteReviewMutation = useDeleteReview();
  const handleDelete = (reviewId: number) => {
    deleteReviewMutation.mutate(reviewId, {
      onSuccess: () => {
        toast.success("Review deleted successfully!");
      },
      onError: (error) => {
        toast.error(`Failed to delete review: ${error.message}`);
      },
    });
  };
  const reviewStats = useMemo(() => {
  if (!reviews) return { counts: [], serviceAvg: [] };

  const counts = [1, 2, 3, 4, 5].map((star) => ({
    rating: star,
    count: reviews.filter((r: Reviews) => r.rating === star).length,
  }));

  const serviceRatings: { [key: string]: { service: string; total: number; count: number } } = {};

  for (const review of reviews) {
    const serviceName = review.service?.name ?? 'Unknown';
    if (!(serviceName in serviceRatings)) {
      serviceRatings[serviceName] = { service: serviceName, total: 0, count: 0 };
    }
    serviceRatings[serviceName].total += review.rating;
    serviceRatings[serviceName].count += 1;
  }

  const serviceAvg = Object.values(serviceRatings).map((entry) => ({
    service: entry.service,
    avgRating: parseFloat((entry.total / entry.count).toFixed(2)),
  }));

  return { counts, serviceAvg };
}, [reviews]);


  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] text-gray-500">
        <div className="loader mb-2"></div>
        <span>Loading reviews...</span>
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
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Reviews</h1>
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Ratings Distribution */}
  <div className="bg-white p-4 rounded shadow">
    <h2 className="text-lg font-semibold mb-2">Ratings Distribution</h2>
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={reviewStats.counts}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="rating" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="count" fill="#f59e0b" />
      </BarChart>
    </ResponsiveContainer>
  </div>

  {/* Average Rating per Service */}
  <div className="bg-white p-4 rounded shadow">
    <h2 className="text-lg font-semibold mb-2">Average Rating by Service</h2>
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={reviewStats.serviceAvg}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="service" />
        <YAxis domain={[0, 5]} />
        <Tooltip />
        <Bar dataKey="avgRating" fill="#10b981" />
      </BarChart>
    </ResponsiveContainer>
  </div>
</div>

      {reviews && reviews.length > 0 ? (
        <ul className="space-y-4">
          {reviews.map((review: Reviews) => (
        <li key={review.id} className="p-4 border rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
          <div className="text-sm text-gray-600 mb-1">
            By: {review.customer?.firstName} {review.customer?.lastName}
          </div>
          <h2 className="font-semibold">{review.service?.name}</h2>
          <p>{review.comment}</p>
          <div className="text-yellow-500">
            {"★".repeat(review.rating)}{" "}
            {"☆".repeat(5 - review.rating)}
          </div>
          <p className="text-sm text-gray-500">
            Date: {new Date(review.created_at).toLocaleDateString()}
          </p>
            </div>
            <button
          className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={() => handleDelete(review.id)}
            >
          Delete
            </button>
          </div>
        </li>
          ))}
        </ul>
      ) : (
        <p>No reviews found.</p>
      )}
    </div>
  );
}