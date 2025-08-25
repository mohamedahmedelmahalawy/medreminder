"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import DoctorCard from "./DoctorCard";

const SpecialistsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const doctors = [
    {
      id: 1,
      name: "Dr. Elaine Maloni",
      speciality: "Chief Surgeon",
      image: "/doctor-1.jpg",
    },
    {
      id: 2,
      name: "Dr. Joshua Searle",
      speciality: "Neurologist",
      image: "/doctor-2.jpg",
    },
    {
      id: 3,
      name: "Dr. Benita James",
      speciality: "Dermatologist",
      image: "/doctor-3.jpg",
    },
    {
      id: 4,
      name: "Dr. Michael Chen",
      speciality: "Cardiologist",
      image: "/doctor-6.jpg",
    },
    {
      id: 5,
      name: "Dr. Sarah Williams",
      speciality: "Pediatrician",
      image: "/doctor-12.jpg",
    },
    {
      id: 6,
      name: "Dr. Robert Taylor",
      speciality: "Orthopedic Surgeon",
      image: "/doctor-9.jpg",
    },
    {
      id: 7,
      name: "Dr. Lisa Anderson",
      speciality: "Radiologist",
      image: "/doctor-11.jpg",
    },
    {
      id: 8,
      name: "Dr. David Martinez",
      speciality: "Emergency Medicine",
      image: "/doctor-8.jpg",
    },
    {
      id: 9,
      name: "Dr. Jennifer Brown",
      speciality: "Oncologist",
      image: "/doctor-13.jpg",
    },
  ];

  // Calculate how many cards to show based on screen size
  const getCardsPerView = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1024) return 3; // Desktop
      if (window.innerWidth >= 768) return 2; // Tablet
      return 1; // Mobile
    }
    return 3; // Default
  };

  const [cardsPerView, setCardsPerView] = useState(getCardsPerView());

  React.useEffect(() => {
    const handleResize = () => {
      setCardsPerView(getCardsPerView());
      // Reset to first slide if current index would show empty cards
      const maxIndex = Math.max(0, doctors.length - getCardsPerView());
      if (currentIndex > maxIndex) {
        setCurrentIndex(maxIndex);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentIndex, doctors.length]);

  const maxIndex = Math.max(0, doctors.length - cardsPerView);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex <= 0 ? maxIndex : prevIndex - 1));
  };

  return (
    <div className="mx-auto px-6 py-18 w-full max-w-7xl">
      {/* Header */}
      <div className="flex justify-between items-start mb-12">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-green-500 rounded-full w-2 h-2" />
            <p className="font-semibold text-green-500 md:text-base text-xl tracking-wider">
              OUR DOCTORS
            </p>
            <div className="bg-green-500 rounded-full w-2 h-2" />
          </div>
          <h2 className="font-bold text-blue-900 text-4xl">
            Meet The Specialist Team
          </h2>
        </div>
        {/* remove the old buttons from here */}
      </div>

      {/* Slider with overlaid nav */}
      <div className="relative">
        {/* Left button */}
        <button
          onClick={prevSlide}
          aria-label="Previous"
          className="top-1/2 left-0 z-10 absolute bg-white hover:bg-blue-700 disabled:bg-gray-300 shadow-md p-3 rounded-full text-blue-600 hover:text-white transition-colors -translate-x-4 -translate-y-1/2 cursor-pointer disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Right button */}
        <button
          onClick={nextSlide}
          aria-label="Next"
          className="top-1/2 right-0 z-10 absolute bg-white hover:bg-blue-700 disabled:bg-gray-300 shadow-md p-3 rounded-full text-blue-600 hover:text-white transition-colors -translate-y-1/2 translate-x-4 cursor-pointer disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Cards Container */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-900 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
            }}
          >
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="flex-shrink-0 px-2"
                style={{ width: `${100 / cardsPerView}%` }}
              >
                <DoctorCard doctor={doctor} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialistsSlider;
