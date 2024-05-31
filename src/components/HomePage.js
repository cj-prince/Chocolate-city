// src/components/HomePage.js
import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/artists");
  };

  return (
    <div className="relative w-full h-screen bg-[#060501]">
      <img
        src="https://img.freepik.com/premium-photo/music-abstract-background-black-background_566493-4451.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover opacity-70"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
        <h1 className="absolute text-7xl font-bold text-white opacity-[0.6] uppercase">
          Choco City
        </h1>
        <button
          onClick={handleButtonClick}
          className="relative z-10 px-12 py-3 text-lg font-semibold text-white bg-opacity-70 bg-black rounded-md hover:bg-opacity-90"
        >
          Let's Go
        </button>
      </div>
    </div>
  );
};

export default HomePage;
