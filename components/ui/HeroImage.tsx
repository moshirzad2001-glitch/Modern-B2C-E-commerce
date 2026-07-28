"use client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

// 1. Array containing your 3 background image links
const BANNER_IMAGES = ["/perfume.jpg", "/leather.jpg", "/mainbg.png"];

export default function HeroBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    const isLastSlide = currentIndex === BANNER_IMAGES.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <div className="relative w-full h-100 md:h-125 overflow-hidden bg-gray-100 select-none">
      <div
        className="w-full h-full  bg-cover bg-center transition-all duration-1000 ease-in-out"
        style={{ backgroundImage: `url(${BANNER_IMAGES[currentIndex]})` }}
      />



      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex space-x-3">
        {BANNER_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === index
                ? "bg-amber-500 scale-125 shadow-md"
                : "bg-white/60 hover:bg-white"
              }`}
          />
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t  from-gray-100 to-transparent  pointer-events-none" />
    </div>
  );
}
