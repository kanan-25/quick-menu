import Link from 'next/link';

export default function Hero() {
  return (
    <section className="bg-white py-24 px-4 md:px-8 lg:px-12 xl:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <div className="space-y-8">
          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
            Transform Your Restaurant<br />
            <span className="bg-gradient-to-r from-[#2B7A78] via-[#8F8F3C] to-[#F76C3C] bg-clip-text text-transparent">With DigiMenuCard</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-md">
            Create stunning digital menus with QR codes in minutes. Real-time order tracking, seamless customer experience, and powerful restaurant management - all in one platform.
          </p>
          <div className="flex gap-4 pt-2">
            <Link href="/signup" className="bg-gradient-to-r from-[#2B7A78] to-[#8F8F3C] text-white px-6 py-3 rounded-full font-medium hover:from-[#236663] hover:to-[#7a7a33] transition duration-200 shadow-lg cursor-pointer" style={{ color: 'white' }}>
              Get Started Free
            </Link>
            <Link href="/template" className="border-2 border-[#F76C3C] text-white bg-[#F76C3C] px-6 py-3 rounded-full font-medium hover:bg-[#e55a2b] hover:border-[#e55a2b] transition duration-200 cursor-pointer">
              Watch Demo
            </Link>
          </div>
        </div>

        {/* RIGHT IMAGE PLACEHOLDER */}
        <img src="/HeroSection.svg" alt="Digital Menu" className="w-full h-full object-cover rounded-xl" />


      </div>
    </section>
  );
}
