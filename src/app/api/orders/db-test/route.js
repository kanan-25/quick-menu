import { connectToDB } from '@/lib/mongodb';

export async function GET() {
  try {
    console.log('Testing database connection...');
    console.log('MongoDB URI exists:', !!process.env.MONGODB_URI);
    console.log('MongoDB URI preview:', process.env.MONGODB_URI?.substring(0, 20) + '...');
    
    await connectToDB();
    console.log('Database connection successful');
    
    return Response.json({
      success: true,
      message: 'Database connection successful'
    });
    
  } catch (error) {
    console.error('Database connection failed:', error);
    return Response.json({
      success: false,
      message: 'Database connection failed',
      error: error.message
    }, { status: 500 });
  }
}
