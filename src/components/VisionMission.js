import React from 'react';

export default function VisionMission() {
  const values = [
    {
      icon: '🛡️',
      title: 'Simplicity First',
      description: 'We make restaurant technology simple and intuitive, so you can focus on what matters most - your customers.',
      color: 'from-[#2B7A78] to-[#236663]',
      textColor: 'text-white'
    },
    {
      icon: '🚀',
      title: 'Innovation',
      description: 'We continuously evolve our platform with cutting-edge features that keep your restaurant ahead of the curve.',
      color: 'from-[#8F8F3C] to-[#7a7a33]',
      textColor: 'text-white'
    },
    {
      icon: '🎯',
      title: 'Customer Success',
      description: 'Your success is our success. We provide tools and support that help your restaurant thrive in the digital age.',
      color: 'from-[#F76C3C] to-[#e55a2b]',
      textColor: 'text-white'
    },
    {
      icon: '🤝',
      title: 'Partnership',
      description: 'We build lasting relationships with restaurants, becoming your trusted partner in digital transformation.',
      color: 'from-[#F44336] to-[#d32f2f]',
      textColor: 'text-white'
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mission Statement */}
        <div className="mb-20 bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-[#2B7A78]/10 to-[#8F8F3C]/10 text-[#2B7A78] mb-4">
                Our Mission
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Revolutionizing Restaurant Operations with <span className="bg-gradient-to-r from-[#2B7A78] to-[#F76C3C] bg-clip-text text-transparent">DigiMenuCard</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                We empower restaurants of all sizes to embrace digital transformation through our comprehensive platform. From digital menus and QR ordering to real-time analytics and customer engagement - we provide everything needed to thrive in the modern dining landscape.
              </p>
            </div>
            <div className="bg-gradient-to-br from-[#F76C3C] to-[#F44336] p-8 md:p-12 flex items-center justify-center">
              <div className="text-center">
                <div className="inline-block p-3 rounded-full bg-white/20 mb-4">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Our Vision</h3>
                <p className="text-white/90 text-lg">
                  To become the global leader in restaurant digitization, creating a world where every dining experience is enhanced by smart technology and seamless customer interactions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div>
          <div className="text-center mb-12">
            <div className="mb-4">
              <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-[#8F8F3C]/10 to-[#F76C3C]/10 text-[#8F8F3C] text-sm font-semibold mb-4">
                What Drives Us
              </span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Our Core Values</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide everything we do at DigiMenuCard, from the innovative solutions we build to the lasting partnerships we create with restaurants worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <div
                key={index}
                className={`relative rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group h-full`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-90`}></div>
                <div className="relative p-8 flex flex-col h-full">
                  <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <span className="text-3xl">{value.icon}</span>
                  </div>
                  <h3 className={`text-xl font-bold ${value.textColor} mb-3`}>{value.title}</h3>
                  <p className={`${value.textColor} text-opacity-90 text-base`}>{value.description}</p>
                  <div className="mt-auto pt-6">
                    <div className="w-10 h-1 bg-white/30 rounded group-hover:w-full transition-all duration-500"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}