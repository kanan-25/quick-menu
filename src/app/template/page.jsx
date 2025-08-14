// app/template/page.jsx

import { Suspense } from "react";
import DynamicMenu from "./DynamicMenu";
import ReviewsSection from "./components/ReviewsSection";

export default function TemplatePage({ searchParams }) {
  // Get restaurant ID from URL params
  const restaurantId = searchParams?.id || '123456789';

  return (
    <main>
      <h1 className="text-3xl font-bold text-center my-8">Restaurant Menu</h1>
      
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
