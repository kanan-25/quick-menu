import { connectToDB } from '@/lib/mongodb';
import Menu from '@/models/Menu';
import Restaurant from '@/models/Restaurant';

// GET route to fetch a restaurant's menu for public viewing
export async function GET(request, { params }) {
  try {
    const { id } = await params; // Restaurant ID

    console.log('Public menu API: Fetching for restaurant ID:', id);

    if (!id) {
      console.log('Public menu API: No restaurant ID provided');
      return Response.json({ message: 'Restaurant ID is required' }, { status: 400 });
    }

    await connectToDB();

    // Find the restaurant
    const restaurant = await Restaurant.findById(id);

    if (!restaurant) {
      console.log('Public menu API: Restaurant not found, using default');
      // For demo purposes, return a default restaurant if not found
      const defaultRestaurant = {
        name: "Demo Restaurant",
        description: "This is a demo restaurant for testing purposes",
        logo: "/Quick_menu.png"
      };

      return Response.json({
        restaurant: defaultRestaurant,
        categories: [],
        items: []
      });
    }

    // Find the menu for this restaurant
    const menu = await Menu.findOne({ restaurantId: id });

    if (!menu) {
      console.log('Public menu API: No menu found, returning empty menu');
      return Response.json({
        restaurant: {
          name: restaurant.name,
          description: restaurant.description || '',
          logo: restaurant.logo || '/Quick_menu.png',
        },
        categories: [],
        items: []
      });
    }

    // Convert restaurant to plain object if it's a Mongoose document
    const restaurantObj = restaurant.toObject ? restaurant.toObject() : JSON.parse(JSON.stringify(restaurant));

    console.log('Public menu API: Found restaurant and menu');

    // Transform the menu data for the template page
    const transformedMenu = {
      restaurant: {
        name: restaurantObj.name,
        description: restaurantObj.description || '',
        logo: restaurantObj.logo || '/Logo.png',
      },
      categories: menu.categories.map(category => ({
        id: category._id.toString(),
        name: category.name,
        description: category.description || '',
        position: category.position ?? 0,
        items: category.items.map(item => ({
          id: item._id.toString(),
          name: item.name,
          description: item.description || '',
          price: item.price,
          discountedPrice: item.discountedPrice,
          image: item.image || 'https://via.placeholder.com/150',
          isVegetarian: item.isVegetarian || false,
          isVegan: item.isVegan || false,
          isGlutenFree: item.isGlutenFree || false,
          isPopular: item.isPopular || false,
          position: item.position ?? 0,
        })).sort((a, b) => a.position - b.position),
      })).sort((a, b) => a.position - b.position),
    };

    console.log('Public menu API: Returning transformed menu');
    return Response.json(transformedMenu);

  } catch (error) {
    console.error('Public menu API: Error fetching menu:', error);
    
    // Return a fallback response instead of error
    const fallbackResponse = {
      restaurant: {
        name: "Demo Restaurant",
        description: "Digital dining experience made simple",
        logo: "/Quick_menu.png"
      },
      categories: [],
      items: []
    };

    return Response.json(fallbackResponse);
  }
}
