import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createVehicle, deleteVehicle, getVehicle, getVehicles, getVehiclesByCustomerId, updateVehicle } from "@/api/vehiclesApi"

export const useVehicles = () => {
    return useQuery({
        queryKey: ['vehicles'],
        queryFn: () => getVehicles(),
    });
}

export const useVehicle = (id: number) => {
    return useQuery({
        queryKey: ['vehicle', id],
        queryFn: () => getVehicle(id),
        enabled: !!id, // Only run the query if id is truthy
    });
}

export const useVehiclebyCustomerId = (customerId: number) => {
    return useQuery({
        queryKey: ['vehicles', customerId],
        queryFn: () => getVehiclesByCustomerId(customerId),
        enabled: !!customerId, // Only run the query if customerId is truthy
    });
}
export const useCreateVehicle = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['createVehicle'],
        mutationFn: createVehicle,
        onSuccess: () => {
            // Optionally, you can invalidate the vehicles query to refetch the list
            queryClient.invalidateQueries({ queryKey: ['vehicles'] });
        }
}
    );
}

export const useUpdateVehicle = (id: number, data: any) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['updateVehicle', id],
        mutationFn: () => updateVehicle(id, data),
        onSuccess: () => {
            // Invalidate the specific vehicle query to refetch updated data
            queryClient.invalidateQueries({ queryKey: ['vehicle', id] });
            // Optionally, you can also invalidate the vehicles list
            queryClient.invalidateQueries({ queryKey: ['vehicles'] });
        }
    });
}


export const useDeleteVehicle = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['deleteVehicle'],
        mutationFn: (id: number) => deleteVehicle(id),
        onSuccess: () => {
            // Optionally, you can invalidate the vehicles query to refetch the list
            queryClient.invalidateQueries({ queryKey: ['vehicles'] });
        }
    });
}