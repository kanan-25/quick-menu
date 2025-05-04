// components/CtaSection.js (or paste into your page file)
import React from 'react'; // Keep if using hooks or old React version, safe to remove otherwise

export default function CtaSection() {
  return (
    // Section with gradient background, generous padding, and centered text
    <section id="cta" className="py-20 md:py-24 bg-gradient-to-r from-teal-500 to-blue-500 text-white">
      <div className="container mx-auto px-4 text-center max-w-4xl"> {/* Container for width limiting and centering */}

        {/* Big Heading */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-10">
          Ready to Create Your Digital Menu?
        </h2>

        {/* Call to Action Button */}
        <a
          href="/signup" // Link to your signup page
          className="inline-block rounded-md bg-white px-12 py-4 text-xl font-bold text-teal-600 transition duration-300 hover:bg-gray-100 shadow-lg hover:shadow-xl transform hover:scale-105" // Button Styling
        >
          Get Started Now
        </a>

      </div>
    </section>
  );
}