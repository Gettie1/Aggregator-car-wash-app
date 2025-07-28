
import React from 'react';
// import { FaSignInAlt } from 'react-icons/fa';
import { Bell, Search, User } from 'lucide-react';
import { Link, useNavigate } from '@tanstack/react-router';
// import { useDashboardStore } from '@/store/dashboardStore';
// import { useStore } from '@tanstack/react-form';
// import { authStore } from '@/store/authStore';

export const Header: React.FC = () => {

  // const { toggleSidebar, currentPage } = useDashboardStore();

  // const getPageTitle = () => {
  //   switch (currentPage) {
  //       case 'overview':
  //           return 'Overview';
  //       case 'bookings':
  //           return 'Bookings';
  //       case 'profiles':
  //           return 'Profiles';
  //       case 'vendors':
  //           return 'Vendors';
  //       case 'settings':
  //           return 'Settings';
  //       case 'services':
  //           return 'Services';
  //       case 'reviews':
  //           return 'Reviews';
  //       default:
  //           return '';
  //   }
  // };
  const navigate = useNavigate()
  return (
    <header className=" bg-white shadow-sm border-b px-6 py-4">
      <div className="flex items-center justify-between"> 
        <div className="flex items-center justify-between gap-7">
          <h1 className="text-2xl font-extrabold flex items-center gap-2 mr-6">
            <span className="text-blue-500">🚗</span>
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent drop-shadow">
              CleanRide
            </span>
          </h1>
        <Link to='/' className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent drop-shadow font-bold text-lg hover:underline">
          Home
        </Link>
        <Link to='/about' className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent drop-shadow font-bold text-lg hover:underline">
          About
        </Link>
      </div>
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="hidden md:flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2">
            <Search size={16} className="text-gray-400" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-transparent outline-none text-sm w-64"
            />
          </div>

          {/* Notifications */}
          <button className="p-2 rounded-lg hover:bg-gray-100 relative">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </button>

          {/* Profile */}
          <button
          onClick={() => navigate({ to: '/signin' })}
           className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center"> 
              <User size={16} className="text-white" /> 
            </div>
            <p className="hidden md:block text-bold font-medium text-red-500">Logout</p>
          </button>
        </div>
      </div>
    </header>
  );
};
