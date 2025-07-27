'use client';

import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function MenuItem({ item, categoryId, onEdit, onDelete }) {
  const handleEdit = () => {
    onEdit(categoryId, item);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${item.name}"?`)) {
      onDelete(categoryId, item._id);
    }
  };

  // Format price with 2 decimal places
  const formatPrice = (price) => {
    if (!price) return '0.00';
    return parseFloat(price).toFixed(2);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        {item.image && (
          <img
            src={item.image}
            alt={item.name}
            className="w-16 h-16 object-cover rounded-md"
          />
        )}
        <div>
          <div className="flex items-center">
            <h4 className="font-semibold text-gray-800">{item.name}</h4>
            {!item.isAvailable && (
              <span className="ml-2 text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded">
                Not Available
              </span>
            )}
            {item.isPopular && (
              <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
                Popular
              </span>
            )}
            {item.isVegetarian && (
              <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                Vegetarian
              </span>
            )}
          </div>
          {item.description && (
            <p className="text-sm text-gray-600">{item.description}</p>
          )}
          <div className="flex items-center mt-1">
            <span className="text-gray-700 font-medium">₹{formatPrice(item.price)}</span>
            {item.discountedPrice && (
              <span className="ml-2 text-sm text-red-600 line-through">
                ₹{formatPrice(item.discountedPrice)}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={handleEdit}
          className="p-1 text-blue-600 hover:text-blue-800 rounded"
          title="Edit Item"
        >
          <PencilIcon className="w-5 h-5" />
        </button>
        <button
          onClick={handleDelete}
          className="p-1 text-red-600 hover:text-red-800 rounded"
          title="Delete Item"
        >
          <TrashIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
