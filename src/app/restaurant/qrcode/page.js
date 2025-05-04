'use client';

import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';

const QRCodeGenerator = () => {
  const [menuUrl, setMenuUrl] = useState('');
  const [qrCode, setQrCode] = useState('');

  useEffect(() => {
    // In a real application, you might fetch the restaurant's unique menu URL
    // based on their ID or a stored setting. For now, we'll use a placeholder.
    const restaurantId = 'your-restaurant-id'; // Replace with actual ID
    const generatedMenuUrl = `https://your-website.com/menu/${restaurantId}`;
    setMenuUrl(generatedMenuUrl);
  }, []);

  useEffect(() => {
    if (menuUrl) {
      generateQrCode(menuUrl);
    }
  }, [menuUrl]);

  const generateQrCode = async (url) => {
    try {
      const qr = await QRCode.toDataURL(url, { width: 256, height: 256 });
      setQrCode(qr);
    } catch (err) {
      console.error('Error generating QR code', err);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-5">Generate QR Code</h2>
      {menuUrl ? (
        <div>
          <p className="mb-3">Your menu URL: <span className="font-semibold text-teal-600">{menuUrl}</span></p>
          {qrCode ? (
            <div className="bg-white shadow-md rounded-lg p-6 inline-block">
              <img src={qrCode} alt="Restaurant Menu QR Code" />
              <p className="mt-3 text-sm text-gray-600 text-center">Scan this QR code to open your menu.</p>
              <button
                className="mt-4 bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline block mx-auto"
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = qrCode;
                  link.download = 'restaurant_menu_qr.png';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
              >
                Download QR Code
              </button>
            </div>
          ) : (
            <p>Generating QR code...</p>
          )}
        </div>
      ) : (
        <p>Fetching your menu URL...</p>
      )}
    </div>
  );
};

export default QRCodeGenerator;