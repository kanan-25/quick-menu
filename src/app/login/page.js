'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Check for success message from signup
    const message = searchParams.get('message');
    if (message) {
      setSuccessMessage(message);
      // Clear the message after 5 seconds
      setTimeout(() => setSuccessMessage(''), 5000);
    }
  }, [searchParams]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    setLoginError('');

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

        // Fetch restaurant data immediately after login
        try {
          const restaurantResponse = await fetch('/api/restaurant/get_restaurant', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: result.user.email })
          });

          if (restaurantResponse.ok) {
            const restaurantData = await restaurantResponse.json();
            console.log('Restaurant data fetched after login:', restaurantData);
            localStorage.setItem('restaurant_data', JSON.stringify(restaurantData));
            
            // Check if restaurant profile is complete
            const isProfileComplete = restaurantData.phone && 
                                    restaurantData.address && 
                                    restaurantData.description &&
                                    restaurantData.phone !== '' &&
                                    restaurantData.address !== '' &&
                                    restaurantData.description !== '';
            
            if (!isProfileComplete) {
              // Redirect to profile to complete setup
              router.push('/restaurant/profile?setup=true');
            } else {
              // Redirect to restaurant dashboard
              router.push('/restaurant');
            }
          } else {
            // Fallback to profile setup
            router.push('/restaurant/profile?setup=true');
          }
        } catch (error) {
          console.error('Error fetching restaurant data after login:', error);
          router.push('/restaurant/profile?setup=true');
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
      <div className="bg-gradient-to-br from-teal-50 to-green-50 flex-grow py-16 flex items-center justify-center">
        <motion.div
          className="bg-white shadow-xl rounded-xl p-10 w-full max-w-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "backOut" }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900">Welcome Back</h2>
            <p className="mt-2 text-sm text-gray-700">Sign in to manage your restaurant</p>
          </div>

          {successMessage && (
            <div className="mb-6 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded">
              <p className="text-sm">{successMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-gray-900 text-sm font-bold mb-2">Email:</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="shadow-sm border border-gray-300 rounded w-full py-3 px-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-red-600 text-sm mt-1">Email is required</p>}
            </div>

            <div>
              <label className="block text-gray-900 text-sm font-bold mb-2">Password:</label>
              <input
                type="password"
                {...register("password", { required: true })}
                className="shadow-sm border border-gray-300 rounded w-full py-3 px-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="Enter your password"
              />
              {errors.password && <p className="text-red-600 text-sm mt-1">Password is required</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {loginError && (
            <div className="mt-6 text-center">
              <p className="text-red-600 font-semibold">{loginError}</p>
            </div>
          )}

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link href="/signup" className="text-teal-600 hover:text-teal-800 font-medium">
                Sign up here
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginForm;
