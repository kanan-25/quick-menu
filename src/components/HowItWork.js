'use client'; // This directive marks the component as a Client Component

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// ScrollTrigger will be registered in useEffect

const HowItWorks = () => {
  const stepsRef = useRef([]);
  const containerRef = useRef(null);
  const primaryColor = '#2B7A78';
  const secondaryColor = '#8F8F3C';
  const accentColor = '#F76C3C';
  const actionColor = '#F44336';

  const stepsData = [
    {
      number: '1',
      title: 'Create Your DigiMenuCard Account',
      description: 'Sign up in minutes and set up your restaurant profile. Add your branding, contact details, and restaurant information.',
      color: primaryColor,
    },
    {
      number: '2',
      title: 'Build Your Digital Menu',
      description: 'Add menu items with photos, descriptions, and prices. Organize by categories and customize your offerings.',
      color: secondaryColor,
    },
    {
      number: '3',
      title: 'Generate QR Codes & Go Live',
      description: 'Create QR codes for tables and takeaway. Customers scan, order, and track in real-time. Start receiving orders instantly!',
      color: accentColor,
    },
  ];

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    const elements = stepsRef.current;

    elements.forEach((element, index) => {
      gsap.fromTo(
        element,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
          delay: index * 0.2,
        }
      );
    });

    return () => {
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <section ref={containerRef} className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden relative">
      {/* Background Circles */}
      <div
        className="absolute top-1/4 left-10 -translate-y-1/2 bg-[#2B7A78] rounded-full w-40 h-40 blur-xl opacity-30"
        style={{ zIndex: 0 }}
      ></div>
      <div
        className="absolute bottom-1/4 right-10 translate-y-1/2 bg-[#F76C3C] rounded-full w-56 h-56 blur-xl opacity-25"
        style={{ zIndex: 0 }}
      ></div>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#8F8F3C] rounded-full w-32 h-32 blur-xl opacity-20"
        style={{ zIndex: 0 }}
      ></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
          How <span className="bg-gradient-to-r from-[#2B7A78] via-[#8F8F3C] to-[#F76C3C] bg-clip-text text-transparent">DigiMenuCard</span> Works
        </h2>
        <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
          Get your restaurant online in just 3 simple steps. From setup to serving customers - we make it effortless.
        </p>
        <div className="md:grid md:grid-cols-3 md:gap-12">
          {stepsData.map((step, index) => (
            <div
              ref={(el) => (stepsRef.current[index] = el)}
              key={index}
              className={`bg-white rounded-2xl shadow-xl p-8 md:even:mt-12 md:odd:mt-24 transition-all duration-300 hover:scale-105 hover:shadow-2xl border-t-4 relative group`}
              style={{ borderTopColor: step.color }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: step.color }}
              >
                {step.number}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-gray-900 transition-colors">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>

              {/* Connection Arrow */}
              {index < stepsData.length - 1 && (
                <div className="absolute top-1/2 -right-8 -translate-y-1/2 hidden md:block">
                  <div className="flex items-center">
                    <div
                      className="w-12 h-1 rounded-full opacity-60"
                      style={{ backgroundColor: step.color }}
                    ></div>
                    <div
                      className="w-0 h-0 border-l-4 border-r-0 border-t-2 border-b-2 border-transparent ml-1"
                      style={{ borderLeftColor: step.color }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="mb-6">
            <p className="text-gray-600 text-lg mb-4">
              Ready to transform your restaurant experience?
            </p>
          </div>
          <button className="bg-gradient-to-r from-[#F76C3C] to-[#F44336] text-white px-10 py-4 rounded-full font-semibold hover:from-[#e55a2b] hover:to-[#d32f2f] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
            Start Your DigiMenuCard Journey
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;