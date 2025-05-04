'use client';

import { usePathname } from 'next/navigation';

const AdminHeader = () => {
  const pathname = usePathname();
  let title = 'Dashboard'; // Default title

  if (pathname.startsWith('/admin/restaurants')) {
    title = 'Restaurant Management';
  } else if (pathname.startsWith('/admin/templates')) {
    title = 'Menu Templates';
  } // Add more conditions for other admin sections

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
      </div>
    </header>
  );
};

export default AdminHeader;