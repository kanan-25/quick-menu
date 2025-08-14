import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  customerEmail: {
    type: String,
    required: false,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['approved', 'pending'],
    default: 'approved', // Direct posting as requested
  },
}, {
  timestamps: true,
});

const Review = mongoose.models.Review || mongoose.model('Review', ReviewSchema);

export default Review;
