import type { registerData } from "@/types/auth";
import { authStore } from "@/store/authStore";

const url = 'http://localhost:4001/profile';


export const getHeaders = () => {
  const token = authStore.state.accessToken;
  return {
    'Content-Type': 'application/json',
    ...(token && {Authorization: `Bearer ${token}`})
  };
}

// create a new profile
export const SignUp = async (data: registerData) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  const jsonData = await response.json();
    if (!response.ok) {
        throw new Error(jsonData.message || 'Failed to create profile');
    }
  
}
export const getProfiles = async () => {
  const response = await fetch(url, {
    method: 'GET',
    headers: getHeaders(),
  });
  const jsonData = await response.json();
  if (!response.ok) {
    throw new Error(jsonData.message || 'Failed to fetch profiles');
  }
  return jsonData;
}
export const getProfile = async (id: number) => {
  const response = await fetch(`${url}/${id}`, {
    method: 'GET',
    headers: getHeaders(),
  });
  const jsonData = await response.json();
  if (!response.ok) {
    throw new Error(jsonData.message || 'Failed to fetch profile');
  }
  return jsonData;
}
 export const updateProfile = async (id: number, data: any) => {
  const response = await fetch(`${url}/${id}`, {
    method: 'PATCH',
    headers:getHeaders(),
    body: JSON.stringify(data),
  });
  const jsonData = await response.json();
  if (!response.ok) {
    throw new Error(jsonData.message || 'Failed to update profile');
  }
  return jsonData;  
}
 export const deleteProfile = async (id: number, soft?: boolean, permanent?: boolean) => {
  const response = await fetch(`${url}/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
    body: JSON.stringify({ soft, permanent }),
  });
  const jsonData = await response.json();
  if (!response.ok) {
    throw new Error(jsonData.message || 'Failed to delete profile');
  }
  return jsonData;
}
 export const requestDeleteAccount = async (id: number) => {
  const response = await fetch(`${url}/request-delete/${id}`, {
    method: 'POST',
    headers: getHeaders(),
  });
  const jsonData = await response.json();
  if (!response.ok) {
    throw new Error(jsonData.message || 'Failed to request account deletion');
  }
  return jsonData;
}
