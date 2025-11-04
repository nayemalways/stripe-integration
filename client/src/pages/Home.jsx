import { useContext } from "react";
import Layout from "../Layout/Layout";
import { SquarePen, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Home = () => {

  const { products, handleDelete } = useContext( AppContext );
 

  return (
    <Layout>
      <div className="min-h-screen flex flex-col">
        {/* Main content */}
        <main className="flex-1 container mx-auto px-4 py-8">
          <h2 className="text-3xl font-semibold mb-6">Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.data &&
              [...products.data].reverse().map((product) => (
                <div
                  id={product._id}
                  key={product._id}
                  className="bg-slate-200 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full aspect-[80/80] object-contain rounded-t-lg"
                  />
                  <div className="p-4">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-lg font-bold mb-2">
                          {product.title}
                        </h3>
                        <p className="text-gray-700 mb-4">
                          ${product.price / 100}
                        </p>
                      </div>
                      <div className="flex gap-4 ">
                        <a
                          href={`/product-update/${product._id}`}
                          className="cursor-pointer inline-grid"
                        >
                          <SquarePen className="text-purple-500" />
                        </a>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="cursor-pointer inline-grid"
                        >
                          <Trash className="text-red-400" />
                        </button>
                      </div>
                    </div>
                    <Link to={`/product/${product._id}`}
                       
                      className="bg-pink-600 cursor-pointer text-white py-2 px-4 rounded hover:bg-pink-700 w-full"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default Home;
