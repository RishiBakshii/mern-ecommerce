import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import websiteLogo from "/src/assets/Swapify-logo.png";
import Carousel from "../components/Carousel";
import Recommendations from "../components/Recomendations";
import Footer from "../components/Footer";

function Home() {
  const images = [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://media.istockphoto.com/id/1303978937/photo/white-sneaker-on-a-blue-gradient-background-mens-fashion-sport-shoe-sneakers-lifestyle.webp?s=2048x2048&w=is&k=20&c=iDwkE046emMy4M5pz_fN_KpSotExIM2SNz7C1YbJ0IM=",
    "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://via.placeholder.com/1200x500/FF00FF/FFFFFF?text=Image+5",
  ];

  return (
    <div className="relative h-full w-screen bg-black text-white">
      

      <main className="">
        <Carousel images={images} height="500px" />
        <Recommendations />
      </main>

    </div>
  );
}

export default Home;
