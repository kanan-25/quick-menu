'use client'

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { UserPlusIcon, ClipboardDocumentListIcon, QrCodeIcon } from '@heroicons/react/24/outline';

const HowItWorks = () => {
  const stepsRef = useRef([]);
  const containerRef = useRef(null);
  const primaryColor = '#2B7A78';
  const secondaryColor = '#8F8F3C';
  const accentColor = '#F76C3C';

  const stepsData = [
    {
      number: '1',
      title: 'Create Your DigiMenuCard Account',
      description: 'Sign up in minutes and set up your restaurant profile. Add your branding, contact details, and restaurant information.',
      color: primaryColor,
      icon: UserPlusIcon,
    },
    {
      number: '2',
      title: 'Build Your Digital Menu',
      description: 'Add menu items with photos, descriptions, and prices. Organize by categories and customize your offerings.',
      color: secondaryColor,
      icon: ClipboardDocumentListIcon,
    },
    {
      number: '3',
      title: 'Generate QR Codes & Go Live',
      description: 'Create QR codes for tables and takeaway. Customers scan, order, and track in real-time. Start receiving orders instantly!',
      color: accentColor,
      icon: QrCodeIcon,
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
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Get your restaurant online in just a few simple steps. No technical knowledge required.
          </p>
        </div>

        <div ref={containerRef} className="relative">
          {stepsData.map((step, index) => (
            <div
              key={index}
              ref={(el) => (stepsRef.current[index] = el)}
              className={`flex items-center mb-16 ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              <div className="flex-1 px-8">
                <div
                  className={`p-8 rounded-2xl shadow-lg ${
                    index % 2 === 0 ? 'text-left' : 'text-right'
                  }`}
                  style={{
                    background: `linear-gradient(135deg, ${step.color}15, ${step.color}25)`,
                    border: `2px solid ${step.color}30`,
                  }}
                >
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-full text-white font-bold text-lg mb-4`}
                    style={{ backgroundColor: step.color }}
                  >
                    {index + 1}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              <div className="flex-shrink-0 mx-8">
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: step.color }}
                >
                  <step.icon className="w-12 h-12 text-white" />
                </div>
              </div>

              <div className="flex-1 px-8">
                <div className="h-32"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
