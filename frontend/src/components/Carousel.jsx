import React, { useState ,useEffect } from "react";

function Carousel({ images, height }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Handle previous slide
  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      nextSlide();
    }, 5000);
  
    // Cleanup function to clear the timeout on every render
    return () => clearTimeout(timer);
  });
  

  return (
    <div
      className="relative w-screen overflow-hidden z-10"
      style={{ height: height }}
      
          >
      
      {/* Image Slider */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}vw)`, // Slide one image at a time
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="w-screen h-full flex-shrink-0"
            style={{ height: "100%" }}
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Arrows */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex justify-center gap-1 w-full px-4">
        <button
          onClick={prevSlide}
          className="bg-black text-white p-3 rounded-l-full shadow-md hover:bg-gray-700 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#FFFFFF"
          >
            <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="bg-black text-white p-3 rounded-r-full shadow-md hover:bg-gray-700 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#FFFFFF"
          >
            <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Carousel;
