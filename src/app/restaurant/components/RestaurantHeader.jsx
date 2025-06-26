'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  BellIcon
} from '@heroicons/react/24/outline';

const RestaurantHeader = () => {
  const pathname = usePathname();
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'New order received', time: '5 min ago' },
    { id: 2, text: 'Menu viewed 10 times today', time: '1 hour ago' }
  ]);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // No longer need to get user name

  // Logout function removed as it's no longer needed

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setNotificationsOpen(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Get page title based on current path
  const getPageTitle = () => {
    if (pathname === '/restaurant') return 'Dashboard';
    if (pathname === '/restaurant/menu') return 'Menu Management';
    if (pathname === '/restaurant/profile') return 'Restaurant Profile';
    if (pathname === '/restaurant/qrcode') return 'QR Code Generator';
    if (pathname === '/restaurant/analytics') return 'Analytics';
    return 'Restaurant Panel';
  };

  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm">
      <div className="h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left side - Page title */}
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-gray-800 lg:ml-0">
            {getPageTitle()}
          </h1>
        </div>

        {/* Right side - Only notifications */}
        <div className="flex items-center space-x-4">
          {/* Notifications dropdown */}
          <div className="relative">
            <button
              className="p-1 rounded-full text-gray-500 hover:text-teal-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
              onClick={(e) => {
                e.stopPropagation();
                setNotificationsOpen(!notificationsOpen);
              }}
            >
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6" />
              {notifications.length > 0 && (
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
              )}
            </button>

            {/* Notifications dropdown panel */}
            {notificationsOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-2 px-4 border-b border-gray-200">
                  <h3 className="text-sm font-medium text-gray-700">Notifications</h3>
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {notifications.length > 0 ? (
                    <div className="py-2">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className="px-4 py-3 hover:bg-gray-50 transition-colors duration-150"
                        >
                          <p className="text-sm text-gray-800">{notification.text}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="px-4 py-6 text-center">
                      <p className="text-sm text-gray-500">No new notifications</p>
                    </div>
                  )}
                </div>
                <div className="py-2 px-4 border-t border-gray-200 text-center">
                  <button className="text-xs text-teal-600 hover:text-teal-800 font-medium">
                    Mark all as read
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default RestaurantHeader;