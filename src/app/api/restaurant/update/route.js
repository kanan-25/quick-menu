import { connectToDB } from '@/lib/mongodb';
import Restaurant from '@/models/Restaurant';

export async function PUT(request) {
  try {
    const { restaurantId, updates } = await request.json();
    
    console.log('Updating restaurant:', restaurantId, updates);

    if (!restaurantId) {
      return Response.json({ message: 'Restaurant ID is required' }, { status: 400 });
    }

    await connectToDB();

    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      { 
        ...updates,
        updatedAt: new Date()
      },
      { new: true, runValidators: true }
    );

    if (!updatedRestaurant) {
      return Response.json({ message: 'Restaurant not found' }, { status: 404 });
    }

    console.log('Restaurant updated successfully:', updatedRestaurant);

    return Response.json({
      message: 'Restaurant updated successfully',
      restaurant: updatedRestaurant
    }, { status: 200 });

  } catch (error) {
    console.error('Error updating restaurant:', error);
    return Response.json({
      message: 'Failed to update restaurant',
      error: error.message
    }, { status: 500 });
  }
}
