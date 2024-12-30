import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

function Recommendations() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8080/products');  // Fetch products from API
        console.log("responce data = "+response.data); // Log API response to debug
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const productGrid = useMemo(() => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-8">
        {products.map((product, index) => (
          <ProductCard key={product._id || product.id || index} product={product} />
        ))}
      </div>
    );
  }, [products]);

  return (
    <div className="bg-black py-10 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-white mb-8">
        Recommended for You
      </h2>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <p className="text-lg font-semibold text-gray-300">Loading...</p>
        </div>
      ) : (
        productGrid
      )}
    </div>
  );
}

export default Recommendations;
