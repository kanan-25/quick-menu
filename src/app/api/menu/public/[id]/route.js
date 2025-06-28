import { connectToDB } from '@/lib/mongodb';
import Menu from '@/models/Menu';
import Restaurant from '@/models/Restaurant';

// GET route to fetch a restaurant's menu for public viewing
export async function GET(request, { params }) {
  try {
    const { id } = params; // Restaurant ID

    if (!id) {
      return Response.json({ message: 'Restaurant ID is required' }, { status: 400 });
    }

    await connectToDB();

    // Find the restaurant
    const restaurant = await Restaurant.findById(id);

    if (!restaurant) {
      // For demo purposes, return a default restaurant if not found
      const defaultRestaurant = {
        name: "Demo Restaurant",
        description: "This is a demo restaurant for testing purposes",
        logo: "/Quick_menu.png" // Use local image file
      };

      console.log('Restaurant not found, using default with logo:', defaultRestaurant.logo);

      return Response.json({
        restaurant: defaultRestaurant,
        categories: [],
        items: []
      });
      // In production, you would return an error:
      // return Response.json({ message: 'Restaurant not found' }, { status: 404 });
    }

    // Find the menu for this restaurant
    const menu = await Menu.findOne({ restaurantId: id });

    if (!menu) {
      return Response.json({
        restaurant: {
          name: restaurant.name,
          description: restaurant.description || '',
          logo: restaurant.logo || '',
        },
        categories: [],
        items: []
      });
    }

    // Convert restaurant to plain object if it's a Mongoose document
    const restaurantObj = restaurant.toObject ? restaurant.toObject() : JSON.parse(JSON.stringify(restaurant));

    // Log the full restaurant object for debugging
    console.log('Full restaurant object:', restaurantObj);

    console.log('Restaurant data for template:', {
      name: restaurantObj.name,
      description: restaurantObj.description,
      logo: restaurantObj.logo ? (restaurantObj.logo.substring(0, 50) + '...') : 'none'
    });

    // Use a local image file from the public directory
    console.log('Setting logo to local image file');
    restaurantObj.logo = '/Quick_menu.png'; // This file exists in the public directory

    console.log('Final logo URL for template:', restaurantObj.logo);

    // Transform the menu data for the template page
    const transformedMenu = {
  restaurant: {
    name: restaurantObj.name,
    description: restaurantObj.description || '',
    logo: restaurantObj.logo && restaurantObj.logo.startsWith('http') ? restaurantObj.logo : 'https://via.placeholder.com/150',
  },
categories: menu.categories.map(category => ({
  id: category._id.toString(),
  name: category.name,
  description: category.description || '',
  position: category.position ?? 0, // ✅ Add this line
  items: category.items.map(item => ({
    id: item._id.toString(),
    name: item.name,
    description: item.description || '',
    price: item.price,
    discountedPrice: item.discountedPrice,
    image: item.image && item.image.startsWith('http') ? item.image : 'https://via.placeholder.com/150',
    isVegetarian: item.isVegetarian || false,
    isVegan: item.isVegan || false,
    isGlutenFree: item.isGlutenFree || false,
    isPopular: item.isPopular || false,
    position: item.position ?? 0,
  })).sort((a, b) => a.position - b.position),
})).sort((a, b) => a.position - b.position),
};


    return Response.json(transformedMenu);
  } catch (error) {
    console.error('Error fetching public menu:', error);
    return Response.json({ message: 'Server error' }, { status: 500 });
  }
}
