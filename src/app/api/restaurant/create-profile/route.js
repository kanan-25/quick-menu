import { connectToDB } from '@/lib/mongodb';
import Restaurant from '@/models/Restaurant';

export async function POST(request) {
  try {
    const { name, email, phone, address, logo, description } = await request.json();

    // Validate required fields
    if (!name || !email || !phone || !address) {
      return Response.json({ message: 'Name, email, phone, and address are required' }, { status: 400 });
    }

    await connectToDB();

    // Check if restaurant with this email already exists
    const existingRestaurant = await Restaurant.findOne({ email });
    if (existingRestaurant) {
      return Response.json({ message: 'Restaurant with this email already exists' }, { status: 409 });
    }

    // Create a new restaurant
    const newRestaurant = await Restaurant.create({
      name,
      email,
      phone,
      address,
      logo: logo || '', // Optional field
      description: description || '', // Optional field
    });

    // Convert the Mongoose document to a plain object
    const restaurantObj = newRestaurant.toObject ? newRestaurant.toObject() : JSON.parse(JSON.stringify(newRestaurant));

    // Ensure _id is a string
    const restaurantId = restaurantObj._id.toString();

    return Response.json(
      {
        message: 'Restaurant created successfully',
        restaurant: restaurantObj,
        restaurantId: restaurantId,
        _id: restaurantId // Include both formats for compatibility
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating restaurant:', error);
    return Response.json({ message: 'Server error' }, { status: 500 });
  }
}
