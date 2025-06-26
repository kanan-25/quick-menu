import { connectToDB } from '@/lib/mongodb';
import Menu from '@/models/Menu';
import Restaurant from '@/models/Restaurant';

// POST route to initialize a menu for a restaurant
export async function POST(request) {
  try {
    const { restaurantId } = await request.json();
    
    console.log('API: Initializing menu for restaurant ID:', restaurantId);
    
    if (!restaurantId) {
      console.warn('API: Restaurant ID is missing for menu initialization');
      return Response.json({ 
        message: 'Restaurant ID is required',
        success: false
      }, { status: 400 });
    }
    
    try {
      await connectToDB();
      
      // Check if the restaurant exists
      const restaurant = await Restaurant.findById(restaurantId);
      
      if (!restaurant) {
        console.warn('API: Restaurant not found for ID:', restaurantId);
        return Response.json({ 
          message: 'Restaurant not found',
          success: false
        }, { status: 404 });
      }
      
      // Check if a menu already exists for this restaurant
      const existingMenu = await Menu.findOne({ restaurantId });
      
      if (existingMenu) {
        console.log('API: Menu already exists for restaurant ID:', restaurantId);
        return Response.json({ 
          message: 'Menu already exists',
          success: true,
          menu: existingMenu
        }, { status: 200 });
      }
      
      // Create a new empty menu for the restaurant
      const newMenu = await Menu.create({
        restaurantId,
        name: 'Default Menu',
        description: `Menu for ${restaurant.name}`,
        categories: []
      });
      
      console.log('API: Created new menu for restaurant ID:', restaurantId);
      
      return Response.json({ 
        message: 'Menu initialized successfully',
        success: true,
        menu: newMenu
      }, { status: 201 });
    } catch (dbError) {
      console.error('API: Database error during menu initialization:', dbError);
      return Response.json({ 
        message: 'Database error',
        success: false,
        error: dbError.message
      }, { status: 500 });
    }
  } catch (error) {
    console.error('API: Error initializing menu:', error);
    return Response.json({ 
      message: 'Server error',
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
