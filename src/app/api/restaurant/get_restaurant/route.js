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
      console.log('Creating new restaurant for email:', email);
      
      const newRestaurant = new Restaurant({
        name: 'My Restaurant',
        email: email,
        phone: '(000) 000-0000',
        address: 'Update your address',
        description: 'Update your restaurant description',
        logo: 'https://via.placeholder.com/150'
      });

      try {
        restaurant = await newRestaurant.save();
        console.log('New restaurant created successfully:', restaurant._id);
      } catch (saveError) {
        console.error('Failed to save new restaurant:', saveError);
        
        // Return default data
        return Response.json({
          _id: 'temp_' + Date.now(),
          name: 'My Restaurant',
          email: email,
          phone: '(000) 000-0000',
          address: 'Update your address',
          description: 'Update your restaurant description',
          logo: 'https://via.placeholder.com/150',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      }
    }

    const restaurantObj = restaurant.toObject();
    console.log('Returning restaurant data:', {
      id: restaurantObj._id,
      name: restaurantObj.name,
      email: restaurantObj.email
    });

    return Response.json(restaurantObj);

  } catch (error) {
    console.error('API Error:', error);
    return Response.json({ 
      message: 'Internal server error', 
      error: error.message 
    }, { status: 500 });
  }
}
