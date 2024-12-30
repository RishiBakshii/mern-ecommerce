import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for routing
import { useCart } from "../context/CartContext"; // Import useCart
import "../NavBar.css";
import Dropdown from "./DropDown";

function NavBar() {
  const { cartItems } = useCart(); // Get cartItems from CartContext
  const [showNavBar, setShowNavBar] = useState(true); // state to control navbar visibility

  const menuItems = [
    { id: 1, label: "HOME", link: "/" },
    { id: 2, label: "BOOKS", link: "/products?category=books" },
    { id: 3, label: "GADGETS", link: "/products?category=gadgets" },
    { id: 4, label: "SHOES", link: "/products?category=shoes" },
    { id: 5, label: "OTHERS", link: "/products?category=others" },
    { id: 6, label: <Dropdown />, link: "/login" },
  ];

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowNavBar(false); // hide navbar when scrolling down
      } else {
        setShowNavBar(true); // show navbar when scrolling up
      }
      lastScrollY = window.scrollY; // update last scroll position
    };

    window.addEventListener("scroll", handleScroll); // attach scroll listener

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`text-white m-1 bg-black/30 backdrop-blur-2xl rounded-full h-12 flex items-center justify-between px-3 shadow-md transition-transform duration-300 ${
        showNavBar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {menuItems.map((item) => (
        <Link
          key={item.id}
          to={item.link} // Use `to` instead of `href` for React Router
          className="group relative px-4 py-1 font-semibold text-white rounded-full transition duration-300"
        >
          {item.label}
          {/* Underline Animation */}
          <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-1/2 group-hover:-translate-x-1/2 ease-out"></span>
        </Link>
      ))}

      {/* Cart Count */}
      <div className="cart-count">
        {cartItems.length > 0 ? <span>{cartItems.length}</span> : null}
      </div>
    </nav>
  );
}

export default NavBar;
