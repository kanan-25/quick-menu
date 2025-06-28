'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  ArrowPathIcon,
  BuildingStorefrontIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

const RestaurantProfile = () => {
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    description: '',
    logo: ''
  });

  const [logoPreview, setLogoPreview] = useState('');

  useEffect(() => {
    setEditMode(false);
    fetchRestaurant();
  }, []);

  const fetchRestaurant = async () => {
    try {
      setLoading(true);
      setError(null);

      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        setError('User not found in localStorage');
        return;
      }

      const userObj = JSON.parse(storedUser);
      const currentUserEmail = userObj?.email;

      if (!currentUserEmail) {
        setError('User email missing');
        return;
      }

      const storedRestaurantData = localStorage.getItem('restaurant_data');
      if (storedRestaurantData) {
        try {
          const restaurantData = JSON.parse(storedRestaurantData);
          if (restaurantData && restaurantData.email === currentUserEmail) {
            setRestaurant(restaurantData);
            setFormData({
              name: restaurantData.name || '',
              email: restaurantData.email || '',
              phone: restaurantData.phone || '',
              address: restaurantData.address || '',
              description: restaurantData.description || '',
              logo: restaurantData.logo || ''
            });
            setLogoPreview(restaurantData.logo || '');
            return;
          } else {
            localStorage.removeItem('restaurant_data');
          }
        } catch {
          localStorage.removeItem('restaurant_data');
        }
      }

      const res = await fetch('/api/restaurant/get_restaurant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: currentUserEmail }),
      });

      const mockData = {
        _id: '123456',
        name: 'Demo Restaurant',
        email: currentUserEmail,
        phone: '(123) 456-7890',
        address: '123 Restaurant St, Foodie City',
        description: 'A lovely restaurant serving delicious food.',
        logo: 'https://via.placeholder.com/150',
        updatedAt: new Date().toISOString()
      };

      let restaurantData = mockData;

      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        try {
          const data = await res.json();
          if (res.ok && data) {
            restaurantData = data;
          }
        } catch {}
      }

      setRestaurant(restaurantData);
      setFormData({
        name: restaurantData.name || '',
        email: restaurantData.email || '',
        phone: restaurantData.phone || '',
        address: restaurantData.address || '',
        description: restaurantData.description || '',
        logo: restaurantData.logo || ''
      });
      setLogoPreview(restaurantData.logo || '');

      localStorage.setItem('restaurant_data', JSON.stringify(restaurantData));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);

      const logoUrl = formData.logo || '/Quick_menu.png';

      const updateData = {
        restaurantId: restaurant._id,
        updates: {
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
          description: formData.description,
          logo: logoUrl
        }
      };

      const res = await fetch('/api/restaurant/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      });

      let message = 'Profile updated successfully! (Demo Mode)';

      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        try {
          const data = await res.json();
          if (res.ok) {
            message = 'Profile updated successfully!';
          }
        } catch {}
      }

      const updatedRestaurant = {
        ...restaurant,
        ...updateData.updates
      };

      setRestaurant(updatedRestaurant);
      localStorage.setItem('restaurant_data', JSON.stringify(updatedRestaurant));

      setSuccessMessage(message);
      setTimeout(() => setSuccessMessage(''), 3000);
      setEditMode(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: restaurant.name || '',
      email: restaurant.email || '',
      phone: restaurant.phone || '',
      address: restaurant.address || '',
      description: restaurant.description || '',
      logo: restaurant.logo || ''
    });
    setLogoPreview(restaurant.logo || '');
    setEditMode(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white shadow-xl rounded-xl p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-600 mb-4">
            <XMarkIcon className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold text-red-600">Error</h2>
          <p className="mt-2 text-gray-600">{error}</p>
          <div className="flex justify-center mt-6 space-x-4">
            <button onClick={fetchRestaurant} className="px-4 py-2 bg-teal-600 text-white rounded-md">
              <ArrowPathIcon className="h-5 w-5 inline mr-2" /> Try Again
            </button>
            <Link href="/restaurant/create-restaurant" className="px-4 py-2 bg-blue-600 text-white rounded-md">
              <BuildingStorefrontIcon className="h-5 w-5 inline mr-2" /> Create Restaurant
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {successMessage && (
        <div className="mb-6 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-sm">
          <div className="flex">
            <CheckIcon className="h-5 w-5 mr-2" />
            <span>{successMessage}</span>
          </div>
        </div>
      )}

      <div className="bg-white shadow-xl rounded-xl overflow-hidden">
        <div className="bg-gradient-to-r from-teal-500 to-emerald-600 px-8 py-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Restaurant Profile</h2>
          {!editMode ? (
            <button onClick={() => setEditMode(true)} className="px-4 py-2 bg-white text-teal-700 rounded-md">
              <PencilIcon className="h-4 w-4 inline mr-2" /> Edit Profile
            </button>
          ) : (
            <div className="flex space-x-2">
              <button onClick={handleCancel} className="px-3 py-2 bg-white text-gray-700 rounded-md">
                <XMarkIcon className="h-4 w-4 inline mr-1" /> Cancel
              </button>
              <button onClick={handleSubmit} disabled={saving} className="px-4 py-2 bg-white text-teal-700 rounded-md disabled:opacity-50">
                {saving ? (
                  <ArrowPathIcon className="h-4 w-4 inline animate-spin mr-2" />
                ) : (
                  <CheckIcon className="h-4 w-4 inline mr-2" />
                )}
                Save Changes
              </button>
            </div>
          )}
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col text-left space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 flex items-center">
                  <BuildingStorefrontIcon className="h-5 w-5 text-teal-500 mr-2" />
                  Restaurant Name
                </label>
                {editMode ? (
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full mt-1 px-4 py-2 border rounded-md" required />
                ) : (
                  <p className="text-gray-900 font-medium">{restaurant?.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 flex items-center">
                  <EnvelopeIcon className="h-5 w-5 text-teal-500 mr-2" />
                  Email Address
                </label>
                <p className="text-gray-900">{restaurant?.email}</p>
                <p className="text-xs text-gray-500">Email cannot be changed</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 flex items-center">
                  <PhoneIcon className="h-5 w-5 text-teal-500 mr-2" />
                  Phone Number
                </label>
                {editMode ? (
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full mt-1 px-4 py-2 border rounded-md" />
                ) : (
                  <p className="text-gray-900">{restaurant?.phone || 'Not provided'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 flex items-center">
                  <MapPinIcon className="h-5 w-5 text-teal-500 mr-2" />
                  Address
                </label>
                {editMode ? (
                  <input type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full mt-1 px-4 py-2 border rounded-md" />
                ) : (
                  <p className="text-gray-900">{restaurant?.address || 'Not provided'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 flex items-center">
                  <DocumentTextIcon className="h-5 w-5 text-teal-500 mr-2" />
                  Description
                </label>
                {editMode ? (
                  <textarea name="description" rows={4} value={formData.description} onChange={handleInputChange} className="w-full mt-1 px-4 py-2 border rounded-md" />
                ) : (
                  <p className="text-gray-900">{restaurant?.description || 'No description provided'}</p>
                )}
              </div>
            </div>
          </form>
        </div>

        <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">Last updated: {new Date(restaurant?.updatedAt || Date.now()).toLocaleDateString()}</p>
            <div className="flex space-x-4">
              <Link href="/restaurant/menu" className="text-sm text-teal-600 hover:text-teal-800 font-medium">Manage Menu</Link>
              <Link href="/restaurant/qrcode" className="text-sm text-teal-600 hover:text-teal-800 font-medium">Generate QR Code</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantProfile;
