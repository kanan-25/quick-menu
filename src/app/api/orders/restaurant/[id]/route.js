import { connectToDB } from '@/lib/mongodb';
import Order from '@/models/Order';
import mongoose from 'mongoose';

// GET - Fetch all orders for a restaurant
export async function GET(request, { params }) {
  try {
    const { id: restaurantId } = params;
    const { searchParams } = new URL(request.url);
    
    // Query parameters
    const status = searchParams.get('status'); // Filter by status
    const limit = parseInt(searchParams.get('limit')) || 50;
    const page = parseInt(searchParams.get('page')) || 1;
    const sortBy = searchParams.get('sortBy') || 'orderedAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    
    if (!restaurantId) {
      return Response.json({ 
        message: 'Restaurant ID is required',
        success: false 
      }, { status: 400 });
    }
    
    await connectToDB();
    
    // Build query
    const query = { restaurantId };
    if (status) {
      query.status = status;
    }
    
    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
    
    // Calculate skip for pagination
    const skip = (page - 1) * limit;
    
    // Fetch orders with pagination
    const orders = await Order.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate('restaurantId', 'name')
      .lean();
    
    // Get total count for pagination
    const totalOrders = await Order.countDocuments(query);
    const totalPages = Math.ceil(totalOrders / limit);
    
    // Calculate summary statistics
    const stats = await Order.aggregate([
      { $match: { restaurantId: new mongoose.Types.ObjectId(restaurantId) } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalAmount: { $sum: '$total' }
        }
      }
    ]);
    
    return Response.json({
      success: true,
      orders,
      pagination: {
        currentPage: page,
        totalPages,
        totalOrders,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
      stats,
    });
    
  } catch (error) {
    console.error('Error fetching orders:', error);
    return Response.json({
      message: 'Failed to fetch orders',
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
