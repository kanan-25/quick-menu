import { connectToDB } from '@/lib/mongodb';
import Restaurant from '@/models/Restaurant';

export async function POST(request) {
  try {
    console.log('=== Restaurant API Called ===');
    
    const { email } = await request.json();
    console.log('Searching for restaurant with email:', email);

    if (!email) {
      return Response.json({ message: 'Email is required' }, { status: 400 });
    }

    await connectToDB();
    console.log('Database connected successfully');

    // Search for restaurant
    let restaurant = await Restaurant.findOne({ email });
    console.log('Database query result:', restaurant ? 'Found restaurant' : 'No restaurant found');

    if (!restaurant) {
      console.log('No restaurant found, creating default restaurant');
      // Create a default restaurant if none exists
      restaurant = await Restaurant.create({
        name: 'My Restaurant',
        email: email,
        phone: '',
        address: '',
        description: '',
        logo: '/Quick_menu.png'
      });
      console.log('Default restaurant created:', restaurant);
    }

    // Convert to plain object and ensure all fields are present
    const restaurantData = {
      _id: restaurant._id.toString(),
      name: restaurant.name || 'My Restaurant',
      email: restaurant.email,
      phone: restaurant.phone || '',
      address: restaurant.address || '',
      description: restaurant.description || '',
      logo: restaurant.logo || '/Quick_menu.png',
      createdAt: restaurant.createdAt,
      updatedAt: restaurant.updatedAt
    };

    console.log('Returning restaurant data:', restaurantData);
    return Response.json(restaurantData, { status: 200 });

  } catch (error) {
    console.error('Restaurant API Error:', error);
    return Response.json({ 
      message: 'Failed to fetch restaurant',
      error: error.message 
    }, { status: 500 });
  }
}
