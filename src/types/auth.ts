export interface LoginData {
  email: string;
  password: string;
}
export interface LoginResponse {
  isVerified: boolean;
    user: {
        id: string;
        role: Role | string;
        email: string;
        firstname: string;
        lastname: string;
    };
    accessToken: string;
    refreshToken: string;
  // hydrated?: boolean; // Indicates whether the state has been initialized from localStorage
}
export enum Role {
  CUSTOMER = 'customer',
  VENDOR = 'vendor',
  ADMIN = 'admin',
}

export interface registerData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
}
export interface registerResponse {
  user: {
    id: string;
    role: Role;
    email: string;
    firstname: string;
    lastname: string;
  };
}
export interface User {
  id: string;
  role: Role;
  email: string;
  firstname: string;
  lastname: string;
}

