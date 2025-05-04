import React from 'react'; // Keep if using hooks or old React version, safe to remove otherwise

export default function AboutCTA() {
  return (

<div className="bg-white py-16 rounded-lg shadow-md">
  <div className="max-w-md mx-auto text-center">
    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
      Ready to Create Your Own Digital Menu?
    </h2>
    <p className="mt-4 text-lg text-gray-700">
      Join thousands of restaurants already simplifying their menus and delighting their customers.
    </p>
    <div className="mt-8">
      <a
        href="/signup" // Replace with your actual signup page URL
        className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
      >
        Get Started
      </a>
    </div>
  </div>
</div>
  );
}