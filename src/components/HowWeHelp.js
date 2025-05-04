import React from 'react'; // Keep if using hooks or old React version, safe to remove otherwise

export default function HowWeHelp() {
  return (
<div className="bg-gray-50 py-12 rounded-lg shadow-md">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="lg:text-center">
      <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
        Effortless Solutions
      </h2>
      <p className="mt-2 text-3xl leading-8 font-extrabold text-gray-900 sm:text-4xl">
        How We Help Restaurants
      </p>
    </div>

    <div className="mt-10">
      <ul className="space-y-4">
        <li className="flex items-center">
          <span className="text-green-500 mr-2">✅</span>
          <span className="text-lg font-medium text-gray-900">
            Instant digital menus
          </span>
        </li>
        <li className="flex items-center">
          <span className="text-green-500 mr-2">✅</span>
          <span className="text-lg font-medium text-gray-900">
            Easy menu editing
          </span>
        </li>
        <li className="flex items-center">
          <span className="text-green-500 mr-2">✅</span>
          <span className="text-lg font-medium text-gray-900">
            Fast QR code sharing
          </span>
        </li>
        <li className="flex items-center">
          <span className="text-green-500 mr-2">✅</span>
          <span className="text-lg font-medium text-gray-900">
            No tech knowledge required
          </span>
        </li>
      </ul>
    </div>
  </div>
</div>
  );
}