import { connectToDB } from '@/lib/mongodb';
import Menu from '@/models/Menu';
import Restaurant from '@/models/Restaurant';

export async function POST(request) {
  try {
    const { restaurantId, name, description, items } = await request.json();

    if (!restaurantId || !name || !description || !items || items.length === 0) {
      return new Response(JSON.stringify({ message: 'All fields are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await connectToDB();

    const existingRestaurant = await Restaurant.findById(restaurantId);
    if (!existingRestaurant) {
      return new Response(JSON.stringify({ message: 'Restaurant not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const newMenu = await Menu.create({
      restaurantId,
      name,
      description,
      items,
    });

    return new Response(JSON.stringify({
      message: 'Menu created successfully',
      menu: newMenu,
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error creating menu:', error);
    return new Response(JSON.stringify({ message: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
