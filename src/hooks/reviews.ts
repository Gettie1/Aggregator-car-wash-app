import { useMutation, useQuery } from "@tanstack/react-query";
import { createReview, deleteReview, getReview, getReviews, getReviewsByCustomerId, getReviewsByVehicleId, updateReview } from "@/api/Reviews";

export const useReviews = () => {
    return useQuery({
        queryKey: ['reviews'],
        queryFn: () => getReviews(),
    });
}

export const useReview = (id: string) => {
    return useQuery({
        queryKey: ['review', id],
        queryFn: () => getReview(id),
        enabled: !!id, // Only run the query if id is truthy
    });
}
export const useCreateReview = () => {
    return useMutation({
        mutationKey: ['createReview'],
        mutationFn: (data: any) => createReview(data),
    });
}
export const useUpdateReview = (id: string, data: any) => {
    return useMutation({
        mutationKey: ['updateReview', id],
        mutationFn: () => updateReview(id, data),
    });
}
export const useDeleteReview = () => {
    return useMutation({
        mutationKey: ['deleteReview'],
        mutationFn: (id: string) => deleteReview(id),
    });
}

export const useReviewsByVehicleId = (vehicleId: string) => {
    return useQuery({
        queryKey: ['reviews', vehicleId],
        queryFn: () => getReviewsByVehicleId(vehicleId),
        enabled: !!vehicleId, // Only run the query if vehicleId is truthy
    });
}
export const useReviewsByCustomerId = (customerId: string) => {
    return useQuery({
        queryKey: ['reviews', customerId],
        queryFn: () => getReviewsByCustomerId(customerId),
        enabled: !!customerId, 
    });
}