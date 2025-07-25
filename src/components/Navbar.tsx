import { Link } from '@tanstack/react-router'

export default function Navbar() {
  return (
    <header className="shadow-md sticky top-0 z-50 bg-white text-black">
      <nav className="flex items-center justify-between max-w-6xl mx-auto p-2">
        <div className="flex items-center gap-1">
          <span className="text-3xl text-blue-500">🚗</span>
          <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent drop-shadow">
            CleanRide
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="px-3 py-1 font-bold rounded hover:text-blue-600 transition-colors"
            activeProps={{
              className: "text-blue-700 underline"
            }}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="px-3 py-1 font-bold rounded hover:text-blue-600 transition-colors"
            activeProps={{
              className: "text-blue-700 underline"
            }}
          >
            About
          </Link>
          <Link to="/signin">
            <button className="px-4 py-1 font-semibold rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors shadow">
              Sign In
            </button>
          </Link>
          <Link to="/register">
            <button className="px-4 py-1 font-semibold rounded-full bg-cyan-500 text-white hover:bg-cyan-600 transition-colors shadow">
              Register
            </button>
          </Link>
        </div>
      </nav>
    </header>
  )
}
