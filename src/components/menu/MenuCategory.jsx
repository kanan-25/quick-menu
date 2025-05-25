'use client';

import { useState } from 'react';
import MenuItem from './MenuItem';
import { PlusIcon, PencilIcon, TrashIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

export default function MenuCategory({
  category,
  onAddItem,
  onEditCategory,
  onDeleteCategory,
  onEditItem,
  onDeleteItem,
  onReorderItems
}) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);
  const [items, setItems] = useState(category?.items || []);

  // Sort items by position
  const sortedItems = [...items].sort((a, b) => a.position - b.position);

  const handleAddItem = () => {
    onAddItem(category._id);
  };

  const handleEditCategory = () => {
    onEditCategory(category);
  };

  const handleDeleteCategory = () => {
    if (window.confirm(`Are you sure you want to delete the category "${category.name}"?`)) {
      onDeleteCategory(category._id);
    }
  };

  const handleDragStart = (e, item) => {
    setIsDragging(true);
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', item._id);

    // Add a class to the dragged element
    e.target.classList.add('dragging');
  };

  const handleDragOver = (e, targetItem) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';

    if (!draggedItem || draggedItem._id === targetItem._id) return;

    // Add a class to the target element
    e.currentTarget.classList.add('drag-over');
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('drag-over');
  };

  const handleDrop = (e, targetItem) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');

    if (!draggedItem || draggedItem._id === targetItem._id) return;

    // Reorder items
    const newItems = [...items];
    const draggedIndex = newItems.findIndex(item => item._id === draggedItem._id);
    const targetIndex = newItems.findIndex(item => item._id === targetItem._id);

    // Update positions
    const draggedPosition = newItems[draggedIndex].position;
    newItems[draggedIndex].position = newItems[targetIndex].position;
    newItems[targetIndex].position = draggedPosition;

    // Update state
    setItems(newItems);

    // Notify parent component
    const itemPositions = [
      { itemId: draggedItem._id, position: newItems[targetIndex].position },
      { itemId: targetItem._id, position: draggedPosition }
    ];

    onReorderItems(category._id, itemPositions);
  };

  const handleDragEnd = (e) => {
    setIsDragging(false);
    setDraggedItem(null);
    e.target.classList.remove('dragging');
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
      {/* Category Header */}
      <div className="bg-gray-100 p-4 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mr-2 text-gray-500 hover:text-gray-700"
          >
            {isExpanded ? (
              <ChevronUpIcon className="w-5 h-5" />
            ) : (
              <ChevronDownIcon className="w-5 h-5" />
            )}
          </button>
          <h3 className="text-xl font-semibold text-gray-800">{category.name}</h3>
          {!category.isAvailable && (
            <span className="ml-2 text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
              Not Available
            </span>
          )}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleAddItem}
            className="p-1 text-green-600 hover:text-green-800 rounded"
            title="Add Item"
          >
            <PlusIcon className="w-5 h-5" />
          </button>
          <button
            onClick={handleEditCategory}
            className="p-1 text-blue-600 hover:text-blue-800 rounded"
            title="Edit Category"
          >
            <PencilIcon className="w-5 h-5" />
          </button>
          <button
            onClick={handleDeleteCategory}
            className="p-1 text-red-600 hover:text-red-800 rounded"
            title="Delete Category"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Category Items */}
      {isExpanded && (
        <div className="p-4">
          {category.description && (
            <p className="text-gray-600 mb-4">{category.description}</p>
          )}

          {sortedItems.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              No items in this category. Click the + button to add an item.
            </p>
          ) : (
            <div className="space-y-4">
              {sortedItems.map(item => (
                <div
                  key={item._id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item)}
                  onDragOver={(e) => handleDragOver(e, item)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, item)}
                  onDragEnd={handleDragEnd}
                  className={`border rounded-lg p-2 cursor-move ${
                    isDragging && draggedItem?._id === item._id ? 'opacity-50' : ''
                  }`}
                >
                  <MenuItem
                    item={item}
                    categoryId={category._id}
                    onEdit={onEditItem}
                    onDelete={onDeleteItem}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
