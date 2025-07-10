"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { Toaster, toast } from 'react-hot-toast'; // ✅ NEW

// Fallback data
const fallbackMenuData = {
  // ... your full fallbackMenuData as it is ...
};

// Reusable Card Component
const MenuItemCard = ({ item, onAddToCart }) => {
  const renderIcons = (item) => {
    const badges = [];
    if (item.isVegetarian) {
      badges.push(<span key="veg" className="bg-green-50 text-green-700 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-green-200 flex items-center gap-1"><span>🌿</span> Veg</span>);
    }
    if (item.isVegan) {
      badges.push(<span key="vegan" className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1"><span>🌱</span> Vegan</span>);
    }
    if (item.isGlutenFree) {
      badges.push(<span key="gf" className="bg-yellow-50 text-yellow-700 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-yellow-200 flex items-center gap-1"><span>🌾</span> Gluten-Free</span>);
    }
    if (item.isPopular) {
      badges.push(<span key="popular" className="bg-red-50 text-red-700 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-red-200 flex items-center gap-1"><span>🔥</span> Popular</span>);
    }

    return badges.length > 0 ? <div className="flex flex-wrap gap-2 mt-2">{badges}</div> : null;
  };

  return (
    <motion.div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300 transform hover:-translate-y-2">
      <div className="p-2 flex flex-col justify-between h-full">
        {item.image && (
          <div className="mb-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-40 object-cover rounded-md shadow-sm"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/150';
              }}
            />
          </div>
        )}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1 tracking-tight">{item.name}</h3>
          {renderIcons(item)}
          <p className="text-gray-700 text-sm mb-3 leading-relaxed">{item.description}</p>
          {item.discountedPrice && item.discountedPrice < item.price ? (
            <div className="flex items-baseline space-x-2">
              <span className="text-gray-500 line-through text-sm">₹{item.price?.toFixed(2)}</span>
              <span className="text-teal-800 font-bold text-xl">₹{item.discountedPrice?.toFixed(2)}</span>
            </div>
          ) : (
            <span className="text-teal-800 font-bold text-xl">₹{item.price?.toFixed(2)}</span>
          )}
        </div>
        <button
          className="bg-teal-600 text-white py-2.5 px-5 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm mt-4 font-medium"
          onClick={() => onAddToCart(item)}
        >
          Add to Order
        </button>
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
  const [restaurant, setRestaurant] = useState({
    name: 'Restaurant Menu',
    description: 'Delicious food served fresh',
    logo: '/Quick_menu.png'
  });

 const calculateSubtotal = () => {
  return orderItems.reduce((total, item) => {
    const price = item.discountedPrice && item.discountedPrice < item.price
      ? item.discountedPrice
      : item.price || 0;

    return total + price * (item.quantity || 1);
  }, 0);
};

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/menu/public/${restaurantId}`);
        if (!response.ok) throw new Error('Failed to fetch menu data');

        const data = await response.json();

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
          setMenuData(fallbackMenuData);
          setCategoryKeys(Object.keys(fallbackMenuData));
          setActiveCategory(Object.keys(fallbackMenuData)[0]);
        }

      } catch (error) {
        console.error('Error:', error);
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

  const handleSendOrder = () => {
    if (orderItems.length > 0) {
      console.log('Order:', orderItems);
      setConfirmationMessage('Order sent to the kitchen!');
      setTimeout(() => {
        setOrderItems([]);
        setConfirmationMessage('');
        setIsOrderVisible(false);
      }, 2000);
    } else {
      setConfirmationMessage('Your order is empty. Please add items.');
      setTimeout(() => setConfirmationMessage(''), 1500);
    }
  };

  const toggleOrderVisibility = () => setIsOrderVisible(!isOrderVisible);

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-teal-50 to-green-50 min-h-screen py-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 2000 }} /> {/* ✅ Added Toaster */}

      <div className="bg-gradient-to-br from-teal-50 to-green-50 min-h-screen py-8 sm:py-12 md:py-16">
        <div className="relative container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 z-10">
          <header className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden mr-4 shadow-md bg-white flex items-center justify-center">
                <img src={'/Quick_menu.png'} alt="Logo" className="w-full h-full object-cover" />
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-teal-800">{restaurant.name}</h1>
            </div>
            <button
              className="bg-teal-100 text-teal-800 py-2 px-4 rounded-md hover:bg-teal-200"
              onClick={toggleOrderVisibility}
            >
              Your Order ({orderItems.length})
            </button>
          </header>

          <nav className="mb-8 flex justify-center space-x-4 flex-wrap gap-y-2">
            {categoryKeys.map((category) => (
              <button
                key={category}
                className={`py-2 px-4 rounded-full text-sm font-medium shadow-sm ${activeCategory === category ? 'bg-teal-200 text-teal-800 font-semibold' : 'bg-white text-gray-700'}`}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </nav>

          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {menuData[activeCategory]?.map((item) => (
                <MenuItemCard key={item.id} item={item} onAddToCart={handleAddToCart} />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Sidebar */}
          <motion.aside className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-xl z-30 transform transition-transform duration-300 ${isOrderVisible ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="p-6 flex flex-col h-full">
              <div className="flex justify-between mb-6">
                <h2 className="text-xl font-semibold text-teal-800">Your Order</h2>
                <button onClick={toggleOrderVisibility}>
                  <svg className="w-6 h-6 text-gray-500 hover:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              {orderItems.length === 0 ? (
                <p className="text-gray-600 text-sm">Your order is empty.</p>
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
                  <div className="flex justify-between mt-4 border-t pt-3">
                    <span className="font-semibold text-teal-800">Subtotal:</span>
                    <span className="font-bold text-teal-800">₹{calculateSubtotal().toFixed(2)}</span>
                  </div>
                </>
              )}

              {confirmationMessage && <p className="text-green-600 mt-4">{confirmationMessage}</p>}

              <button
                className="mt-6 bg-teal-700 text-white py-3 rounded-md hover:bg-teal-800"
                onClick={handleSendOrder}
                disabled={orderItems.length === 0}
              >
                Send Order to Restaurant
              </button>
            </div>
          </motion.aside>
        </div>
      </div>
    </>
  );
};

export default DynamicMenu;
