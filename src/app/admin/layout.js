import Sidebar from '@/components/Sidebar';
import AdminHeader from '@/components/AdminHeader';

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <div className="ml-64 md:ml-64 lg:ml-64 xl:ml-64 transition-all duration-300">
        <AdminHeader/>
        <main className="py-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}