import { Link } from '@tanstack/react-router'

export default function Navbar() {
  return (
    <header className="p-2 flex bg-white text-black justify-between">
      <nav className="flex flex-row items-center w-full">
      <div className="px-2 font-bold">
        <h1 className="text-2xl font-extrabold flex items-center gap-2">
          <span className="text-blue-500">🚗</span>
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent drop-shadow">
            CleanRide
          </span>
        </h1>
      </div>
      <div className="flex flex-row gap-2 ml-auto">
        <div className="px-2 font-bold hover:text-blue-600 active:text-blue-800">
        <Link to="/">Home</Link>
        </div>
        <div className="px-2 font-bold *:hover:text-blue-600 active:text-blue-800">
        <Link to="/about">About</Link>
        </div>
        <button className="px-2 font-bold border rounded-full bg-blue-300 hover:bg-blue-400 active:text-blue-700">
        <Link to="/signin">Sign In</Link>
        </button>
        <button className="px-2 font-bold hover:bg-blue-400 active:text-blue-800 border rounded-full bg-blue-300">
        <Link to="/register">Register</Link>
        </button>
      </div>
      </nav>
    </header>
  )
}
