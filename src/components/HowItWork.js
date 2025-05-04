// components/HowItWorks.js (or paste into your page file)
import React from 'react'; // Keep if using hooks or old React version, safe to remove otherwise

export default function HowItWorks() {
  const steps = [
    {
      stepNum: 1,
      icon: '📝', // Placeholder - replace with your icon/illustration
      description: 'Sign Up and Create Your Restaurant Profile.',
    },
    {
      stepNum: 2,
      icon: '🍔', // Placeholder
      description: 'Add Your Menu Items and Details.',
    },
    {
      stepNum: 3,
      icon: '📲', // Placeholder
      description: 'Share QR Code with Customers to Access Menu.',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 bg-white"> {/* Added padding and background */}
      <div className="container mx-auto px-4 text-center"> {/* Container for width limiting and centering */}
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-800"> {/* Section Title */}
          Get Started in 3 Easy Steps
        </h2>

        {/* Steps Layout */}
        <div className="flex flex-col items-center md:flex-row md:justify-center md:space-x-12 space-y-8 md:space-y-0">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center max-w-xs text-center"> {/* Individual Step Card/Block */}
              {/* Step Number/Icon Placeholder - Replace with your actual icon/illustration */}
              <div className="text-5xl mb-4 font-bold text-teal-600">
                 {/* Option 1: Use Step Number */}
                 {step.stepNum}
                 {/* Option 2: Use Placeholder Icon (if you prefer visual icons) */}
                 {/* {step.icon} */}
              </div>

              <p className="text-lg text-gray-700">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}