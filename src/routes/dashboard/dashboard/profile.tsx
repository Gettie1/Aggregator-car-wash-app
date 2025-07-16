import React from 'react';
import { toast } from 'sonner';
import { createFileRoute } from '@tanstack/react-router'
import { useStore } from '@tanstack/react-form';
import { authStore } from '@/store/authStore';
import { useUpdateProfile } from '@/hooks/profile';
// import { useCustomer } from '@/hooks/customers';
// import your updateUserProfile mutation/hook here
// import { useUpdateUserProfile } from '@/hooks/useUpdateUserProfile';

export const Route = createFileRoute('/dashboard/dashboard/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  const {user} = useStore(authStore);
  // const {data: customer} = useCustomer(user.id);
  // const updateUserProfile = useUpdateUserProfile(); // example mutation hook
  const [isLoading, setIsLoading] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [formState, setFormState] = React.useState({
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    phone: user.phone,
  });
  // Pass the required arguments to useUpdateProfile (e.g., user.id and formState)
  // const { data: profiles } = useUpdateProfile(user.id, formState); // Adjust arguments as needed based on your hook definition
  const updateProfileMutate = useUpdateProfile(user.id);


  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    setIsEditing(false);
    setFormState({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      phone: user.phone,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  if (!isEditing) return;
  // toast.loading('Updating profile...');

  setIsLoading(true);
  try {
    // Determine which fields have changed
    const changedFields: Partial<typeof formState> = {};
    for (const key in formState) {
      if (formState[key as keyof typeof formState] !== user[key as keyof typeof user]) {
        changedFields[key as keyof typeof formState] = formState[key as keyof typeof formState];
      }
    }

    if (Object.keys(changedFields).length === 0) {
      toast('No changes to update.');
      setIsEditing(false);
      return;
    }

    // Send only changed fields
    await updateProfileMutate.mutateAsync(changedFields);

    setIsEditing(false);
    toast.success('Profile updated successfully!');
    console.log('Updated fields:', changedFields);
  } catch (error) {
    console.error('Error updating profile:', error);
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gray-50">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg">
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-4">
            <span className="text-4xl font-bold text-blue-600">
              {user.firstname[0]}
            </span>
          </div>
          <h1 className="text-2xl font-bold mb-1">Welcome, {user.firstname} 👋</h1>
          <p className="text-gray-600 text-lg">Here is your profile information:</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">First Name</label>
            <input
              type="text"
              name="firstname"
              value={formState.firstname}
              onChange={handleChange}
              disabled={!isEditing}
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 px-3 py-2 transition"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Last Name</label>
            <input
              type="text"
              name="lastname"
              value={formState.lastname}
              onChange={handleChange}
              disabled={!isEditing}
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 px-3 py-2 transition"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              disabled={!isEditing}
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 px-3 py-2 transition"
              required
            />
          </div>
            <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formState.phone ?? ''}
              onChange={handleChange}
              disabled={!isEditing}
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 px-3 py-2 transition"
              required
            />
            </div>
          <div className="flex gap-4 pt-2">
            {!isEditing ? (
              <button
                type="button"
                className="w-1/2 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition font-semibold"
                onClick={handleEdit}
              >
                Edit Profile
              </button>
            ) : (
              <button
                type="button"
                className="w-1/2 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition font-semibold"
                onClick={handleCancel}
                disabled={isLoading}
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={!isEditing || isLoading}
              className={`w-1/2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition font-semibold ${(!isEditing || isLoading) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
