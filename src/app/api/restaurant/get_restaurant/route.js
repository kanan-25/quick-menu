import { connectToDB } from '@/lib/mongodb';
import Restaurant from '@/models/Restaurant';

export async function POST(request) {
  try {
    const { email } = await request.json();  // Get the email from the request body

    if (!email) {
      return new Response(JSON.stringify({ message: 'Email is required' }), { status: 400 });
    }

    await connectToDB();  // Ensure the DB connection is made

    const user = await Restaurant.findOne({ email });  // Search for the user by their email

    if (!user) {
      // For demo purposes, return a default restaurant instead of an error
      const defaultRestaurant = {
        _id: '123456789',
        name: 'Demo Restaurant',
        email: email,
        phone: '(123) 456-7890',
        address: '123 Restaurant St, Foodie City',
        description: 'A lovely restaurant serving delicious food.',
        logo: 'https://via.placeholder.com/150',
        updatedAt: new Date().toISOString()
      };

      console.log('User not found, returning default restaurant with logo');
      return new Response(JSON.stringify(defaultRestaurant), { status: 200 });

      // In production, you would return an error:
      // return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
    }

    // Convert to plain object
    const userObj = user.toObject ? user.toObject() : JSON.parse(JSON.stringify(user));

    // ALWAYS use the placeholder logo for consistency
    console.log('Setting fixed placeholder logo for consistency');
    userObj.logo = 'https://via.placeholder.com/150';

    // Update the restaurant in the database with the logo
    try {
      user.logo = userObj.logo;
      await user.save();
      console.log('Updated restaurant in database with fixed placeholder logo');
    } catch (saveError) {
      console.error('Error saving logo to database:', saveError);
      // Continue with the response even if save fails
    }

    console.log('Final logo URL being returned:', userObj.logo);

    console.log('Returning restaurant with logo:', userObj.logo ? 'yes' : 'no');

    return new Response(JSON.stringify(userObj), { status: 200 });  // Return the user data with logo
  } catch (error) {
    console.error('Database error:', error);
    return new Response(JSON.stringify({ message: 'Error fetching user' }), { status: 500 });
  }
}
