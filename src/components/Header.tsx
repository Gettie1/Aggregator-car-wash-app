
import React from 'react';
import { Bell, Menu, Search, User } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { useDashboardStore } from '@/store/dashboardStore';

export const Header: React.FC = () => {
  const { toggleSidebar, currentPage } = useDashboardStore();

  const getPageTitle = () => {
    switch (currentPage) {
        case 'overview':
            return 'Overview';
        case 'bookings':
            return 'Bookings';
        case 'profiles':
            return 'Profiles';
        case 'vendors':
            return 'Vendors';
        case 'settings':
            return 'Settings';
        case 'services':
            return 'Services';
        case 'reviews':
            return 'Reviews';
        default:
            return 'Dashboard';
    }
  };

  return (
    <header className="bg-white shadow-sm border-b px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
          >
            <Menu size={20} />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">{getPageTitle()}</h1>
        </div>
        <Link to='/' className="hidden lg:block text-blue-600 hover:underline">
          Home
        </Link>
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
          <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
            <span className="hidden md:block text-sm font-medium text-gray-700"></span>
          </button>
        </div>
      </div>
    </header>
  );
};
