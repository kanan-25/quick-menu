import { connectToDB } from '@/lib/mongodb';
import Restaurant from '@/models/Restaurant';

export async function PUT(request) {
  try {
    const { restaurantId, updates } = await request.json();

    console.log('Updating restaurant with ID:', restaurantId);
    console.log('Updates:', {
      name: updates.name,
      logo: updates.logo ? (updates.logo.substring(0, 50) + '...') : 'none'
    });

    if (!restaurantId) {
      return Response.json({ message: 'Restaurant ID is required' }, { status: 400 });
    }

    await connectToDB();

    // Find the restaurant
    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      console.log('Restaurant not found with ID:', restaurantId);
      return Response.json({ message: 'Restaurant not found' }, { status: 404 });
    }

    // Update the restaurant
    Object.keys(updates).forEach(key => {
      // For logo, ensure we're using the local image file
      if (key === 'logo') {
        restaurant[key] = '/Quick_menu.png';
      } else {
        restaurant[key] = updates[key];
      }
    });

    // Save the updated restaurant
    await restaurant.save();

    console.log('Restaurant updated successfully');

    // Convert to plain object for response
    const updatedRestaurant = restaurant.toObject ? restaurant.toObject() : JSON.parse(JSON.stringify(restaurant));

    return Response.json({
      message: 'Restaurant updated successfully',
      restaurant: updatedRestaurant
    });
  } catch (error) {
    console.error('Error updating restaurant:', error);
    return Response.json({ message: 'Server error' }, { status: 500 });
  }
}
