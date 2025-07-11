import { useMutation, useQuery } from "@tanstack/react-query";
import type { Customer } from "@/types/users";
import type { UseQueryResult } from "@tanstack/react-query";
import { createCustomer, deleteCustomer, getCustomer, getCustomers, updateCustomer } from "@/api/CustomerApi";

export const useCustomers = (): UseQueryResult<Array<Customer>> => {
    return useQuery({
        queryKey: ['customers'],
        queryFn: () => getCustomers(),
    });
}
export const useCustomer = (id: string) => {
    return useQuery({
        queryKey: ['customer', id],
        queryFn: () => getCustomer(id),
        // enabled: !!id, // Only run the query if id is truthy
    });
}

export const useCreateCustomer = () => {
    return useMutation({
        mutationKey: ['createCustomer'],
        mutationFn: createCustomer,
    });
}

export const useUpdateCustomer = (id: string, data: any) => {
    return useMutation({
        mutationKey: ['updateCustomer', id],
        mutationFn: () => updateCustomer(id, data),
    });
}

export const useDeleteCustomer = () => {
    return useMutation({
        mutationKey: ['deleteCustomer'],
        mutationFn: deleteCustomer,
    });
}