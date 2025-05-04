import Link from 'next/link';

const Sidebar = () => {
  const navigation = [
    { name: 'Dashboard', href: '/admin' },
    { name: 'Restaurants', href: '/admin/restaurants' }, // Make sure this is present
    { name: 'Menu Templates', href: '/admin/templates' },
    { name: 'Admin Users', href: '/admin/users' },
    { name: 'Analytics', href: '/admin/analytics' },
    { name: 'Settings', href: '/admin/settings' },
  ];

  return (
    <div className="fixed top-0 left-0 w-64 bg-gray-800 h-full text-white shadow-md z-50">
      <div className="p-6">
        <Link href="/admin" className="text-2xl font-semibold text-white tracking-wider">
          Admin Panel
        </Link>
      </div>
      <nav className="mt-6">
        {navigation.map((item) => (
          <div key={item.name} className="px-3 py-2 hover:bg-gray-700 transition duration-150">
            <Link href={item.href} className="block">
              {item.name}
            </Link>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;