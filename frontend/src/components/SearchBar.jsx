import React from "react";

function SearchBar({ onChange }) {
  return (
    <div className="flex items-center h-12 w-full m-1 rounded-full border-gray-400 border-2">
      {/* Input Box */}
      <input
        type="text"
        placeholder="Search..."
        className="h-full px-5 w-full rounded-l-full bg-white/75 backdrop-blur-lg focus:outline-none border-gray-400 text-black placeholder:text-black"
        onChange={onChange} // Trigger the onChange function
      />

      {/* Search Button */}
      <button className="h-full p-4 w-13 bg-white/75 backdrop-blur-lg rounded-r-full flex items-center justify-center hover:bg-black group transition-all duration-300 ease-in-out">
        {/* Search Icon */}
        <svg
          className="w-6 h-6 text-black group-hover:text-white transition-colors duration-300 ease-in-out"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M9.5 17a7.5 7.5 0 110-15 7.5 7.5 0 010 15z"
          />
        </svg>
      </button>
    </div>
  );
}

export default SearchBar;
