// src/app/restaurant/page.jsx
import React from 'react';


const RestaurantDashboard = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-5">Restaurant Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Total Menu Items</h3>
          <p className="text-3xl font-bold text-teal-600">45</p>
        </div>
        {/* Add more dashboard widgets */}
      </div>
      {/* Add more dashboard content */}
    </div>
  );
};

export default RestaurantDashboard;