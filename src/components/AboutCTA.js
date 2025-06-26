import React from 'react';
import Link from 'next/link';

export default function AboutCTA() {
  return (
    <section className="relative py-32 bg-gradient-to-r from-teal-600 to-emerald-600 overflow-hidden">
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
            Ready to Create Your Own Digital Menu?
          </h2>
          <p className="mt-6 text-xl leading-relaxed text-white text-opacity-90">
            Join thousands of restaurants already simplifying their menus and delighting their customers with Quick Menu.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/signup"
              className="group inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-teal-700 bg-white hover:bg-gray-100 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-105"
            >
              <span className="mr-2">Get Started Free</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform duration-300 transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center px-8 py-4 border border-white text-base font-medium rounded-md text-white hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-800/20"
            >
              <span className="mr-2">Contact Sales</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-all duration-300 transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </Link>
          </div>
          <p className="mt-8 text-sm text-white text-opacity-70">
            No credit card required. Start your 14-day free trial today.
          </p>
        </div>
      </div>
    </section>
  );
}