import { connectToDB } from '@/lib/mongodb';
import Review from '@/models/Review';

export async function DELETE(request, { params }) {
  try {
    const { id: reviewId } = await params;

    if (!reviewId) {
      return Response.json({ message: 'Review ID is required' }, { status: 400 });
    }

    await connectToDB();

    const review = await Review.findById(reviewId);
    if (!review) {
      return Response.json({ message: 'Review not found' }, { status: 404 });
    }

    await Review.findByIdAndDelete(reviewId);

    return Response.json({ message: 'Review deleted successfully' });

  } catch (error) {
    console.error('Error deleting review:', error);
    return Response.json({ 
      message: 'Failed to delete review',
      error: error.message 
    }, { status: 500 });
  }
}
