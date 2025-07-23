import React from 'react';
import { PrinterIcon, ShieldCheckIcon, QrCodeIcon, ClockIcon, ChartBarIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/solid';

const WhyGoDigital = () => {
  const benefits = [
    {
      title: 'Zero Printing Costs',
      description: 'Eliminate expensive printing forever. Update your menu instantly, add seasonal items, and change prices in real-time - all for free!',
      icon: <PrinterIcon className="w-10 h-10 text-white" />,
      bgColor: '#2B7A78',
      gradient: 'from-[#2B7A78] to-[#236663]',
    },
    {
      title: 'Contactless & Safe',
      description: 'Provide a hygienic dining experience with contactless ordering. Customers scan, order, and pay - no shared surfaces needed.',
      icon: <ShieldCheckIcon className="w-10 h-10 text-white" />,
      bgColor: '#8F8F3C',
      gradient: 'from-[#8F8F3C] to-[#7a7a33]',
    },
    {
      title: 'QR Code Ordering',
      description: 'Customers scan QR codes to access your menu, place orders, and track delivery in real-time. Modern dining made simple.',
      icon: <QrCodeIcon className="w-10 h-10 text-white" />,
      bgColor: '#F76C3C',
      gradient: 'from-[#F76C3C] to-[#e55a2b]',
    },
    {
      title: 'Real-Time Updates',
      description: 'Sold out of a dish? Update instantly. New special? Add it immediately. Your menu stays current without any delays.',
      icon: <ClockIcon className="w-10 h-10 text-white" />,
      bgColor: '#F44336',
      gradient: 'from-[#F44336] to-[#d32f2f]',
    },
    {
      title: 'Order Analytics',
      description: 'Track popular items, peak hours, and customer preferences. Make data-driven decisions to boost your restaurant\'s success.',
      icon: <ChartBarIcon className="w-10 h-10 text-white" />,
      bgColor: '#2B7A78',
      gradient: 'from-[#2B7A78] to-[#8F8F3C]',
    },
    {
      title: 'Mobile-First Design',
      description: 'Optimized for smartphones and tablets. Your customers get a smooth, fast experience on any device they use.',
      icon: <DevicePhoneMobileIcon className="w-10 h-10 text-white" />,
      bgColor: '#8F8F3C',
      gradient: 'from-[#8F8F3C] to-[#F76C3C]',
    },
  ];

  return (
    <section className="bg-gradient-to-br from-gray-50 to-white py-24 px-4 md:px-8 lg:px-12 xl:px-16 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-[#2B7A78] rounded-full opacity-10 blur-xl"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#F76C3C] rounded-full opacity-10 blur-xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-[#8F8F3C] rounded-full opacity-10 blur-xl"></div>

      <div className="max-w-7xl mx-auto text-center mb-16 relative z-10">
        <div className="mb-6">
          <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-[#2B7A78]/10 to-[#F76C3C]/10 text-[#2B7A78] text-sm font-semibold mb-4">
            Why DigiMenuCard?
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Transform Your Restaurant with
          <span className="bg-gradient-to-r from-[#2B7A78] via-[#8F8F3C] to-[#F76C3C] bg-clip-text text-transparent"> Digital Innovation</span>
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
          Join thousands of restaurants already using DigiMenuCard to streamline operations, delight customers, and boost revenue with our comprehensive digital dining solution.
        </p>
      </div>
      {/* Benefits Grid */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl p-8 flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-2 border border-gray-100 relative overflow-hidden"
            >
              {/* Background Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`}></div>

              {/* Icon */}
              <div
                className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300 bg-gradient-to-br ${benefit.gradient}`}
              >
                {benefit.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-gray-900 transition-colors">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                {benefit.description}
              </p>

              {/* Bottom Accent */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${benefit.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Go Digital?
            </h3>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Join the digital revolution and give your customers the modern dining experience they expect.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-gradient-to-r from-[#2B7A78] to-[#8F8F3C] text-white px-8 py-4 rounded-full font-semibold hover:from-[#236663] hover:to-[#7a7a33] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              Start Free Trial
            </button>
            <button className="border-2 border-[#F76C3C] text-[#F76C3C] px-8 py-4 rounded-full font-semibold hover:bg-[#F76C3C] hover:text-white transition-all duration-300">
              View Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyGoDigital;