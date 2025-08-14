"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { Toaster, toast } from 'react-hot-toast'; // ✅ NEW
import { PageLoader, ButtonLoader } from '@/components/Loader';

// Fallback data
const fallbackMenuData = {
  // ... your full fallbackMenuData as it is ...
};

// Customer Information Form Component
const CustomerInfoForm = ({
  isVisible,
  onClose,
  customerInfo,
  onCustomerInfoChange,
  orderItems,
  calculateSubtotal,
  calculateTax,
  calculateTotal,
  onPlaceOrder,
  orderLoading
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-white rounded-lg sm:rounded-xl shadow-2xl max-w-md w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        <div className="p-4 sm:p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Customer Information</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form className="space-y-4">
            {/* Order Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Order Type</label>
              <div className="grid grid-cols-3 gap-2">
                {['dine-in', 'takeaway', 'delivery'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => onCustomerInfoChange('orderType', type)}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      customerInfo.orderType === type
                        ? 'bg-teal-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Customer Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={customerInfo.name}
                onChange={(e) => onCustomerInfoChange('name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={customerInfo.phone}
                onChange={(e) => onCustomerInfoChange('phone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter your phone number"
                required
              />
            </div>

            {/* Email (Optional) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email (Optional)</label>
              <input
                type="email"
                value={customerInfo.email}
                onChange={(e) => onCustomerInfoChange('email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter your email"
              />
            </div>

            {/* Table Number (for dine-in) */}
            {customerInfo.orderType === 'dine-in' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Table Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={customerInfo.tableNumber}
                  onChange={(e) => onCustomerInfoChange('tableNumber', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter table number"
                  required
                />
              </div>
            )}

            {/* Special Instructions */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Special Instructions</label>
              <textarea
                value={customerInfo.specialInstructions}
                onChange={(e) => onCustomerInfoChange('specialInstructions', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Any special requests or dietary requirements..."
                rows="3"
              />
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 rounded-lg p-4 mt-6">
              <h3 className="font-semibold text-gray-900 mb-2">Order Summary</h3>
              <div className="space-y-1 text-sm">
                {orderItems.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <span>{item.quantity}x {item.name}</span>
                    <span>₹{(item.discountedPrice || item.price) * item.quantity}</span>
                  </div>
                ))}

                {/* Price Breakdown */}
                <div className="border-t pt-2 mt-2 space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>₹{calculateSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax (5% GST):</span>
                    <span>₹{calculateTax().toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-1 mt-1 font-semibold flex justify-between">
                    <span>Total:</span>
                    <span>₹{calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Back to Menu
              </button>
              <button
                type="button"
                onClick={onPlaceOrder}
                disabled={!customerInfo.name || !customerInfo.phone || (customerInfo.orderType === 'dine-in' && !customerInfo.tableNumber) || orderLoading}
                className={`flex-1 px-4 py-2 rounded-md text-white font-medium ${
                  (!customerInfo.name || !customerInfo.phone || (customerInfo.orderType === 'dine-in' && !customerInfo.tableNumber) || orderLoading)
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-teal-600 hover:bg-teal-700'
                }`}
              >
                {orderLoading ? (
                  <div className="flex items-center justify-center">
                    <ButtonLoader size="sm" color="white" />
                    Placing Order...
                  </div>
                ) : (
                  'Place Order'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Reusable Card Component
const MenuItemCard = ({ item, onAddToCart }) => {
  const renderIcons = (item) => {
    const badges = [];
    if (item.isVegetarian) {
      badges.push(
        <span key="veg" className="bg-gradient-to-r from-green-50 to-green-100 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-green-200 flex items-center gap-1.5 shadow-sm">
          <span>🌿</span> Veg
        </span>
      );
    }
    if (item.isVegan) {
      badges.push(
        <span key="vegan" className="bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-emerald-200 flex items-center gap-1.5 shadow-sm">
          <span>🌱</span> Vegan
        </span>
      );
    }
    if (item.isGlutenFree) {
      badges.push(
        <span key="gf" className="bg-gradient-to-r from-amber-50 to-amber-100 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-amber-200 flex items-center gap-1.5 shadow-sm">
          <span>🌾</span> Gluten-Free
        </span>
      );
    }
    if (item.isPopular) {
      badges.push(
        <span key="popular" className="bg-gradient-to-r from-red-50 to-red-100 text-red-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-red-200 flex items-center gap-1.5 shadow-sm">
          <span>🔥</span> Popular
        </span>
      );
    }

    return badges.length > 0 ? <div className="flex flex-wrap gap-2">{badges}</div> : null;
  };

  return (
    <motion.div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100">
      <div className="flex flex-col h-full">
        {/* Image Section */}
        <div className="relative h-48 sm:h-56 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/300x200/f0f9ff/0f766e?text=' + encodeURIComponent(item.name);
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-teal-50 to-teal-100">
              <div className="text-center">
                <svg className="w-20 h-20 mx-auto mb-2 text-teal-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
                <span className="text-teal-400 text-sm font-medium">{item.name}</span>
              </div>
            </div>
          )}

          {/* Discount badge */}
          {item.discountedPrice && item.discountedPrice < item.price && (
            <div className="absolute top-3 right-3">
              <span className="bg-red-500 text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-lg backdrop-blur-sm bg-opacity-90">
                {Math.round(((item.price - item.discountedPrice) / item.price) * 100)}% OFF
              </span>
            </div>
          )}
        </div>
        {/* Content Section */}
        <div className="p-4 sm:p-6 flex-1 flex flex-col">
          <div className="mb-4">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-teal-700 transition-colors duration-300 leading-tight">
              {item.name}
            </h3>

            {/* Dietary badges */}
            {renderIcons(item)}

            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mt-2 sm:mt-3 flex-1 line-clamp-2 sm:line-clamp-3">
              {item.description}
            </p>
          </div>

          {/* Price and Button Section */}
          <div className="flex items-end justify-between mt-auto">
            <div className="flex flex-col">
              {item.discountedPrice && item.discountedPrice < item.price ? (
                <div className="space-y-1">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-gray-400 line-through text-sm font-medium">₹{item.price?.toFixed(2)}</span>
                    <span className="text-teal-700 font-bold text-2xl">₹{item.discountedPrice?.toFixed(2)}</span>
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full">+ 5% GST</span>
                </div>
              ) : (
                <div className="space-y-1">
                  <span className="text-teal-700 font-bold text-xl sm:text-2xl">₹{item.price?.toFixed(2)}</span>
                  <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full">+ 5% GST</span>
                </div>
              )}
            </div>

            <button
              onClick={() => onAddToCart(item)}
              className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 flex items-center space-x-1.5 sm:space-x-2 ml-3 sm:ml-4 text-sm sm:text-base"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span className="hidden sm:inline">Add</span>
              <span className="sm:hidden">+</span>
            </button>
          </div>
        </div>

        {/* Subtle bottom accent */}
        <div className="h-1 bg-gradient-to-r from-teal-500 via-teal-600 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
    </motion.div>
  );
};

const DynamicMenu = () => {
  const searchParams = useSearchParams();
  const restaurantId = searchParams.get('id') || '123456789';

  const [menuData, setMenuData] = useState({});
  const [categoryKeys, setCategoryKeys] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');
  const [orderItems, setOrderItems] = useState([]);
  const [isOrderVisible, setIsOrderVisible] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    tableNumber: '',
    orderType: 'dine-in',
    specialInstructions: ''
  });
  const [restaurant, setRestaurant] = useState({
    name: 'DigiMenuCard Restaurant',
    description: 'Digital dining experience made simple',
    logo: '/Logo.png'
  });

 const calculateSubtotal = () => {
  return orderItems.reduce((total, item) => {
    const price = item.discountedPrice && item.discountedPrice < item.price
      ? item.discountedPrice
      : item.price || 0;

    return total + price * (item.quantity || 1);
  }, 0);
};

const calculateTax = () => {
  const subtotal = calculateSubtotal();
  return Math.round(subtotal * 0.05 * 100) / 100; // 5% GST
};

const calculateTotal = () => {
  return calculateSubtotal() + calculateTax();
};

const getTotalItemCount = () => {
  return orderItems.reduce((total, item) => total + (item.quantity || 1), 0);
};

  // Load cart and customer info from localStorage on component mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('quick-menu-cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setOrderItems(parsedCart);
      }

      const savedCustomerInfo = localStorage.getItem('quick-menu-customer');
      if (savedCustomerInfo) {
        const parsedCustomerInfo = JSON.parse(savedCustomerInfo);
        setCustomerInfo(parsedCustomerInfo);
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
    }
  }, []);

  // Save cart to localStorage whenever orderItems changes
  useEffect(() => {
    try {
      localStorage.setItem('quick-menu-cart', JSON.stringify(orderItems));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [orderItems]);

  // Save customer info to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('quick-menu-customer', JSON.stringify(customerInfo));
    } catch (error) {
      console.error('Error saving customer info to localStorage:', error);
    }
  }, [customerInfo]);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        setLoading(true);
        console.log('Fetching menu data for restaurant ID:', restaurantId);
        
        const response = await fetch(`/api/menu/public/${restaurantId}`);
        console.log('Menu API response status:', response.status);
        
        if (!response.ok) {
          console.error('Menu API failed with status:', response.status);
          // Don't throw error, continue with fallback
        }

        const data = await response.json();
        console.log('Menu API response data:', data);

        if (data.restaurant) setRestaurant(data.restaurant);

        const formattedData = {};
        if (data.categories?.length) {
          data.categories.forEach(category => {
            formattedData[category.name.toLowerCase()] = category.items;
          });
          setMenuData(formattedData);
          setCategoryKeys(Object.keys(formattedData));
          setActiveCategory(Object.keys(formattedData)[0]);
        } else {
          console.log('No categories found, using fallback menu');
          setMenuData(fallbackMenuData);
          setCategoryKeys(Object.keys(fallbackMenuData));
          setActiveCategory(Object.keys(fallbackMenuData)[0]);
        }

      } catch (error) {
        console.error('Error fetching menu:', error);
        setMenuData(fallbackMenuData);
        setCategoryKeys(Object.keys(fallbackMenuData));
        setActiveCategory(Object.keys(fallbackMenuData)[0]);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuData();
  }, [restaurantId]);

  const handleCategoryChange = (category) => setActiveCategory(category);

  // Get category icon based on category name
  const getCategoryIcon = (category) => {
    const categoryLower = category.toLowerCase();
    if (categoryLower.includes('appetizer') || categoryLower.includes('starter')) return '🥗';
    if (categoryLower.includes('main') || categoryLower.includes('entree')) return '🍽️';
    if (categoryLower.includes('dessert') || categoryLower.includes('sweet')) return '🍰';
    if (categoryLower.includes('drink') || categoryLower.includes('beverage')) return '🥤';
    if (categoryLower.includes('pizza')) return '🍕';
    if (categoryLower.includes('burger')) return '🍔';
    if (categoryLower.includes('pasta')) return '🍝';
    if (categoryLower.includes('salad')) return '🥗';
    if (categoryLower.includes('soup')) return '🍲';
    if (categoryLower.includes('seafood') || categoryLower.includes('fish')) return '🐟';
    if (categoryLower.includes('chicken') || categoryLower.includes('meat')) return '🍗';
    if (categoryLower.includes('vegetarian') || categoryLower.includes('veg')) return '🌱';
    if (categoryLower.includes('breakfast')) return '🍳';
    if (categoryLower.includes('lunch')) return '🍽️';
    if (categoryLower.includes('dinner')) return '🌙';
    if (categoryLower.includes('snack')) return '🍿';
    if (categoryLower.includes('coffee') || categoryLower.includes('tea')) return '☕';
    if (categoryLower.includes('ice cream') || categoryLower.includes('frozen')) return '🍦';
    return '🍴'; // Default icon
  };

  const handleAddToCart = (item) => {
    const existingIndex = orderItems.findIndex(
      (orderItem) => orderItem.id === item.id
    );

    if (existingIndex !== -1) {
      const updatedItems = [...orderItems];
      updatedItems[existingIndex].quantity += 1;
      setOrderItems(updatedItems);
    } else {
      const orderItem = {
        ...item,
        quantity: 1,
        orderId: `${item.id}_${Date.now()}`
      };
      setOrderItems([...orderItems, orderItem]);
    }

    toast.success(`${item.name} added to order`, {
      position: "top-right"
    });
  };

 const handleIncreaseQuantity = (orderId) => {
  const updated = orderItems.map(item =>
    item.orderId === orderId ? { ...item, quantity: item.quantity + 1 } : item
  );
  setOrderItems(updated);
};

  const handleDecreaseQuantity = (orderId) => {
  const updated = orderItems
    .map(item =>
      item.orderId === orderId
        ? { ...item, quantity: item.quantity - 1 }
        : item
    )
    .filter(item => item.quantity > 0);

  setOrderItems(updated);
};


  const handleRemoveFromOrder = (itemId) => {
    const isOrderId = typeof itemId === 'string' && itemId.includes('_');
    const updatedOrder = orderItems.filter((item) => isOrderId ? item.orderId !== itemId : item.id !== itemId);
    setOrderItems(updatedOrder);
  };

  const handleProceedToCheckout = () => {
    if (orderItems.length === 0) {
      setConfirmationMessage('Your order is empty. Please add items.');
      setTimeout(() => setConfirmationMessage(''), 1500);
      return;
    }
    setShowCustomerForm(true);
  };

  const handleCustomerInfoChange = (field, value) => {
    setCustomerInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSendOrder = async () => {
    setOrderLoading(true);
    setConfirmationMessage('');

    try {
      // Prepare order data
      const orderData = {
        restaurantId: restaurantId,
        tableNumber: customerInfo.tableNumber || null,
        customerInfo: {
          name: customerInfo.name || 'Walk-in Customer',
          phone: customerInfo.phone || '',
          email: customerInfo.email || '',
        },
        items: orderItems.map(item => ({
          id: item.id,
          name: item.name,
          description: item.description,
          price: item.price,
          discountedPrice: item.discountedPrice,
          quantity: item.quantity,
          image: item.image,
        })),
        orderType: customerInfo.orderType || 'dine-in',
        specialInstructions: customerInfo.specialInstructions || '',
      };

      console.log('Sending order:', orderData);
      console.log('Restaurant ID:', restaurantId);
      console.log('Order items:', orderItems);

      // Send order to API
      const response = await fetch('/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();
      console.log('API Response:', response.status, result);

      if (response.ok && result.success) {
        // Order successful
        setOrderSuccess(result.order);
        setConfirmationMessage(`Order #${result.order.orderNumber} sent successfully! Estimated time: ${result.order.estimatedTime} minutes.`);

        // Trigger notification for restaurant dashboard using localStorage
        try {
          const notificationData = {
            orderNumber: result.order.orderNumber,
            customerName: customerInfo.name,
            tableNumber: customerInfo.tableNumber,
            orderTotal: calculateTotal().toFixed(2),
            timestamp: Date.now()
          };
          localStorage.setItem('newOrderNotification', JSON.stringify(notificationData));
          console.log('Order notification saved to localStorage:', notificationData);
        } catch (error) {
          console.error('Error saving order notification:', error);
        }

        toast.success(`Order #${result.order.orderNumber} placed successfully!`, {
          position: "top-right",
          duration: 4000
        });

        // Clear cart after successful order
        setTimeout(() => {
          setOrderItems([]);
          setConfirmationMessage('');
          setIsOrderVisible(false);
          setShowCustomerForm(false);
          setOrderSuccess(null);
          // Clear cart and customer info from localStorage
          localStorage.removeItem('quick-menu-cart');
          localStorage.removeItem('quick-menu-customer');
          // Reset customer info for next order
          setCustomerInfo({
            name: '',
            phone: '',
            email: '',
            tableNumber: '',
            orderType: 'dine-in',
            specialInstructions: ''
          });
        }, 4000);
      } else {
        // Order failed - log detailed error info
        console.error('Order failed with result:', result);
        console.error('Response status:', response.status);
        console.error('Error message:', result.message);
        console.error('Error details:', result.details);
        console.error('Full error object:', JSON.stringify(result, null, 2));
        throw new Error(`${result.message || 'Failed to place order'} - ${result.details || ''} (Status: ${response.status})`);
      }
    } catch (error) {
      console.error('Error placing order:', error);
      setConfirmationMessage(`Failed to place order: ${error.message}`);

      toast.error(`Failed to place order: ${error.message}`, {
        position: "top-right",
        duration: 4000
      });
    } finally {
      setOrderLoading(false);
    }
  };

  const toggleOrderVisibility = () => setIsOrderVisible(!isOrderVisible);

  const clearCart = () => {
    setOrderItems([]);
    localStorage.removeItem('quick-menu-cart');
    toast.success('Cart cleared successfully!');
  };

  if (loading) {
    return <PageLoader message="Loading your digital menu..." />;
  }

  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 2000 }} /> {/* ✅ Added Toaster */}

      {/* Customer Information Form Modal */}
      <CustomerInfoForm
        isVisible={showCustomerForm}
        onClose={() => setShowCustomerForm(false)}
        customerInfo={customerInfo}
        onCustomerInfoChange={handleCustomerInfoChange}
        orderItems={orderItems}
        calculateSubtotal={calculateSubtotal}
        calculateTax={calculateTax}
        calculateTotal={calculateTotal}
        onPlaceOrder={handleSendOrder}
        orderLoading={orderLoading}
      />

      <div className="bg-gradient-to-br from-teal-50 to-green-50 min-h-screen py-4 sm:py-8 md:py-12 lg:py-16">
        <div className="relative container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 z-10">
          <header className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0">
            <div className="flex items-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full overflow-hidden mr-3 sm:mr-4 shadow-md bg-white flex items-center justify-center">
                <img src={'/Logo.png'} alt="DigiMenuCard Logo" className="w-full h-full object-contain" />
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-teal-800 leading-tight">{restaurant.name}</h1>
            </div>
            <button
              className="bg-teal-100 text-teal-800 py-2.5 px-4 sm:py-2 sm:px-4 rounded-lg hover:bg-teal-200 flex items-center space-x-2 shadow-sm transition-colors w-full sm:w-auto justify-center sm:justify-start"
              onClick={toggleOrderVisibility}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6M20 13v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6m16 0V9a2 2 0 00-2-2H6a2 2 0 00-2-2v4m16 0H4" />
              </svg>
              <span className="font-medium">Cart ({getTotalItemCount()})</span>
              {orderItems.length > 0 && (
                <span className="bg-teal-600 text-white text-xs px-2 py-1 rounded-full font-bold">
                  ₹{calculateTotal().toFixed(0)}
                </span>
              )}
            </button>
          </header>

          {/* Enhanced Category Navigation */}
          <nav className="mb-8 sm:mb-12 flex justify-center px-2 sm:px-0">
            <div className="bg-gradient-to-r from-white via-gray-50 to-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl border border-gray-200 p-2 sm:p-3 flex flex-wrap justify-center gap-2 sm:gap-3 max-w-full sm:max-w-5xl backdrop-blur-sm overflow-x-auto">
              {categoryKeys.map((category) => (
                <button
                  key={category}
                  className={`relative py-2.5 px-4 sm:py-3 sm:px-6 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 transform hover:scale-105 whitespace-nowrap ${
                    activeCategory === category
                      ? 'bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-lg shadow-teal-500/25'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-teal-700'
                  }`}
                  onClick={() => handleCategoryChange(category)}
                >
                  <span className="relative z-10 capitalize flex items-center space-x-1.5 sm:space-x-2">
                    <span className="text-base sm:text-lg">{getCategoryIcon(category)}</span>
                    <span className="hidden sm:inline">{category.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span className="sm:hidden text-xs">{category.replace(/([A-Z])/g, ' $1').trim().split(' ')[0]}</span>
                    <span className={`text-xs px-1.5 sm:px-2 py-0.5 rounded-full font-bold ${
                      activeCategory === category
                        ? 'bg-white/20 text-white'
                        : 'bg-teal-100 text-teal-600'
                    }`}>
                      {menuData[category]?.length || 0}
                    </span>
                  </span>

                  {/* Active indicator */}
                  {activeCategory === category && (
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-teal-700 rounded-xl opacity-100"></div>
                  )}

                  {/* Hover glow effect */}
                  <div className={`absolute inset-0 rounded-xl transition-opacity duration-300 ${
                    activeCategory === category
                      ? 'opacity-0'
                      : 'opacity-0 hover:opacity-20 bg-gradient-to-r from-teal-500 to-teal-600'
                  }`}></div>
                </button>
              ))}
            </div>
          </nav>

          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            <AnimatePresence>
              {menuData[activeCategory]?.map((item) => (
                <MenuItemCard key={item.id} item={item} onAddToCart={handleAddToCart} />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Sidebar */}
          <motion.aside className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-xl z-50 transform transition-transform duration-300 ${isOrderVisible ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="p-4 sm:p-6 flex flex-col h-full">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-teal-800">Your Cart</h2>
                  <p className="text-sm text-gray-600">
                    {getTotalItemCount()} item{getTotalItemCount() !== 1 ? 's' : ''}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {orderItems.length > 0 && (
                    <button
                      onClick={clearCart}
                      className="p-2 hover:bg-red-100 rounded-full transition-colors text-red-500 hover:text-red-700"
                      title="Clear Cart"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                  <button
                    onClick={toggleOrderVisibility}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <svg className="w-6 h-6 text-gray-500 hover:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {orderItems.length === 0 ? (
                <div className="text-center py-8">
                  <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6M20 13v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6m16 0V9a2 2 0 00-2-2H6a2 2 0 00-2-2v4m16 0H4" />
                  </svg>
                  <p className="text-gray-500 text-lg font-medium mb-2">Your cart is empty</p>
                  <p className="text-gray-400 text-sm">Add some delicious items from our menu!</p>
                </div>
              ) : (
                <>
                  <ul className="space-y-4 overflow-y-auto flex-grow">
                    {orderItems.map((item) => (
                      <li key={item.orderId} className="flex justify-between items-start border-b pb-3">
                        <div className="w-full pr-3">
                          <h4 className="font-semibold text-gray-800">{item.name}</h4>
                          <p className="text-sm text-gray-600">{item.description}</p>
                          {item.discountedPrice && item.discountedPrice < item.price ? (
                            <div className="flex space-x-2">
                              <span className="line-through text-sm text-gray-400">₹{item.price.toFixed(2)}</span>
                              <span className="text-teal-800 font-bold">₹{item.discountedPrice.toFixed(2)}</span>
                            </div>
                          ) : (
                            <span className="text-teal-800 font-bold">₹{item.price.toFixed(2)}</span>
                          )}

                          {/* Quantity Control */}
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => handleDecreaseQuantity(item.orderId)}
                              className="px-2 py-0.5 bg-gray-200 rounded hover:bg-gray-300 text-gray-800 text-sm"
                            >
                              −
                            </button>
                            <span className="text-sm font-medium">{item.quantity}</span>
                            <button
                              onClick={() => handleIncreaseQuantity(item.orderId)}
                              className="px-2 py-0.5 bg-gray-200 rounded hover:bg-gray-300 text-gray-800 text-sm"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Delete Button */}
                        <button
                          onClick={() => handleRemoveFromOrder(item.orderId)}
                          className="text-red-500 hover:text-red-700 mt-1"
                          title="Remove"
                        >
                          🗑
                        </button>
                      </li>

                    ))}
                  </ul>

                  {/* Price Breakdown */}
                  <div className="mt-4 border-t pt-3 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="text-gray-800">₹{calculateSubtotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tax (5% GST):</span>
                      <span className="text-gray-800">₹{calculateTax().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="font-semibold text-teal-800">Total:</span>
                      <span className="font-bold text-teal-800 text-lg">₹{calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </>
              )}

              {confirmationMessage && <p className="text-green-600 mt-4">{confirmationMessage}</p>}

              <button
                className="mt-6 bg-teal-700 text-white py-3 rounded-md hover:bg-teal-800 transition-colors"
                onClick={handleProceedToCheckout}
                disabled={orderItems.length === 0}
              >
                Proceed to Checkout
              </button>
            </div>
          </motion.aside>
        </div>
      </div>
    </>
  );
};

export default DynamicMenu;
