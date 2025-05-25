import React from 'react';

const CTA = () => {
  const teal = '#00bba7';
  const lightTeal = '#e0f7fa';
  const darkGray = '#374151';

  return (
    <section className="py-24 relative overflow-hidden bg-gray-100">
      {/* Overlapping Teal Shape */}
      <div
        className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-teal-300 opacity-40 blur-xl"
        style={{ zIndex: 1 }}
      ></div>
      <div
        className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-48 h-48 rounded-full bg-teal-500 opacity-50 blur-lg"
        style={{ zIndex: 1 }}
      ></div>

      {/* Content Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-8">
          Ready to <span className="text-teal-500">Go Digital</span>?
        </h2>
        <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
          Experience the ease and efficiency of managing your menu online. Join thousands of restaurants today!
        </p>
        <div className="inline-flex rounded-md shadow">
          <button
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-500 hover:bg-teal-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            Sign Up Now
          </button>
          
        </div>
      </div>
    </section>
  );
};

export default CTA;