import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createBooking, deleteBooking, getBooking, getBookings, getBookingsByCustomerId, getBookingsByVendorId, getUpdateBookingStatus, updateBooking } from "@/api/Bookings";

export const useBookings = () => {
    return useQuery({
        queryKey: ['bookings'],
        queryFn: () => getBookings(),
    });
}
export const useBooking = (id: string) => {
    return useQuery({
        queryKey: ['booking',id],
        queryFn: () => getBooking(id)
    })
}
export const useCreateBooking = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['createBooking'],
        mutationFn: (data: any) => createBooking(data),
        onSuccess: () => {
            // Invalidate the bookings query to refetch the list after creation
            queryClient.invalidateQueries({ queryKey: ['bookings'] });
        },
    });
}
export const useUpdateBooking = (id: string, data: any) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['updateBooking', id],
        mutationFn: () => updateBooking(id,data),
        onSuccess: () => {
            // Invalidate the bookings query to refetch the updated booking
            queryClient.invalidateQueries({ queryKey: ['booking', id] });
            queryClient.invalidateQueries({ queryKey: ['bookings'] });
        },
    });
}
export const useDeleteBooking = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['deleteBooking'],
        mutationFn: (id: string) => deleteBooking(id),
        onSuccess: () => {
            // Invalidate the bookings query to refetch the list after deletion
            queryClient.invalidateQueries({ queryKey: ['bookings'] });
        },
    });
}
export const useBookingsByVendorId = (vendorId: string) => {
    return useQuery({
        queryKey: ['bookings', vendorId],
        queryFn: () => getBookingsByVendorId(vendorId),
        enabled: !!vendorId, // Only run the query if vendorId is truthy
    });
}
export const useBookingsByCustomerId = (customerId: string) => {
    // const queryClient = useQueryClient();
    return useQuery({
        queryKey: ['bookings', 'customer', customerId],
        queryFn: () => getBookingsByCustomerId(customerId),
        enabled: !!customerId, // Only run the query if customerId is truthy
    });
}
export const useUpdateBookingStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['updateBookingStatus'],
        mutationFn: ({ id, status }: { id: string; status: string }) => getUpdateBookingStatus(id, status),
        onSuccess: () => {
            // Invalidate the bookings query to refetch the list after status update
            queryClient.invalidateQueries({ queryKey: ['bookings'] });
        },
    });
}