import { createFileRoute } from '@tanstack/react-router'
import PrivacyPolicy from '@/components/Privacy'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const Route = createFileRoute('/privacy-policy')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
    <Navbar />
    {/* <div className="min-h-screen bg-gray-100"> */}
      <PrivacyPolicy />
    {/* </div> */}
    <Footer
    />
  </div>
}
