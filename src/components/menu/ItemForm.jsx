'use client';

import { useState, useEffect } from 'react';
import { XMarkIcon, PhotoIcon } from '@heroicons/react/24/outline';

export default function ItemForm({ categoryId, item, onSave, onCancel }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [discountedPrice, setDiscountedPrice] = useState('');
  const [image, setImage] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);
  const [isPopular, setIsPopular] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (item) {
      setName(item.name || '');
      setDescription(item.description || '');
      setPrice(item.price ? item.price.toString() : '');
      setDiscountedPrice(item.discountedPrice ? item.discountedPrice.toString() : '');
      setImage(item.image || '');
      setImagePreview(item.image || '');
      setIsAvailable(item.isAvailable !== undefined ? item.isAvailable : true);
      setIsPopular(item.isPopular || false);
      setIsVegetarian(item.isVegetarian || false);
      setIsVegan(item.isVegan || false);
      setIsGlutenFree(item.isGlutenFree || false);
    }
  }, [item]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      
      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async () => {
    if (!imageFile) return null;
    
    setIsUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to upload image');
      }
      
      return data.imageUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name.trim() || !price.trim()) {
      alert('Name and price are required');
      return;
    }
    
    // Validate price
    const priceValue = parseFloat(price);
    if (isNaN(priceValue) || priceValue <= 0) {
      alert('Please enter a valid price');
      return;
    }
    
    // Validate discounted price if provided
    let discountedPriceValue = null;
    if (discountedPrice.trim()) {
      discountedPriceValue = parseFloat(discountedPrice);
      if (isNaN(discountedPriceValue) || discountedPriceValue <= 0) {
        alert('Please enter a valid discounted price');
        return;
      }
      
      if (discountedPriceValue >= priceValue) {
        alert('Discounted price must be less than the regular price');
        return;
      }
    }
    
    // Upload image if a new one was selected
    let imageUrl = image;
    if (imageFile) {
      const uploadedImageUrl = await uploadImage();
      if (uploadedImageUrl) {
        imageUrl = uploadedImageUrl;
      }
    }
    
    const itemData = {
      name,
      description,
      price: priceValue,
      discountedPrice: discountedPriceValue,
      image: imageUrl,
      isAvailable,
      isPopular,
      isVegetarian,
      isVegan,
      isGlutenFree
    };
    
    if (item && item._id) {
      itemData._id = item._id;
    }
    
    onSave(categoryId, itemData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl my-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {item && item._id ? 'Edit Item' : 'Add Item'}
          </h2>
          <button 
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                Item Name *
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Margherita Pizza"
                required
              />
            </div>
            
            <div>
              <label htmlFor="price" className="block text-gray-700 font-medium mb-2">
                Price *
              </label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 12.99"
                step="0.01"
                min="0"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="discountedPrice" className="block text-gray-700 font-medium mb-2">
                Discounted Price (Optional)
              </label>
              <input
                type="number"
                id="discountedPrice"
                value={discountedPrice}
                onChange={(e) => setDiscountedPrice(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 9.99"
                step="0.01"
                min="0"
              />
            </div>
            
            <div>
              <label htmlFor="image" className="block text-gray-700 font-medium mb-2">
                Image URL (Optional)
              </label>
              <input
                type="text"
                id="image"
                value={image}
                onChange={(e) => {
                  setImage(e.target.value);
                  setImagePreview(e.target.value);
                }}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., https://example.com/image.jpg"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe your menu item"
              rows={3}
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Upload Image
            </label>
            <div className="flex items-center space-x-4">
              <label className="cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-4 hover:bg-gray-50">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <div className="flex flex-col items-center">
                  <PhotoIcon className="w-8 h-8 text-gray-400" />
                  <span className="text-sm text-gray-500 mt-1">Choose file</span>
                </div>
              </label>
              
              {imagePreview && (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview('');
                      setImage('');
                      setImageFile(null);
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                  >
                    <XMarkIcon className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={isAvailable}
                  onChange={(e) => setIsAvailable(e.target.checked)}
                  className="mr-2"
                />
                <span className="text-gray-700">Available</span>
              </label>
            </div>
            
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={isPopular}
                  onChange={(e) => setIsPopular(e.target.checked)}
                  className="mr-2"
                />
                <span className="text-gray-700">Popular</span>
              </label>
            </div>
            
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={isVegetarian}
                  onChange={(e) => setIsVegetarian(e.target.checked)}
                  className="mr-2"
                />
                <span className="text-gray-700">Vegetarian</span>
              </label>
            </div>
            
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={isVegan}
                  onChange={(e) => setIsVegan(e.target.checked)}
                  className="mr-2"
                />
                <span className="text-gray-700">Vegan</span>
              </label>
            </div>
            
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={isGlutenFree}
                  onChange={(e) => setIsGlutenFree(e.target.checked)}
                  className="mr-2"
                />
                <span className="text-gray-700">Gluten Free</span>
              </label>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploading}
              className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${
                isUploading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isUploading ? 'Uploading...' : item && item._id ? 'Update Item' : 'Add Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
