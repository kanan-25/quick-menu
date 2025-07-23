import React from 'react';

// Main Loader Component
export const Loader = ({ size = 'md', color = 'primary', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const colorClasses = {
    primary: 'border-[#2B7A78]',
    secondary: 'border-[#8F8F3C]',
    accent: 'border-[#F76C3C]',
    action: 'border-[#F44336]',
    white: 'border-white'
  };

  return (
    <div className={`inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] ${sizeClasses[size]} ${colorClasses[color]} ${className}`}>
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
};

// Page Loader Component
export const PageLoader = ({ message = 'Loading...' }) => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="mb-4">
          <Loader size="xl" color="primary" />
        </div>
        <p className="text-lg text-gray-600 font-medium">{message}</p>
      </div>
    </div>
  );
};

// Button Loader Component
export const ButtonLoader = ({ size = 'sm', color = 'white' }) => {
  return (
    <Loader size={size} color={color} className="mr-2" />
  );
};

// Card Loader Component
export const CardLoader = () => {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-200 rounded-lg h-48 mb-4"></div>
      <div className="space-y-2">
        <div className="bg-gray-200 rounded h-4 w-3/4"></div>
        <div className="bg-gray-200 rounded h-4 w-1/2"></div>
        <div className="bg-gray-200 rounded h-4 w-2/3"></div>
      </div>
    </div>
  );
};

// Menu Item Loader Component
export const MenuItemLoader = () => {
  return (
    <div className="animate-pulse bg-white rounded-xl shadow-md p-4 mb-4">
      <div className="flex items-center space-x-4">
        <div className="bg-gray-200 rounded-lg h-16 w-16"></div>
        <div className="flex-1 space-y-2">
          <div className="bg-gray-200 rounded h-4 w-3/4"></div>
          <div className="bg-gray-200 rounded h-3 w-1/2"></div>
          <div className="bg-gray-200 rounded h-4 w-1/4"></div>
        </div>
      </div>
    </div>
  );
};

// Order Tracking Loader Component
export const OrderTrackingLoader = () => {
  return (
    <div className="animate-pulse space-y-4">
      <div className="bg-gray-200 rounded-lg h-6 w-1/3"></div>
      <div className="space-y-3">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="flex items-center space-x-3">
            <div className="bg-gray-200 rounded-full h-8 w-8"></div>
            <div className="flex-1 space-y-1">
              <div className="bg-gray-200 rounded h-4 w-2/3"></div>
              <div className="bg-gray-200 rounded h-3 w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Restaurant Dashboard Loader Component
export const DashboardLoader = () => {
  return (
    <div className="animate-pulse space-y-6">
      {/* Header */}
      <div className="bg-gray-200 rounded-lg h-32"></div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-gray-200 rounded-lg h-24"></div>
        ))}
      </div>
      
      {/* Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-200 rounded-lg h-64"></div>
        <div className="bg-gray-200 rounded-lg h-64"></div>
      </div>
    </div>
  );
};

// Inline Loader Component (for small loading states)
export const InlineLoader = ({ text = 'Loading...', color = 'primary' }) => {
  return (
    <div className="flex items-center justify-center py-4">
      <Loader size="sm" color={color} />
      <span className="ml-2 text-sm text-gray-600">{text}</span>
    </div>
  );
};

export default Loader;
