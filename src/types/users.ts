// types/vendor.ts
export type Customer = {
  firstName: string
  lastName: string
  email: string
  customer:{
    id: number
    address: string
    phone_number: string
  }
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
}
export interface VehiclesDetails {
  id: number  
  make: string
  model: string 
  year: number
  color: string
  license_plate: string
}
export type Reviews = {
  id: number
  vehicle_id: number
  customer_id: number
  vendor_id: number
  booking_id: number
  rating: number
  comment: string 
  created_at: string
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
  