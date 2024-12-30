import React from "react";

function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-8 position-absolute w-full bottom-0">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-gray-600 pb-8">
          {/* Logo & About */}
          <div className="space-y-4">
            <h2 className="text-white text-2xl font-bold">Swapify</h2>
            <p className="text-sm text-gray-400">
              Empowering seamless bartering. Swap, trade, and connect responsibly with Swapify.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="/home" className="hover:text-white transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-white transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="/ProductsListing" className="hover:text-white transition">
                  Services
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold text-white">Follow Us</h3>
            <div className="flex items-center mt-4 space-x-4">
              <a
                href="https://facebook.com"
                className="hover:text-blue-500 transition"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f"></i> {/* Example icon */}
              </a>
              <a
                href="https://twitter.com"
                className="hover:text-blue-400 transition"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="https://instagram.com"
                className="hover:text-pink-500 transition"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://linkedin.com"
                className="hover:text-blue-600 transition"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Swapify. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="#privacy-policy"
              className="text-sm hover:text-white transition"
            >
              Privacy Policy
            </a>
            <a
              href="#terms-conditions"
              className="text-sm hover:text-white transition"
            >
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
