import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCustomer, deleteCustomer, getCustomer, getCustomers, updateCustomer } from "@/api/CustomerApi";
import { getHeaders } from "@/api/profileApi";

const url = 'http://localhost:4001';
export const useCustomers = () => {
    return useQuery({
        queryKey: ['customers'],
        queryFn: () => getCustomers(),
    });
}
export const useCustomer = (id: number) => {
    return useQuery({
        queryKey: ['customer', id],
        queryFn: () => getCustomer(id),
        // enabled: !!id, // Only run the query if id is truthy
    });
}

export const useCreateCustomer = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['createCustomer'],
        mutationFn: createCustomer,
        onSuccess: () => {
            // Optionally, you can invalidate the customers query to refetch the list
            queryClient.invalidateQueries({ queryKey: ['customers'] });
        }
    });
}

export const useUpdateCustomer = (id: number, data: any) => {
  const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['updateCustomer', id],
        mutationFn: () => updateCustomer(id, data),
        onSuccess: () => {
            // Optionally, you can invalidate the customers query to refetch the list
            queryClient.invalidateQueries({ queryKey: ['customers'] });
        }
    });
}

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['deleteCustomer'],
        mutationFn: deleteCustomer,
        onSuccess: () => {
            // Optionally, you can invalidate the customers query to refetch the list
            queryClient.invalidateQueries({ queryKey: ['customers'] });
        }
    });
}
export const useCreateCustomerProfile = () => {
  const mutation = useMutation({
    mutationFn: async (formData: {
      firstName: string
      lastName: string
      email: string
      password: string
      phone: string
      address: string
    }) => {
      // 1. Create profile
      const profileRes = await axios.post(`${url}/profile`, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        role: 'customer',
      });

      const profileId = profileRes.data.id;

      // 2. Create customer using profileId
      const customerRes = await axios.post(`${url}/customer`, {
        profileId,
        phone: formData.phone,
        address: formData.address,
      });

      return customerRes.data;
    }
  });

  return mutation;
}
export const useDeleteCustomerProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (customerId: number) => {
      const headers = getHeaders();
      console.log('Headers being sent:', headers);
      const customerRes = await axios.get(`${url}/customer/${customerId}`, {
        headers,
      });
      console.log('Customer data being deleted:', customerRes.data);
      const profileId = customerRes.data.profile?.id;
      console.log('Profile ID being deleted:', profileId);
      await axios.delete(`${url}/customer/${customerId}`, {
        headers,
      });
      // Then delete the profile using profileId
      console.log('Profile ID being deleted:', profileId);
      await axios.delete(`${url}/profile/${profileId}`, {
        headers,
      });

    },
    onSuccess: () => {
      // Optionally, you can invalidate the customers query to refetch the list
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    }
  });
}
export const useEditCustomerProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      customerId: number;
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      address: string;
    }) => {
      const headers = getHeaders();

      // 1. Get existing customer to find profileId
      const customerRes = await axios.get(`${url}/customer/${data.customerId}`, {
        headers,
      });
      const profileId = customerRes.data.profile?.id;
      // 2. Update profile
      await axios.patch(`${url}/profile/${profileId}`, {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
      }, {
        headers,
      });
      // 3. Update customer
      const customerResUpdated = await axios.patch(`${url}/customer/${data.customerId}`, {
        phone: data.phone,
        address: data.address,
      }, {
        headers,
      });
      return customerResUpdated.data;
    },
    onSuccess: () => {
      // Optionally, you can invalidate the customers query to refetch the list
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    }
  });
}