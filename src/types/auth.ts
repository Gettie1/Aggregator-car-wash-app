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
        phone?: string; // Optional, can be added later
        customerId?: string; // Optional, can be added later
        vendorId?: string; // Optional, can be added later
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
  id?: string; // Optional, can be added later
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
  phone?: string; // Optional, can be added later
}
export interface registerResponse {
    id: string;
    role: Role;
    email: string;
    firstname: string;
    lastname: string;
    phone?: string; // Optional, can be added later
}
// export interface User {
//   id: string;
//   role: Role;
//   email: string;
//   firstname: string;
//   lastname: string;
//   phone?: string; // Optional, can be added later
//   customerId?: string; // Optional, can be added later
//   vendorId?: string; // Optional, can be added later
// }

