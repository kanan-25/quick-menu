'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  BuildingStorefrontIcon, 
  QrCodeIcon, 
  ClipboardDocumentListIcon,
  ChartBarIcon,
  UserGroupIcon,
  CogIcon
} from '@heroicons/react/24/outline';

export default function RestaurantDashboard() {
  const router = useRouter();
  const [restaurantName, setRestaurantName] = useState('My Restaurant');
  const [restaurantData, setRestaurantData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        const storedRestaurant = localStorage.getItem('restaurant_data');

        if (!storedUser) {
          router.push('/login');
          return;
        }

        if (storedRestaurant) {
          const restaurantData = JSON.parse(storedRestaurant);
          setRestaurantName(restaurantData.name || 'My Restaurant');
          setRestaurantData(restaurantData);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error loading restaurant data:', error);
        setError('Failed to load restaurant data');
        setLoading(false);
      }
    };

    fetchRestaurantData();
  }, [router]);

  const dashboardCards = [
    {
      title: 'Manage Menu',
      description: 'Add, edit, and organize your restaurant menu items',
      icon: ClipboardDocumentListIcon,
      href: '/restaurant/menu',
      color: 'bg-blue-500',
    },
    {
      title: 'QR Code',
      description: 'Generate and download QR codes for your menu',
      icon: QrCodeIcon,
      href: '/restaurant/qrcode',
      color: 'bg-green-500',
    },
    {
      title: 'Orders',
      description: 'View and manage customer orders',
      icon: ChartBarIcon,
      href: '/restaurant/orders',
      color: 'bg-purple-500',
    },
    {
      title: 'Reviews',
      description: 'Monitor customer feedback and reviews',
      icon: UserGroupIcon,
      href: '/restaurant/reviews',
      color: 'bg-yellow-500',
    },
    {
      title: 'Profile',
      description: 'Update restaurant information and settings',
      icon: CogIcon,
      href: '/restaurant/profile',
      color: 'bg-red-500',
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-gray-900 font-medium">Loading your restaurant dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4 font-medium">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <BuildingStorefrontIcon className="h-8 w-8 text-teal-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{restaurantName}</h1>
                <p className="text-sm text-gray-600">{restaurantData?.description || 'Welcome to your restaurant dashboard'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardCards.map((card, index) => (
            <Link key={index} href={card.href}>
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 cursor-pointer border border-gray-200 h-full">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-center mb-4">
                    <div className={`${card.color} p-4 rounded-lg`}>
                      <card.icon className="h-8 w-8 text-white" style={{ color: 'white' }} />
                    </div>
                  </div>
                  <div className="flex-1 text-center">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {card.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
