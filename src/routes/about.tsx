import { createFileRoute } from '@tanstack/react-router'
import {
  Handshake,
  Leaf,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Truck,
  Users,
  Wand2,
} from 'lucide-react'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

export const Route = createFileRoute('/about')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-white relative overflow-hidden">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-12 space-y-12 relative z-10">
        <section className="text-center space-y-6 animate-fade-in">
          <h1 className="text-5xl font-bold text-blue-900">About CleanRide Carwash</h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            <span className="font-semibold text-green-700">CleanRide Carwash</span> is your modern, eco-conscious car
            cleaning solution — mobile or in-station, delivered with a smile.
          </p>
        </section>

        <SectionCard title="Our Mission" icon={<Leaf className="w-8 h-8 text-green-600" />}> 
          <p>
            To provide fast, convenient, and high-quality car cleaning services using eco-friendly methods,
            modern technology, and customer-first values.
          </p>
        </SectionCard>

        <SectionCard title="What Makes Us Different" icon={<Sparkles className="w-8 h-8 text-yellow-500" />}>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
            {features.map(({ title, text, icon }) => (
              <li key={title} className="flex items-start gap-4 animate-fade-in">
                <span className="text-blue-600">{icon}</span>
                <div>
                  <h3 className="font-semibold text-blue-800">{title}</h3>
                  <p className="text-gray-700">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="How It Works" icon={<Wand2 className="w-8 h-8 text-indigo-500" />}>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Sign up or log in to the CleanRide system.</li>
            <li>Select your car type and preferred service.</li>
            <li>Choose your location and schedule.</li>
            <li>Confirm your booking and make payment.</li>
            <li>Relax — our team will take care of the rest!</li>
          </ol>
        </SectionCard>

        <SectionCard title="Who We Serve" icon={<Users className="w-8 h-8 text-purple-500" />}>
          <div className="flex gap-6 items-center">
            <Users className="w-10 h-10 text-blue-600" />
            <Truck className="w-10 h-10 text-green-600" />
            <p className="text-gray-700">
              Whether you're an individual car owner or a business with a fleet, CleanRide scales with your needs.
            </p>
          </div>
        </SectionCard>

        <SectionCard title="Contact Us" icon={<Handshake className="w-8 h-8 text-orange-500" />}>
          <ul className="space-y-2 text-gray-700">
            <li className="flex gap-2 items-center">
              <Mail className="w-5 h-5 text-blue-700" /> <span>Email:</span> support@cleanride.com
            </li>
            <li className="flex gap-2 items-center">
              <Phone className="w-5 h-5 text-blue-700" /> <span>Phone:</span> +254-728177993
            </li>
            <li className="flex gap-2 items-center">
              <MapPin className="w-5 h-5 text-blue-700" /> <span>Location:</span> Yala
            </li>
          </ul>
        </SectionCard>

        <p className="text-sm text-gray-500 text-center italic mt-10">
          Thank you for choosing CleanRide — where we don’t just clean cars, we clean them right.
        </p>
      </main>
      <Footer />

      {/* Background Bubbles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-24 h-24 bg-blue-200 rounded-full opacity-30 animate-bubble" />
        <div className="absolute bottom-32 right-20 w-32 h-32 bg-green-200 rounded-full opacity-30 animate-bubble-delay" />
        <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-blue-100 rounded-full opacity-20 animate-bubble-slow" />
      </div>
    </div>
  )
}

function SectionCard({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-4 border border-gray-100">
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <h2 className="text-2xl font-semibold text-green-700">{title}</h2>
      </div>
      <div className="text-gray-700 text-base">{children}</div>
    </div>
  )
}

const features = [
  {
    title: 'Convenience',
    text: 'Book online or through our app — we’ll come to you or meet you at our nearest station.',
    icon: <Smartphone className="w-6 h-6" />,
  },
  {
    title: 'Professionalism',
    text: 'Our trained staff ensure your vehicle gets the best care, every time.',
    icon: <ShieldCheck className="w-6 h-6" />,
  },
  {
    title: 'Eco-friendly',
    text: 'We use water-efficient systems and biodegradable cleaning products.',
    icon: <Leaf className="w-6 h-6" />,
  },
  {
    title: 'Cashless & Secure',
    text: 'Pay easily via mobile money or card. Your data and safety are protected.',
    icon: <ShieldCheck className="w-6 h-6" />,
  },
]
