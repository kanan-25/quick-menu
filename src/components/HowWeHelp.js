import React from 'react';

export default function HowWeHelp() {
  const features = [
    {
      title: "Instant Digital Menus",
      description: "Create beautiful, mobile-friendly menus in minutes that customers can access instantly.",
      icon: "📱",
      color: "bg-gradient-to-br from-teal-500 to-emerald-400",
      delay: "0"
    },
    {
      title: "Easy Menu Editing",
      description: "Update your menu items, prices, and descriptions anytime without waiting for reprints.",
      icon: "✏️",
      color: "bg-gradient-to-br from-emerald-500 to-green-400",
      delay: "100"
    },
    {
      title: "QR Code Generation",
      description: "Automatically generate QR codes for your menu that can be printed or displayed anywhere.",
      icon: "📲",
      color: "bg-gradient-to-br from-cyan-500 to-teal-400",
      delay: "200"
    },
    {
      title: "No Tech Knowledge Required",
      description: "Our intuitive interface makes it easy for anyone to create and manage digital menus.",
      icon: "🔍",
      color: "bg-gradient-to-br from-blue-500 to-cyan-400",
      delay: "300"
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-teal-100 text-teal-700 text-sm font-semibold mb-4">
            Effortless Solutions
          </span>
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl mb-6">
            How We Help Restaurants
          </h2>
          <p className="max-w-3xl mx-auto text-xl text-gray-600">
            We provide simple yet powerful tools that transform how restaurants present their menus.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <a
              href="/"
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group block cursor-pointer"
              style={{ animationDelay: `${feature.delay}ms` }}
            >
              <div className={`${feature.color} h-3 w-full`}></div>
              <div className="p-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-6">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 text-3xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                      {feature.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>
                </div>

              </div>
            </a>
          ))}
        </div>

        <div className="text-center">
          <a
            href="/"
            className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg shadow-lg text-white bg-teal-600 hover:bg-teal-700 transition-all duration-300 hover:shadow-xl hover:shadow-teal-100/50 hover:-translate-y-1 transform hover:scale-105 group"
          >
            <span className="mr-2">See How It Works</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}