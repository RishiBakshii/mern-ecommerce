import { useState } from "react";

const Dashboard = () => {
  // Mock data for products
  const mockProducts = [
    {
      _id: "1",
      name: "Product 1",
      description: "Description for product 1",
      image: "https://via.placeholder.com/150",
    },
    {
      _id: "2",
      name: "Product 2",
      description: "Description for product 2",
      image: "https://via.placeholder.com/150",
    },
    {
      _id: "3",
      name: "Product 3",
      description: "Description for product 3",
      image: "https://via.placeholder.com/150",
    },
  ];

  const [products, setProducts] = useState(mockProducts);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({ name: "", description: "", image: "" });

  const updateProduct = (id, updatedData) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === id ? { ...product, ...updatedData } : product
      )
    );
    setEditingProduct(null);
  };

  const deleteProduct = (id) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product._id !== id)
    );
  };

  const addProduct = async () => {
    if (newProduct.name && newProduct.description) {
      try {
        const response = await fetch("http://localhost:8080/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newProduct),
        });
  
        if (response.ok) {
          const data = await response.json();
          setProducts([...products, data.product]); // Update state with the new product
          setNewProduct({ name: "", description: "", image: "" });
        } else {
          console.error("Failed to add product");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  

  return (
    <div className="p-6 flex flex-col flex-wrap">
      {/* Your Profile */}
      <div className="mb-6 w-96 h-3/4 flex flex-col justify-center items-center">
        <h1 className="text-2xl m-7 font-bold">Your Profile</h1>
        <img
          src="https://via.placeholder.com/150"
          alt="Profile"
          className="w-24 h-24 rounded-full border-2 border-black mt-2"
        />
        <p className="text-gray-600">Welcome back, lad!!</p>
      </div>

      {/* Your Listings */}
      <div className="">
        <h1 className="text-2xl font-bold mb-4">Your Listings</h1>

        {/* Add Product Form */}
        <div className="mb-6 p-4 border rounded-lg">
          <h2 className="text-lg font-bold mb-2">Add New Product</h2>
          <input
            type="text"
            placeholder="Product Name"
            className="border p-2 w-full mb-2 text-slate-700"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          />
          <textarea
            placeholder="Product Description"
            className="border p-2 w-full mb-2 text-slate-500"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          />
          <input
            type="text"
            placeholder="Image URL (optional)"
            className="border p-2 w-full mb-2 text-slate-500"
            value={newProduct.image}
            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
          />
          <button
            onClick={addProduct}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Add Product
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product._id} className="p-4 border rounded-lg">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover mb-2"
              />
              <h2 className="text-lg font-bold">{product.name}</h2>
              <p className="text-sm text-gray-600">{product.description}</p>
              <div className="mt-2">
                <button
                  onClick={() => setEditingProduct(product)}
                  className="text-blue-500 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteProduct(product._id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Editing Modal */}
        {editingProduct && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-2">Edit Product</h3>
              <input
                type="text"
                className="border p-2 w-full mb-4 text-slate-700"
                value={editingProduct.name}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    name: e.target.value,
                  })
                }
              />
              <textarea
                className="border p-2 w-full mb-4 text-slate-500"
                value={editingProduct.description}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    description: e.target.value,
                  })
                }
              />
              <button
                onClick={() =>
                  updateProduct(editingProduct._id, {
                    name: editingProduct.name,
                    description: editingProduct.description,
                  })
                }
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setEditingProduct(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
