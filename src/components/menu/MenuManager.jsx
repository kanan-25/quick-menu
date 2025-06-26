'use client';

import { useState, useEffect } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import MenuCategory from './MenuCategory';
import CategoryForm from './CategoryForm';
import ItemForm from './ItemForm';

export default function MenuManager({ restaurantId }) {
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const [showItemForm, setShowItemForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  // Fetch the restaurant's menu
  const fetchMenu = async () => {
    setLoading(true);
    setError(null);

    console.log('Fetching menu for restaurant ID:', restaurantId);

    // Default menu to use as fallback
    const defaultMenu = {
      restaurantId: restaurantId || '123456789',
      name: 'Default Menu',
      description: 'Your restaurant menu',
      categories: []
    };

    // If no restaurant ID, use the default menu
    if (!restaurantId) {
      console.warn('Restaurant ID is missing, using default menu');
      setMenu(defaultMenu);
      setLoading(false);
      return;
    }

    try {
      // First, try to create a menu if it doesn't exist
      try {
        console.log('Attempting to create/initialize menu for restaurant ID:', restaurantId);
        const initRes = await fetch(`/api/menu/initialize`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ restaurantId }),
        });

        console.log('Menu initialization response status:', initRes.status);
      } catch (initError) {
        console.warn('Error initializing menu (non-critical):', initError);
        // Continue with fetching - this is just a precaution
      }

      // Attempt to fetch the menu
      const res = await fetch(`/api/menu/restaurant/${restaurantId}`);
      console.log('Menu API response status:', res.status);

      // Try to parse the response as JSON
      let data;
      try {
        data = await res.json();
        console.log('Menu API response data:', data);
      } catch (jsonError) {
        console.error('Failed to parse JSON response:', jsonError);
        // Use default menu if JSON parsing fails
        setMenu(defaultMenu);
        setLoading(false);
        return;
      }

      // Check if the data has the expected structure
      if (data && typeof data === 'object') {
        // Ensure the data has categories
        if (!data.categories) {
          data.categories = [];
        }

        // Use the data from the API
        setMenu(data);
      } else {
        console.warn('API returned unexpected data structure, using default');
        setMenu(defaultMenu);
      }
    } catch (error) {
      console.error('Error fetching menu:', error);
      // Use default menu on any error
      setMenu(defaultMenu);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Always call fetchMenu - it has internal handling for missing restaurantId
    fetchMenu();

    // Log the restaurant ID for debugging
    console.log('MenuManager received restaurantId:', restaurantId);
  }, [restaurantId]);

  // Handle adding a new category
  const handleAddCategory = () => {
    setEditingCategory(null);
    setShowCategoryForm(true);
  };

  // Handle editing a category
  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setShowCategoryForm(true);
  };

  // Handle saving a category
  const handleSaveCategory = async (categoryData) => {
    try {
      if (categoryData._id) {
        // Update existing category
        const res = await fetch('/api/menu/category', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            restaurantId,
            categoryId: categoryData._id,
            updates: categoryData
          }),
        });

        if (!res.ok) {
          throw new Error('Failed to update category');
        }

        // Update local state
        setMenu(prevMenu => ({
          ...prevMenu,
          categories: prevMenu.categories.map(cat =>
            cat._id === categoryData._id ? { ...cat, ...categoryData } : cat
          )
        }));
      } else {
        // Add new category
        const res = await fetch('/api/menu/category', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            restaurantId,
            category: categoryData
          }),
        });

        if (!res.ok) {
          throw new Error('Failed to add category');
        }

        const data = await res.json();

        // Update local state
        setMenu(prevMenu => ({
          ...prevMenu,
          categories: [...prevMenu.categories, data.category]
        }));
      }

      setShowCategoryForm(false);
    } catch (error) {
      console.error('Error saving category:', error);
      alert(error.message);
    }
  };

  // Handle deleting a category
  const handleDeleteCategory = async (categoryId) => {
    try {
      const res = await fetch(`/api/menu/category?restaurantId=${restaurantId}&categoryId=${categoryId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete category');
      }

      // Update local state
      setMenu(prevMenu => ({
        ...prevMenu,
        categories: prevMenu.categories.filter(cat => cat._id !== categoryId)
      }));
    } catch (error) {
      console.error('Error deleting category:', error);
      alert(error.message);
    }
  };

  // Handle adding a new item
  const handleAddItem = (categoryId) => {
    setEditingItem(null);
    setSelectedCategoryId(categoryId);
    setShowItemForm(true);
  };

  // Handle editing an item
  const handleEditItem = (categoryId, item) => {
    setEditingItem(item);
    setSelectedCategoryId(categoryId);
    setShowItemForm(true);
  };

  // Handle saving an item
  const handleSaveItem = async (categoryId, itemData) => {
    try {
      if (itemData._id) {
        // Update existing item
        const res = await fetch('/api/menu/item', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            restaurantId,
            categoryId,
            itemId: itemData._id,
            updates: itemData
          }),
        });

        if (!res.ok) {
          throw new Error('Failed to update item');
        }

        // Update local state
        setMenu(prevMenu => ({
          ...prevMenu,
          categories: prevMenu.categories.map(cat => {
            if (cat._id === categoryId) {
              return {
                ...cat,
                items: cat.items.map(item =>
                  item._id === itemData._id ? { ...item, ...itemData } : item
                )
              };
            }
            return cat;
          })
        }));
      } else {
        // Add new item
        const res = await fetch('/api/menu/item', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            restaurantId,
            categoryId,
            item: itemData
          }),
        });

        if (!res.ok) {
          throw new Error('Failed to add item');
        }

        const data = await res.json();

        // Update local state
        setMenu(prevMenu => ({
          ...prevMenu,
          categories: prevMenu.categories.map(cat => {
            if (cat._id === categoryId) {
              return {
                ...cat,
                items: [...cat.items, data.item]
              };
            }
            return cat;
          })
        }));
      }

      setShowItemForm(false);
    } catch (error) {
      console.error('Error saving item:', error);
      alert(error.message);
    }
  };

  // Handle deleting an item
  const handleDeleteItem = async (categoryId, itemId) => {
    try {
      // Log the IDs for debugging
      console.log('Deleting item:', { restaurantId, categoryId, itemId });

      const res = await fetch(`/api/menu/item?restaurantId=${restaurantId}&categoryId=${categoryId}&itemId=${itemId}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to delete item');
      }

      // Update local state - convert IDs to strings for comparison
      setMenu(prevMenu => ({
        ...prevMenu,
        categories: prevMenu.categories.map(cat => {
          // Convert to string for comparison
          if (cat._id.toString() === categoryId.toString()) {
            return {
              ...cat,
              items: cat.items.filter(item => item._id.toString() !== itemId.toString())
            };
          }
          return cat;
        })
      }));

      console.log('Item deleted successfully');
    } catch (error) {
      console.error('Error deleting item:', error);
      alert(`Error: ${error.message}`);
    }
  };

  // Handle reordering items
  const handleReorderItems = async (categoryId, itemPositions) => {
    try {
      const res = await fetch('/api/menu/batch', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          restaurantId,
          categoryId,
          itemPositions
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to reorder items');
      }
    } catch (error) {
      console.error('Error reordering items:', error);
      alert(error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Menu Management</h1>
        <div className="flex space-x-4">
          <a
            href={`/template?id=${restaurantId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View Menu
          </a>
          <button
            onClick={handleAddCategory}
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            <PlusIcon className="w-5 h-5 mr-1" />
            Add Category
          </button>
        </div>
      </div>

      {menu && menu.categories && menu.categories.length === 0 ? (
        <div className="bg-gray-100 rounded-lg p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">No Categories Yet</h2>
          <p className="text-gray-600 mb-6">
            Start by adding a category to your menu, such as "Appetizers", "Main Courses", or "Desserts".
          </p>
          <button
            onClick={handleAddCategory}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md"
          >
            Add Your First Category
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {menu && menu.categories && menu.categories.map(category => (
            <MenuCategory
              key={category._id}
              category={category}
              onAddItem={handleAddItem}
              onEditCategory={() => handleEditCategory(category)}
              onDeleteCategory={handleDeleteCategory}
              onEditItem={handleEditItem}
              onDeleteItem={handleDeleteItem}
              onReorderItems={handleReorderItems}
            />
          ))}
        </div>
      )}

      {showCategoryForm && (
        <CategoryForm
          category={editingCategory}
          onSave={handleSaveCategory}
          onCancel={() => setShowCategoryForm(false)}
        />
      )}

      {showItemForm && (
        <ItemForm
          categoryId={selectedCategoryId}
          item={editingItem}
          onSave={handleSaveItem}
          onCancel={() => setShowItemForm(false)}
        />
      )}
    </div>
  );
}
