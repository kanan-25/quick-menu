import { connectToDB } from '@/lib/mongodb';
import Restaurant from '@/models/Restaurant';

export async function POST(request) {
  try {
    const {
      name,
      email,
      phone,
      address,
      logo,
      description
    } = await request.json();

    // Basic validation
    if (!name || !email || !phone || !address) {
      return Response.json({ message: 'All required fields must be filled' }, { status: 400 });
    }

    await connectToDB();

    // Check for existing restaurant by email
    const existing = await Restaurant.findOne({ email });
    if (existing) {
      return Response.json({ message: 'Restaurant already exists with this email' }, { status: 409 });
    }

    
    const newRestaurant = await Restaurant.create({
      name,
      email,
      phone,
      address,
      logo: logo || '',
      description: description || '',
    });

    return Response.json({
      message: 'Restaurant created successfully',
      restaurant: {
        id: newRestaurant._id,
        name: newRestaurant.name,
        email: newRestaurant.email,
        phone: newRestaurant.phone,
        address: newRestaurant.address,
        logo: newRestaurant.logo,
        description: newRestaurant.description,
      }
    }, { status: 201 });

  } catch (error) {
    console.log('Create Restaurant Error:', error);
    return Response.json({ message: 'Server error' }, { status: 500 });
  }
}
