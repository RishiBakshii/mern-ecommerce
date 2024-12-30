import React from "react";
import { useCart } from "../context/CartContext"; // Import the custom hook

const ProductCard = ({ product }) => {
  const { addToCart } = useCart(); // Get the addItemToCart function from context

  return (
    <div className="relative bg-white border rounded-lg shadow-md overflow-hidden">
      <div className="h-96 bg-gray-100 flex justify-center items-center overflow-hidden">
        <img
          src={product.image_link} // Fixed the image link key
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {product.name}
        </h3>
        <p className="text-gray-500 text-sm mt-1 truncate">{product.description}</p>

        <div className="flex items-center justify-between mt-4">
          <div>
            <span className="text-green-600 font-bold text-lg">
              ₹{product.original_price}
            </span>
          </div>
          <button
            onClick={() => addToCart(product)} // Add item to cart
            className="bg-blue-600 text-white px-4 py-1 text-sm font-semibold rounded hover:bg-blue-700 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
