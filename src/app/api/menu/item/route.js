import { connectToDB } from '@/lib/mongodb';
import Menu from '@/models/Menu';

// POST route to add a new item to a category
export async function POST(request) {
  try {
    const { restaurantId, categoryId, item } = await request.json();

    if (!restaurantId || !categoryId || !item || !item.name || item.price === undefined) {
      return Response.json({ message: 'Restaurant ID, category ID, item name, and price are required' }, { status: 400 });
    }

    await connectToDB();

    // Find the menu
    const menu = await Menu.findOne({ restaurantId });

    if (!menu) {
      return Response.json({ message: 'Menu not found' }, { status: 404 });
    }

    // Find the category
    const categoryIndex = menu.categories.findIndex(cat => cat._id.toString() === categoryId);

    if (categoryIndex === -1) {
      return Response.json({ message: 'Category not found' }, { status: 404 });
    }

    // Add the new item to the category
    const newItem = {
      name: item.name,
      description: item.description || '',
      price: item.price,
      discountedPrice: item.discountedPrice,
      image: item.image || '',
      isAvailable: item.isAvailable !== undefined ? item.isAvailable : true,
      isPopular: item.isPopular || false,
      isVegetarian: item.isVegetarian || false,
      isVegan: item.isVegan || false,
      isGlutenFree: item.isGlutenFree || false,
      allergens: item.allergens || [],
      nutritionalInfo: item.nutritionalInfo || {},
      position: menu.categories[categoryIndex].items.length, // Position at the end
      variants: item.variants || [],
      options: item.options || []
    };

    menu.categories[categoryIndex].items.push(newItem);
    menu.updatedAt = Date.now();

    await menu.save();

    return Response.json({
      message: 'Item added successfully',
      item: menu.categories[categoryIndex].items[menu.categories[categoryIndex].items.length - 1]
    }, { status: 201 });
  } catch (error) {
    console.error('Error adding item:', error);
    return Response.json({ message: 'Server error' }, { status: 500 });
  }
}

// PUT route to update an item
export async function PUT(request) {
  try {
    const { restaurantId, categoryId, itemId, updates } = await request.json();

    if (!restaurantId || !categoryId || !itemId) {
      return Response.json({ message: 'Restaurant ID, category ID, and item ID are required' }, { status: 400 });
    }

    await connectToDB();

    // Find the menu
    const menu = await Menu.findOne({ restaurantId });

    if (!menu) {
      return Response.json({ message: 'Menu not found' }, { status: 404 });
    }

    // Find the category
    const categoryIndex = menu.categories.findIndex(cat => cat._id.toString() === categoryId);

    if (categoryIndex === -1) {
      return Response.json({ message: 'Category not found' }, { status: 404 });
    }

    // Find the item
    const itemIndex = menu.categories[categoryIndex].items.findIndex(item => item._id.toString() === itemId);

    if (itemIndex === -1) {
      return Response.json({ message: 'Item not found' }, { status: 404 });
    }

    // Update the item
    const item = menu.categories[categoryIndex].items[itemIndex];

    // Update fields if provided
    if (updates.name) item.name = updates.name;
    if (updates.description !== undefined) item.description = updates.description;
    if (updates.price !== undefined) item.price = updates.price;
    if (updates.discountedPrice !== undefined) item.discountedPrice = updates.discountedPrice;
    if (updates.image !== undefined) item.image = updates.image;
    if (updates.isAvailable !== undefined) item.isAvailable = updates.isAvailable;
    if (updates.isPopular !== undefined) item.isPopular = updates.isPopular;
    if (updates.isVegetarian !== undefined) item.isVegetarian = updates.isVegetarian;
    if (updates.isVegan !== undefined) item.isVegan = updates.isVegan;
    if (updates.isGlutenFree !== undefined) item.isGlutenFree = updates.isGlutenFree;
    if (updates.allergens) item.allergens = updates.allergens;
    if (updates.nutritionalInfo) item.nutritionalInfo = updates.nutritionalInfo;
    if (updates.position !== undefined) item.position = updates.position;
    if (updates.variants) item.variants = updates.variants;
    if (updates.options) item.options = updates.options;

    item.updatedAt = Date.now();
    menu.updatedAt = Date.now();

    await menu.save();

    return Response.json({
      message: 'Item updated successfully',
      item: menu.categories[categoryIndex].items[itemIndex]
    });
  } catch (error) {
    console.error('Error updating item:', error);
    return Response.json({ message: 'Server error' }, { status: 500 });
  }
}

// DELETE route to remove an item
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const restaurantId = searchParams.get('restaurantId');
    const categoryId = searchParams.get('categoryId');
    const itemId = searchParams.get('itemId');

    if (!restaurantId || !categoryId || !itemId) {
      return Response.json({ message: 'Restaurant ID, category ID, and item ID are required' }, { status: 400 });
    }

    // Log the parameters for debugging
    console.log('Delete item request:', { restaurantId, categoryId, itemId });

    await connectToDB();

    // Find the menu
    const menu = await Menu.findOne({ restaurantId });

    if (!menu) {
      console.log('Menu not found for restaurantId:', restaurantId);
      return Response.json({ message: 'Menu not found' }, { status: 404 });
    }

    // Find the category - ensure string comparison
    const categoryIndex = menu.categories.findIndex(cat =>
      cat._id.toString() === categoryId.toString()
    );

    if (categoryIndex === -1) {
      console.log('Category not found:', categoryId);
      console.log('Available categories:', menu.categories.map(c => c._id.toString()));
      return Response.json({ message: 'Category not found' }, { status: 404 });
    }

    // Find and remove the item - ensure string comparison
    const itemIndex = menu.categories[categoryIndex].items.findIndex(item =>
      item._id.toString() === itemId.toString()
    );

    if (itemIndex === -1) {
      console.log('Item not found:', itemId);
      console.log('Available items:', menu.categories[categoryIndex].items.map(i => i._id.toString()));
      return Response.json({ message: 'Item not found' }, { status: 404 });
    }

    // Remove the item
    menu.categories[categoryIndex].items.splice(itemIndex, 1);
    menu.updatedAt = Date.now();

    await menu.save();

    console.log('Item deleted successfully');
    return Response.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error);
    return Response.json({ message: error.message || 'Server error' }, { status: 500 });
  }
}
