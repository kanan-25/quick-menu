import React from 'react';
import { PrinterIcon, ShieldCheckIcon, QrCodeIcon } from '@heroicons/react/24/solid';

const WhyGoDigital = () => {
  const benefits = [
    {
      title: 'No Printing Costs',
      description: 'Wave goodbye to expensive and recurring printing fees. Update your menu as often as you like, for free!',
      icon: <PrinterIcon className="w-10 h-10 text-white" />,
      bgColor: '#00bba7',
    },
    {
      title: 'Contactless & Hygienic',
      description: 'Provide a safer experience for your customers by eliminating shared physical menus. Health and safety first!',
      icon: <ShieldCheckIcon className="w-10 h-10 text-white" />,
      bgColor: '#26a69a', // Slightly darker teal for variation
    },
    {
      title: 'Easy to Share via QR Code',
      description: 'Effortlessly share your entire menu with a simple scan. Perfect for tables, takeout, and marketing materials.',
      icon: <QrCodeIcon className="w-10 h-10 text-white" />,
      bgColor: '#80cbc4', // Lighter teal for contrast
    },
  ];

  return (
    <section className="bg-white py-24 px-4 md:px-8 lg:px-12 xl:px-16">
      <div className="max-w-7xl mx-auto text-center mb-14">

      <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Why Choose a <span className="text-[#00bba7]">Digital Menu?</span>
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto text-lg">
          Transform your restaurant's customer experience while saving time and cost.
        </p>
        <div className="flex space-x-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="min-w-[300px] bg-white rounded-lg shadow-md p-8 flex flex-col items-center justify-center transition-transform duration-300 hover:scale-105"
              style={{ backgroundColor: '#f7fafc' }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: benefit.bgColor }}
              >
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-700 text-center mb-2">{benefit.title}</h3>
              <p className="text-gray-600 text-sm text-center">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyGoDigital;