
import React from 'react'; 
import Link from 'next/link'; 

export default function Navbar() { 
  return (
   
    <header className="bg-white shadow-md py-4">
      
      <div className="container mx-auto px-4 flex items-center justify-between">

        {/* Logo Area */}
        <div className="flex items-center">
          
          <Link href="/" className="flex items-center">

            <img
              src="/Logo.jpeg" 
              alt="Your Company Logo"
              width={100}
              height={100}
              className="mr-3 h-16 w-16 object-contain" 
            />
           
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
         
          <Link href="/" className="text-gray-600 hover:text-gray-800 transition duration-200">
            Home
          </Link>
         
          <Link href="/about" className="text-gray-600 hover:text-gray-800 transition duration-200">
            About
          </Link>
        
          <Link href="/contact" className="text-gray-600 hover:text-gray-800 transition duration-200">
            Contact Us
          </Link>
        </nav>

        {/* Login and Sign Up Buttons */}
        <div className="flex items-center space-x-4">
        
          <Link href="/login" className="text-gray-600 hover:text-gray-800 transition duration-200">
            Login
          </Link>
         
          <Link href="/signup" className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition duration-200">
            Sign Up
          </Link>
        </div>

        

      </div>
    </header>
  );
}