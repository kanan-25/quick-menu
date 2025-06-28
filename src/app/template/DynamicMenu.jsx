"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';

// This will be replaced with data from the API
const fallbackMenuData = {
  starters: [
    {
      id: 1,
      name: "Tomato Basil Bruschetta",
      description: "Toasted baguette, fresh tomatoes, basil, garlic, balsamic glaze.",
      price: 9.5,
      salePrice: 7.5,
      isVegetarian: true,
      image: 'https://via.placeholder.com/150'
    },
    {
      id: 2,
      name: "Crispy Calamari",
      description: "Lightly battered and fried calamari, served with a spicy marinara.",
      price: 14.75,
      image: 'https://via.placeholder.com/150'
    },
    {
      id: 3,
      name: "Spinach & Artichoke Dip",
      description: "Creamy spinach and artichoke dip, served warm with toasted pita chips.",
      price: 12.00,
      salePrice: 9.99,
      isVegetarian: true,
      image: 'https://via.placeholder.com/150'
    }
  ],
  mainCourse: [
    {
      id: 4,
      name: "Pan-Seared Salmon",
      description: "Atlantic salmon with roasted asparagus, lemon-dill sauce, and quinoa.",
      price: 26.99,
      image: 'https://via.placeholder.com/150'
    },
    {
      id: 5,
      name: "Mushroom Risotto",
      description: "Creamy Arborio rice with wild mushrooms, Parmesan, and truffle oil.",
      price: 22.5,
      salePrice: 19.99,
      isVegetarian: true,
      image: 'https://via.placeholder.com/150'
    },
    {
      id: 6,
      name: "Grilled New York Strip",
      description: "10oz strip steak, garlic mashed potatoes, seasonal vegetables.",
      price: 32.00,
      image: 'https://via.placeholder.com/150'
    }
  ],
  desserts: [
    {
      id: 7,
      name: "Decadent Chocolate Tart",
      description: "Rich dark chocolate tart with sea salt, raspberry coulis.",
      price: 11.5,
      salePrice: 9.99,
      image: 'https://via.placeholder.com/150'
    },
    {
      id: 8,
      name: "Pistachio Crème brûlée",
      description: "Custard infused with pistachio, caramelized sugar crust.",
      price: 10.25,
      isVegetarian: true,
      image: 'https://via.placeholder.com/150'
    },
    {
      id: 9,
      name: "Fresh Berry Pavlova",
      description: "Crispy meringue shell, whipped cream, seasonal berries.",
      price: 12.75,
      salePrice: 10.5,
      image: 'https://via.placeholder.com/150'
    }
  ],
  beverages: [
    {
      id: 10,
      name: "Sparkling Elderflower Refresher",
      price: 5.5,
      isVegetarian: true,
      image: 'https://via.placeholder.com/150'
    },
    {
      id: 11,
      name: "Artisanal Cold Brew",
      price: 6.0,
      salePrice: 4.5,
      image: 'https://via.placeholder.com/150'
    },
    {
      id: 12,
      name: "House-Made Lemonade",
      price: 4.75,
      isVegetarian: true,
      image: 'https://via.placeholder.com/150'
    }
  ]
};

const MenuItemCard = ({ item, onAddToCart }) => {
  const renderIcons = (item) => {
    const badges = [];

    if (item.isVegetarian) {
      badges.push(
        <span key="veg" className="bg-green-50 text-green-700 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-green-200 flex items-center gap-1">
          <span>🌿</span> Veg
        </span>
      );
    }

    if (item.isVegan) {
      badges.push(
        <span key="vegan" className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
          <span>🌱</span> Vegan
        </span>
      );
    }

    if (item.isGlutenFree) {
      badges.push(
        <span key="gf" className="bg-yellow-50 text-yellow-700 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-yellow-200 flex items-center gap-1">
          <span>🌾</span> Gluten-Free
        </span>
      );
    }

    if (item.isPopular) {
      badges.push(
        <span key="popular" className="bg-red-50 text-red-700 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-red-200 flex items-center gap-1">
          <span>🔥</span> Popular
        </span>
      );
    }

    return badges.length > 0 ? (
      <div className="flex flex-wrap gap-2 mt-2">{badges}</div>
    ) : null;
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
      <h3 className="text-lg font-semibold text-gray-900 mb-1 tracking-tight">
        {item.name}
      </h3>

      {/* 👇 Icons just below the name */}
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
  const restaurantId = searchParams.get('id') || '123456789'; // Default ID if none provided

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
    logo: '/Quick_menu.png' // Use local image file
  });

  //subtotal
const calculateSubtotal = () => {
  return orderItems.reduce((total, item) => {
    const effectivePrice =
      item.discountedPrice && item.discountedPrice < item.price
        ? item.discountedPrice
        : item.price || 0;
    return total + effectivePrice;
  }, 0);
};
  // Fetch menu data from API
  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        setLoading(true);

        if (!restaurantId) {
          // If no restaurant ID is provided, use fallback data
          const formattedData = {};
          Object.keys(fallbackMenuData).forEach(category => {
            formattedData[category] = fallbackMenuData[category];
          });

          setMenuData(formattedData);
          setCategoryKeys(Object.keys(formattedData));
          setActiveCategory(Object.keys(formattedData)[0]);
          setLoading(false);
          return;
        }

        const response = await fetch(`/api/menu/public/${restaurantId}`);

        if (!response.ok) {
          throw new Error('Failed to fetch menu data');
        }

        const data = await response.json();

        // Format the data for our template
        const formattedData = {};

        if (data.restaurant) {
          console.log('Restaurant data from API:', data.restaurant);
          setRestaurant(data.restaurant);
        }

        if (data.categories && data.categories.length > 0) {
          data.categories.forEach(category => {
            formattedData[category.name.toLowerCase()] = category.items;
          });

          setCategoryKeys(Object.keys(formattedData));
          setActiveCategory(Object.keys(formattedData)[0]);
          setMenuData(formattedData);
        } else {
          // If no categories are found, use fallback data
          const formattedData = {};
          Object.keys(fallbackMenuData).forEach(category => {
            formattedData[category] = fallbackMenuData[category];
          });

          setMenuData(formattedData);
          setCategoryKeys(Object.keys(formattedData));
          setActiveCategory(Object.keys(formattedData)[0]);
        }
      } catch (error) {
        console.error('Error fetching menu data:', error);
        setError(error.message);

        // Use fallback data on error
        const formattedData = {};
        Object.keys(fallbackMenuData).forEach(category => {
          formattedData[category] = fallbackMenuData[category];
        });

        setMenuData(formattedData);
        setCategoryKeys(Object.keys(formattedData));
        setActiveCategory(Object.keys(formattedData)[0]);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuData();
  }, [restaurantId]);



  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const handleAddToCart = (item) => {
    // Create a unique order ID by combining the item ID with a timestamp
    const orderItem = {
      ...item,
      quantity: 1,
      orderId: `${item.id}_${Date.now()}` // Add a unique order ID
    };
    setOrderItems([...orderItems, orderItem]);
  };

  const handleRemoveFromOrder = (itemId) => {
    // Check if itemId is an orderId or a regular id
    const isOrderId = typeof itemId === 'string' && itemId.includes('_');

    const updatedOrder = orderItems.filter((item) => {
      if (isOrderId) {
        return item.orderId !== itemId;
      } else {
        return item.id !== itemId;
      }
    });

    setOrderItems(updatedOrder);
  };

  const handleSendOrder = () => {
    if (orderItems.length > 0) {
      console.log('Sending order to restaurant:', orderItems);
      setConfirmationMessage('Order sent to the kitchen!');
      setTimeout(() => {
        setOrderItems([]);
        setConfirmationMessage('');
        setIsOrderVisible(false);
      }, 2000);
    } else {
      setConfirmationMessage('Your order is empty. Please add items.');
      setTimeout(() => {
        setConfirmationMessage('');
      }, 1500);
    }
  };

  const toggleOrderVisibility = () => {
    setIsOrderVisible(!isOrderVisible);
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-teal-50 to-green-50 min-h-screen py-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (error) {
    // Use fallback data instead of showing error
    const formattedData = {};
    Object.keys(fallbackMenuData).forEach(category => {
      formattedData[category] = fallbackMenuData[category];
    });

    if (!menuData || Object.keys(menuData).length === 0) {
      setMenuData(formattedData);
      setCategoryKeys(Object.keys(formattedData));
      setActiveCategory(Object.keys(formattedData)[0]);
      setError(null); // Clear the error

      // Set a default restaurant with logo
      if (!restaurant || !restaurant.name) {
        setRestaurant({
          name: 'Demo Restaurant',
          description: 'A delightful dining experience',
          logo: '/Quick_menu.png' // Use local image file
        });
      }

      // Return loading state while we set up the fallback data
      return (
        <div className="bg-gradient-to-br from-teal-50 to-green-50 min-h-screen py-16 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
        </div>
      );
    }
    // If we already have menu data, just show a small error notification instead of full screen error
    console.error('Error occurred but using available menu data:', error);
  }

  // Debug restaurant data before rendering
  console.log('Restaurant data before rendering:', {
    name: restaurant.name,
    logo: restaurant.logo ? (typeof restaurant.logo === 'string' ? restaurant.logo.substring(0, 50) + '...' : 'non-string value') : 'none'
  });

  return (
    <div className="bg-gradient-to-br from-teal-50 to-green-50 min-h-screen py-8 sm:py-12 md:py-16">
      <div className="relative container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 z-10">
        {/* Restaurant Header */}
        <header className="flex justify-between items-center mb-8 sm:mb-10 lg:mb-12">
          <div className="flex items-center">
            {/* Logo container without initial letter overlay */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 relative rounded-full overflow-hidden mr-3 sm:mr-4 shadow-md bg-white flex items-center justify-center">
              {/* Use a local image file from the public directory */}
              <img
                src={'/Quick_menu.png'}
                alt={`${restaurant.name} Logo`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.log('Falling back to placeholder image');
                  e.target.onerror = null; // Prevent infinite loop
                  e.target.src = 'https://via.placeholder.com/150'; // Fallback to placeholder
                }}
              />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-teal-800 tracking-tight">{restaurant.name}</h1>
          </div>
          <button
            className="bg-teal-100 text-teal-800 py-2 sm:py-2.5 px-4 sm:px-5 rounded-md shadow-sm hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-400 font-medium text-sm sm:text-base"
            onClick={toggleOrderVisibility}
          >
            Your Order ({orderItems.length})
          </button>
        </header>

        {/* Category Navigation */}
        <nav className="mb-8 sm:mb-10 flex justify-center space-x-3 sm:space-x-4 md:space-x-6 flex-wrap gap-y-2">
          {categoryKeys.map((category) => (
            <button
              key={category}
              className={`py-2 px-4 sm:py-2.5 sm:px-5 rounded-full text-gray-700 hover:text-teal-800 focus:outline-none transition duration-200 shadow-sm font-medium text-sm sm:text-base ${activeCategory === category ? 'bg-teal-200 text-teal-800 font-semibold' : 'bg-white shadow-sm'
                }`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </nav>

        {/* Menu Items Grid */}
        <motion.div
          key={activeCategory}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delayChildren: 0.1, staggerChildren: 0.07 }}
        >
          <AnimatePresence>
            {menuData[activeCategory]?.map((item, index) => (
              <MenuItemCard key={item.id} item={item} onAddToCart={handleAddToCart} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Order Sidebar */}
        <motion.aside
          className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-xl z-30 transform transition-transform duration-300 ${isOrderVisible ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
          <div className="p-6 sm:p-8 flex flex-col h-full">
            <div className="flex justify-between items-center mb-6 sm:mb-8">
              <h2 className="text-xl font-semibold text-teal-800 tracking-tight">Your Order</h2>
              <button onClick={toggleOrderVisibility} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {orderItems.length === 0 ? (
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">Your order is currently empty. Browse the menu and add some delightful dishes!</p>
            ) : (
              <>
                <ul className="space-y-4 sm:space-y-6 mb-4 overflow-y-auto flex-grow">
                  {orderItems.map((item) => (
                    <li key={item.orderId || `${item.id}_${Math.random()}`} className="flex items-center justify-between py-2 border-b border-gray-200">
                      <div>
                        <h4 className="font-semibold text-gray-800 tracking-tight text-base sm:text-lg">{item.name}</h4>
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
                        className="text-red-500 hover:text-red-700 focus:outline-none"
                        onClick={() => handleRemoveFromOrder(item.orderId || item.id)}
                      >
                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
                {/* Subtotal Display */}
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-300">
                  <p className="text-lg font-semibold text-teal-800">Subtotal:</p>
                  <p className="text-lg font-bold text-teal-800">₹{calculateSubtotal().toFixed(2)}</p>
                </div>
              </>
            )}

            {confirmationMessage && <p className="text-green-600 mb-6 text-sm sm:text-base">{confirmationMessage}</p>}

            <button
              className="w-full bg-teal-700 text-white py-3 rounded-md hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500 font-semibold mt-4 text-base sm:text-lg"
              onClick={handleSendOrder}
              disabled={orderItems.length === 0}
            >
              Send Order to Restaurant
            </button>
          </div>
        </motion.aside>
      </div>
    </div>
  );
};

export default DynamicMenu;