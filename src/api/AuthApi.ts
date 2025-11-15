// import { getHeaders } from "./profileApi";
import type { LoginData, registerData } from "@/types/auth";

export const url = import.meta.env.VITE_API_URL;

export const login = async (data: LoginData) => {
  const response = await fetch(`${url}/auth/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
   const jsonData = await response.json();

  if (!response.ok) {
    throw new Error(jsonData.message || "Login failed");
  }

  return jsonData;
};

export const register = async (data: registerData) => {
  const response = await fetch(`${url}/profile`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
   const jsonData = await response.json();

  if (!response.ok) {
    throw new Error(jsonData.message || "Registration failed");
  }

  return jsonData;
};