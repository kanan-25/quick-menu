// components/Features.js (or paste into your page file)
import React from 'react'; // Keep if using hooks or old React version, safe to remove otherwise

export default function Features() {
  const features = [
    {
      icon: '📱', // Placeholder - replace with your icon component or image
      title: 'Mobile Friendly Menus',
      description: 'Your digital menu looks perfect on smartphones, tablets, and desktops.',
    },
    {
      icon: '⚡', // Placeholder
      title: 'Instant QR Code Generation',
      description: 'Generate a unique QR code for your menu that customers can scan easily.',
    },
    {
      icon: '✏️', // Placeholder
      title: 'Easy Menu Management',
      description: 'Add, edit, delete items, update prices, and mark items out of stock with ease.',
    },
    {
      icon: '🚀', // Placeholder
      title: 'Fast and Secure',
      description: 'Our platform is built with modern technology for reliability and speed.',
    },
  ];

  return (
    <section id="features" className="py-16 bg-gray-50"> {/* Added padding and background */}
      <div className="container mx-auto px-4 text-center"> {/* Container for width limiting and centering */}
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-800"> {/* Section Title */}
          Why Choose Our Platform?
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"> {/* Responsive Grid */}
          {features.map((feature, index) => (
            <div
              key={index} // Unique key for list items
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out" // Card Styling and Hover Effects
            >
              {/* Icon Placeholder - Replace with your actual icon/SVG component */}
              <div className="text-4xl mb-4 mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-teal-100 text-teal-700">
                {feature.icon}
              </div>

              <h3 className="text-xl font-semibold mb-3 text-gray-700">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}