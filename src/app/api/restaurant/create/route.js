import { connectToDB } from '@/lib/mongodb';
import Menu from '@/models/Menu';
import Restaurant from '@/models/Restaurant';
export async function POST(request) {
  try {
    const { restaurantId, name, description, items } = await request.json();
    if (!restaurantId || !name || !description || !items || items.length === 0) {
      return Response.json({ message: 'All fields are required' }, { status: 400 });
    }

    await connectToDB();

    // Check if the restaurant exists
    const existingRestaurant = await Restaurant.findById(restaurantId);
    if (!existingRestaurant) {
      return Response.json({ message: 'Restaurant not found' }, { status: 404 });
    }

    // Create a new menu
    const newMenu = await Menu.create({
      restaurantId,
      name,
      description,
      items,
    });

    return Response.json(
      {
        message: 'Menu created successfully',
        menu: newMenu,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating menu:', error);
    return Response.json({ message: 'Server error' }, { status: 500 });
  }
}
