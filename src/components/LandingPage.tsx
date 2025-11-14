import { Link, useNavigate } from "@tanstack/react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";

function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="bg-gradient-to-b from-blue-50 via-white to-gray-100 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section
          className="py-24 px-4 text-center relative overflow-hidden flex items-center justify-center"
          style={{
            backgroundImage: "url('/assets/cleanride1.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="relative z-10 max-w-2xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-white drop-shadow-lg">
              Premium Car Wash <span className="text-yellow-600">Services</span> at Your Doorstep
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-10 font-medium drop-shadow">
              Book your car or bike wash online. Fast, convenient, and eco-friendly.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link
                to="/register"
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
        <section className="py-20 px-6 bg-gray-50">
        <h2 className="text-4xl font-bold text-center text-blue-800 mb-4">
          How It Works
        </h2>
        <div className="w-20 h-1 bg-yellow-400 mx-auto mb-12 rounded"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: '🧼',
              title: 'Choose Your Service',
              desc: 'Pick the perfect wash package for your car or bike.',
              bg: 'from-white to-blue-100',
            },
            {
              icon: '📅',
              title: 'Book Online',
              desc: 'Select your preferred time and location with ease.',
              bg: 'from-blue-50 to-white',
            },
            {
              icon: '✨',
              title: 'Relax & Shine',
              desc: 'Our professional vendors handle the rest!',
              bg: 'from-white to-blue-50',
            },
          ].map((item, index) => (
            <div
              key={item.title}
              className={`p-8 rounded-3xl shadow-xl bg-gradient-to-br ${item.bg} hover:-translate-y-1 hover:shadow-2xl transition transform relative`}
            >
              <div className="absolute -top-4 -left-4 bg-yellow-300 text-blue-900 font-bold text-lg rounded-full w-10 h-10 flex items-center justify-center shadow">
                {index + 1}
              </div>
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-2xl font-bold mb-2 text-blue-700">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Vendor Call to Action */}
      <section className="bg-blue-700 text-white py-16 text-center px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Are you a Car Wash Vendor?
        </h2>
        <p className="text-lg mb-6 max-w-xl mx-auto">
          Join our growing network and reach more customers effortlessly.
        </p>
        <Link
          to="/register"
          className="bg-yellow-400 text-blue-900 hover:bg-yellow-300 px-8 py-3 rounded-xl text-lg font-semibold transition"
        >
          Join as Vendor
        </Link>
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
                  onClick={() => navigate({ to: '/register' })}
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

      {/* Footer */}
      <Footer />
      </main>
    </div>
  );
};

export default LandingPage;