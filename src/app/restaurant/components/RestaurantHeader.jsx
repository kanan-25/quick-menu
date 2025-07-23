'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  BellIcon
} from '@heroicons/react/24/outline';

const RestaurantHeader = () => {
  const pathname = usePathname();
  const [notifications, setNotifications] = useState([]);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notification => ({ ...notification, read: true })));
  };

  // Mark single notification as read
  const markAsRead = (notificationId) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  // Play notification sound
  const playNotificationSound = () => {
    try {
      // Create a simple notification sound using Web Audio API
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (error) {
      console.log('Could not play notification sound:', error);
    }
  };

  // Add new notification (this would be called when new orders come in)
  const addNotification = (text, type = 'info') => {
    const newNotification = {
      id: Date.now(),
      text,
      time: 'Just now',
      type,
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);

    // Play sound for order notifications
    if (type === 'order') {
      playNotificationSound();
    }
  };

  // Get unread notifications count
  const unreadCount = notifications.filter(n => !n.read).length;

  // Listen for new order events using localStorage (works across tabs)
  useEffect(() => {
    const checkForNewOrders = () => {
      try {
        const newOrderData = localStorage.getItem('newOrderNotification');
        if (newOrderData) {
          const orderData = JSON.parse(newOrderData);
          const { orderNumber, customerName, tableNumber, timestamp } = orderData;

          // Check if this notification is new (within last 10 seconds)
          const now = Date.now();
          if (now - timestamp < 10000) {
            const notificationText = tableNumber
              ? `New order ${orderNumber} from Table ${tableNumber}`
              : `New order ${orderNumber} from ${customerName || 'Customer'}`;

            console.log('Adding new order notification:', notificationText);
            addNotification(notificationText, 'order');

            // Clear the notification data
            localStorage.removeItem('newOrderNotification');
          }
        }
      } catch (error) {
        console.error('Error checking for new orders:', error);
      }
    };

    // Check immediately
    checkForNewOrders();

    // Set up interval to check for new orders every second
    const interval = setInterval(checkForNewOrders, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

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
              className="relative p-1 rounded-full text-gray-500 hover:text-teal-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setNotificationsOpen(!notificationsOpen);
              }}
            >
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center h-5 w-5 text-xs font-bold text-white bg-red-500 rounded-full ring-2 ring-white">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            {/* Notifications dropdown panel */}
            {notificationsOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                <div className="py-3 px-4 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="text-sm font-medium text-gray-700">Notifications</h3>
                  {unreadCount > 0 && (
                    <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {notifications.length > 0 ? (
                    <div className="py-1">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`px-4 py-3 hover:bg-gray-50 transition-colors duration-150 cursor-pointer border-l-4 ${
                            !notification.read
                              ? 'border-teal-500 bg-teal-50'
                              : 'border-transparent'
                          }`}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className={`text-sm ${!notification.read ? 'text-gray-900 font-medium' : 'text-gray-700'}`}>
                                {notification.text}
                              </p>
                              <p className="text-xs text-gray-500 mt-1 flex items-center">
                                <span>{notification.time}</span>
                                {notification.type === 'order' && (
                                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                    Order
                                  </span>
                                )}
                              </p>
                            </div>
                            {!notification.read && (
                              <div className="ml-2 w-2 h-2 bg-teal-500 rounded-full flex-shrink-0"></div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="px-4 py-6 text-center">
                      <BellIcon className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">No notifications yet</p>
                    </div>
                  )}
                </div>
                {unreadCount > 0 && (
                  <div className="py-2 px-4 border-t border-gray-200 text-center">
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-teal-600 hover:text-teal-800 font-medium transition-colors"
                    >
                      Mark all as read
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default RestaurantHeader;