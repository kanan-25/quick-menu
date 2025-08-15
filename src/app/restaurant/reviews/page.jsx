'use client';

import { useState, useEffect } from 'react';
import { TrashIcon, StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import StarRating from '@/components/StarRating';

const RestaurantReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [restaurantId, setRestaurantId] = useState(null);

  useEffect(() => {
    // Get restaurant ID from localStorage
    const restaurantData = localStorage.getItem('restaurant_data');
    if (restaurantData) {
      const restaurant = JSON.parse(restaurantData);
      setRestaurantId(restaurant._id);
    }
  }, []);

  useEffect(() => {
    if (restaurantId) {
      fetchReviews();
    }
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
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customer Reviews</h1>
          <p className="text-gray-600">Manage and moderate customer testimonials</p>
        </div>
        <button
          onClick={fetchReviews}
          className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 cursor-pointer"
        >
          Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <StarIconSolid className="h-8 w-8 text-blue-500" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Overall Rating</h3>
              <p className="text-2xl font-bold text-blue-600">{stats.averageRating?.toFixed(1) || '0.0'}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {stats.totalReviews || 0}
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Total Reviews</h3>
              <p className="text-2xl font-bold text-green-600">{stats.totalReviews || 0}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="bg-white rounded-lg shadow-md">
        {reviews.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No reviews found</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {reviews.map((review) => (
              <div key={review._id} className="p-6 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{review.customerName}</h3>
                      <StarRating rating={review.rating} readonly size="w-4 h-4" />
                      <span className="text-sm text-gray-500">{formatDate(review.createdAt)}</span>
                    </div>
                    
                    {review.customerEmail && (
                      <p className="text-sm text-gray-600 mb-2">{review.customerEmail}</p>
                    )}
                    
                    <p className="text-gray-700">{review.comment}</p>
                  </div>

                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => handleDeleteReview(review._id)}
                      className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50 cursor-pointer"
                      title="Delete Review"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantReviews;


