"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";

const Imagenes = ({ files }:any) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % files.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + files.length) % files.length
    );
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="rounded-lg relative w-full h-96 overflow-hidden  flex items-center justify-center mb-4">
        <img
          src={files[currentIndex]}
          alt={`Imagen ${currentIndex + 1}`}
          className="min-w-full min-h-full rounded-lg"
          style={{objectFit:"cover"}}
        />
      </div>
      <div
        className="flex items-center justify-between rounded-lg"
        style={{ backgroundColor: "#4B4B4B66" }}
      >
        <button
          onClick={prevImage}
          className="p-2 cursor-pointer bg-transparent text-white rounded-full mr-2"
        >
          <ChevronLeft size={15}/>
        </button>

        <div className="flex items-center space-x-3">
          {files.map((_:any, index:any) => (
            <div
              key={index}
              className={`h-1 w-1 rounded-full ${
                currentIndex === index ? "bg-white" : "bg-[#9396A5]"
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextImage}
          className="p-2 cursor-pointer bg-transparent text-white rounded-full ms-2"
        >
          <ChevronRight size={15}/>
        </button>
      </div>
    </div>
  );
};

export default Imagenes;
