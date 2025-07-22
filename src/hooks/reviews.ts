import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createReview, deleteReview, getReview, getReviews, getReviewsByCustomerId, getReviewsByVehicleId, getReviewsByVendorId, updateReview } from "@/api/Reviews";

export const useReviews = () => {
    return useQuery({
        queryKey: ['reviews'],
        queryFn: () => getReviews(),
    });
}

export const useReview = (id: number) => {
    return useQuery({
        queryKey: ['review', id],
        queryFn: () => getReview(id),
        enabled: !!id, // Only run the query if id is truthy
    });
}
export const useCreateReview = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['createReview'],
        mutationFn: (data: any) => createReview(data),
        onSuccess: () => {
            // Invalidate the reviews query to refetch the list after creation
            queryClient.invalidateQueries({ queryKey: ['reviews'] });
        },
    });
}
export const useUpdateReview = (id: number, data: any) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['updateReview', id],
        mutationFn: () => updateReview(id, data),
        onSuccess: () => {
            // Invalidate the reviews query to refetch the updated review
            queryClient.invalidateQueries({ queryKey: ['review', id] });
            queryClient.invalidateQueries({ queryKey: ['reviews'] });
        },
    });
}
export const useDeleteReview = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['deleteReview'],
        mutationFn: (id: number) => deleteReview(id),
        onSuccess: () => {
            // Invalidate the reviews query to refetch the list after deletion
            queryClient.invalidateQueries({ queryKey: ['reviews'] });
        },
    });
}

export const useReviewsByVehicleId = (vehicleId: number) => {
    return useQuery({
        queryKey: ['reviews', vehicleId],
        queryFn: () => getReviewsByVehicleId(vehicleId),
        enabled: !!vehicleId, // Only run the query if vehicleId is truthy
    });
}
export const useReviewsByCustomerId = (customerId: number) => {
    return useQuery({
        queryKey: ['reviews', customerId],
        queryFn: () => getReviewsByCustomerId(customerId),
        enabled: !!customerId, 
    });
}
export const useReviewsByVendorId = (vendorId: number) => {
    return useQuery({
        queryKey: ['reviews', 'vendor', vendorId],
        queryFn: () => getReviewsByVendorId(vendorId), // Adjust this to fetch reviews by vendor ID if your API supports it
        enabled: !!vendorId, // Only run the query if vendorId is truthy
    });
}