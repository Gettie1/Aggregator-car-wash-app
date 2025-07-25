import { Link } from '@tanstack/react-router'

function Footer() {
  return (
    <div>
    <footer className="py-10 text-center text-gray-500 text-sm bg-gray-300">
        {/* privacy policy terms of service contact us */}
        <div className="mb-4">
          <Link to="/privacy-policy" className="mx-2 hover:text-blue-600">
            Privacy Policy
          </Link>
          <Link to="/terms-of-service" className="mx-2 hover:text-blue-600">
            Terms of Service
          </Link>
          <Link to="/contactUs" className="mx-2 hover:text-blue-600">
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
    </div>
  )
}

export default Footer