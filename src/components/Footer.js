export default function Footer() {
    return (
      <footer className="bg-gradient-to-r from-[#2B7A78] to-[#8F8F3C] text-white py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          {/* Left side */}
          <div className="text-center md:text-left mb-4 md:mb-0">
            <div className="flex items-center justify-center md:justify-start mb-2">
              <img src="/Logo.png" alt="DigiMenuCard" className="h-8 w-auto mr-3" />
              <span className="text-xl font-bold">DigiMenuCard</span>
            </div>
            <p className="text-white/80">&copy; 2025 DigiMenuCard. All rights reserved.</p>
          </div>

          {/* Right side */}
          <div className="flex space-x-6">
            <a href="/about" className="hover:text-[#F76C3C] transition-colors duration-200">
              About Us
            </a>
            <a href="/contact" className="hover:text-[#F76C3C] transition-colors duration-200">
              Contact
            </a>
            <a href="/template" className="hover:text-[#F76C3C] transition-colors duration-200">
              Demo
            </a>
          </div>
        </div>
      </footer>
    );
  }
