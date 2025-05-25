
"use client";

import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 xl:px-16 flex items-center justify-between h-22">
        {/* Logo Area */}
        <div className="flex items-center pl-2 md:pl-4">
          <Link href="/" className="flex items-center">
            <img
              src="/Quick_menu.png"
              alt="Company Logo"
              width={100}
              height={100}
              className="mr-4 h-35 w-35 object-contain"
            />
          </Link>
        </div>

        {/* Navigation Links - Centered */}
        <nav className="flex items-center space-x-12">
          <Link href="/" className="text-gray-600 hover:text-teal-600 transition duration-200 font-medium">
            Home
          </Link>

          <Link href="/about" className="text-gray-600 hover:text-teal-600 transition duration-200 font-medium">
            About
          </Link>

          <Link href="/contact" className="text-gray-600 hover:text-teal-600 transition duration-200 font-medium">
            Contact Us
          </Link>
        </nav>

        {/* Login and Sign Up Buttons */}
        <div className="flex items-center space-x-6">
          <Link href="/login" className="text-gray-600 hover:text-teal-600 transition duration-200 font-medium">
            Login
          </Link>

          <Link href="/signup" className="bg-teal-500 text-white px-5 py-2 rounded-md hover:bg-teal-600 transition duration-200 font-medium">
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}