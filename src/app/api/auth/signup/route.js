import { connectToDB } from '@/lib/mongodb';
import User from '@/models/User';
import Restaurant from '@/models/Restaurant';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return Response.json({ message: 'All fields are required' }, { status: 400 });
    }

    await connectToDB();

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return Response.json({ message: 'User already exists' }, { status: 409 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Create basic restaurant profile (without complete details)
    const newRestaurant = await Restaurant.create({
      name: name, // Use the user's name as initial restaurant name
      email: email,
      phone: '',
      address: '',
      description: '',
      logo: '/Quick_menu.png', // Default logo
    });

    // Don't generate JWT token - user needs to login
    return Response.json(
      {
        message: 'Account created successfully! Please login to continue.',
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return Response.json({ message: 'Server error' }, { status: 500 });
  }
}
