import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import ProductListing from "./pages/ProductListing";
import ProductDetails from "./pages/ProductDetails";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import websiteLogo from "./assets/Swapify-logo.png";
import { Link } from 'react-router-dom';
import Dashboard from "./pages/Dashboard";
import CartPage from "./pages/CartPage";
import { CartProvider } from "./context/CartContext";
import { useCart } from "./context/CartContext";


function App() {

  const [showNavBar, setShowNavBar] = useState(true);

  useEffect(() => {
    document.title = "Swapify - Home";

    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > lastScrollY) {
            setShowNavBar(false);
          } else {
            setShowNavBar(true);
          }
          lastScrollY = window.scrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <CartProvider>
    <Router>
      <div className="relative h-full w-screen bg-black text-white">
        <header
          className={`fixed top-0 left-0 w-full z-50 bg-black/50 backdrop-blur-3xl shadow-md transition-transform duration-300 ${
            showNavBar ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="flex items-center flex-row px-5 py-2">
            <div className="flex items-center text-2xl font-bold absolute">
              <img className="h-12 mr-2" src={websiteLogo} alt="website-logo" />
              Swapify
            </div>
            <div className="w-full max-w-xl mx-auto">
              <NavBar />
            </div>
            <Link
          key={'5'}
          to={"/cart"} // Use `to` instead of `href` for React Router
          className="group relative px-4 py-1 font-semibold text-white rounded-full transition duration-300 group-hover:scale-110"
        >
          {/* <div className="cart-count">
            {cartItems.length > 0 ? <span>{cartItems.length}</span> : null}
          </div> */}

          <svg xmlns="http://www.w3.org/2000/svg" height="24px" className="group-hover:scale-110 transition duration-300 ease-in-out" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z"/></svg>
          {/* Underline Animation */}
          <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-1/2 group-hover:-translate-x-1/2 ease-in-out"></span>
        </Link>
          </div>
        </header>
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Login />} />
            <Route path="/products" element={<ProductListing />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/dashboard" element={   <Dashboard />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
    </CartProvider>
  );
}

export default App;
