import { useMutation, useQuery } from "@tanstack/react-query"
import { createVehicle, deleteVehicle, getVehicle, getVehicles, getVehiclesByCustomerId, updateVehicle } from "@/api/vehiclesApi"

export const useVehicles = () => {
    return useQuery({
        queryKey: ['vehicles'],
        queryFn: () => getVehicles(),
    });
}

export const useVehicle = (id: string) => {
    return useQuery({
        queryKey: ['vehicle', id],
        queryFn: () => getVehicle(id),
        enabled: !!id, // Only run the query if id is truthy
    });
}

export const useVehiclebyCustomerId = (customerId: string) => {
    return useQuery({
        queryKey: ['vehicles', customerId],
        queryFn: () => getVehiclesByCustomerId(customerId),
        enabled: !!customerId, // Only run the query if customerId is truthy
    });
}
export const useCreateVehicle = () => {
    return useMutation({
        mutationKey: ['createVehicle'],
        mutationFn: createVehicle,
}
    );
}

export const useUpdateVehicle = (id: string, data: any) => {
    return useMutation({
        mutationKey: ['updateVehicle', id],
        mutationFn: () => updateVehicle(id, data),
    });
}


export const useDeleteVehicle = () => {
    return useMutation({
        mutationKey: ['deleteVehicle'],
        mutationFn: (id: string) => deleteVehicle(id),
    });
}