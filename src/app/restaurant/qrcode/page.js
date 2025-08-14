'use client';

import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const QRCodeGenerator = () => {
  const [restaurant, setRestaurant] = useState(null);
  const [menuUrl, setMenuUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        console.log('=== Frontend: Fetching Restaurant ===');
        
        // Check localStorage first
        const storedRestaurant = localStorage.getItem('restaurant_data');
        if (storedRestaurant) {
          try {
            const restaurantData = JSON.parse(storedRestaurant);
            if (restaurantData && restaurantData._id) {
              console.log('Using cached restaurant data');
              setRestaurant(restaurantData);
              
              const baseUrl = window.location.origin;
              const generatedMenuUrl = `${baseUrl}/template?id=${restaurantData._id}`;
              setMenuUrl(generatedMenuUrl);
              
              setLoading(false);
              return;
            }
          } catch (parseError) {
            console.warn('Error parsing stored restaurant data:', parseError);
            localStorage.removeItem('restaurant_data');
          }
        }

        // Get user email
        const storedUser = localStorage.getItem("user");
        let email = "demo@example.com";

        if (storedUser) {
          try {
            const userObj = JSON.parse(storedUser);
            if (userObj?.email) {
              email = userObj.email;
            }
          } catch (parseError) {
            console.warn("Error parsing user data:", parseError);
          }
        }

        console.log('Making API request with email:', email);

        // Make API request
        const res = await fetch("/api/restaurant/get_restaurant", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        console.log('API Response status:', res.status);
        console.log('API Response headers:', res.headers.get('content-type'));

        // Check if response is JSON
        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const textResponse = await res.text();
          console.error('Non-JSON response received:', textResponse.substring(0, 200));
          throw new Error('Server returned invalid response format');
        }

        const data = await res.json();
        console.log('API Response data:', data);

        if (res.ok && data) {
          // Ensure logo is set
          if (!data.logo || data.logo === '') {
            data.logo = 'https://via.placeholder.com/150';
          }

          setRestaurant(data);
          localStorage.setItem('restaurant_data', JSON.stringify(data));

          // Generate menu URL
          const baseUrl = window.location.origin;
          const generatedMenuUrl = `${baseUrl}/template?id=${data._id}`;
          setMenuUrl(generatedMenuUrl);
        } else {
          throw new Error(data.message || "Failed to fetch restaurant");
        }

      } catch (err) {
        console.error('=== Frontend Error ===');
        console.error('Error:', err);
        setError(err.message);

        // Fallback restaurant
        const defaultRestaurant = {
          _id: '123456789',
          name: 'Demo Restaurant',
          email: 'demo@example.com',
          description: 'A demo restaurant',
          logo: 'https://via.placeholder.com/150'
        };

        setRestaurant(defaultRestaurant);
        const baseUrl = window.location.origin;
        const generatedMenuUrl = `${baseUrl}/template?id=${defaultRestaurant._id}`;
        setMenuUrl(generatedMenuUrl);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-red-600">Error</h1>
            <p className="mt-2 text-sm text-gray-600">{error}</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Handle QR code download
  const handleDownloadQR = () => {
    const svgElement = document.getElementById('qr-code');
    if (svgElement) {
      // Create a canvas element
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // Set canvas dimensions to match SVG
      canvas.width = 200;
      canvas.height = 200;

      // Create an image from the SVG
      const img = new Image();
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);

      img.onload = () => {
        // Draw the image on the canvas
        ctx.drawImage(img, 0, 0);
        URL.revokeObjectURL(url);

        // Convert canvas to PNG
        const pngUrl = canvas.toDataURL('image/png');

        // Create download link
        let downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = 'menu-qrcode.png';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      };

      img.src = url;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        <div className="flex justify-between items-center mb-6">
          <Link
            href="/restaurant"
            className="text-blue-600 hover:text-blue-800 flex items-center"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            Dashboard
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Menu QR Code</h1>
          <p className="mt-2 text-sm text-gray-600">
            Customers can scan this QR code to view your digital menu
          </p>
          {restaurant && (
            <p className="mt-2 font-semibold text-blue-600">{restaurant.name}</p>
          )}
        </div>

        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            {menuUrl && (
              <QRCodeSVG
                id="qr-code"
                value={menuUrl}
                size={200}
                level={"H"}
                includeMargin={true}
              />
            )}
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500 mb-2">Menu URL:</p>
            <a
              href={menuUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 break-all"
            >
              {menuUrl}
            </a>
          </div>

          <button
            onClick={handleDownloadQR}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Download QR Code
          </button>

          <a
            href={menuUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 text-blue-600 hover:text-blue-800 underline"
          >
            View Menu
          </a>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
