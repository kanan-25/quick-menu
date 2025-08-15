// app/template/page.jsx

'use client';

import { Suspense, use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import DynamicMenu from "./DynamicMenu";
import ReviewsSection from "./components/ReviewsSection";

export default function TemplatePage({ searchParams }) {
  const router = useRouter();
  const [canGoBack, setCanGoBack] = useState(false);
  const resolvedSearchParams = use(searchParams);
  const restaurantId = resolvedSearchParams?.id || '123456789';

  useEffect(() => {
    // Check if there's a previous page in history
    setCanGoBack(window.history.length > 1);
  }, []);

  const handleBackClick = () => {
    if (canGoBack && window.history.length > 1) {
      router.back();
    } else {
      // If no history, go to restaurant dashboard if logged in, otherwise home
      const token = localStorage.getItem('token');
      if (token) {
        router.push('/restaurant');
      } else {
        router.push('/');
      }
    }
  };

  return (
    <main>
      {/* Navigation Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={handleBackClick}
              className="flex items-center text-teal-600 hover:text-teal-800 transition-colors cursor-pointer"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              <span className="font-medium text-gray-900">Back</span>
            </button>
            
            <div className="flex items-center">
              <img
                src="/Logo.png"
                alt="DigiMenuCard"
                className="h-8 w-auto"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Menu Section */}
      <Suspense fallback={<div className="text-center py-20">Loading menu...</div>}>
        <DynamicMenu />
      </Suspense>

      {/* Reviews Section */}
      <Suspense fallback={<div className="text-center py-8">Loading reviews...</div>}>
        <ReviewsSection restaurantId={restaurantId} />
      </Suspense>
    </main>
  );
}
