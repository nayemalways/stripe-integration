import { useState } from "react";
import Layout from "../Layout/Layout";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { SquarePen, Trash } from "lucide-react";

const ProductUpdate = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");


  const {id} = useParams();

  useEffect(() => {
    (async () => {
        const res = await fetch(`https://stripe-server-pied.vercel.app/api/product/${id}`);
        const data = await res.json();
        setTitle(data?.data?.title);
        setPrice(data?.data?.price);
        setImage(data?.data?.image);
      
    })()
  },[id])

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

     const uploadProduct = await fetch(`https://stripe-server-pied.vercel.app/api/product/${id}`, {
        body: JSON.stringify(productData),
        headers: {
            "Content-Type": "application/json"
        },
        method: "PATCH"
     })

     const response = await uploadProduct.json();
     if(!response.success) {
        toast.error(response.message);
     }

     toast.success(response.message);
  };

  return (
    <Layout>
       <div className="flex h-screen items-center justify-center gap-10 px-10">
  {/* Left side — Form */}
  <div className="w-1/2 flex justify-center">
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Update Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Title"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Price (৳)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Price"
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

  {/* Right side — Product Card */}
  <div className="w-1/2 flex justify-center">
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 w-full max-w-sm">
      <img
        src={image || "https://via.placeholder.com/300"}
        alt={title || "Product Image"}
        className="w-full object-cover rounded-t-lg"
      />
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold mb-2">{title || "Product Name"}</h3>
            <p className="text-gray-700 mb-4">৳{price || "0"}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    </Layout>
  );
};

export default ProductUpdate;
