import { useMutation, useQuery } from "@tanstack/react-query";
import { createBooking, getBooking, getBookings } from "@/api/Bookings";

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
    return useMutation({
         mutationKey: ['createBooking'],
         mutationFn: (data:any) => createBooking(data),
    })
}
export const useUpdateBooking = (id: string, data: any) => {
    return useMutation({
        mutationKey: ['updateBooking', id],
        mutationFn: () => createBooking(data),
    });
}
export const useDeleteBooking = () => {
    return useMutation({
        mutationKey: ['deleteBooking'],
        mutationFn: (id: string) => createBooking(id),
    });
}
