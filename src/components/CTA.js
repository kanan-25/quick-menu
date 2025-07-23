import React from 'react';

const CTA = () => {
  const teal = '#00bba7';
  const lightTeal = '#e0f7fa';
  const darkGray = '#374151';

  return (
    <section className="py-24 relative overflow-hidden bg-gray-100">
      {/* Overlapping Teal Shape */}
      <div
        className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[#2B7A78] opacity-40 blur-xl"
        style={{ zIndex: 1 }}
      ></div>
      <div
        className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-48 h-48 rounded-full bg-[#F76C3C] opacity-50 blur-lg"
        style={{ zIndex: 1 }}
      ></div>

      {/* Content Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-8">
          Ready to <span className="bg-gradient-to-r from-[#2B7A78] to-[#F76C3C] bg-clip-text text-transparent">Transform Your Restaurant</span>?
        </h2>
        <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
          Experience the power of DigiMenuCard - digital menus, real-time orders, and seamless customer experience. Join thousands of restaurants today!
        </p>
        <div className="inline-flex rounded-md shadow">
          <button
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-[#F76C3C] to-[#F44336] hover:from-[#e55a2b] hover:to-[#d32f2f] transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F76C3C] shadow-lg"
          >
            Get Started with DigiMenuCard
          </button>
          
        </div>
      </div>
    </section>
  );
};

export default CTA;