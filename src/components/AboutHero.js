export default function AboutHero() {
  return (
    <section className="relative bg-gradient-to-r from-[#2B7A78] via-[#8F8F3C] to-[#F76C3C] py-32 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white"></div>
        <div className="absolute top-1/2 right-1/4 w-64 h-64 rounded-full bg-white"></div>
        <div className="absolute bottom-12 left-1/3 w-48 h-48 rounded-full bg-white"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              About <span className="text-yellow-200">DigiMenuCard</span>
            </h1>
            <p className="mt-6 text-xl text-white text-opacity-90 max-w-2xl">
              Revolutionizing the restaurant industry with smart digital menus, real-time ordering, and seamless customer experiences that drive growth.
            </p>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#8F8F3C] rounded-full opacity-20 mix-blend-multiply"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#F76C3C] rounded-full opacity-20 mix-blend-multiply"></div>

              {/* Image container with frame effect */}
              <div className="relative z-10 bg-white rounded-xl shadow-2xl overflow-hidden p-2 transition-all duration-300 hover:shadow-[#F76C3C]/20 hover:shadow-2xl hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#2B7A78]/10 to-[#F76C3C]/10 transition-opacity duration-300 hover:opacity-30"></div>
                <img
                  src="/About_img.jpg"
                  alt="DigiMenuCard"
                  className="relative z-10 w-72 h-72 sm:w-80 sm:h-80 object-cover rounded-lg transition-transform duration-500 hover:scale-105"
                />

                {/* Floating elements for visual interest */}
                <div className="absolute top-4 right-4 w-12 h-12 bg-[#8F8F3C] rounded-full flex items-center justify-center text-white text-xl shadow-lg transition-all duration-300 hover:bg-[#7a7a33] hover:scale-110 cursor-pointer">
                  🍽️
                </div>
                <div className="absolute bottom-4 left-4 w-12 h-12 bg-[#2B7A78] rounded-full flex items-center justify-center text-white text-xl shadow-lg transition-all duration-300 hover:bg-[#236663] hover:scale-110 cursor-pointer">
                  📱
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}