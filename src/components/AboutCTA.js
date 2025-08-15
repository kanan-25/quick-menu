import React from 'react';
import Link from 'next/link';

export default function AboutCTA() {
  return (
    <section className="relative py-32 bg-gradient-to-r from-[#2B7A78] via-[#8F8F3C] to-[#F76C3C] overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="absolute left-0 top-0 h-full w-full" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" width="30" height="30" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="2" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Ready to Transform Your Restaurant with DigiMenuCard?
          </h2>
          <p className="mt-6 text-xl leading-relaxed text-white text-opacity-90">
            Join thousands of restaurants already revolutionizing their operations with our comprehensive digital dining platform. From QR menus to real-time analytics - everything you need to succeed.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/signup"
              className="group inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-[#2B7A78] bg-white hover:bg-gray-100 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-105"
            >
              <span className="mr-2">Start Your DigiMenuCard Journey</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform duration-300 transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/template"
              className="group inline-flex items-center justify-center px-8 py-4 border border-white text-base font-medium rounded-md text-white hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#F76C3C]/20"
            >
              <span className="mr-2">View Live Demo</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-all duration-300 transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </Link>
          </div>
          <p className="mt-8 text-sm text-white text-opacity-70">
            No credit card required. Experience the full DigiMenuCard platform with our free trial.
          </p>
        </div>
      </div>
    </section>
  );
}
