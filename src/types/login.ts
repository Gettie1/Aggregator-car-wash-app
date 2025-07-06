export interface LoginData {
  email: string;
  password: string;
}
export interface LoginResponse {
  isVerified: boolean;
    user: {
        id: string;
        role: Role;
        email: string;
        firstname: string;
        lastname: string;
    };
    accessToken: string;
    refreshToken: string;
}
export enum Role {
  CUSTOMER = 'customer',
  VENDOR = 'vendor',
  ADMIN = 'admin',
}

export interface registerData {
  firstname: string;
  lastname: string;
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
  accessToken: string;
  refreshToken: string;
}
export interface User {
  id: string;
  role: Role;
  email: string;
  firstname: string;
  lastname: string;
}