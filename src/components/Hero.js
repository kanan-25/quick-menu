// components/Hero.js (or .jsx, .tsx)

export default function Hero() {
    return ( // <--- Added the return statement
      <section className="flex h-screen w-full items-center justify-center bg-teal-100 text-gray-800">
        <div className="container mx-auto max-w-lg px-4 text-center">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">
              Create Your Digital Menu in Minutes!
        </h1>
          <p className="mb-8 text-lg md:text-xl">
            Easy online menus for restaurants, cafes, and food trucks.
          </p>
          <div className="flex flex-col items-center justify-center space-y-4 md:flex-row md:space-x-4 md:space-y-0">
            <a href="/signup" className="inline-block rounded-md border border-red-500 bg-red-500 px-6 py-3 font-bold text-white transition duration-300 hover:bg-red-600 hover:border-red-600">
              Get Started
            </a>
            <a href="/demo" className="inline-block rounded-md border-2 border-gray-800 bg-transparent px-6 py-3 font-bold text-gray-800 transition duration-300 hover:bg-gray-800 hover:bg-opacity-10">
              View Demo Menu
            </a>
          </div>
        </div>
      </section>
    ); // <--- Closed the return statement
  }