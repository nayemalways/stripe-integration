import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../Layout/Layout";
import { backendURL } from "../constant";

console.log(backendURL)

const ProductDetails = () => {
  const { productId } = useParams();

  const [product, setProduct] = useState({});

  console.log(product)

  useEffect(() => {
    (async () => {
      const res = await fetch(`${backendURL}/product/${productId}`);
      const data = await res.json();
      setProduct(data.data);
    })();
  }, [productId]);

   const handleCheckout = async () => {

    const payload = {
      amount: product.price,
      productName: product.title,
    };

    const payment = await fetch(`${backendURL}/checkout`, {
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json", // send JSON
      },
      method: "POST",
    });

    const checkoutURL = await payment.json();
    window.location.href = checkoutURL;
  };

  if (!product) {
    return (
      <div className="p-6 text-center text-gray-500">
        No product data available
      </div>
    );
  }

  return (
    <Layout>
      <div className="h-screen flex items-center">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden h-s hover:shadow-lg transition">
          {/* Image */}
          <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
            <img
              src={product.image}
              alt={product.title}
              className="object-contain h-full"
            />
          </div>

          {/* Details */}
          <div className="p-5">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {product.title}
            </h2>

            <p className="text-lg font-bold text-green-600 mb-3">
              ৳ {product.price}
            </p>

            <p className="text-sm text-gray-500 mb-4">
              Added on: {new Date(product.createdAt).toLocaleDateString()}
            </p>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              className="w-full bg-pink-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 active:scale-95 transition"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
