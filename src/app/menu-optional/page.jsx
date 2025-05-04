"use client"; 

import { useState } from "react";

export default function MenuManagement() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!name || !price || !preview) {
      alert("Please fill all fields!");
      return;
    }

    const newItem = {
      id: Date.now(),
      name,
      price: parseFloat(price),
      imageUrl: preview,
    };

    setItems([...items, newItem]);
    setName("");
    setPrice("");
    setImage(null);
    setPreview(null);
  };

  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Menu Management</h1>

      {/* Form to Add Item */}
      <form
        onSubmit={handleAddItem}
        className="flex flex-col gap-4 p-6 bg-white rounded-2xl shadow-md mb-8"
      >
        <input
          type="text"
          placeholder="Item Name"
          className="border p-2 rounded-lg"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Price"
          className="border p-2 rounded-lg"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <input
          type="file"
          accept="image/*"
          className="border p-2 rounded-lg"
          onChange={handleImageChange}
          required
        />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="h-32 w-32 object-cover rounded-lg mx-auto"
          />
        )}

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg"
        >
          Add Item
        </button>
      </form>

      {/* Menu Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center p-4 bg-white rounded-2xl shadow-md"
          >
            <img
              src={item.imageUrl}
              alt={item.name}
              className="h-40 w-40 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-semibold">{item.name}</h2>
            <p className="text-gray-600 mb-4">${item.price.toFixed(2)}</p>
            <button
              onClick={() => handleDelete(item.id)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
