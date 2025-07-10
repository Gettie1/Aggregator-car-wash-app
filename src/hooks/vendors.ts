import { useMutation, useQuery } from "@tanstack/react-query";
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
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: false,
        retry: 1,
    });
}
export const useCreateVendor = () => {
    return useMutation({
        mutationKey: ['createVendor'],
        mutationFn: createVendor,
        onSuccess: () => {
            // Optionally, you can invalidate the vendors query to refetch the list
            useVendors().refetch();
        }
    });
}
export const useUpdateVendor = () => {
    return useMutation({
        mutationKey: ['updateVendor'],
        mutationFn: ({ id, vendorData }: { id: string; vendorData: any }) => updateVendor(id, vendorData),
        onSuccess: (_data, variables) => {
            // Optionally, you can invalidate the vendor query to refetch the updated vendor
            useVendor(variables.id).refetch();
        }
    });
}
export const useDeleteVendor = () => {
    return useMutation({
        mutationKey: ['deleteVendor'],
        mutationFn: deleteVendor,
        onSuccess: () => {
            // Optionally, you can invalidate the vendors query to refetch the list
            useVendors().refetch();
        }
    });
}