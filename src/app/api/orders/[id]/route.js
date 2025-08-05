import { connectToDB } from '@/lib/mongodb';
import Order from '@/models/Order';

// GET - Fetch a specific order
export async function GET(request, { params }) {
  try {
    const { id: orderId } = await params;
    
    if (!orderId) {
      return Response.json({ 
        message: 'Order ID is required',
        success: false 
      }, { status: 400 });
    }
    
    await connectToDB();
    
    const order = await Order.findById(orderId)
      .populate('restaurantId', 'name email phone address')
      .lean();
    
    if (!order) {
      return Response.json({ 
        message: 'Order not found',
        success: false 
      }, { status: 404 });
    }
    
    return Response.json({
      success: true,
      order
    });
    
  } catch (error) {
    console.error('Error fetching order:', error);
    return Response.json({
      message: 'Failed to fetch order',
      success: false,
      error: error.message
    }, { status: 500 });
  }
}

// PUT - Update order status
export async function PUT(request, { params }) {
  try {
    const { id: orderId } = await params;
    const updateData = await request.json();
    
    if (!orderId) {
      return Response.json({ 
        message: 'Order ID is required',
        success: false 
      }, { status: 400 });
    }
    
    await connectToDB();
    
    const order = await Order.findById(orderId);
    if (!order) {
      return Response.json({ 
        message: 'Order not found',
        success: false 
      }, { status: 404 });
    }
    
    // Update status and set appropriate timestamp
    if (updateData.status) {
      order.status = updateData.status;
      
      // Set timestamp based on status
      const now = new Date();
      switch (updateData.status) {
        case 'confirmed':
          order.confirmedAt = now;
          break;
        case 'preparing':
          order.preparingAt = now;
          break;
        case 'ready':
          order.readyAt = now;
          break;
        case 'served':
          order.servedAt = now;
          break;
      }
    }
    
    // Update other fields if provided
    if (updateData.paymentStatus) {
      order.paymentStatus = updateData.paymentStatus;
    }
    
    if (updateData.paymentMethod) {
      order.paymentMethod = updateData.paymentMethod;
    }
    
    if (updateData.estimatedTime) {
      order.estimatedTime = updateData.estimatedTime;
    }
    
    const updatedOrder = await order.save();
    
    return Response.json({
      success: true,
      message: 'Order updated successfully',
      order: updatedOrder
    });
    
  } catch (error) {
    console.error('Error updating order:', error);
    return Response.json({
      message: 'Failed to update order',
      success: false,
      error: error.message
    }, { status: 500 });
  }
}

// DELETE - Cancel an order
export async function DELETE(request, { params }) {
  try {
    const { id: orderId } = await params;
    
    if (!orderId) {
      return Response.json({ 
        message: 'Order ID is required',
        success: false 
      }, { status: 400 });
    }
    
    await connectToDB();
    
    const order = await Order.findById(orderId);
    if (!order) {
      return Response.json({ 
        message: 'Order not found',
        success: false 
      }, { status: 404 });
    }
    
    // Only allow cancellation if order is not yet served
    if (order.status === 'served') {
      return Response.json({ 
        message: 'Cannot cancel a served order',
        success: false 
      }, { status: 400 });
    }
    
    order.status = 'cancelled';
    await order.save();
    
    return Response.json({
      success: true,
      message: 'Order cancelled successfully'
    });
    
  } catch (error) {
    console.error('Error cancelling order:', error);
    return Response.json({
      message: 'Failed to cancel order',
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
