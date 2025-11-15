import { Link, createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import axios from 'axios'
import { z } from 'zod'
import { toast } from 'sonner'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { url } from '@/api/AuthApi';

const baseSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50, 'First name must be less than 50 characters'),
  lastName: z.string().min(1, 'Last name is required').max(50, 'Last name must be less than 50 characters'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

const vendorSchema = baseSchema.extend({
  business_name: z.string().min(1, 'Business name is required'),
  phone: z.string().min(1, 'Phone is required').max(10, 'Phone must be 10 digits'),
  tax_id: z.string().min(1, 'Tax ID is required'),
  address: z.string().min(1, 'Address is required'),
})

const customerSchema = baseSchema.extend({
  address: z.string().min(1, 'Address is required'),
  phone: z.string().min(1, 'Phone is required').max(10, 'Phone must be 10 digits'),
})

// const adminSchema = baseSchema.extend({
//   business_name: z.string().optional(),
//   phone: z.string().optional(),
//   tax_id: z.string().optional(),
//   address: z.string().optional(),
// })

export const Route = createFileRoute('/register')({
  component: RouteComponent,
})

function RouteComponent() {
  const [activeForm, setActiveForm] = useState<'vendor' | 'customer'>('vendor')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    business_name: '',
    phone: '',
    tax_id: '',
    address: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }))
  }

  const getSchema = () => {
    if (activeForm === 'vendor') return vendorSchema
    // if (activeForm === 'customer') return customerSchema
    // if (activeForm === 'admin') return adminSchema
    return customerSchema // fallback to avoid undefined
  }
  // Remove 'admin' from the role selection
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const schema = getSchema()
    const result = schema.safeParse(formData)
    if (!result.success) {
      const fieldErrors: Record<string, string> = {}
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message
      })
      setErrors(fieldErrors)
      toast.error('Please fix the errors in the form')
      return
    }
    try {
      const profileRes = await axios.post(`${url}/profile`, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        role: activeForm,
      })
      const profileId = profileRes.data.id
      if (activeForm === 'vendor') {
        await axios.post(`${url}/vendors`, {
          profileId,
          business_name: formData.business_name,
          phone: formData.phone,
          tax_id: formData.tax_id,
          address: formData.address,
          status: 'active',
        })
      } else {
        await axios.post(`${url}/customer`, {
          profileId,
          address: formData.address,
          phone: formData.phone,
        })
      }
      // No need to call an admin endpoint, as admin is already created via profile
      toast.success(`Account created successfully!`)
    } catch (err) {
      console.error(err)
      toast.error('Something went wrong ❌')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50"
      style={{
        backgroundImage: "url('/public/assets/cleanride1.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Navbar />
      <div className="flex justify-center items-center min-h-[80vh] m-4">
        <div className="w-full max-w-lg bg-white/95 rounded-2xl shadow-2xl p-10 border border-blue-100">
          <h2 className="text-3xl font-bold text-center text-blue-700 mb-2 tracking-tight">Create an Account</h2>
          <p className="text-center text-gray-500 mb-8">Register as a Vendor, Customer</p>
          <div className="flex justify-center gap-4 mb-8">
            {['vendor', 'customer'].map((role) => (
              <button
                key={role}
                className={`px-5 py-2 rounded-full font-semibold transition-all duration-200 shadow-sm border
                  ${activeForm === role
                    ? 'bg-blue-600 text-white border-blue-600 scale-105'
                    : 'bg-white text-blue-700 border-blue-300 hover:bg-blue-50'
                  }`}
                onClick={() => {
                  setActiveForm(role as 'vendor' | 'customer')
                  setErrors({})
                }}
                type="button"
              >
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </button>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-gray-700 font-medium mb-1">First Name</label>
                <input
                  className="w-full p-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                  placeholder="First Name"
                  name="firstName"
                  onChange={handleChange}
                  value={formData.firstName}
                  required
                />
                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
              </div>
              <div className="w-1/2">
                <label className="block text-gray-700 font-medium mb-1">Last Name</label>
                <input
                  className="w-full p-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                  placeholder="Last Name"
                  name="lastName"
                  onChange={handleChange}
                  value={formData.lastName}
                  required
                />
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                className="w-full p-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Email"
                name="email"
                type="email"
                onChange={handleChange}
                value={formData.email}
                required
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Password</label>
              <input
                className="w-full p-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Password"
                name="password"
                type="password"
                onChange={handleChange}
                value={formData.password}
                required
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>
            {activeForm === 'vendor' && (
              <>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Business Name</label>
                  <input
                    className="w-full p-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                    placeholder="Business Name"
                    name="business_name"
                    onChange={handleChange}
                    value={formData.business_name}
                    required
                  />
                  {errors.business_name && <p className="text-red-500 text-xs mt-1">{errors.business_name}</p>}
                </div>
                <div className="flex gap-4">
                  <div className="w-1/2">
                    <label className="block text-gray-700 font-medium mb-1">Business Tax ID</label>
                    <input
                      className="w-full p-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                      placeholder="Business Tax ID"
                      name="tax_id"
                      onChange={handleChange}
                      value={formData.tax_id}
                      required
                    />
                    {errors.tax_id && <p className="text-red-500 text-xs mt-1">{errors.tax_id}</p>}
                  </div>
                  <div className="w-1/2">
                    <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
                    <input
                      className="w-full p-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                      placeholder="Phone Number"
                      name="phone"
                      onChange={handleChange}
                      value={formData.phone}
                      required
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Business Address</label>
                  <input
                    className="w-full p-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                    placeholder="Business Address"
                    name="address"
                    onChange={handleChange}
                    value={formData.address}
                    required
                  />
                  {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                </div>
              </>
            )}
            {activeForm === 'customer' && (
              <>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Address</label>
                  <input
                    className="w-full p-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                    placeholder="Address"
                    name="address"
                    onChange={handleChange}
                    value={formData.address}
                    required
                  />
                  {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
                  <input
                    className="w-full p-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                    placeholder="Phone Number"
                    name="phone"
                    onChange={handleChange}
                    value={formData.phone}
                    required
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
              </>
            )}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-green-500 text-white font-bold py-2 rounded-lg shadow-lg hover:from-blue-700 hover:to-green-600 transition-all text-lg mt-2"
            >
              Register
            </button>
            <p className="text-center text-gray-500 text-sm mt-4">
              Already have an account?{' '}
              <Link to="/signin" className="text-blue-500 hover:underline">
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default RouteComponent