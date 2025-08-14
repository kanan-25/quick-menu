import { connectToDB } from '@/lib/mongodb';
import Review from '@/models/Review';
import Restaurant from '@/models/Restaurant';

export async function POST(request) {
  try {
    const { restaurantId, customerName, customerEmail, rating, comment } = await request.json();

    if (!restaurantId || !customerName || !rating || !comment) {
      return Response.json({ 
        message: 'Restaurant ID, customer name, rating, and comment are required' 
      }, { status: 400 });
    }

    if (rating < 1 || rating > 5) {
      return Response.json({ 
        message: 'Rating must be between 1 and 5' 
      }, { status: 400 });
    }

    await connectToDB();

    // Verify restaurant exists
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return Response.json({ message: 'Restaurant not found' }, { status: 404 });
    }

    // Create new review
    const newReview = await Review.create({
      restaurantId,
      customerName,
      customerEmail: customerEmail || '',
      rating,
      comment,
      status: 'approved' // Direct posting
    });

    return Response.json({
      message: 'Review posted successfully',
      review: newReview
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating review:', error);
    return Response.json({ 
      message: 'Failed to create review',
      error: error.message 
    }, { status: 500 });
  }
}

