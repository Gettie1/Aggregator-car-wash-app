import { Link } from "@tanstack/react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";

function LandingPage() {
  return (
    <div className="bg-gradient-to-b from-blue-50 via-white to-gray-100 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section
          className="py-24 px-4 text-center relative overflow-hidden flex items-center justify-center"
          style={{
            backgroundImage: "linear-gradient(rgba(30,64,175,0.7),rgba(30,64,175,0.5)),url('/assets/hero-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="relative z-10 max-w-2xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-white drop-shadow-lg">
              Premium Car Wash <span className="text-yellow-300">Services</span> at Your Doorstep
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-10 font-medium drop-shadow">
              Book your car or bike wash online. Fast, convenient, and eco-friendly.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link
                to="/signin"
                className="px-8 py-3 bg-yellow-400 text-blue-900 rounded-full font-bold shadow-lg hover:bg-yellow-300 transition text-lg"
              >
                Get Started
              </Link>
              <Link
                to="/register"
                className="px-8 py-3 bg-white text-blue-700 rounded-full font-bold shadow-lg border border-blue-200 hover:bg-blue-50 transition text-lg"
              >
                Become a Vendor
              </Link>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent pointer-events-none" />
        </section>

        {/* How It Works */}
        <section className="py-20 bg-gradient-to-r from-blue-50 via-white to-blue-100">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-extrabold mb-12 text-blue-800">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                {
                  img: "/assets/bookCar.jpg",
                  title: "Choose Your Service",
                  desc: "Select from a variety of car and bike wash services tailored to your needs.",
                },
                {
                  img: "/assets/location.jpg",
                  title: "Book Online",
                  desc: "Schedule your wash at a time that suits you, with real-time availability.",
                },
                {
                  img: "/assets/cleanride.jpg",
                  title: "Enjoy the Clean",
                  desc: "Relax while our trusted vendors take care of your vehicle right at your location.",
                },
              ].map((item, i) => (
                <div
                  key={item.title}
                  className="p-8 bg-white shadow-xl rounded-3xl hover:scale-105 hover:shadow-2xl transition-all duration-300 border-t-4 border-blue-400"
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-48 object-cover rounded-xl mb-6 shadow"
                  />
                  <h3 className="text-2xl font-bold mb-3 text-blue-700">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Vendors */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-extrabold mb-12 text-blue-800">Popular Vendors</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                {
                  img: "/assets/vendor1.jpg",
                  title: "CleanRide Express",
                  desc: "Fast and reliable service with top-notch quality.",
                },
                {
                  img: "/assets/vendor2.jpg",
                  title: "EcoWash Solutions",
                  desc: "Eco-friendly products for a sustainable wash.",
                },
                {
                  img: "/assets/vendor3.jpg",
                  title: "Shine & Go",
                  desc: "Convenient doorstep service with a shine guarantee.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-8 bg-gradient-to-br from-blue-50 to-blue-100 shadow-xl rounded-3xl hover:scale-105 hover:shadow-2xl transition-all duration-300"
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-48 object-cover rounded-xl mb-6 shadow"
                  />
                  <h3 className="text-2xl font-bold mb-3 text-blue-700">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Packages */}
        <section className="py-20 bg-gradient-to-r from-blue-50 via-white to-blue-100">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-extrabold mb-12 text-blue-800">Service Packages</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                {
                  title: "Basic Wash",
                  price: "$20",
                  features: ["Exterior wash", "Tire cleaning", "Drying"],
                  highlight: false,
                },
                {
                  title: "Premium Wash",
                  price: "$40",
                  features: ["Basic Wash features", "Interior vacuuming", "Window cleaning"],
                  highlight: true,
                },
                {
                  title: "Ultimate Wash",
                  price: "$60",
                  features: ["Premium Wash features", "Waxing and polishing", "Engine cleaning"],
                  highlight: false,
                },
              ].map((pkg) => (
                <div
                  key={pkg.title}
                  className={`p-8 bg-white shadow-xl rounded-3xl border-2 ${
                    pkg.highlight
                      ? "border-yellow-400 scale-105"
                      : "border-blue-100"
                  } hover:scale-105 hover:shadow-2xl transition-all duration-300`}
                >
                  <h3 className="text-2xl font-bold mb-2 text-blue-700">{pkg.title}</h3>
                  <p className="text-3xl font-extrabold mb-2 text-gray-900 font-mono">
                    {pkg.price}
                  </p>
                  <span className="inline-block align-middle mb-4 text-gray-600">
                    per wash
                  </span>
                  <ul className="text-gray-600 text-left mb-6 space-y-2">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-center">
                        <span className="text-green-500 mr-2 text-lg">✔</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`w-full py-3 rounded-full font-bold shadow-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${
                      pkg.highlight
                        ? "bg-yellow-400 text-blue-900 hover:bg-yellow-300"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    Select
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </div>
  );
}

export default LandingPage;