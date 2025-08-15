import React from 'react';

const CTA = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-gray-100">
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Ready to Transform Your Restaurant?
        </h2>
        <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
          Join thousands of restaurants already using DigiMenuCard to streamline operations and delight customers.
        </p>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-gray-900 mb-2">5,000+</div>
            <div className="text-gray-700">Restaurants Trust Us</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900 mb-2">99.9%</div>
            <div className="text-gray-700">Uptime Guarantee</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900 mb-2">24/7</div>
            <div className="text-gray-700">Customer Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
