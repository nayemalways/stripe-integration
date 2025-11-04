/* eslint-disable react-hooks/exhaustive-deps */
import Layout from "../Layout/Layout";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const ProductUpdate = () => {
  const { productDetails, updateProduct } = useContext(AppContext);
  const [productData, setProductData] = useState({});
  const { id } = useParams(); // Product Id

  useEffect(() => {
    (async () => {
      const data = await productDetails(id);
      setProductData(data);
    })();
  }, [id]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productData.title || !productData.price || !productData.image) {
      alert("All fields are required");
      return;
    }

    const payload = {
      title: productData.title,
      price: Number(productData.price),
      image: productData.image,
    };

    updateProduct(id, payload);

     
  };

  return (
    <Layout>
      <div className="flex h-screen items-center justify-center gap-10 px-10">
        {/* Left side — Form */}
        <div className="w-1/2 flex justify-center">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Update Product
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={productData.title}
                  onChange={(e) =>
                    setProductData({ ...productData, title: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Enter Title"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Price (৳)</label>
                <input
                  type="number"
                  value={productData.price}
                  onChange={(e) =>
                    setProductData({ ...productData, price: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Enter Price"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Image URL</label>
                <input
                  type="text"
                  value={productData.image}
                  onChange={(e) =>
                    setProductData({ ...productData, image: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Image url"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700 transition-colors cursor-pointer"
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
              src={productData.image || "https://via.placeholder.com/300"}
              alt={productData.title || "Product Image"}
              className="w-full object-cover rounded-t-lg"
            />
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold mb-2">
                    {productData.title || "Product Name"}
                  </h3>
                  <p className="text-gray-700 mb-4">৳{productData.price || "0"}</p>
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
