import { createFileRoute } from '@tanstack/react-router'
import TermsOfService from '@/components/Terms-of-service'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const Route = createFileRoute('/terms-of-service')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
    <Navbar />
    {/* <div className="min-h-screen bg-gray-100"> */}
      <TermsOfService />
    {/* </div> */}
    <Footer />
  </div>
}
