import { Link } from "@tanstack/react-router"
import Navbar from "./Navbar"


function LandingPage() {
  return (
    <div>
        <Navbar />
       <main className="">
      {/* Hero Section */}
      <section
        className="py-20 m-2 text-center relative overflow-hidden"
        style={{
          backgroundImage: "url('/assets/hero-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 pointer-events-none" />
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-700">
        Premium Car Wash Services at Your Doorstep
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8">
        Book your car or bike wash online. Fast, convenient, and eco-friendly.
          </p>
          <div className="space-x-4">
        <Link
          to="/signin"
          className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold shadow hover:bg-blue-700 transition"
        >
          Get Started
        </Link>
        <Link
          to="/register"
          className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition"
        >
          Become a Vendor
        </Link>
          </div>
        </div>
      </section>
      {/* How It Works */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white shadow rounded-lg hover:shadow-md transition">
              <img src="/public/assets/bookCar.jpg" alt="" 
               className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Choose Your Service</h3>
              <p className="text-gray-600">
          Select from a variety of car and bike wash services tailored to your needs.
              </p>
            </div>
            <div className="p-6 bg-white shadow rounded-lg hover:shadow-md transition">
              <img src="/public/assets/location.jpg" alt=""
                className="w-full h-48 object-cover rounded-lg mb-4"
               />
              <h3 className="text-xl font-semibold mb-2">Book Online</h3>
              <p className="text-gray-600">
          Schedule your wash at a time that suits you, with real-time availability.
              </p>
            </div>
            <div className="p-6 bg-white shadow rounded-lg hover:shadow-md transition">
              <img src="/public/assets/cleanride.jpg" alt="" 
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Enjoy the Clean</h3>
              <p className="text-gray-600">
          Relax while our trusted vendors take care of your vehicle right at your location.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* popular vendors */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">Popular Vendors</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-100 shadow rounded-lg hover:shadow-md transition">
              <img src="/public/assets/vendor1.jpg" alt="Vendor 1" className="w-full h-48 object-cover rounded-lg mb-4" />
              <h3 className="text-xl font-semibold mb-2">CleanRide Express</h3>
              <p className="text-gray-600">Fast and reliable service with top-notch quality.</p>
            </div>
            <div className="p-6 bg-gray-100 shadow rounded-lg hover:shadow-md transition">
              <img src="/public/assets/vendor2.jpg" alt="Vendor 2" className="w-full h-48 object-cover rounded-lg mb-4" />
              <h3 className="text-xl font-semibold mb-2">EcoWash Solutions</h3>
              <p className="text-gray-600">Eco-friendly products for a sustainable wash.</p>
            </div>
            <div className="p-6 bg-gray-100 shadow rounded-lg hover:shadow-md transition">
              <img src="/public/assets/vendor3.jpg" alt="Vendor 3" className="w-full h-48 object-cover rounded-lg mb-4" />
              <h3 className="text-xl font-semibold mb-2">Shine & Go</h3>
              <p className="text-gray-600">Convenient doorstep service with a shine guarantee.</p>
            </div>
          </div>
        </div>
      </section>
      {/* service packages */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">Service Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white shadow rounded-lg hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2">Basic Wash</h3>
              <p className="text-2xl font-extrabold mb-4 inline-block text-gray-900 font-mono">$20</p>
              <span className="inline-block align-middle ml-2 text-gray-600">per wash</span>
                <ul className="text-gray-600 text-left mb-4 space-y-1">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✔</span>
                  Exterior wash
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✔</span>
                  Tire cleaning
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✔</span>
                  Drying
                </li>
                </ul>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold shadow hover:bg-blue-700 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ">select</button>
            </div>
            <div className="p-6 bg-white shadow rounded-lg hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2">Premium Wash</h3>
              <p className="text-2xl font-extrabold mb-4 inline-block text-gray-900 font-mono">$40</p>
              <span className="inline-block align-middle ml-2 text-gray-600">per wash</span>
              <ul className="text-gray-600 text-left mb-4 space-y-1">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✔</span>
                Basic Wash features
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✔</span>
                Interior vacuuming
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✔</span>
                Window cleaning
              </li>
              </ul>
              <button
              className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold shadow hover:bg-blue-700 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              >
              Select
              </button>
            </div>
            <div className="p-6 bg-white shadow rounded-lg hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2">Ultimate Wash</h3>
              <p className="text-2xl font-extrabold mb-4 inline-block text-gray-900 font-mono">$60</p>
              <span className="inline-block align-middle ml-2 text-gray-600">per wash</span>
                <ul className="text-gray-600 text-left mb-4 space-y-1">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✔</span>
                  Premium Wash features
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✔</span>
                  Waxing and polishing
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✔</span>
                  Engine cleaning
                </li>
                </ul>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold shadow hover:bg-blue-700 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
                  Select
                </button>
            </div>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="py-10 text-center text-gray-500 text-sm">
        {/* privacy policy terms of service contact us */}
        <div className="mb-4">
          <Link to="/privacy-policy" className="mx-2 hover:text-blue-600">
            Privacy Policy
          </Link>
          <Link to="/terms-of-service" className="mx-2 hover:text-blue-600">
            Terms of Service
          </Link>
          <Link to="/contact-us" className="mx-2 hover:text-blue-600">
            Contact Us
          </Link>
        </div>
        {/* social media links */}
        <div className="flex justify-center space-x-4 mb-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
            Facebook
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
            Twitter
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-700">
            Instagram
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900">
            LinkedIn
          </a>
        </div>
        <p className="mb-2">
          © {new Date().getFullYear()} CleanRide. All rights reserved.
        </p>

      </footer>
    </main>
    </div>
  )
}

export default LandingPage