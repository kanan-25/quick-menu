export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#2B7A78] to-[#8F8F3C] text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        {/* Left side */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <div className="flex items-center justify-center md:justify-start mb-2">
            <img src="/Logo.png" alt="DigiMenuCard" className="h-8 w-auto mr-3" />
            <span className="text-xl font-bold text-white">DigiMenuCard</span>
          </div>
          <p className="text-white text-opacity-90">&copy; 2025 DigiMenuCard. All rights reserved.</p>
        </div>

        {/* Right side */}
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
          <a href="/privacy" className="text-white text-opacity-90 hover:text-white transition-colors">
            Privacy Policy
          </a>
          <a href="/terms" className="text-white text-opacity-90 hover:text-white transition-colors">
            Terms of Service
          </a>
          <a href="/contact" className="text-white text-opacity-90 hover:text-white transition-colors">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
}
