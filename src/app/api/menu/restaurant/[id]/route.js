import { connectToDB } from '@/lib/mongodb';
import Menu from '@/models/Menu';

// GET route to fetch a restaurant's menu
export async function GET(request, { params }) {
  // Default menu to return in case of any error
  const defaultMenu = {
    restaurantId: (await params)?.id || '123456789',
    name: 'Default Menu',
    description: 'Your restaurant menu',
    categories: [],
    items: []
  };

  try {
    const { id } = await params; // Restaurant ID

    console.log('API: Fetching menu for restaurant ID:', id);

    if (!id) {
      console.warn('API: Restaurant ID is missing');
      // Return a default menu instead of an error
      return new Response(JSON.stringify(defaultMenu), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    try {
      await connectToDB();

      // Find the menu for this restaurant
      const menu = await Menu.findOne({ restaurantId: id });

      if (!menu) {
        console.log('API: No menu found for restaurant ID:', id);
        // If no menu exists, return an empty menu structure
        const emptyMenu = {
          ...defaultMenu,
          restaurantId: id
        };

        return new Response(JSON.stringify(emptyMenu), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      console.log('API: Menu found for restaurant ID:', id);

      // Convert Mongoose document to plain object
      const menuObject = menu.toObject ? menu.toObject() : JSON.parse(JSON.stringify(menu));

      // Ensure the menu has a categories array
      if (!menuObject.categories) {
        menuObject.categories = [];
      }

      return new Response(JSON.stringify(menuObject), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (dbError) {
      console.error('API: Database error:', dbError);
      // Return a default menu instead of an error
      const dbErrorMenu = {
        ...defaultMenu,
        restaurantId: id,
        description: 'Your restaurant menu (DB Error Fallback)'
      };

      return new Response(JSON.stringify(dbErrorMenu), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } catch (error) {
    console.error('API: Error fetching menu:', error);
    // Return a default menu instead of an error
    return new Response(JSON.stringify(defaultMenu), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
