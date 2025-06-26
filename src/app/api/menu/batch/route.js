import { connectToDB } from '@/lib/mongodb';
import Menu from '@/models/Menu';

// POST route to add multiple items at once
export async function POST(request) {
  try {
    const { restaurantId, categoryId, items } = await request.json();
    
    if (!restaurantId || !categoryId || !items || !Array.isArray(items) || items.length === 0) {
      return Response.json({ message: 'Restaurant ID, category ID, and items array are required' }, { status: 400 });
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
    
    // Add all items to the category
    const startPosition = menu.categories[categoryIndex].items.length;
    
    const newItems = items.map((item, index) => ({
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
      position: startPosition + index,
      variants: item.variants || [],
      options: item.options || []
    }));
    
    menu.categories[categoryIndex].items.push(...newItems);
    menu.updatedAt = Date.now();
    
    await menu.save();
    
    return Response.json({
      message: `${items.length} items added successfully`,
      items: newItems
    }, { status: 201 });
  } catch (error) {
    console.error('Error adding items in batch:', error);
    return Response.json({ message: 'Server error' }, { status: 500 });
  }
}

// PUT route to update item positions (reordering)
export async function PUT(request) {
  try {
    const { restaurantId, categoryId, itemPositions } = await request.json();
    
    if (!restaurantId || !categoryId || !itemPositions || !Array.isArray(itemPositions)) {
      return Response.json({ message: 'Restaurant ID, category ID, and itemPositions array are required' }, { status: 400 });
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
    
    // Update positions for each item
    for (const posUpdate of itemPositions) {
      const itemIndex = menu.categories[categoryIndex].items.findIndex(
        item => item._id.toString() === posUpdate.itemId
      );
      
      if (itemIndex !== -1) {
        menu.categories[categoryIndex].items[itemIndex].position = posUpdate.position;
      }
    }
    
    menu.updatedAt = Date.now();
    
    await menu.save();
    
    return Response.json({ message: 'Item positions updated successfully' });
  } catch (error) {
    console.error('Error updating item positions:', error);
    return Response.json({ message: 'Server error' }, { status: 500 });
  }
}
