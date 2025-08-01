"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { ButtonLoader } from '@/components/Loader';

const RestaurantLoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data) => {
    setLoginError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        // Save user and token to localStorage
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('token', result.token);

        // Check if user has a restaurant profile
        try {
          const profileResponse = await fetch('/api/restaurant/profile', {
            headers: {
              'Authorization': `Bearer ${result.token}`,
              'Content-Type': 'application/json'
            }
          });

          const profileData = await profileResponse.json();

          if (profileData.hasRestaurant) {
            // User has restaurant - redirect to dashboard
            router.push('/restaurant');
          } else {
            // New user - redirect to profile creation
            router.push('/restaurant/profile');
          }
        } catch (error) {
          console.error('Error checking profile:', error);
          // Fallback to profile page
          router.push('/restaurant/profile');
        }
      } else {
        setLoginError(result.message || 'Login failed');
      }
    } catch (error) {
      setLoginError('An error occurred while logging in.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="bg-gradient-to-br from-teal-100 to-green-100 flex-grow py-16 flex items-center justify-center">
        <motion.div
          className="bg-white shadow-xl rounded-xl p-10 w-full max-w-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: 'backOut' }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-teal-700 tracking-tight">Restaurant Login</h2>
            <p className="mt-2 text-sm text-gray-600">Welcome back to our platform!</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-teal-800 text-sm font-bold mb-2">
                Email Address:
              </label>
              <input
                {...register('email', { required: 'Email is required' })}
                type="email"
                id="email"
                className="shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-teal-800 text-sm font-bold mb-2">
                Password:
              </label>
              <input
                {...register('password', { required: 'Password is required' })}
                type="password"
                id="password"
                className="shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-400 shadow-md w-full transition-colors ${
                isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-teal-500 hover:bg-teal-700'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <ButtonLoader size="sm" color="white" />
                  Logging In...
                </div>
              ) : (
                'Log In'
              )}
            </button>
          </form>

          {loginError && <p className="text-red-500 mt-6 text-center font-semibold">{loginError}</p>}

          <div className="mt-4 text-center">
            <Link href="/signup" className="text-sm text-teal-600 hover:text-teal-800 font-medium">
              Don't have an account? Sign up here.
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RestaurantLoginForm;
