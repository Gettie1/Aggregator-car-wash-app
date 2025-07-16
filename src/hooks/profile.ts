import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SignUp, deleteProfile, getProfile, getProfiles, requestDeleteAccount, updateProfile } from "@/api/profileApi";

export const useProfiles = () => {
    return useQuery({
        queryKey: ['profiles'],
        queryFn: getProfiles,
    });
}

export const useProfile = (id: string) => {
    return useQuery({
        queryKey: ['profile', id],
        queryFn: () => getProfile(id),
        enabled: !!id, // Only run the query if id is truthy
    });
}

export const useCreateProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['createProfile'],
        mutationFn: (data: any) => SignUp(data),
        onSuccess: () => {
            // Invalidate the profiles query to refetch the list after creation
            queryClient.invalidateQueries({ queryKey: ['profiles'] });
        },
    });
}

export const useUpdateProfile = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['updateProfile', id],
        mutationFn: (data: Partial<{ firstname: string; lastname: string; email: string; phone?: string }>) => updateProfile(id, data),
        onSuccess: () => {
            // Invalidate the profile query to refetch the updated profile
            queryClient.invalidateQueries({ queryKey: ['profile', id] });
            queryClient.invalidateQueries({ queryKey: ['profiles'] });
        },
    });
}

export const useDeleteProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['deleteProfile'],
        mutationFn: ({
    id,
    soft,
    permanent,
  }: { id: string; soft?: boolean; permanent?: boolean }) => deleteProfile(id, soft, permanent),

        onSuccess: () => {
            // Invalidate the profiles query to refetch the list after deletion
            queryClient.invalidateQueries({ queryKey: ['profiles'] });
        },
    });
}
export const useRequestDelete = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['requestDelete'],
        mutationFn: (id: string) => requestDeleteAccount(id),
        onSuccess: () => {
            // Invalidate the profiles query to refetch the list after deletion
            queryClient.invalidateQueries({ queryKey: ['profiles'] });
        },
    });
}

