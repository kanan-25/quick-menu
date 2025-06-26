"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import MenuManager from "@/components/menu/MenuManager";

export default function RestaurantMenuPage() {
  const [loading, setLoading] = useState(true);
  const [restaurant, setRestaurant] = useState(null);
  const [error, setError] = useState(null);

  // Fetch restaurant data
  const fetchRestaurant = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('Fetching restaurant data for menu page');

      // First try to get from restaurant_data (preferred source)
      const storedRestaurantData = localStorage.getItem('restaurant_data');
      if (storedRestaurantData) {
        try {
          const restaurantData = JSON.parse(storedRestaurantData);
          if (restaurantData._id && restaurantData.name) {
            console.log('Using restaurant data from localStorage:', {
              name: restaurantData.name,
              logo: restaurantData.logo ? (restaurantData.logo.substring(0, 50) + '...') : 'none'
            });

            // Ensure logo is properly set and is an absolute URL
            if (!restaurantData.logo || restaurantData.logo === '' || !restaurantData.logo.startsWith('http')) {
              console.log('Logo is missing or not an absolute URL in localStorage data, setting default');
              restaurantData.logo = 'https://via.placeholder.com/150';

              // Update localStorage with the fixed data
              localStorage.setItem('restaurant_data', JSON.stringify(restaurantData));
            }

            console.log('Using restaurant logo URL:', restaurantData.logo);

            // Initialize menu for this restaurant (non-blocking)
            try {
              console.log('Pre-initializing menu for restaurant ID:', restaurantData._id);
              fetch(`/api/menu/initialize`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ restaurantId: restaurantData._id }),
              }).then(res => {
                console.log('Menu initialization response status:', res.status);
              }).catch(err => {
                console.warn('Non-critical menu initialization error:', err);
              });
            } catch (menuError) {
              console.warn('Error pre-initializing menu (non-critical):', menuError);
            }

            setRestaurant(restaurantData);
            setLoading(false);
            return;
          }
        } catch (parseError) {
          console.warn('Error parsing stored restaurant data:', parseError);
          // Continue with API fetch if localStorage data is invalid
        }
      }

      // Fallback to API fetch using user email
      const storedUser = localStorage.getItem("user");
      let email = "demo@example.com"; // Default email for demo

      if (storedUser) {
        try {
          const userObj = JSON.parse(storedUser);
          if (userObj?.email) {
            email = userObj.email;
          }
        } catch (parseError) {
          console.warn("Error parsing user data:", parseError);
          // Continue with default email
        }
      } else {
        console.warn("User not found in localStorage, using demo email");
      }

      console.log('Fetching restaurant data from API for email:', email);
      const res = await fetch("/api/restaurant/get_restaurant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      console.log('API response for restaurant data:', data);

      if (res.ok) {
        // Ensure the restaurant has an _id
        if (!data._id && data.id) {
          data._id = data.id;
        }

        // Ensure logo is properly set and is an absolute URL in API response
        if (!data.logo || data.logo === '' || !data.logo.startsWith('http')) {
          console.log('Logo is missing or not an absolute URL in API response, setting default');
          data.logo = 'https://via.placeholder.com/150';
        }

        console.log('Using API response logo URL:', data.logo);

        // Save to localStorage for future use
        localStorage.setItem('restaurant_data', JSON.stringify(data));

        // Initialize menu for this restaurant (non-blocking)
        if (data._id) {
          try {
            console.log('Pre-initializing menu for restaurant ID:', data._id);
            fetch(`/api/menu/initialize`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ restaurantId: data._id }),
            }).then(res => {
              console.log('Menu initialization response status:', res.status);
            }).catch(err => {
              console.warn('Non-critical menu initialization error:', err);
            });
          } catch (menuError) {
            console.warn('Error pre-initializing menu (non-critical):', menuError);
          }
        }

        setRestaurant(data);
      } else {
        throw new Error(data.message || "Failed to fetch restaurant");
      }
    } catch (err) {
      console.error("Error in fetchRestaurant:", err);
      setError(err.message);

      // Create a default restaurant as fallback
      const defaultRestaurant = {
        _id: '123456789',
        name: 'Demo Restaurant',
        email: 'demo@example.com',
        description: 'A demo restaurant',
        logo: 'https://via.placeholder.com/150'
      };

      setRestaurant(defaultRestaurant);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurant();
  }, []);

  return (
    <>
      <Head>
        <title>Menu Management</title>
      </Head>
      <main className="min-h-screen bg-gray-50 p-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Manage Your Menu</h1>

        {loading ? (
          <div className="text-center py-4">
            <p className="text-gray-600">Loading restaurant data...</p>
          </div>
        ) : (
          <>
            {error && (
              <div className="max-w-2xl mx-auto bg-red-50 p-4 rounded-lg border border-red-200 mb-6">
                <p className="text-red-600">{error}</p>
                <button
                  onClick={() => { setError(null); fetchRestaurant(); }}
                  className="mt-2 bg-red-100 hover:bg-red-200 text-red-800 py-1 px-3 rounded text-sm"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Always render MenuManager with a restaurantId (default or real) */}
            <MenuManager restaurantId={restaurant?._id || '123456789'} />
          </>
        )}
      </main>
    </>
  );
}
