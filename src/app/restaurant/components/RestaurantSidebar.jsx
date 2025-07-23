'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  QrCodeIcon,
  UserIcon,
  ClipboardDocumentListIcon,
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const RestaurantSidebar = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [restaurantName, setRestaurantName] = useState('My Restaurant');

  useEffect(() => {
    // Get restaurant name from localStorage if available
    try {
      // First try to get from restaurant_data (preferred source)
      const storedRestaurantData = localStorage.getItem('restaurant_data');
      if (storedRestaurantData) {
        try {
          const restaurantData = JSON.parse(storedRestaurantData);
          if (restaurantData.name) {
            setRestaurantName(restaurantData.name);
            return;
          }
        } catch (parseError) {
          console.warn('Error parsing restaurant data:', parseError);
          // Continue to fallback
        }
      }

      // Fallback to user data if restaurant_data is not available
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);
          if (user.name) {
            setRestaurantName(user.name);
            return;
          }
        } catch (parseError) {
          console.warn('Error parsing user data:', parseError);
          // Continue to default
        }
      }

      // Default fallback if no data is available
      setRestaurantName('Demo Restaurant');
    } catch (error) {
      console.error('Error getting restaurant name:', error);
      setRestaurantName('Demo Restaurant');
    }
  }, []);

  const navigation = [
    { name: 'Dashboard', href: '/restaurant', icon: HomeIcon },
    { name: 'Orders', href: '/restaurant/orders', icon: ShoppingCartIcon },
    { name: 'Menu Management', href: '/restaurant/menu', icon: ClipboardDocumentListIcon },
    { name: 'Restaurant Profile', href: '/restaurant/profile', icon: UserIcon },
    { name: 'QR Code Generator', href: '/restaurant/qrcode', icon: QrCodeIcon },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleMobileMenu}
          className="p-2 rounded-md bg-teal-600 text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-white"
        >
          {isMobileMenuOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
        <div className="flex flex-col flex-grow bg-gradient-to-b from-teal-700 to-teal-900 overflow-y-auto">
          <div className="flex items-center h-16 flex-shrink-0 px-4 bg-teal-800">
            <Link href="/restaurant" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-teal-800 text-xl font-bold">QM</span>
              </div>
              <div className="text-xl font-bold text-white truncate">
                {restaurantName}
              </div>
            </Link>
          </div>
          <div className="mt-5 flex-1 flex flex-col">
            <nav className="flex-1 px-2 pb-4 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-4 py-3 text-sm font-medium rounded-md transition-all duration-200 ${
                      isActive
                        ? 'bg-teal-800 text-white'
                        : 'text-teal-100 hover:bg-teal-600 hover:text-white'
                    }`}
                  >
                    <item.icon
                      className={`mr-3 flex-shrink-0 h-6 w-6 ${
                        isActive ? 'text-white' : 'text-teal-200 group-hover:text-white'
                      }`}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="p-4 bg-teal-800 text-center">
            <Link
              href="/"
              className="text-sm text-teal-200 hover:text-white transition-colors duration-200"
            >
              View Public Site
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-gray-600 opacity-75" onClick={toggleMobileMenu}></div>
        <div className="fixed inset-y-0 left-0 flex flex-col z-40 w-72 max-w-sm bg-gradient-to-b from-teal-700 to-teal-900 transform transition-transform duration-300 ease-in-out">
          <div className="flex items-center h-16 flex-shrink-0 px-4 bg-teal-800">
            <Link href="/restaurant" className="flex items-center space-x-2" onClick={toggleMobileMenu}>
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-teal-800 text-xl font-bold">QM</span>
              </div>
              <div className="text-xl font-bold text-white truncate">
                {restaurantName}
              </div>
            </Link>
          </div>
          <div className="mt-5 flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 px-2 pb-4 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-4 py-3 text-sm font-medium rounded-md transition-all duration-200 ${
                      isActive
                        ? 'bg-teal-800 text-white'
                        : 'text-teal-100 hover:bg-teal-600 hover:text-white'
                    }`}
                    onClick={toggleMobileMenu}
                  >
                    <item.icon
                      className={`mr-3 flex-shrink-0 h-6 w-6 ${
                        isActive ? 'text-white' : 'text-teal-200 group-hover:text-white'
                      }`}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="p-4 bg-teal-800 text-center">
            <Link
              href="/"
              className="text-sm text-teal-200 hover:text-white transition-colors duration-200"
              onClick={toggleMobileMenu}
            >
              View Public Site
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default RestaurantSidebar;