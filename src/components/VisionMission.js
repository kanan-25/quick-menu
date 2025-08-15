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
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Vision Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">Our Vision & Mission</h2>
          
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-8 rounded-2xl border border-teal-200">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                To revolutionize the restaurant industry by making digital transformation accessible, 
                affordable, and effortless for every restaurant, from small cafes to large chains.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl border border-orange-200">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                To empower restaurants with cutting-edge digital tools that enhance customer experience, 
                streamline operations, and drive sustainable growth in the digital age.
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h3>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            These principles guide everything we do and shape how we serve our restaurant partners.
          </p>
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-gray-50 rounded-2xl p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Why Restaurants Choose Us</h3>
            <p className="text-xl text-gray-700">
              Numbers that speak for our commitment to excellence
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-teal-600 mb-2">5,000+</div>
              <div className="text-gray-700 font-medium">Happy Restaurants</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-teal-600 mb-2">99.9%</div>
              <div className="text-gray-700 font-medium">Uptime</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-teal-600 mb-2">24/7</div>
              <div className="text-gray-700 font-medium">Support</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-teal-600 mb-2">50+</div>
              <div className="text-gray-700 font-medium">Countries</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
