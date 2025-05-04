"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Head from "next/head";

export default function MenuManager() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [restaurant, setRestaurant] = useState(null);
  const [newItemImageUrl, setNewItemImageUrl] = useState(""); // Store image URL

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
          setError("User not found in localStorage");
          return;
        }

        const userObj = JSON.parse(storedUser);
        const email = userObj?.email;

        if (!email) {
          setError("User email missing");
          return;
        }

        const res = await fetch("/api/restaurant/get_restaurant", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        const data = await res.json();

        if (res.ok) {

          setRestaurant(data);
        } else {
          throw new Error(data.message || "Failed to fetch restaurant");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, []);

  useEffect(() => {
    const savedMenu = localStorage.getItem("menuItems");
    if (savedMenu) {
      setMenuItems(JSON.parse(savedMenu));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("menuItems", JSON.stringify(menuItems));
  }, [menuItems]);

  const onSubmit = async (data) => {
    const { itemName, itemPrice } = data;
    const price = parseFloat(itemPrice);

    // Basic validation
    if (!itemName.trim() || isNaN(price) || price <= 0 || !newItemImageUrl) {
      alert("Please enter a valid name, price, and image URL.");
      return;
    }

    try {
      // Prepare the new item to be added to the menu
      const newItem = {
        name: itemName.trim(),
        price,
        image: newItemImageUrl, // Use the provided URL for the image
      };
      console.log(newItem)

      // Send the request to create the menu
      const res = await fetch("/api/menu/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          restaurantId: restaurant._id, // Send the restaurant ID
          name: "New Menu", // Use a default name for now
          description: "A new menu description", // Use a default description
          items: [newItem], // Send the new item as an array
        }),
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.message || "Failed to create menu");
      }

      alert("Menu created successfully!");
      setMenuItems((prev) => [responseData.menu, ...prev]); // Update menu state

      // Reset form fields
      reset();
      setNewItemImageUrl(""); // Clear the image URL field
    } catch (err) {
      console.error("Error creating menu:", err);
      alert("Error creating menu. Please try again.");
    }
  };

  return (
    <>
      <Head>
        <title>Menu Management</title>
      </Head>
      <main className="min-h-screen bg-gray-50 p-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Manage Your Menu</h1>

        <section className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg mb-10">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Add New Item</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label htmlFor="itemName" className="block text-gray-600 mb-1">Item Name</label>
              <input
                type="text"
                id="itemName"
                {...register("itemName", { required: "Item name is required" })}
                className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
                placeholder="e.g., Margherita Pizza"
              />
              {errors.itemName && <p className="text-red-500 text-sm">{errors.itemName.message}</p>}
            </div>

            <div>
              <label htmlFor="itemPrice" className="block text-gray-600 mb-1">Price ($)</label>
              <input
                type="number"
                id="itemPrice"
                {...register("itemPrice", { required: "Price is required", min: 0.01 })}
                className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
                placeholder="e.g., 12.99"
              />
              {errors.itemPrice && <p className="text-red-500 text-sm">{errors.itemPrice.message}</p>}
            </div>

            <div>
              <label htmlFor="imageUrl" className="block text-gray-600 mb-1">Image URL</label>
              <input
                type="url"
                id="imageUrl"
                {...register("imageUrl", { required: "Image URL is required" })}
                value={newItemImageUrl}
                onChange={(e) => setNewItemImageUrl(e.target.value)}
                className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
                placeholder="Enter image URL"
              />
              {errors.imageUrl && <p className="text-red-500 text-sm">{errors.imageUrl.message}</p>}
            </div>

            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
              {newItemImageUrl ? (
                <img src={newItemImageUrl} alt="Preview" className="w-40 h-40 object-cover rounded-md border" />
              ) : (
                <div className="w-40 h-40 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
                  No Image Selected
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md font-semibold shadow-md"
            >
              Add Item
            </button>
          </form>
        </section>

        <section className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Current Menu</h2>
          {menuItems.length === 0 ? (
            <p className="text-gray-500 text-center">No items yet. Add some!</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {menuItems.map((menu) => (
                <div key={menu._id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="font-semibold text-lg text-gray-800">{menu.name}</h3>
                    <p className="text-gray-600">{menu.description}</p>
                    <div className="space-y-4 mt-4">
                      {menu.items.map((item) => (
                        <div key={item._id} className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-gray-800">{item.name}</p>
                            <p className="text-sm text-gray-600">${item.price}</p>
                          </div>
                          <img src={item.image} alt={item.name} className="h-12 w-12 object-cover rounded-full" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
