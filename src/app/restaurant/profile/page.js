'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  ArrowPathIcon,
  BuildingStorefrontIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  DocumentTextIcon,
  PhotoIcon
} from '@heroicons/react/24/outline';

const RestaurantProfile = () => {
  const searchParams = useSearchParams();
  const isSetupMode = searchParams.get('setup') === 'true';
  
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(isSetupMode); // Auto-enable edit mode for setup
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
    if (isSetupMode) {
      setEditMode(true);
    }
    fetchRestaurant();
  }, [isSetupMode]);

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

      console.log('Fetching restaurant for email:', currentUserEmail);

      // Always fetch fresh data from API
      const res = await fetch('/api/restaurant/get_restaurant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: currentUserEmail }),
      });

      console.log('API Response status:', res.status);

      if (!res.ok) {
        const errorText = await res.text();
        console.error('API Error Response:', errorText);
        throw new Error(`API returned ${res.status}: ${errorText}`);
      }

      const restaurantData = await res.json();
      console.log('Restaurant data received:', restaurantData);

      if (!restaurantData || !restaurantData._id) {
        throw new Error('Invalid restaurant data received');
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

      // Update localStorage with fresh data
      localStorage.setItem('restaurant_data', JSON.stringify(restaurantData));

    } catch (err) {
      console.error('Error fetching restaurant:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        setFormData(prev => ({ ...prev, logo: imageUrl }));
        setLogoPreview(imageUrl);
      };
      reader.readAsDataURL(file);
    }
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

      let message = 'Profile updated successfully!';

      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        try {
          const data = await res.json();
          if (res.ok) {
            message = isSetupMode ? 'Restaurant profile setup completed!' : 'Profile updated successfully!';
          }
        } catch {}
      }

      const updatedRestaurant = {
        ...restaurant,
        ...updateData.updates
      };

      setRestaurant(updatedRestaurant);
      localStorage.setItem('restaurant_data', JSON.stringify(updatedRestaurant));

      // Trigger layout refresh
      window.dispatchEvent(new Event('restaurantDataUpdated'));

      setSuccessMessage(message);
      setTimeout(() => setSuccessMessage(''), 3000);
      setEditMode(false);

      // If in setup mode, redirect to dashboard after successful save
      if (isSetupMode) {
        setTimeout(() => {
          window.location.href = '/restaurant';
        }, 2000);
      }
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
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500 mx-auto"></div>
          <p className="mt-4 text-gray-900 font-medium">Loading restaurant profile...</p>
        </div>
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
          <p className="mt-2 text-gray-700">{error}</p>
          <div className="flex justify-center mt-6 space-x-4">
            <button onClick={fetchRestaurant} className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 font-medium">
              <ArrowPathIcon className="h-5 w-5 inline mr-2" /> Try Again
            </button>
            <Link href="/restaurant/create-restaurant" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium">
              <BuildingStorefrontIcon className="h-5 w-5 inline mr-2" /> Create Restaurant
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {isSetupMode && (
        <div className="mb-6 bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded">
          <div className="flex">
            <BuildingStorefrontIcon className="h-5 w-5 mr-2" />
            <div>
              <h4 className="font-medium">Complete Your Restaurant Profile</h4>
              <p className="text-sm">Please fill in your restaurant details to get started.</p>
            </div>
          </div>
        </div>
      )}

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
          <h2 className="text-2xl font-bold text-white">
            {isSetupMode ? 'Setup Your Restaurant Profile' : 'Restaurant Profile'}
          </h2>
          {!editMode ? (
            <button onClick={() => setEditMode(true)} className="px-4 py-2 bg-teal-700 text-white rounded-md hover:bg-teal-900 font-medium">
              <PencilIcon className="h-4 w-4 inline mr-2" /> Edit Profile
            </button>
          ) : (
            <div className="flex space-x-2">
              {!isSetupMode && (
                <button onClick={handleCancel} className="px-3 py-2  text-white rounded-md hover: font-medium">
                  <XMarkIcon className="h-4 w-4 inline mr-1" /> Cancel
                </button>
              )}
              <button onClick={handleSubmit} disabled={saving} className="px-4 py-2 bg-teal-600 text-white rounded-md disabled:opacity-50 hover:bg-teal-700 font-medium">
                {saving ? (
                  <ArrowPathIcon className="h-4 w-4 inline animate-spin mr-2" />
                ) : (
                  <CheckIcon className="h-4 w-4 inline mr-2" />
                )}
                {isSetupMode ? 'Complete Setup' : 'Save Changes'}
              </button>
            </div>
          )}
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Logo Upload Section */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-900 flex items-center mb-3">
                <PhotoIcon className="h-5 w-5 text-teal-500 mr-2" />
                Restaurant Logo
              </label>
              {editMode ? (
                <div className="flex items-center space-x-6">
                  <div className="flex-shrink-0">
                    <img
                      src={logoPreview || '/Quick_menu.png'}
                      alt="Logo preview"
                      className="h-20 w-20 rounded-lg object-cover border-2 border-gray-300"
                      onError={(e) => {
                        e.target.src = '/Quick_menu.png';
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoChange}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                    />
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <img
                    src={restaurant?.logo || '/Quick_menu.png'}
                    alt="Restaurant Logo"
                    className="h-20 w-20 rounded-lg object-cover border-2 border-gray-300"
                    onError={(e) => {
                      e.target.src = '/Quick_menu.png';
                    }}
                  />
                  <div>
                    <p className="text-sm text-gray-600">Current logo</p>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 flex items-center mb-3">
                  <BuildingStorefrontIcon className="h-5 w-5 text-teal-500 mr-2" />
                  Restaurant Name
                </label>
                {editMode ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-gray-900"
                    placeholder="Enter restaurant name"
                  />
                ) : (
                  <p className="text-gray-900 font-medium text-lg">{restaurant?.name || 'Not provided'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 flex items-center mb-3">
                  <EnvelopeIcon className="h-5 w-5 text-teal-500 mr-2" />
                  Email Address
                </label>
                <p className="text-gray-700 bg-gray-50 px-4 py-3 rounded-lg">{restaurant?.email}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 flex items-center mb-3">
                  <PhoneIcon className="h-5 w-5 text-teal-500 mr-2" />
                  Phone Number
                </label>
                {editMode ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-gray-900"
                    placeholder="Enter phone number"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{restaurant?.phone || 'Not provided'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 flex items-center mb-3">
                  <MapPinIcon className="h-5 w-5 text-teal-500 mr-2" />
                  Address
                </label>
                {editMode ? (
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-gray-900"
                    placeholder="Enter restaurant address"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{restaurant?.address || 'Not provided'}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-900 flex items-center mb-3">
                  <DocumentTextIcon className="h-5 w-5 text-teal-500 mr-2" />
                  Description
                </label>
                {editMode ? (
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-gray-900"
                    placeholder="Describe your restaurant"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{restaurant?.description || 'Not provided'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 flex items-center mb-3">
                  <svg className="h-5 w-5 text-teal-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Restaurant Logo
                </label>
                {editMode ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-4">
                      <div className="w-20 h-20 rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-50 flex items-center justify-center">
                        <img 
                          src={logoPreview || '/Quick_menu.png'} 
                          alt="Logo Preview" 
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.target.src = '/Quick_menu.png';
                          }}
                        />
                      </div>
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoChange}
                          className="hidden"
                          id="logo-upload"
                        />
                        <label
                          htmlFor="logo-upload"
                          className="cursor-pointer bg-teal-50 text-teal-700 px-4 py-2 rounded-lg border border-teal-200 hover:bg-teal-100 transition-colors"
                        >
                          Choose Image
                        </label>
                        <p className="text-xs text-gray-500 mt-1">Max 5MB, JPG/PNG</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-50 flex items-center justify-center">
                      <img 
                        src={restaurant?.logo || '/Quick_menu.png'} 
                        alt="Restaurant Logo" 
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.target.src = '/Quick_menu.png';
                        }}
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Current logo</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>

        <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">Last updated: {new Date(restaurant?.updatedAt || Date.now()).toLocaleDateString()}</p>
            {!isSetupMode && (
              <div className="flex space-x-4">
                <Link href="/restaurant/menu" className="text-sm text-teal-600 hover:text-teal-800 font-medium">Manage Menu</Link>
                <Link href="/restaurant/qrcode" className="text-sm text-teal-600 hover:text-teal-800 font-medium">Generate QR Code</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantProfile;
