// types/vendor.ts
export type Customer = {
  firstName: string
  lastName: string
  email: string
  customer:{
    id: number
    address: string | null
    phone_number: string | null
    created_at: string | null
    updated_at: string | null
  } | null
}

// export interface Customers {
//   id: number
//   firstName: string
//   lastName: string
//   email: string
//   password: string
//   role: 'customer'
//   hashedRefreshToken?: string
//   created_at: string
//   updated_at: string
//   customer: CustomerDetails
// }

export interface Vendors {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
  role: 'vendor'
  hashedRefreshToken?: string
  created_at: string
  updated_at: string
  vendor: VendorDetails
}
export type Vendor = {
  firstName: string
  lastName: string
  email: string
  vendor:{
id: string
business_name: string
tax_id: string
business_address: string
status: string
services:{
  name: string
}
}
}
export interface VendorDetails {
  id: number
  business_name: string
  tax_id: string
  business_address: string
  status: 'active' | 'inactive' | 'pending'
  created_at: string
  updated_at: string
  services?:{
    name: string
  }
}
export interface VendorResponse {}
export interface VehiclesDetails {
  customer_id: number
  id: number
  make: string
  model: string 
  year: number
  color: string
  license_plate: string
}
export type Reviews = {
  id: number
  vehicle?: {
    id: number
    license_plate: string
    model: string
  }
  customer_id: number
  vendor_id: number
  booking_id: number
  rating: number
  comment: string 
  created_at: string
  customer?: {
    id: number
    firstname: string
    lastname: string
    email: string
    phone?: string
  }
  vendor?: {
    id: number
    business_name: string
    tax_id: string
    business_address: string
  }
  service?: {
    id: number
    name: string
    description: string
    price: number
    duration: number
    created_at: string
    updated_at: string

  }
}
export type Bookings = {
  id: number
  duration: number
  location: string
  scheduled_at: string
  status: 'pending' | 'confirmed' | 'cancelled'
  payment_status: 'unpaid' | 'paid' | 'refunded'
  payment_method: 'credit_card' | 'debit_card' | 'cash' | 'paypal'
  created_at: string
  updated_at: string
  customer: number
  vendor: string
  service: string
  vehicle: string
  
}
export type Services = {
  id: number  
  name: string
  description: string 
  price: number
  duration: number
  created_at: string
  updated_at: string
}
  