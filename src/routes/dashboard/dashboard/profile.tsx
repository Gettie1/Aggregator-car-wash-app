import React from 'react';
import { toast } from 'sonner';
import { createFileRoute } from '@tanstack/react-router';
import { useStore } from '@tanstack/react-form';
import { authStore } from '@/store/authStore';
import { useProfile, useUpdateProfile } from '@/hooks/profile';
import { uploadFile } from '@/hooks/upload';

export const Route = createFileRoute('/dashboard/dashboard/profile')({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useStore(authStore);
  const [isEditing, setIsEditing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const { data: profile } = useProfile(user.id);
  console.log('Profile data:', profile);

  // Use profile?.image if available, otherwise fallback to user.image
  React.useEffect(() => {
    if (profile) {
      setFormState(prev => ({
        ...prev,
        image: profile.image || user.image || '',
      }));
    }
    // Only update image when profile changes
  }, [profile]);
  const updateProfileMutate = useUpdateProfile(user.id);

  const [formState, setFormState] = React.useState({
    firstname: user.firstname || '',
    lastname: user.lastname || '',
    email: user.email || '',
    phone: user.phone || '',
    image: user.image || '',
  });

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    setIsEditing(false);
    setFormState({
      firstname: user.firstname || '',
      lastname: user.lastname || '',
      email: user.email || '',
      phone: user.phone || '',
      image: user.image || '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsLoading(true);
      const uploadedUrl = await uploadFile(file);
      setFormState(prev => ({ ...prev, image: uploadedUrl }));
      toast.success('Image uploaded successfully!');
    } catch (error) {
      toast.error('Image upload failed');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEditing) return;

    const changes: Partial<typeof formState> = {};
    for (const key in formState) {
      if (formState[key as keyof typeof formState] !== user[key as keyof typeof formState]) {
        changes[key as keyof typeof formState] = formState[key as keyof typeof formState];
      }
    }
    console.log('Changes to submit:', changes);
await updateProfileMutate.mutateAsync(changes);


    if (Object.keys(changes).length === 0) {
      toast('No changes to update.');
      return;
    }

    try {
      setIsLoading(true);
      await updateProfileMutate.mutateAsync(changes);
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (err) {
      toast.error('Failed to update profile');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gray-50">
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-lg">
        <div className="flex flex-col items-center mb-6">
          {formState.image ? (
            <img
              src={formState.image}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover mb-4"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <span className="text-4xl font-bold text-blue-600">
                {user.firstname[0] || 'U'}
              </span>
            </div>
          )}
          <h1 className="text-2xl font-bold mb-1">Welcome, {user.firstname} 👋</h1>
          <p className="text-gray-600 text-lg">Manage your profile information:</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <InputField
            label="First Name"
            name="firstname"
            value={formState.firstname}
            onChange={handleChange}
            disabled={!isEditing}
          />
          <InputField
            label="Last Name"
            name="lastname"
            value={formState.lastname}
            onChange={handleChange}
            disabled={!isEditing}
          />
          <InputField
            label="Email"
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChange}
            disabled={!isEditing}
          />
          <InputField
            label="Phone Number"
            name="phone"
            type="tel"
            value={formState.phone}
            onChange={handleChange}
            disabled={!isEditing}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image</label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              disabled={!isEditing}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="flex gap-4 pt-2">
            {!isEditing ? (
              <button
                type="button"
                className="w-1/2 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition font-semibold"
                onClick={handleEdit}
              >
                Edit
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
              className={`w-1/2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition font-semibold ${
                (!isEditing || isLoading) ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={!isEditing || isLoading}
            >
              {isLoading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function InputField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  disabled,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  disabled?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
        required
      />
    </div>
  );
}
