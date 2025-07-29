'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ClipboardDocumentListIcon,
  QrCodeIcon,
  UserIcon,
  ArrowUpIcon,
  EyeIcon,
  ShoppingCartIcon,
  PlusCircleIcon,
  CheckCircleIcon,
  XCircleIcon,
  BuildingStorefrontIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { PageLoader } from '@/components/Loader';

const RestaurantDashboard = () => {
  const router = useRouter();
  const [restaurantName, setRestaurantName] = useState('My Restaurant');
  const [loading, setLoading] = useState(true);
  const [hasRestaurant, setHasRestaurant] = useState(true); // Track if user has created a restaurant
  const [stats, setStats] = useState({
    menuItems: 45,
    categories: 8,
    suggestedItems: 5
  });

  // Customer-suggested menu items (would come from API in real app)
  const [suggestedItems, setSuggestedItems] = useState([
    {
      id: 1,
      name: 'Spicy Chicken Burger',
      category: 'Main Course',
      description: 'Crispy chicken with spicy sauce and fresh vegetables',
      suggestedBy: 'john.doe@example.com',
      date: '2 hours ago',
      status: 'pending' // pending, approved, rejected
    },
    {
      id: 2,
      name: 'Vegan Salad Bowl',
      category: 'Salads',
      description: 'Fresh mixed greens with avocado, quinoa, and lemon dressing',
      suggestedBy: 'sarah.smith@example.com',
      date: 'Yesterday',
      status: 'pending'
    },
    {
      id: 3,
      name: 'Chocolate Lava Cake',
      category: 'Desserts',
      description: 'Warm chocolate cake with a molten chocolate center',
      suggestedBy: 'mike.brown@example.com',
      date: '2 days ago',
      status: 'approved'
    },
    {
      id: 4,
      name: 'Mango Smoothie',
      category: 'Beverages',
      description: 'Fresh mango blended with yogurt and honey',
      suggestedBy: 'lisa.jones@example.com',
      date: '3 days ago',
      status: 'rejected'
    }
  ]);

  useEffect(() => {
    // Check if user has created a restaurant
    const checkRestaurantExists = async () => {
      try {
        // First check if restaurant_data exists in localStorage
        const storedRestaurantData = localStorage.getItem('restaurant_data');

        if (storedRestaurantData) {
          try {
            const restaurantData = JSON.parse(storedRestaurantData);
            // If we have valid restaurant data with a name, use it
            if (restaurantData && restaurantData.name) {
              setRestaurantName(restaurantData.name);
              setHasRestaurant(true);
              return true;
            }
          } catch (parseError) {
            console.warn('Error parsing stored restaurant data:', parseError);
          }
        }

        // If no restaurant_data, check user data and try to fetch restaurant data
        const storedUser = localStorage.getItem('user');
        let email = "demo@example.com"; // Default email for demo
        let userName = "";

        if (storedUser) {
          try {
            const user = JSON.parse(storedUser);
            if (user?.email) {
              email = user.email;
            }
            if (user?.name) {
              userName = user.name;
            }
          } catch (parseError) {
            console.warn("Error parsing user data:", parseError);
            // Continue with default email
          }
        } else {
          console.warn("User not found in localStorage, using demo email");
        }

        // Try to fetch restaurant data from API
        try {
          const res = await fetch("/api/restaurant/get_restaurant", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          });

          if (res.ok) {
            const restaurantData = await res.json();
            // Save to localStorage for future use
            localStorage.setItem('restaurant_data', JSON.stringify(restaurantData));
            setRestaurantName(restaurantData.name);
            setHasRestaurant(true);
            return true;
          }
        } catch (fetchError) {
          console.error('Error fetching restaurant data:', fetchError);
        }

        // Fallback to user name if API fetch fails
        if (userName) {
          setRestaurantName(userName);
          return true;
        }

        // If all else fails, set a default name
        setRestaurantName("Demo Restaurant");
        setHasRestaurant(true);
        return true;
      } catch (error) {
        console.error('Error checking restaurant existence:', error);
        setHasRestaurant(false);
        return false;
      }
    };

    // Simulate loading data
    const timer = setTimeout(async () => {
      const exists = await checkRestaurantExists();
      setLoading(false);

      // If no restaurant exists, clear any old restaurant_data to prevent data leakage
      if (!exists) {
        try {
          localStorage.removeItem('restaurant_data');
        } catch (error) {
          console.error('Error removing old restaurant data:', error);
        }
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Handle suggested item status change
  const handleSuggestedItemStatus = (itemId, newStatus) => {
    // Update the status of the suggested item
    setSuggestedItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, status: newStatus } : item
      )
    );

    // Show a notification or toast message (in a real app)
    console.log(`Item ${itemId} ${newStatus}`);

    // In a real app, you would make an API call to update the status in the database
    // Example:
    // fetch('/api/menu/suggested-items/update-status', {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ itemId, status: newStatus })
    // });
  };

  // Handle adding a suggested item to the menu
  const handleAddToMenu = (item) => {
    // In a real app, you would make an API call to add the item to the menu
    console.log(`Adding item to menu: ${item.name}`);

    // Navigate to the menu page with the item data pre-filled
    // In a real app, you might use router.push with query parameters or localStorage
    // Example:
    // router.push({
    //   pathname: '/restaurant/menu',
    //   query: {
    //     addItem: 'true',
    //     name: item.name,
    //     category: item.category,
    //     description: item.description
    //   }
    // });

    // For this demo, just update the status to 'approved'
    handleSuggestedItemStatus(item.id, 'approved');
  };

  // Quick action cards
  const quickActions = [
    {
      title: 'View Orders',
      description: 'Manage incoming orders and kitchen operations',
      icon: ShoppingCartIcon,
      href: '/restaurant/orders',
      color: 'bg-green-500'
    },
    {
      title: 'Manage Menu',
      description: 'Add, edit or remove menu items and categories',
      icon: ClipboardDocumentListIcon,
      href: '/restaurant/menu',
      color: 'bg-blue-500'
    },
    {
      title: 'Generate QR Code',
      description: 'Create and download QR codes for your menu',
      icon: QrCodeIcon,
      href: '/restaurant/qrcode',
      color: 'bg-purple-500'
    },
    {
      title: 'Update Profile',
      description: 'Edit your restaurant details and settings',
      icon: UserIcon,
      href: '/restaurant/profile',
      color: 'bg-teal-500'
    }
  ];

  // Recent activity data (would come from API in real app)
  const recentActivity = [
    { id: 1, action: 'Menu viewed', time: '5 minutes ago', icon: EyeIcon, iconColor: 'text-blue-500' },
    { id: 2, action: 'New order received', time: '1 hour ago', icon: ShoppingCartIcon, iconColor: 'text-green-500' },
    { id: 3, action: 'New item "Spicy Chicken Burger" suggested by customer', time: '2 hours ago', icon: ClipboardDocumentListIcon, iconColor: 'text-orange-500' },
    { id: 4, action: 'Menu item updated', time: '3 hours ago', icon: ClipboardDocumentListIcon, iconColor: 'text-purple-500' },
    { id: 5, action: 'New item "Vegan Salad Bowl" suggested by customer', time: 'Yesterday', icon: ClipboardDocumentListIcon, iconColor: 'text-orange-500' },
    { id: 6, action: 'QR code downloaded', time: 'Yesterday', icon: QrCodeIcon, iconColor: 'text-teal-500' }
  ];

  if (loading) {
    return <PageLoader message="Loading your restaurant dashboard..." />;
  }

  // If user hasn't created a restaurant yet, show a prompt
  if (!hasRestaurant) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-teal-500 to-emerald-600 px-6 py-4">
            <div className="flex items-center justify-center">
              <ExclamationTriangleIcon className="h-8 w-8 text-white mr-2" />
              <h2 className="text-xl font-bold text-white">Restaurant Setup Required</h2>
            </div>
          </div>

          <div className="p-6">
            <div className="text-center mb-6">
              <BuildingStorefrontIcon className="h-16 w-16 text-teal-500 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">
                You need to create a restaurant profile before you can access the dashboard.
                This will allow you to customize your menu, generate QR codes, and track analytics.
              </p>
            </div>

            <div className="flex justify-center">
              <Link
                href="/restaurant/profile"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none"
              >
                <BuildingStorefrontIcon className="h-5 w-5 mr-2" />
                Create Restaurant Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome section */}
      <div className="bg-gradient-to-r from-teal-500 to-emerald-600 rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-8 md:px-10 md:py-12">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Welcome back to {restaurantName}
          </h1>
          <p className="text-teal-100 text-lg max-w-3xl">
            Manage your digital menu, track performance, and grow your business from this dashboard.
          </p>
          <div className="mt-6">
            <Link
              href="/template"
              target="_blank"
              className="inline-flex items-center px-4 py-2 bg-white text-teal-700 rounded-lg shadow hover:bg-teal-50 transition-colors duration-200"
            >
              <EyeIcon className="h-5 w-5 mr-2" />
              View Your Menu
            </Link>
          </div>
        </div>
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">Menu Items</h3>
            <ClipboardDocumentListIcon className="h-5 w-5 text-teal-500" />
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900">{stats.menuItems}</p>
          <div className="mt-2 flex items-center text-sm">
            <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500 font-medium">12%</span>
            <span className="text-gray-500 ml-2">from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">Categories</h3>
            <ClipboardDocumentListIcon className="h-5 w-5 text-blue-500" />
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900">{stats.categories}</p>
          <div className="mt-2 flex items-center text-sm">
            <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500 font-medium">2</span>
            <span className="text-gray-500 ml-2">new categories</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">Suggested Items</h3>
            <PlusCircleIcon className="h-5 w-5 text-orange-500" />
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900">{stats.suggestedItems}</p>
          <div className="mt-2 flex items-center text-sm">
            <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500 font-medium">2</span>
            <span className="text-gray-500 ml-2">new suggestions</span>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action) => (
            <Link
              key={action.title}
              href={action.href}
              className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              <div className={`h-2 ${action.color}`}></div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className={`p-2 rounded-lg ${
                    action.color === 'bg-green-500' ? 'bg-green-100' :
                    action.color === 'bg-blue-500' ? 'bg-blue-100' :
                    action.color === 'bg-purple-500' ? 'bg-purple-100' :
                    action.color === 'bg-teal-500' ? 'bg-teal-100' :
                    action.color === 'bg-amber-500' ? 'bg-amber-100' : 'bg-gray-100'
                  }`}>
                    <action.icon className={`h-6 w-6 ${action.color.replace('bg-', 'text-')}`} />
                  </div>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">{action.title}</h3>
                <p className="text-sm text-gray-500">{action.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Customer-suggested menu items */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Customer-Suggested Menu Items</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {suggestedItems.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Item
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Suggested By
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {suggestedItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{item.name}</div>
                            <div className="text-sm text-gray-500 line-clamp-1">{item.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.category}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.suggestedBy}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{item.date}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                          ${item.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            item.status === 'approved' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'}`}>
                          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          {item.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleSuggestedItemStatus(item.id, 'approved')}
                                className="text-green-600 hover:text-green-900"
                                title="Approve suggestion"
                              >
                                <CheckCircleIcon className="h-5 w-5" />
                              </button>
                              <button
                                onClick={() => handleSuggestedItemStatus(item.id, 'rejected')}
                                className="text-red-600 hover:text-red-900"
                                title="Reject suggestion"
                              >
                                <XCircleIcon className="h-5 w-5" />
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => handleAddToMenu(item)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Add to menu"
                          >
                            <PlusCircleIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-8 text-center">
              <p className="text-gray-500">No suggested items yet</p>
            </div>
          )}
          <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
            <span className="text-sm text-gray-700">
              Showing <span className="font-medium">{suggestedItems.length}</span> items
            </span>
            <Link
              href="/restaurant/menu"
              className="text-sm text-teal-600 hover:text-teal-800 font-medium"
            >
              Manage Menu Items
            </Link>
          </div>
        </div>
      </div>

      {/* Recent activity */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {recentActivity.map((activity) => (
              <li key={activity.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center">
                  <div className={`p-2 rounded-full ${
                    activity.iconColor === 'text-blue-500' ? 'bg-blue-100' :
                    activity.iconColor === 'text-green-500' ? 'bg-green-100' :
                    activity.iconColor === 'text-orange-500' ? 'bg-orange-100' :
                    activity.iconColor === 'text-purple-500' ? 'bg-purple-100' :
                    activity.iconColor === 'text-teal-500' ? 'bg-teal-100' :
                    'bg-gray-100'
                  } mr-4`}>
                    <activity.icon className={`h-5 w-5 ${activity.iconColor}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="bg-gray-50 px-4 py-3 text-center">
            <button className="text-sm text-teal-600 hover:text-teal-800 font-medium">
              View All Activity
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDashboard;