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
    try {
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
        }
      }

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
        }
      }

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
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-teal-600 overflow-y-auto">
          <div className="flex items-center h-16 flex-shrink-0 px-4 bg-teal-600">
            <Link href="/restaurant" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-teal-600 text-sm font-bold">QM</span>
              </div>
              <div className="text-lg font-semibold text-white">
                {restaurantName}
              </div>
            </Link>
          </div>
          <div className="mt-5 flex-1 flex flex-col">
            <nav className="flex-1 px-3 pb-4 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-3 py-3 text-sm font-medium rounded-md transition-all duration-200 !text-white ${
                      isActive ? 'bg-teal-700' : 'hover:bg-teal-500'
                    }`}
                  >
                    <item.icon
                      className="mr-3 flex-shrink-0 h-5 w-5 !text-white"
                      aria-hidden="true"
                    />
                    <span className="!text-white">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="p-4 bg-teal-600 border-t border-teal-500">
            <Link
              href="/"
              className="flex items-center text-sm text-white hover:text-gray-200 transition-colors duration-200"
            >
              <span className="mr-2">🌐</span>
              View Public Site
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-gray-600 opacity-75" onClick={toggleMobileMenu}></div>
        <div className="fixed inset-y-0 left-0 flex flex-col z-40 w-64 max-w-sm bg-teal-600 transform transition-transform duration-300 ease-in-out">
          <div className="flex items-center h-16 flex-shrink-0 px-4 bg-teal-600">
            <Link href="/restaurant" className="flex items-center space-x-3" onClick={toggleMobileMenu}>
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-teal-600 text-sm font-bold">QM</span>
              </div>
              <div className="text-lg font-semibold text-white">
                {restaurantName}
              </div>
            </Link>
          </div>
          <div className="mt-5 flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 px-3 pb-4 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-3 py-3 text-sm font-medium rounded-md transition-all duration-200 !text-white ${
                      isActive ? 'bg-teal-700' : 'hover:bg-teal-500'
                    }`}
                    onClick={toggleMobileMenu}
                  >
                    <item.icon
                      className="mr-3 flex-shrink-0 h-5 w-5 !text-white"
                      aria-hidden="true"
                    />
                    <span className="!text-white">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="p-4 bg-teal-600 border-t border-teal-500">
            <Link
              href="/"
              className="flex items-center text-sm text-white hover:text-gray-200 transition-colors duration-200"
            >
              <span className="mr-2">🌐</span>
              View Public Site
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default RestaurantSidebar;
