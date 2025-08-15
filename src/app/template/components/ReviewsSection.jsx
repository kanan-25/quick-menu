'use client';

import { useState, useEffect } from 'react';
import StarRating from '@/components/StarRating';
import { TrashIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';

const ReviewsSection = ({ restaurantId }) => {
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    customerName: '',
    customerEmail: '',
    rating: 0,
    comment: ''
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, [restaurantId]);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`/api/reviews/restaurant/${restaurantId}`);
      if (response.ok) {
        const data = await response.json();
        setReviews(data.reviews);
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!newReview.customerName || !newReview.rating || !newReview.comment) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      setSubmitting(true);
      const response = await fetch('/api/reviews/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          restaurantId,
          ...newReview
        })
      });

      if (response.ok) {
        setNewReview({ customerName: '', customerEmail: '', rating: 0, comment: '' });
        setShowReviewForm(false);
        fetchReviews(); // Refresh reviews
        alert('Review posted successfully!');
      } else {
        alert('Failed to post review');
      }
    } catch (error) {
      console.error('Error posting review:', error);
      alert('Error posting review');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!confirm('Are you sure you want to delete this review?')) return;

    try {
      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchReviews(); // Refresh reviews
        alert('Review deleted successfully');
      } else {
        alert('Failed to delete review');
      }
    } catch (error) {
      console.error('Error deleting review:', error);
      alert('Error deleting review');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return <div className="text-center py-8">Loading reviews...</div>;
  }

  return (
    <div className="bg-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
          <p className="text-gray-600">Discover what others are saying about their experience at our restaurant</p>
        </div>

        {/* Rating Overview */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900">{stats.averageRating?.toFixed(1) || '0.0'}</div>
              <StarRating rating={Math.round(stats.averageRating || 0)} readonly size="w-6 h-6" />
              <div className="text-sm text-gray-500 mt-1">Based on {stats.totalReviews || 0} reviews</div>
            </div>

            {/* Rating Breakdown */}
            <div className="flex-1 max-w-md ml-8">
              <div className="text-sm font-medium text-gray-700 mb-2">Rating Breakdown:</div>
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center mb-1">
                  <span className="text-sm w-2">{rating}</span>
                  <StarIcon className="w-4 h-4 text-yellow-400 mx-1" />
                  <div className="flex-1 bg-gray-200 rounded-full h-2 mx-2">
                    <div 
                      className="bg-yellow-400 h-2 rounded-full" 
                      style={{ 
                        width: `${stats.totalReviews ? (stats.ratingBreakdown?.[rating] || 0) / stats.totalReviews * 100 : 0}%` 
                      }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-500 w-8">{stats.ratingBreakdown?.[rating] || 0}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Write Review Button */}
        <div className="text-center mb-8">
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors"
          >
            Write a Review
          </button>
        </div>

        {/* Review Form */}
        {showReviewForm && (
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <form onSubmit={handleSubmitReview}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Your Name *"
                  value={newReview.customerName}
                  onChange={(e) => setNewReview({...newReview, customerName: e.target.value})}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email (optional)"
                  value={newReview.customerEmail}
                  onChange={(e) => setNewReview({...newReview, customerEmail: e.target.value})}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating *</label>
                <StarRating 
                  rating={newReview.rating} 
                  onRatingChange={(rating) => setNewReview({...newReview, rating})}
                  size="w-8 h-8"
                />
              </div>

              <textarea
                placeholder="Write your review here... *"
                value={newReview.comment}
                onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24 mb-4 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />

              <div className="flex space-x-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 disabled:opacity-50"
                >
                  {submitting ? 'Posting...' : 'Post Review'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowReviewForm(false)}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Reviews List */}
        <div className="space-y-6">
          {reviews.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No reviews yet. Be the first to write a review!
            </div>
          ) : (
            reviews.map((review) => (
              <div key={review._id} className="border-l-4 border-teal-500 bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">{review.customerName}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <StarRating rating={review.rating} readonly size="w-4 h-4" />
                      <span className="text-sm text-gray-500">{formatDate(review.createdAt)}</span>
                    </div>
                  </div>
                  {/* Remove delete button from public view */}
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewsSection;


