'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

const RestaurantHeader = () => {
  const pathname = usePathname();
  const router = useRouter();
  const navigation = [
    { name: 'Menu', href: '/restaurant/menu' },
    { name: 'Profile', href: '/restaurant/profile' },
    { name: 'QR Code', href: '/restaurant/qrcode' },
    // Add more header links as needed
  ];

  // Function to handle logout (replace with your actual logout logic)
  const handleLogout = () => {
    console.log('Logout clicked');
    // In a real application, you would clear user session, tokens, etc.
    router.push('/restaurant/login'); // Redirect to login page
  };

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link href="/restaurant" className="text-xl font-semibold text-teal-700 tracking-tight">
          Restaurant Dashboard
        </Link>
        <nav className="hidden sm:block space-x-4">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-gray-600 hover:text-teal-700 ${
                pathname.startsWith(item.href) ? 'font-semibold' : ''
              }`}
            >
              {item.name}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="text-red-600 hover:text-red-800 font-semibold focus:outline-none"
          >
            Logout
          </button>
        </nav>
        <div className="sm:hidden">
          {/* You could add a hamburger menu icon here for mobile navigation */}
        </div>
      </div>
    </header>
  );
};

export default RestaurantHeader;