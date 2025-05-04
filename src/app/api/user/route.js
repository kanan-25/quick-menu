import { connectToDB } from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(request) {
  try {
    const { email } = await request.json();  // Get the email from the request body

    if (!email) {
      return new Response(JSON.stringify({ message: 'Email is required' }), { status: 400 });
    }

    await connectToDB();  // Ensure the DB connection is made

    const user = await User.findOne({ email });  // Search for the user by their email

    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(user), { status: 200 });  // Return the user data
  } catch (error) {
    console.error('Database error:', error);
    return new Response(JSON.stringify({ message: 'Error fetching user' }), { status: 500 });
  }
}
