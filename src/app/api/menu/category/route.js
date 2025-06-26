import { connectToDB } from '@/lib/mongodb';
import Menu from '@/models/Menu';

// POST route to add a new category
export async function POST(request) {
  try {
    const { restaurantId, category } = await request.json();
    
    if (!restaurantId || !category || !category.name) {
      return Response.json({ message: 'Restaurant ID and category name are required' }, { status: 400 });
    }
    
    await connectToDB();
    
    // Find the menu for this restaurant
    let menu = await Menu.findOne({ restaurantId });
    
    if (!menu) {
      // Create a new menu if none exists
      menu = await Menu.create({
        restaurantId,
        name: 'Default Menu',
        description: 'Your restaurant menu',
        categories: [],
        items: []
      });
    }
    
    // Add the new category
    menu.categories.push({
      name: category.name,
      description: category.description || '',
      position: menu.categories.length, // Position at the end
      isAvailable: category.isAvailable !== undefined ? category.isAvailable : true,
      items: []
    });
    
    await menu.save();
    
    return Response.json({
      message: 'Category added successfully',
      category: menu.categories[menu.categories.length - 1],
      menu
    }, { status: 201 });
  } catch (error) {
    console.error('Error adding category:', error);
    return Response.json({ message: 'Server error' }, { status: 500 });
  }
}

// PUT route to update a category
export async function PUT(request) {
  try {
    const { restaurantId, categoryId, updates } = await request.json();
    
    if (!restaurantId || !categoryId) {
      return Response.json({ message: 'Restaurant ID and category ID are required' }, { status: 400 });
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
    
    // Update the category
    if (updates.name) menu.categories[categoryIndex].name = updates.name;
    if (updates.description !== undefined) menu.categories[categoryIndex].description = updates.description;
    if (updates.position !== undefined) menu.categories[categoryIndex].position = updates.position;
    if (updates.isAvailable !== undefined) menu.categories[categoryIndex].isAvailable = updates.isAvailable;
    
    menu.categories[categoryIndex].updatedAt = Date.now();
    
    await menu.save();
    
    return Response.json({
      message: 'Category updated successfully',
      category: menu.categories[categoryIndex]
    });
  } catch (error) {
    console.error('Error updating category:', error);
    return Response.json({ message: 'Server error' }, { status: 500 });
  }
}

// DELETE route to remove a category
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const restaurantId = searchParams.get('restaurantId');
    const categoryId = searchParams.get('categoryId');
    
    if (!restaurantId || !categoryId) {
      return Response.json({ message: 'Restaurant ID and category ID are required' }, { status: 400 });
    }
    
    await connectToDB();
    
    // Find the menu
    const menu = await Menu.findOne({ restaurantId });
    
    if (!menu) {
      return Response.json({ message: 'Menu not found' }, { status: 404 });
    }
    
    // Find and remove the category
    const categoryIndex = menu.categories.findIndex(cat => cat._id.toString() === categoryId);
    
    if (categoryIndex === -1) {
      return Response.json({ message: 'Category not found' }, { status: 404 });
    }
    
    // Remove the category
    menu.categories.splice(categoryIndex, 1);
    
    await menu.save();
    
    return Response.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    return Response.json({ message: 'Server error' }, { status: 500 });
  }
}
