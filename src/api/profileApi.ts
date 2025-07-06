import type { registerData } from "@/types/login";

const url = 'http://localhost:4001/profile';

// create a new profile
export const createProfile = async (data: registerData) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const jsonData = await response.json();
    if (!response.ok) {
        throw new Error(jsonData.message || 'Failed to create profile');
    }
  
}