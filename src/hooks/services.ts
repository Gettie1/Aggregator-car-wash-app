import { useMutation, useQuery } from "@tanstack/react-query";
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
    return useMutation({
        mutationKey: ['createService'],
        mutationFn: (data: any) => createService(data),
    });
}
export const useUpdateService = (id: string, data: any) => {
    return useMutation({
        mutationKey: ['updateService', id],
        mutationFn: () => updateService(id, data),
    });
}
export const useDeleteService = () => {
    return useMutation({
        mutationKey: ['deleteService'],
        mutationFn: (id: string) => deleteService(id),
    });
}
export const useServiceByVendorId = (vendorId: string) => {
    return useQuery({
        queryKey: ['services', vendorId],
        queryFn: () => getServiceByVendor(vendorId),
        enabled: !!vendorId, // Only run the query if vendorId is truthy
    });
}