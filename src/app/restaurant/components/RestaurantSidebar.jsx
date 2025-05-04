// src/app/restaurant/components/RestaurantSidebar.jsx
import Link from 'next/link';

const RestaurantSidebar = () => {
  const navigation = [
    { name: 'Dashboard', href: '/restaurant' },
    { name: 'Menu', href: '/restaurant/menu' },
    { name: 'Profile', href: '/restaurant/profile' },
    { name: 'QR Code', href: '/restaurant/qrcode' },
    { name: 'Analytics', href: '/restaurant/analytics' },
  ];

  return (
    <div className="fixed top-0 left-0 w-64 bg-teal-800 h-full text-white shadow-md z-50">
      <div className="p-6">
        <Link href="/restaurant" className="text-2xl font-semibold text-white tracking-wider">
          Restaurant Panel
        </Link>
      </div>
      <nav className="mt-6">
        {navigation.map((item) => (
          <div key={item.name} className="px-3 py-2 hover:bg-teal-700 transition duration-150">
            <Link href={item.href} className="block">
              {item.name}
            </Link>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default RestaurantSidebar;