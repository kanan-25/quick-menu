import { connectToDB } from '@/lib/mongodb';
import Review from '@/models/Review';
import mongoose from 'mongoose';

export async function GET(request, { params }) {
  try {
    const { id: restaurantId } = await params;
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit')) || 50;

    if (!restaurantId) {
      return Response.json({ message: 'Restaurant ID is required' }, { status: 400 });
    }

    await connectToDB();

    // Get reviews
    const reviews = await Review.find({ restaurantId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    // Calculate statistics
    const stats = await Review.aggregate([
      { $match: { restaurantId: new mongoose.Types.ObjectId(restaurantId) } },
      {
        $group: {
          _id: null,
          totalReviews: { $sum: 1 },
          averageRating: { $avg: '$rating' },
          ratingBreakdown: {
            $push: '$rating'
          }
        }
      }
    ]);

    // Calculate rating breakdown
    let ratingBreakdown = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    if (stats.length > 0) {
      stats[0].ratingBreakdown.forEach(rating => {
        ratingBreakdown[rating]++;
      });
    }

    return Response.json({
      reviews,
      stats: {
        totalReviews: stats[0]?.totalReviews || 0,
        averageRating: stats[0]?.averageRating || 0,
        ratingBreakdown
      }
    });

  } catch (error) {
    console.error('Error fetching reviews:', error);
    return Response.json({ 
      message: 'Failed to fetch reviews',
      error: error.message 
    }, { status: 500 });
  }
}


