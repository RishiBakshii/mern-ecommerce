import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Card from "../components/ProductCard";
import SearchBar from "../components/SearchBar";

import { useCart } from "../context/CartContext";

function ProductListing() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([ // Mock product data for dynamic filtering
    {
      _id: "1",
      title: "Wireless Headphones",
      name: "Wireless Headphones",
      category: "Gadgets",
      image_link: "https://via.placeholder.com/150",
      description: "High-quality wireless headphones with noise cancellation.",
      original_price: 150,
    },
    {
      _id: "2",
      title: "Smartphone",
      name: "Smartphone",
      category: "Gadgets",
      image_link: "https://via.placeholder.com/150",
      description: "Latest generation smartphone with a powerful processor.",
      original_price: 999,
    },
    {
      _id: "3",
      title: "Gaming Console",
      name: "Gaming Console",
      category: "Gadgets",
      image_link: "https://via.placeholder.com/150",
      description: "Next-gen gaming console with stunning graphics.",
      original_price: 500,
    },
    {
      _id: "4",
      title: "Smartwatch",
      name: "Smartwatch",
      category: "Gadgets",
      image_link: "https://via.placeholder.com/150",
      description: "Stylish smartwatch with fitness tracking features.",
      original_price: 200,
    },
    {
      _id: "5",
      title: "Bluetooth Speaker",
      name: "Bluetooth Speaker",
      category: "Gadgets",
      image_link: "https://via.placeholder.com/150",
      description: "Portable Bluetooth speaker with excellent sound quality.",
      original_price: 80,
    },
    {
      _id: "6",
      title: "Digital Camera",
      name: "Digital Camera",
      category: "Gadgets",
      image_link: "https://via.placeholder.com/150",
      description: "Compact digital camera with high resolution and zoom.",
      original_price: 450,
    },
    {
      _id: "7",
      title: "Tablet",
      name: "Tablet",
      category: "Gadgets",
      image_link: "https://via.placeholder.com/150",
      description: "Versatile tablet for work and entertainment.",
      original_price: 600,
    },
    {
      _id: "8",
      title: "Book 1",
      name: "The Great Gatsby",
      category: "Books",
      image_link: "https://via.placeholder.com/150",
      description: "A classic novel by F. Scott Fitzgerald.",
      original_price: 10,
    },
    {
      _id: "9",
      title: "Book 2",
      name: "To Kill a Mockingbird",
      category: "Books",
      image_link: "https://via.placeholder.com/150",
      description: "A novel by Harper Lee about racial injustice.",
      original_price: 15,
    },
    {
      _id: "10",
      title: "Book 3",
      name: "1984",
      category: "Books",
      image_link: "https://via.placeholder.com/150",
      description: "A dystopian novel by George Orwell.",
      original_price: 12,
    },
    {
      _id: "11",
      title: "Book 4",
      name: "Pride and Prejudice",
      category: "Books",
      image_link: "https://via.placeholder.com/150",
      description: "A romantic novel by Jane Austen.",
      original_price: 10,
    },
    {
      _id: "12",
      title: "Book 5",
      name: "The Catcher in the Rye",
      category: "Books",
      image_link: "https://via.placeholder.com/150",
      description: "A novel by J.D. Salinger.",
      original_price: 14,
    },
    {
      _id: "13",
      title: "Book 6",
      name: "Moby Dick",
      category: "Books",
      image_link: "https://via.placeholder.com/150",
      description: "A classic novel by Herman Melville.",
      original_price: 18,
    },
    {
      _id: "14",
      title: "Book 7",
      name: "War and Peace",
      category: "Books",
      image_link: "https://via.placeholder.com/150",
      description: "A historical novel by Leo Tolstoy.",
      original_price: 25,
    },
    {
      _id: "15",
      title: "Running Shoes",
      name: "Running Shoes",
      category: "Shoes",
      image_link: "https://via.placeholder.com/150",
      description: "Comfortable running shoes for everyday use.",
      original_price: 60,
    },
    {
      _id: "16",
      title: "Sneakers",
      name: "Sneakers",
      category: "Shoes",
      image_link: "https://via.placeholder.com/150",
      description: "Stylish sneakers for casual wear.",
      original_price: 80,
    },
    {
      _id: "17",
      title: "Formal Shoes",
      name: "Formal Shoes",
      category: "Shoes",
      image_link: "https://via.placeholder.com/150",
      description: "Elegant formal shoes for special occasions.",
      original_price: 120,
    },
    {
      _id: "18",
      title: "Hiking Boots",
      name: "Hiking Boots",
      category: "Shoes",
      image_link: "https://via.placeholder.com/150",
      description: "Durable boots for outdoor adventures.",
      original_price: 150,
    },
    {
      _id: "19",
      title: "Sandals",
      name: "Sandals",
      category: "Shoes",
      image_link: "https://via.placeholder.com/150",
      description: "Comfortable sandals for summer.",
      original_price: 40,
    },
    {
      _id: "20",
      title: "Loafers",
      name: "Loafers",
      category: "Shoes",
      image_link: "https://via.placeholder.com/150",
      description: "Classic loafers for everyday wear.",
      original_price: 100,
    },
    {
      _id: "21",
      title: "Flip Flops",
      name: "Flip Flops",
      category: "Shoes",
      image_link: "https://via.placeholder.com/150",
      description: "Lightweight flip flops for casual outings.",
      original_price: 20,
    },
    {
      _id: "22",
      title: "Desk Lamp",
      name: "Desk Lamp",
      category: "Others",
      image_link: "https://via.placeholder.com/150",
      description: "Adjustable desk lamp with modern design.",
      original_price: 40,
    },
    {
      _id: "23",
      title: "Backpack",
      name: "Backpack",
      category: "Others",
      image_link: "https://via.placeholder.com/150",
      description: "Durable backpack with multiple compartments.",
      original_price: 60,
    },
    {
      _id: "24",
      title: "Fitness Tracker",
      name: "Fitness Tracker",
      category: "Others",
      image_link: "https://via.placeholder.com/150",
      description: "Track your daily activity and fitness goals.",
      original_price: 120,
    },
    {
      _id: "25",
      title: "Electric Kettle",
      name: "Electric Kettle",
      category: "Others",
      image_link: "https://via.placeholder.com/150",
      description: "Fast boiling electric kettle with auto shut-off.",
      original_price: 30,
    },
    {
      _id: "26",
      title: "Coffee Maker",
      name: "Coffee Maker",
      category: "Others",
      image_link: "https://via.placeholder.com/150",
      description: "Automatic coffee maker with customizable settings.",
      original_price: 100,
    }
  ]);
  const [filteredProducts, setFilteredProducts] = useState([]); 
  const [searchQuery, setSearchQuery] = useState(""); 
  const [filterPrice, setFilterPrice] = useState(""); 

  const [searchParams] = useSearchParams();

  useEffect(() => {
    let updatedProducts = products;

    const category = searchParams.get("category");
    if (category) {
      updatedProducts = updatedProducts.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (searchQuery) {
      updatedProducts = updatedProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterPrice === "<50") {
      updatedProducts = updatedProducts.filter((product) => product.price < 50);
    } else if (filterPrice === ">=50") {
      updatedProducts = updatedProducts.filter((product) => product.price >= 50);
    }

    setFilteredProducts(updatedProducts);
  }, [searchParams, searchQuery, filterPrice, products]);

  return (
    <div className="min-h-screen bg-gray-900 py-10">
      <h1 className="text-[70px] font-bold text-center mb-6">
        {searchParams.get("category")
          ? `Explore ${searchParams.get("category")}`
          : "Explore Our Products"}
      </h1>

      <div className="top-0 bg-white/0 z-10 p-4 mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <div className="flex-1">
          <SearchBar onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        <div className="mt-4 mx-3 sm:mt-0">
          <select
            className="bg-gray-200 text-black py-2 px-4 rounded hover:bg-gray-300"
            value={filterPrice}
            onChange={(e) => setFilterPrice(e.target.value)}
          >
            <option value="">Filter by Price</option>
            <option value="<50">Less than $50</option>
            <option value=">=50">Greater than or equal to $50</option>
          </select>
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-8">
          {filteredProducts.map((product) => (
            <Card key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center col-span-full">
          <p className="text-lg text-gray-500">No products found.</p>
        </div>
      )}
    </div>
  );
}

export default ProductListing;
