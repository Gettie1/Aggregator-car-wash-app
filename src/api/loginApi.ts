import type { LoginData } from "@/types/login";

const url = 'http://localhost:4001/auth/signin';

export const login = async (data: LoginData) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Login failed');
  }
  const jsonData = await response.json();
  return jsonData;
}