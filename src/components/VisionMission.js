import React from 'react';

export default function VisionMission() {
  return (
    <div className="bg-gray-50 py-12 rounded-lg shadow-md">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="lg:text-center">
        <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Our Foundation</h2>
        <p className="mt-2 text-3xl leading-8 font-extrabold text-gray-900 sm:text-4xl">
          What Drives Us
        </p>
        <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
          These principles guide everything we do, from the solutions we build to the relationships we foster.
        </p>
      </div>
  
      <div className="mt-10">
        <h3 className="text-2xl font-bold text-gray-900 tracking-wide text-center mb-6">Our Mission</h3>
        <p className="mt-2 text-xl text-gray-700 text-center">
          To simplify digital transformation for restaurants worldwide.
        </p>
      </div>
  
      <div className="mt-12">
        <h3 className="text-2xl font-bold text-gray-900 tracking-wide text-center mb-6">Our Core Values</h3>
        <ul className="space-y-8 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-x-6 sm:gap-y-8 lg:gap-x-8">
          <li>
            <div className="flex items-center text-lg leading-6 font-medium text-gray-900">
              <span className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-md shadow-sm">
                🛡️
              </span>
              <span className="ml-4">Simplicity</span>
            </div>
            <p className="mt-2 text-base text-gray-500">
              We believe in making complex things easy to understand and use.
            </p>
          </li>
  
          <li>
            <div className="flex items-center text-lg leading-6 font-medium text-gray-900">
              <span className="inline-flex items-center justify-center p-3 bg-green-100 rounded-md shadow-sm">
                🚀
              </span>
              <span className="ml-4">Speed</span>
            </div>
            <p className="mt-2 text-base text-gray-500">
              We move with agility and help our users achieve their goals quickly.
            </p>
          </li>
  
          <li>
            <div className="flex items-center text-lg leading-6 font-medium text-gray-900">
              <span className="inline-flex items-center justify-center p-3 bg-yellow-100 rounded-md shadow-sm">
                🎯
              </span>
              <span className="ml-4">Focus on Users</span>
            </div>
            <p className="mt-2 text-base text-gray-500">
              Our users are at the heart of everything we design and build.
            </p>
          </li>
  
          <li>
            <div className="flex items-center text-lg leading-6 font-medium text-gray-900">
              <span className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-md shadow-sm">
                🤝
              </span>
              <span className="ml-4">Trust & Transparency</span>
            </div>
            <p className="mt-2 text-base text-gray-500">
              We build lasting relationships based on honesty and open communication.
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
  );
}