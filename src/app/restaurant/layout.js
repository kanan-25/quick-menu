'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  ClipboardDocumentListIcon,
  ShoppingCartIcon,
  StarIcon,
  QrCodeIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';

export default function RestaurantLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [restaurantName, setRestaurantName] = useState('Restaurant');
  const [restaurantLogo, setRestaurantLogo] = useState('/Quick_menu.png');
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const updateRestaurantData = () => {
      const storedRestaurant = localStorage.getItem('restaurant_data');
      if (storedRestaurant) {
        try {
          const restaurantData = JSON.parse(storedRestaurant);
          setRestaurantName(restaurantData.name || 'Restaurant');
          setRestaurantLogo(restaurantData.logo || '/Quick_menu.png');
        } catch (error) {
          console.error('Error parsing restaurant data:', error);
        }
      }
    };

    // Initial load
    updateRestaurantData();

    // Listen for storage changes (when profile is updated)
    window.addEventListener('storage', updateRestaurantData);
    
    // Custom event for same-tab updates
    window.addEventListener('restaurantDataUpdated', updateRestaurantData);

    return () => {
      window.removeEventListener('storage', updateRestaurantData);
      window.removeEventListener('restaurantDataUpdated', updateRestaurantData);
    };
  }, []);

  const navigation = [
    { name: 'Dashboard', href: '/restaurant', icon: HomeIcon },
    { name: 'Menu Management', href: '/restaurant/menu', icon: ClipboardDocumentListIcon },
    { name: 'Orders', href: '/restaurant/orders', icon: ShoppingCartIcon },
    { name: 'Customer Reviews', href: '/restaurant/reviews', icon: StarIcon },
    { name: 'QR Code Generator', href: '/restaurant/qrcode', icon: QrCodeIcon },
    { name: 'Restaurant Profile', href: '/restaurant/profile', icon: UserIcon },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('restaurant_data');
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-teal-600 to-teal-800 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 bg-teal-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-white flex items-center justify-center">
              <img 
                src={restaurantLogo} 
                alt={restaurantName} 
                className="w-6 h-6 object-contain"
                onError={(e) => {
                  e.target.src = '/Quick_menu.png';
                }}
              />
            </div>
            <span className="text-white font-bold text-lg">{restaurantName}</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white hover:text-gray-300"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-8 px-4">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? 'bg-teal-700 text-white'
                        : 'text-white hover:bg-teal-700 hover:text-white'
                    }`}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-teal-100 hover:bg-teal-700 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5 mr-3" />
            Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile header */}
        <div className="lg:hidden bg-white shadow-sm border-b px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-600 hover:text-gray-900"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                <img 
                  src={restaurantLogo} 
                  alt={restaurantName} 
                  className="w-6 h-6 object-contain"
                  onError={(e) => {
                    e.target.src = '/Quick_menu.png';
                  }}
                />
              </div>
              <span className="text-white font-medium">{restaurantName}</span>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {children}
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
