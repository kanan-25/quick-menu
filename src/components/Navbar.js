
"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 xl:px-16 flex items-center justify-between h-22">
        {/* Logo Area */}
        <div className="flex items-center pl-2 md:pl-4">
          <Link href="/" className="flex items-center">
            <img
              src="/Logo.png"
              alt="DigiMenuCard Logo"
              width={200}
              height={60}
              className="mr-4 h-12 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Navigation Links - Centered */}
        <nav className="flex items-center space-x-12">
          <Link href="/" className={`px-3 py-2 rounded-md text-white hover:text-gray-200 transition duration-200 font-medium cursor-pointer ${
            pathname === '/' ? 'bg-teal-100' : ''
          }`}>
            Home
          </Link>

          <Link href="/about" className={`px-3 py-2 rounded-md text-white hover:text-gray-200 transition duration-200 font-medium cursor-pointer ${
            pathname === '/about' ? 'bg-teal-100' : ''
          }`}>
            About
          </Link>

          <Link href="/contact" className={`px-3 py-2 rounded-md text-white hover:text-gray-200 transition duration-200 font-medium cursor-pointer ${
            pathname === '/contact' ? 'bg-teal-100' : ''
          }`}>
            Contact Us
          </Link>
        </nav>

        {/* Login and Sign Up Buttons */}
        <div className="flex items-center space-x-6">
          <Link href="/login" className="text-gray-600 hover:text-[#2B7A78] transition duration-200 font-medium cursor-pointer">
            Login
          </Link>

          <Link href="/signup" className="bg-gradient-to-r from-[#F76C3C] to-[#F44336] text-white px-5 py-2 rounded-md hover:from-[#e55a2b] hover:to-[#d32f2f] transition duration-200 font-medium shadow-lg cursor-pointer" style={{ color: 'white' }}>
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}
