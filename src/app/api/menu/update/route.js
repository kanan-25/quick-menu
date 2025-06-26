import { connectToDB } from '@/lib/mongodb';
import Menu from '@/models/Menu';
import Restaurant from '@/models/Restaurant';

export async function POST(request) {
  try {
    const { restaurantId, menu } = await request.json();
    
    if (!restaurantId) {
      return Response.json({ message: 'Restaurant ID is required' }, { status: 400 });
    }
    
    await connectToDB();
    
    // Check if the restaurant exists
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return Response.json({ message: 'Restaurant not found' }, { status: 404 });
    }
    
    // Check if a menu already exists for this restaurant
    let existingMenu = await Menu.findOne({ restaurantId });
    
    if (existingMenu) {
      // Update existing menu
      existingMenu.name = menu.name || existingMenu.name;
      existingMenu.description = menu.description || existingMenu.description;
      existingMenu.isActive = menu.isActive !== undefined ? menu.isActive : existingMenu.isActive;
      
      // Update categories if provided
      if (menu.categories && menu.categories.length > 0) {
        existingMenu.categories = menu.categories;
      }
      
      // Update items if provided (legacy support)
      if (menu.items && menu.items.length > 0) {
        existingMenu.items = menu.items;
      }
      
      existingMenu.updatedAt = Date.now();
      
      await existingMenu.save();
      
      return Response.json({
        message: 'Menu updated successfully',
        menu: existingMenu
      });
    } else {
      // Create new menu
      const newMenu = await Menu.create({
        restaurantId,
        name: menu.name || 'Default Menu',
        description: menu.description || 'Your restaurant menu',
        isActive: menu.isActive !== undefined ? menu.isActive : true,
        categories: menu.categories || [],
        items: menu.items || []
      });
      
      return Response.json({
        message: 'Menu created successfully',
        menu: newMenu
      }, { status: 201 });
    }
  } catch (error) {
    console.error('Error updating menu:', error);
    return Response.json({ message: 'Server error' }, { status: 500 });
  }
}
