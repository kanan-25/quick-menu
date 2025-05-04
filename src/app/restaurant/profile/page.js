'use client';

import React, { useEffect, useState } from 'react';

const RestaurantProfile = () => {
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
          setError('User not found in localStorage');
          return;
        }

        const userObj = JSON.parse(storedUser);
        const email = userObj?.email;

        if (!email) {
          setError('User email missing');
          return;
        }

        const res = await fetch('/api/restaurant/get_restaurant', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        const data = await res.json();

        if (res.ok) {
          setRestaurant(data);
        } else {
          throw new Error(data.message || 'Failed to fetch restaurant');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, []);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-20">{error}</div>;

  return (
    <div className="bg-gradient-to-br from-teal-100 to-green-100 min-h-screen py-16 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-xl p-10 w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-teal-700 tracking-tight">Restaurant Profile</h2>
          <p className="mt-2 text-sm text-gray-600">View your restaurant details below.</p>
        </div>

        <div className="space-y-4">
          <ProfileItem label="Restaurant Name" value={restaurant?.name} />
          <ProfileItem label="Email" value={restaurant?.email} />
          <ProfileItem label="Phone" value={restaurant?.phone} />
          <ProfileItem label="Address" value={restaurant?.address} />
          <ProfileItem label="Description" value={restaurant?.description || 'N/A'} />
          {restaurant?.logo && (
            <div>
              <label className="block text-teal-800 text-sm font-bold mb-2">Logo:</label>
              <img src={restaurant.logo} alt="Restaurant Logo" className="w-32 h-32 object-cover rounded" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ProfileItem = ({ label, value }) => (
  <div>
    <label className="block text-teal-800 text-sm font-bold mb-2">{label}:</label>
    <p className="text-gray-700">{value }</p>
  </div>
);

export default RestaurantProfile;
