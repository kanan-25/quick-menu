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
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Go Digital?
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Transform your restaurant operations with modern digital solutions that save money, improve efficiency, and enhance customer experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${benefit.gradient} rounded-xl p-8 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300`}
            >
              <div className="flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-lg mb-6">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                {benefit.title}
              </h3>
              <p className="text-white text-opacity-90 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyGoDigital;
