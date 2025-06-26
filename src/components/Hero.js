export default function Hero() {
  return (
    <section className="bg-white py-24 px-4 md:px-8 lg:px-12 xl:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <div className="space-y-8">
          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
            Bring Your Menu<br />
            <span className="text-[#00bba7]">Into the Digital Age</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-md">
            Create sleek, QR-powered digital menus in minutes. Update your items anytime, eliminate printing costs, and deliver a contactless experience that your customers will love.
          </p>
          <div className="flex gap-4 pt-2">
            <button className="bg-[#00bba7] text-white px-6 py-3 rounded-full font-medium hover:bg-[#00a895] transition">
              Get Started Free
            </button>
            <button className="border border-[#00bba7] text-[#00bba7] px-6 py-3 rounded-full font-medium hover:bg-[#f0fdfa] transition">
              Watch Demo
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE PLACEHOLDER */}
        <img src="/Hero section.svg" alt="Digital Menu" className="w-full h-full object-cover rounded-xl" />


      </div>
    </section>
  );
}
