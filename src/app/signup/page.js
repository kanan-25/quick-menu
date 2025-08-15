"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';
import Navbar from "@/components/Navbar";
import { ButtonLoader } from '@/components/Loader';
import Link from 'next/link';

const RestaurantSignupForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [captchaText, setCaptchaText] = useState("CAPTCHA");
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [submissionError, setSubmissionError] = useState("");
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      generateCaptcha();
    }
  }, [isClient]);

  const generateCaptcha = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(result);
  };

  const onSubmit = async (data) => {
    setSubmissionMessage("");
    setSubmissionError("");
    setIsLoading(true);

    if (data.captcha !== captchaText) {
      setSubmissionError("❌ CAPTCHA verification failed.");
      setIsLoading(false);
      generateCaptcha();
      return;
    }

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.restaurantName,
          email: data.email,
          password: data.password,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        setSubmissionMessage("🎉 Account created successfully! Redirecting to login...");
        setSignupSuccess(true);
        
        // Clear form
        reset();
        
        // Redirect to login page after 2 seconds
        setTimeout(() => {
          router.push('/login?message=Account created successfully! Please login to continue.');
        }, 2000);
      } else {
        setSubmissionError(result.message || "Something went wrong.");
        generateCaptcha(); // Refresh captcha on error
      }
    } catch (error) {
      setSubmissionError("⚠️ Server error. Please try again.");
      console.error(error);
      generateCaptcha(); // Refresh captcha on error
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
            <h2 className="text-3xl font-extrabold text-gray-900">Join Our Culinary Platform</h2>
            <p className="mt-2 text-sm text-gray-700">Sign up your restaurant to showcase your menu!</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-gray-900 text-sm font-bold mb-2">Restaurant Name:</label>
              <input
                type="text"
                {...register("restaurantName", { required: true })}
                className="shadow-sm border border-gray-300 rounded w-full py-3 px-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
              {errors.restaurantName && <p className="text-red-600 text-sm mt-1">Restaurant name is required</p>}
            </div>

            <div>
              <label className="block text-gray-900 text-sm font-bold mb-2">Email:</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="shadow-sm border border-gray-300 rounded w-full py-3 px-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
              {errors.email && <p className="text-red-600 text-sm mt-1">Email is required</p>}
            </div>

            <div>
              <label className="block text-gray-900 text-sm font-bold mb-2">Password:</label>
              <input
                type="password"
                {...register("password", { required: true, minLength: 6 })}
                className="shadow-sm border border-gray-300 rounded w-full py-3 px-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
              {errors.password && <p className="text-red-600 text-sm mt-1">Password must be at least 6 characters</p>}
            </div>

            <div>
              <label className="block text-gray-900 text-sm font-bold mb-2">CAPTCHA:</label>
              <div className="flex items-center space-x-3">
                <div className="bg-gray-200 px-4 py-2 rounded border text-lg font-mono tracking-wider text-gray-900">
                  {captchaText}
                </div>
                <button
                  type="button"
                  onClick={generateCaptcha}
                  className="text-teal-700 hover:text-teal-900 text-sm underline font-medium"
                >
                  Refresh
                </button>
              </div>
              <input
                type="text"
                {...register("captcha", { required: true })}
                placeholder="Enter CAPTCHA"
                className="shadow-sm border border-gray-300 rounded w-full py-3 px-4 mt-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
              {errors.captcha && <p className="text-red-600 text-sm mt-1">CAPTCHA is required</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? <ButtonLoader /> : "Create Account"}
            </button>
          </form>

          {submissionError && (
            <div className="mt-6 text-center">
              <p className="text-red-600 font-semibold">{submissionError}</p>
            </div>
          )}

          {submissionMessage && (
            <div className="mt-6 text-center">
              <p className="text-green-600 font-semibold">{submissionMessage}</p>
            </div>
          )}

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="text-teal-600 hover:text-teal-800 font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RestaurantSignupForm;
