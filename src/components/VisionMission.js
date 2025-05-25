import React from 'react';

export default function VisionMission() {
  const values = [
    {
      icon: '🛡️',
      title: 'Simplicity',
      description: 'We believe in making complex things easy to understand and use.',
      color: 'from-teal-500 to-emerald-400',
      textColor: 'text-teal-50'
    },
    {
      icon: '🚀',
      title: 'Speed',
      description: 'We move with agility and help our users achieve their goals quickly.',
      color: 'from-emerald-500 to-green-400',
      textColor: 'text-emerald-50'
    },
    {
      icon: '🎯',
      title: 'Focus on Users',
      description: 'Our users are at the heart of everything we design and build.',
      color: 'from-amber-500 to-yellow-400',
      textColor: 'text-amber-50'
    },
    {
      icon: '🤝',
      title: 'Trust & Transparency',
      description: 'We build lasting relationships based on honesty and open communication.',
      color: 'from-sky-500 to-blue-400',
      textColor: 'text-sky-50'
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mission Statement */}
        <div className="mb-20 bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-teal-100 text-teal-800 mb-4">
                Our Mission
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Simplifying Digital Menus for <span className="text-teal-600">Every Restaurant</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                We're on a mission to make digital transformation accessible to all restaurants, regardless of size or technical expertise. By providing intuitive tools, we help restaurants create beautiful digital menus that enhance the dining experience.
              </p>
            </div>
            <div className="bg-gradient-to-br from-teal-500 to-emerald-600 p-8 md:p-12 flex items-center justify-center">
              <div className="text-center">
                <div className="inline-block p-3 rounded-full bg-white/20 mb-4">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Our Vision</h3>
                <p className="text-white/90 text-lg">
                  A world where every restaurant can easily embrace digital technology to improve their business and customer experience.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Core Values</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide everything we do, from the solutions we build to the relationships we foster.
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