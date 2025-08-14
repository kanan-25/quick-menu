'use client';

import RestaurantSidebar from './components/RestaurantSidebar';
import RestaurantHeader from './components/RestaurantHeader';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RestaurantLayout({ children }) {
  const router = useRouter();

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (!token || !user) {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50">
      <RestaurantSidebar />
      <div className="lg:pl-72 transition-all duration-300">
        <RestaurantHeader />
        <main className="py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
