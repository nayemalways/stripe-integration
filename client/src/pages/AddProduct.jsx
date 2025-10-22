import React, { useState } from "react";
import Layout from "../Layout/Layout";
import toast from "react-hot-toast";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !price || !image) {
      alert("All fields are required");
      return;
    }

    const productData = {
      title,
      price: Number(price),
      image
    };

     const uploadProduct = await fetch('https://stripe-server-pied.vercel.app/api/create_product', {
        body: JSON.stringify(productData),
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST"
     })

     const response = await uploadProduct.json();
     if(!response.success) {
        toast.error(response.message);
     }

     toast.success(response.message);
     console.log(response);

    // Optionally reset the form
    setTitle("");
    setPrice("");
    setImage("");
  };

  return (
    <Layout>
        <div className="h-182">
            <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Add Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                <label className="block text-gray-700 mb-1">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="I Phone 15"
                />
                </div>

                <div>
                <label className="block text-gray-700 mb-1">Price (৳)</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="18000"
                />
                </div>

                <div>
                <label className="block text-gray-700 mb-1">Image URL</label>
                <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com/image.jpg"
                />
                </div>

                <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
                >
                Submit
                </button>
            </form>
        </div>
        </div>
    </Layout>
  );
};

export default AddProduct;
