import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createService, deleteService, getService, getServiceByVendor, getServices, updateService } from "@/api/ServicesApi";

export const useServices = () => {
    return useQuery({
        queryKey: ['services'],
        queryFn: () => getServices(),
    });
    }
export const useService = (id: string) => {
    return useQuery({
        queryKey: ['service', id],
        queryFn: () => getService(id),
        // enabled: !!id, // Only run the query if id is truthy
    });
}
export const useCreateService = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['createService'],
        mutationFn: (data: any) => createService(data),
        onSuccess: () => {
            // Invalidate the services query to refetch the list after creation
            queryClient.invalidateQueries({ queryKey: ['services'] });
        },
    });
}
export const useUpdateService = (id: string, data: any) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['updateService', id],
        mutationFn: () => updateService(id, data),
        onSuccess: () => {
            // Invalidate the services query to refetch the updated service
            queryClient.invalidateQueries({ queryKey: ['service', id] });
            queryClient.invalidateQueries({ queryKey: ['services'] });
        },
    });
}
export const useDeleteService = () => {
    const queryclient = useQueryClient();
    return useMutation({
        mutationKey: ['deleteService'],
        mutationFn: (id: string) => deleteService(id),
        onSuccess: () => {
            // Invalidate the services query to refetch the list after deletion
            queryclient.invalidateQueries({ queryKey: ['services'] });
        },
    });
}
export const useServiceByVendorId = (vendorId: string) => {
    return useQuery({
        queryKey: ['services', vendorId],
        queryFn: () => getServiceByVendor(vendorId),
        enabled: !!vendorId, // Only run the query if vendorId is truthy
    });
}