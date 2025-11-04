import  { useContext, useState } from "react";
import Layout from "../Layout/Layout";
import { AppContext } from "../context/AppContext";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const { addProduct } = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !price || !image) {
      alert("All fields are required");
      return;
    }

    const productData = { title, price: Number(price), image, };

    addProduct(productData)

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
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Enter product title"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Price (৳)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Enter product price"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Image URL</label>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Image link"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-800 cursor-pointer transition-colors"
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
