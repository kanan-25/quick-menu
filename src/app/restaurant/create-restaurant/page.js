'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

const RestaurantSignupForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await fetch('/api/restaurant/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        alert('Restaurant created successfully!');
        router.push('/restaurant/profile'); // Change this route as per your app
      } else {
        alert(result.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('Server error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-orange-100 flex justify-center items-center p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-xl rounded-xl p-10 max-w-xl w-full space-y-5"
      >
        <h2 className="text-3xl font-bold text-center text-orange-600 mb-4">Create Restaurant</h2>

        <input
          type="text"
          placeholder="Restaurant Name"
          {...register('name', { required: 'Name is required' })}
          className="w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

        <input
          type="email"
          placeholder="Email"
          {...register('email', { required: 'Email is required' })}
          className="w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}


        <input
          type="text"
          placeholder="Phone Number"
          {...register('phone', { required: 'Phone number is required' })}
          className="w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}

        <input
          type="text"
          placeholder="Address"
          {...register('address', { required: 'Address is required' })}
          className="w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}

        <input
          type="text"
          placeholder="Logo URL (optional)"
          {...register('logo')}
          className="w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        <textarea
          placeholder="Description (optional)"
          {...register('description')}
          className="w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded font-bold transition duration-200"
        >
          {isSubmitting ? 'Creating...' : 'Create Restaurant'}
        </button>
      </form>
    </div>
  );
};

export default RestaurantSignupForm;
