import mongoose from 'mongoose';

// Order Item Schema - for items within an order
const OrderItemSchema = new mongoose.Schema({
  menuItemId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
  discountedPrice: {
    type: Number,
    required: false,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  image: {
    type: String,
    required: false,
  },
  // Item customizations/variants
  selectedVariant: {
    name: String,
    price: Number,
  },
  selectedOptions: [{
    optionName: String,
    choices: [{
      name: String,
      price: Number,
    }],
  }],
  // Calculated fields
  itemTotal: {
    type: Number,
    required: true,
  },
  specialInstructions: {
    type: String,
    required: false,
  },
});

// Main Order Schema
const OrderSchema = new mongoose.Schema({
  // Order identification
  orderNumber: {
    type: String,
    required: true,
    unique: true,
  },
  
  // Restaurant and table info
  restaurantId: {
    type: mongoose.Schema.Types.Mixed, // Allow both ObjectId and String for demo
    required: true,
  },
  tableNumber: {
    type: String,
    required: false, // Optional for takeaway orders
  },
  
  // Customer info (optional for walk-in customers)
  customerInfo: {
    name: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
  },
  
  // Order items
  items: [OrderItemSchema],
  
  // Order totals
  subtotal: {
    type: Number,
    required: true,
  },
  tax: {
    type: Number,
    default: 0,
  },
  discount: {
    type: Number,
    default: 0,
  },
  total: {
    type: Number,
    required: true,
  },
  
  // Order status and timing
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'preparing', 'ready', 'served', 'cancelled'],
    default: 'pending',
  },
  orderType: {
    type: String,
    enum: ['dine-in', 'takeaway', 'delivery'],
    default: 'dine-in',
  },
  
  // Timestamps
  orderedAt: {
    type: Date,
    default: Date.now,
  },
  confirmedAt: {
    type: Date,
    required: false,
  },
  preparingAt: {
    type: Date,
    required: false,
  },
  readyAt: {
    type: Date,
    required: false,
  },
  servedAt: {
    type: Date,
    required: false,
  },
  
  // Payment info
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending',
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'card', 'upi', 'online'],
    required: false,
  },
  
  // Special instructions
  specialInstructions: {
    type: String,
    required: false,
  },
  
  // Estimated preparation time (in minutes)
  estimatedTime: {
    type: Number,
    default: 30,
  },
  
}, { 
  timestamps: true,
  // Add indexes for better query performance
  indexes: [
    { restaurantId: 1, status: 1 },
    { orderNumber: 1 },
    { orderedAt: -1 },
  ]
});

// Order number is now generated in the API route before saving

// Calculate totals before saving
OrderSchema.pre('save', function(next) {
  try {
    // Calculate subtotal from items
    this.subtotal = this.items.reduce((sum, item) => sum + (item.itemTotal || 0), 0);

    // Calculate total (subtotal + tax - discount)
    this.total = this.subtotal + (this.tax || 0) - (this.discount || 0);

    next();
  } catch (error) {
    console.error('Error calculating order totals:', error);
    next(error);
  }
});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
