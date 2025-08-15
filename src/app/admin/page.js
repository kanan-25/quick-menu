import React from 'react';

const AdminDashboard = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-5">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Example Widgets */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Total Restaurants</h3>
          <p className="text-3xl font-bold text-indigo-600">125</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-700 mb-2">New Sign-ups (Last 7 Days)</h3>
          <p className="text-3xl font-bold text-green-600">15</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Active Menu Templates</h3>
          <p className="text-3xl font-bold text-teal-600">30</p>
        </div>
      </div>

      <div className="mt-8 bg-white shadow-md rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-700 mb-4">Recent Activity</h3>
        <ul className="divide-y divide-gray-200">
          <li className="py-3 text-gray-700">Restaurant "Spice Route" signed up.</li>
          <li className="py-3 text-gray-700">Admin "John Doe" added a new menu template.</li>
          <li className="py-3 text-gray-700">Restaurant "Pizza Place" updated their menu.</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
