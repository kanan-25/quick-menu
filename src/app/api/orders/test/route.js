import { connectToDB } from '@/lib/mongodb';
import Order from '@/models/Order';

export async function GET() {
  try {
    console.log('Testing order creation...');
    
    await connectToDB();
    console.log('Database connected successfully');
    
    // Test order data
    const testOrderData = {
      restaurantId: '123456789',
      tableNumber: 'Table 1',
      customerInfo: {
        name: 'Test Customer',
        phone: '1234567890',
        email: 'test@example.com',
      },
      items: [
        {
          menuItemId: 'test-item-1',
          name: 'Test Burger',
          description: 'A delicious test burger',
          price: 299,
          quantity: 2,
          itemTotal: 598,
        }
      ],
      subtotal: 598,
      tax: 29.90, // 5% GST: 598 * 0.05 = 29.90
      total: 627.90, // 598 + 29.90 = 627.90
      orderType: 'dine-in',
      specialInstructions: 'Test order',
      estimatedTime: 30,
    };
    
    console.log('Creating test order with data:', testOrderData);
    
    const newOrder = new Order(testOrderData);
    const savedOrder = await newOrder.save();
    
    console.log('Test order created successfully:', savedOrder.orderNumber);
    
    return Response.json({
      success: true,
      message: 'Test order created successfully',
      order: {
        id: savedOrder._id,
        orderNumber: savedOrder.orderNumber,
        status: savedOrder.status,
        total: savedOrder.total,
      }
    });
    
  } catch (error) {
    console.error('Test order creation failed:', error);
    return Response.json({
      success: false,
      message: 'Test order creation failed',
      error: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}
