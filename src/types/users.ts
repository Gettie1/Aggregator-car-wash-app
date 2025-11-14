// types/vendor.ts
export type Customer = {
    firstName: string
    lastName: string
    email: string
    // phone?: string
    customer: {
      id: number
      address: string | null
      phone: string | null
      created_at: string | null
      updated_at: string | null
    } | null
}
export interface Profile {
  id: number
  firstName: string
  lastName: string
  email: string
  image: string | null
  created_at: string | null
  updated_at: string | null
}

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
  id: number
  business_name: string
  tax_id: number
  business_address: string
  status: string
  profile: {
  firstName: string
  lastName: string
  email: string
  }
  services:{
  name: string
}
}
export interface VendorDetails {
  id: number
  business_name: string
  tax_id: number
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
  image: string | null
  customer_id: number
  id: number
  make: string
  model: string 
  year: number
  color: string
  license_plate: string
}
export type Review = {
  id: number
  vehicle: number
  customer_id: number
  rating: number
  comment: string
  vendor: string
  service: string
  created_at: string
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
    firstName: string
    lastName: string
    email: string
    phone?: string
  }
  vendor?: {
    id: number
    business_name: string
    tax_id: number
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
  servicePrice: string
  
}
export type Services = {
  id: number  
  name: string
  description: string 
  price: number
  duration: number
  created_at: string
  updated_at: string
  vendor:{
    id:number
  }
}
export type Payments = {
  payment_id: number
  payment_status: string
  payment_method: string
  paystack_reference: string
  payment_date: string
  amount: number
}