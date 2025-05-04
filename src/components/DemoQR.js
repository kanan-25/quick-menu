// components/DemoQrCodeSection.js (or paste into your page file)
import React from 'react'; // Keep if using hooks or old React version, safe to remove otherwise

export default function DemoQR() {
  // Replace this with the actual URL your demo QR code points to
  const demoMenuUrl = 'YOUR_DEMO_MENU_URL_HERE';
  // Replace this with the actual path to your QR code image
  const qrCodeImagePath = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/QR_Code_Example.svg/368px-QR_Code_Example.svg.png'; // Example: Put your image in public/images

  return (
    <section id="demo-qr" className="py-16 bg-white"> {/* Added padding and background */}
      <div className="container mx-auto px-4 text-center max-w-3xl"> {/* Container for width limiting and centering */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800"> {/* Section Title */}
          Scan Our Demo Menu!
        </h2>
        <p className="text-lg text-gray-700 mb-8"> {/* Description */}
          Experience firsthand how your customers will view your digital menu.
        </p>

        {/* QR Code and Call to Action */}
        <div className="flex flex-col items-center justify-center">

          {/* QR Code Placeholder - Replace with your <img> tag */}
          {/* <div className="w-48 h-48 md:w-64 md:h-64 border-4 border-teal-500 rounded-lg shadow-xl flex items-center justify-center text-center text-sm text-gray-500 bg-gray-100 mb-6">
             [Your QR Code Image Here]
          </div> */}
           {/* RECOMMENDED: Use an <img> tag for your actual QR code image */}
           <img
             src={qrCodeImagePath} // Path to your QR code image
             alt="Demo QR Code to scan sample menu"
             width={256} // Set appropriate size
             height={256}
             className="w-48 h-48 md:w-64 md:h-64 border-4 border-teal-500 rounded-lg shadow-xl object-contain mb-6" // Styling for the image
           />


          {/* Button (Optional - directs to the demo menu URL) */}
          {/* Customers will scan the QR code on their phones, but this button is useful for desktop users */}
          <a
            href={demoMenuUrl}
            target="_blank" // Opens in a new tab
            rel="noopener noreferrer" // Security best practice for target="_blank"
            className="inline-block rounded-md bg-teal-500 px-8 py-3 font-bold text-white transition duration-300 hover:bg-teal-600 shadow-md hover:shadow-lg"
          >
            View Demo Menu Directly
          </a>
           <p className="mt-4 text-sm text-gray-600">
               (Or simply scan the QR code above with your phone camera)
           </p>

        </div>
      </div>
    </section>
  );
}