// src/app/restaurant/layout.jsx
import RestaurantSidebar from './components/RestaurantSidebar';
import RestaurantHeader from './components/RestaurantHeader';

export default function RestaurantLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <RestaurantSidebar />
      <div className="ml-64 md:ml-64 lg:ml-64 xl:ml-64 transition-all duration-300">
        <RestaurantHeader />
        <main className="py-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}