import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createVendor, deleteVendor, getVendor, getVendors, updateVendor } from "@/api/vendorApi";

export const useVendors = () => {
    return useQuery({
        queryKey: ['vendors'],
        queryFn: getVendors,
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: false,
        retry: 1,
    });
    }

export const useVendor = (id: string) => {
    return useQuery({
        queryKey: ['vendor', id],
        queryFn: () => getVendor(id),
        enabled: !!id, // Only run the query if id is truthy
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: false,
        retry: 1,
    });
}
export const useCreateVendor = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['createVendor'],
        mutationFn: createVendor,
        onSuccess: () => {
            // Optionally, you can invalidate the vendors query to refetch the list
            queryClient.invalidateQueries({ queryKey: ['vendors'] });
        }
    });
}
export const useUpdateVendor = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['updateVendor'],
        mutationFn: ({ id, vendorData }: { id: string; vendorData: any }) => updateVendor(id, vendorData),
        onSuccess: (_data, variables) => {
            // Invalidate the specific vendor query to refetch updated data
            queryClient.invalidateQueries({ queryKey: ['vendor', variables.id] });
            // Optionally, you can also invalidate the vendors list
            queryClient.invalidateQueries({ queryKey: ['vendors'] });
        }
    });
}
export const useDeleteVendor = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['deleteVendor'],
        mutationFn: deleteVendor,
        onSuccess: () => {
            // Optionally, you can invalidate the vendors query to refetch the list
            queryClient.invalidateQueries({ queryKey: ['vendors'] });
        }
    });
}