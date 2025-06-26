'use client'; // This directive marks the component as a Client Component

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// ScrollTrigger will be registered in useEffect

const HowItWorks = () => {
  const stepsRef = useRef([]);
  const containerRef = useRef(null);
  const tealColor = '#00bba7';
  const lightTeal = '#e0f7fa';
  const darkGray = '#374151';

  const stepsData = [
    {
      number: '1',
      title: 'Sign Up and Create Your Restaurant Profile.',
      description: 'Get started by creating your unique restaurant profile. Provide essential details to showcase your brand.',
    },
    {
      number: '2',
      title: 'Add Your Menu Items and Details.',
      description: 'Easily build your digital menu. Include mouth-watering descriptions, prices, and even images.',
    },
    {
      number: '3',
      title: 'Share QR Code with Customers to Access Menu.',
      description: 'Generate a QR code and share it with your customers for instant menu access on their devices.',
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
    <section ref={containerRef} className="py-20 bg-gray-100 overflow-hidden relative">
      {/* Background Circles */}
      <div
        className="absolute top-1/4 left-10 -translate-y-1/2 bg-[#80cbc4] rounded-full w-40 h-40 blur-xl opacity-50"
        style={{ zIndex: 0 }}
      ></div>
      <div
        className="absolute bottom-1/4 right-10 translate-y-1/2 bg-[#00bba7] rounded-full w-56 h-56 blur-xl opacity-40"
        style={{ zIndex: 0 }}
      ></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-8">
          How It <span className="text-[#00bba7]">Works</span>
        </h2>
        <div className="md:grid md:grid-cols-3 md:gap-12">
          {stepsData.map((step, index) => (
            <div
              ref={(el) => (stepsRef.current[index] = el)}
              key={index}
              className={`bg-white rounded-xl shadow-lg p-8 md:even:mt-12 md:odd:mt-24 transition-transform duration-300 hover:scale-103`}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4"
                style={{ backgroundColor: tealColor }}
              >
                {step.number}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
              {index < stepsData.length - 1 && (
                <div className="absolute top-1/2 -right-6 -translate-y-1/2 w-12 h-1 bg-[#80cbc4] rounded-full hidden md:block"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;