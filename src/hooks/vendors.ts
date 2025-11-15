import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { createVendor, deleteVendor, getVendor, getVendors, updateVendor } from "@/api/vendorApi";
import { getHeaders } from "@/api/profileApi";
import { url } from "@/api/AuthApi";

export const useVendors = () => {
    return useQuery({
        queryKey: ['vendors'],
        queryFn: getVendors,
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: false,
        retry: 1,
    });
    }

export const useVendor = (id: number) => {
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
        mutationFn: ({ id, vendorData }: { id: number; vendorData: any }) => updateVendor(id, vendorData),
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

export const useCreateVendorProfile = () => {
     return useMutation({
    mutationFn: async (formData: {
      firstName: string
      lastName: string
      email: string
      password: string
      business_name: string
      phone: string
      tax_id: string
      address: string
      status: string
    }) => {
      // 1. Create profile
      const profileRes = await axios.post(`${url}/profile`, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        role: 'vendor',
      })

      const profileId = profileRes.data.id

      // 2. Create vendor using profileId
      const vendorRes = await axios.post(`${url}/vendors`, {
        profileId,
        business_name: formData.business_name,
        phone: formData.phone,
        tax_id: formData.tax_id,
        address: formData.address,
        status: 'active',
      })

      return vendorRes.data
    },
  })
}
export const useDeleteVendorProfile = () => {
    const queryClient = useQueryClient();
return useMutation({
  mutationFn: async (vendorId: number) => {
    const headers = getHeaders();
    console.log('Headers being sent:', headers)

    // First delete the vendor
    
    // Then delete the profile
    const vendorRes = await axios.get(`${url}/vendors/${vendorId}`, { headers })
    const profileId = vendorRes.data.profile?.id
    
    await axios.delete(`${url}/vendors/${vendorId}`, { headers })
    await axios.delete(`${url}/profile/${profileId}`, { headers })
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['vendors'] });
    // toast.success('Vendor profile deleted successfully');
  }
})
    }