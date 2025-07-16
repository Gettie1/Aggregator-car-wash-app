import { getHeaders } from "./profileApi";
import type { LoginData, registerData } from "@/types/auth";

const url = 'http://localhost:4001';

export const login = async (data: LoginData) => {
  const response = await fetch(`${url}/auth/signin`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Login failed');
  }
  const jsonData = await response.json();
  return jsonData;
}

export const register = async (data: registerData) => {
  const response = await fetch(`${url}/profile`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Registration failed');
  }
  const jsonData = await response.json();
  return jsonData;
}