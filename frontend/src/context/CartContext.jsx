    // src/context/CartContext.js
    import React, { createContext, useState, useContext } from "react";

    const CartContext = createContext();

    export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        console.log(product);
      
        setCartItems((prevItems) => {
          // Check if the product already exists in the cart by comparing IDs
          const itemExists = prevItems.find((item) => item.id === product.id);
      
          if (itemExists) {
            // Use map with item and index, to update the quantity of the existing item
            return prevItems.map((item, index) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }  // Increase quantity
                : item
            );
          }
      
          // If the product doesn't exist, add a new item to the cart with quantity 1
          return [...prevItems, { ...product, quantity: 1 }];
        });
      };
      

    const removeItem = (id) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeItem }}>
        {children}
        </CartContext.Provider>
    );
    };

    export const useCart = () => useContext(CartContext);
