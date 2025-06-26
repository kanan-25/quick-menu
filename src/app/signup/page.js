"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

const RestaurantSignupForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Use a static initial value for SSR to avoid hydration mismatch
  const [captchaText, setCaptchaText] = useState("CAPTCHA");
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [submissionError, setSubmissionError] = useState("");
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true when component mounts (client-side only)
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Generate a new captcha only after hydration is complete
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

    if (data.captcha !== captchaText) {
      setSubmissionError("❌ CAPTCHA verification failed.");
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
        setSubmissionMessage("🎉 Account created successfully!");
        setSignupSuccess(true);
        reset(); // Reset the form
        generateCaptcha();
      } else {
        setSubmissionError(result.message || "Something went wrong.");
      }
    } catch (error) {
      setSubmissionError("⚠️ Server error. Please try again.");
      console.error(error);
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
        transition={{ duration: 0.4, ease: "backOut" }}
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-teal-700">Join Our Culinary Platform</h2>
          <p className="mt-2 text-sm text-gray-600">Sign up your restaurant to showcase your menu!</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-teal-800 text-sm font-bold mb-2">Restaurant Name:</label>
            <input
              type="text"
              {...register("restaurantName", { required: true })}
              className="shadow-sm border rounded w-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            {errors.restaurantName && <p className="text-red-500 text-sm mt-1">Restaurant name is required</p>}
          </div>

          <div>
            <label className="block text-teal-800 text-sm font-bold mb-2">Email Address:</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="shadow-sm border rounded w-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">Email is required</p>}
          </div>

          <div>
            <label className="block text-teal-800 text-sm font-bold mb-2">Password:</label>
            <input
              type="password"
              {...register("password", { required: true })}
              className="shadow-sm border rounded w-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">Password is required</p>}
          </div>

          {/* CAPTCHA */}
          <div className="grid grid-cols-2 gap-4 items-center">
            <div>
              <label className="block text-teal-800 text-sm font-bold mb-2">Verification:</label>
              <input
                type="text"
                {...register("captcha", { required: true })}
                className="shadow-sm border rounded w-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
              {errors.captcha && <p className="text-red-500 text-sm mt-1">CAPTCHA is required</p>}
            </div>
            <div className="text-lg font-bold text-green-600 select-none">
              {isClient ? captchaText : "CAPTCHA"}
            </div>
            {isClient && (
              <button
                type="button"
                onClick={generateCaptcha}
                className="text-sm text-gray-600 hover:text-green-700"
              >
                Refresh
              </button>
            )}
          </div>

          <button
            type="submit"
            className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-400 shadow-md"
          >
            Create Account
          </button>
        </form>

        {submissionMessage && (
          <div className="mt-6 text-center">
            <p className="text-green-600 font-semibold mb-4">{submissionMessage}</p>
            {signupSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-gray-600 mb-4">Your account has been created successfully. You can now log in with your credentials.</p>
                <a
                  href="/login"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-teal-600 hover:bg-teal-700 transition-all duration-300 hover:shadow-lg"
                >
                  Go to Login
                </a>
              </motion.div>
            )}
          </div>
        )}
        {submissionError && <p className="text-red-500 mt-6 text-center font-semibold">{submissionError}</p>}
      </motion.div>
      </div>
    </div>
  );
};

export default RestaurantSignupForm;
