import { connectToDB } from '@/lib/mongodb';
import Order from '@/models/Order';
import Restaurant from '@/models/Restaurant';
import mongoose from 'mongoose';

export async function POST(request) {
  try {
    const orderData = await request.json();
    
    console.log('Creating new order:', orderData);
    
    // Validate required fields
    const { restaurantId, items, customerInfo } = orderData;
    
    if (!restaurantId || !items || items.length === 0) {
      return Response.json({ 
        message: 'Restaurant ID and items are required',
        success: false 
      }, { status: 400 });
    }
    
    await connectToDB();

    // Verify restaurant exists (only if it's a valid ObjectId)
    let restaurant = null;
    if (mongoose.Types.ObjectId.isValid(restaurantId)) {
      restaurant = await Restaurant.findById(restaurantId);
    }

    // For demo purposes, if restaurant not found, create a demo restaurant entry
    if (!restaurant) {
      console.log('Restaurant not found or invalid ID, using demo restaurant');
      // For demo, we'll still process the order but with a demo restaurant
      restaurant = {
        _id: restaurantId,
        name: 'Demo Restaurant',
        email: 'demo@restaurant.com'
      };
    }
    
    // Process order items and calculate totals
    const processedItems = items.map(item => {
      const basePrice = item.discountedPrice && item.discountedPrice < item.price 
        ? item.discountedPrice 
        : item.price;
      
      const itemTotal = basePrice * item.quantity;
      
      return {
        menuItemId: item.id || item._id,
        name: item.name,
        description: item.description,
        price: item.price,
        discountedPrice: item.discountedPrice,
        quantity: item.quantity,
        image: item.image,
        itemTotal: itemTotal,
        specialInstructions: item.specialInstructions || '',
      };
    });
    
    // Calculate order totals
    const subtotal = processedItems.reduce((sum, item) => sum + item.itemTotal, 0);
    const tax = Math.round(subtotal * 0.18 * 100) / 100; // 18% GST (adjust as needed)
    const total = subtotal + tax;
    
    // Generate order number
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    const orderNumber = `ORD-${timestamp}-${random}`;

    // Create the order
    const orderToCreate = {
      orderNumber,
      restaurantId,
      tableNumber: orderData.tableNumber || null,
      customerInfo: {
        name: customerInfo?.name || 'Walk-in Customer',
        phone: customerInfo?.phone || '',
        email: customerInfo?.email || '',
      },
      items: processedItems,
      subtotal,
      tax,
      total,
      orderType: orderData.orderType || 'dine-in',
      specialInstructions: orderData.specialInstructions || '',
      estimatedTime: orderData.estimatedTime || 30,
    };

    console.log('Creating order with data:', JSON.stringify(orderToCreate, null, 2));

    const newOrder = new Order(orderToCreate);
    const savedOrder = await newOrder.save();

    console.log('Order created successfully:', savedOrder.orderNumber);
    console.log('Saved order details:', {
      id: savedOrder._id,
      orderNumber: savedOrder.orderNumber,
      status: savedOrder.status,
      total: savedOrder.total
    });
    
    // Return the created order
    return Response.json({
      message: 'Order created successfully',
      success: true,
      order: {
        id: savedOrder._id,
        orderNumber: savedOrder.orderNumber,
        status: savedOrder.status,
        total: savedOrder.total,
        estimatedTime: savedOrder.estimatedTime,
        orderedAt: savedOrder.orderedAt,
      }
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error creating order:', error);
    console.error('Error stack:', error.stack);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      code: error.code
    });

    return Response.json({
      message: 'Failed to create order',
      success: false,
      error: error.message,
      details: error.name
    }, { status: 500 });
  }
}
