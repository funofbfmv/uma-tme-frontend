// src/Components/ScrollToTopButton.jsx
import React, { useState, useEffect } from "react";

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 left-6 z-50 group"
      aria-label="Вернуться наверх"
    >
      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-500 rounded-full blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
      
      {/* Button */}
      <div className="relative w-14 h-14 bg-gradient-to-r from-red-600 to-red-500 rounded-full flex items-center justify-center shadow-2xl shadow-red-500/40 group-hover:scale-110 transition-transform">
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </div>

      {/* Tooltip */}
      <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="bg-zinc-900 text-white text-sm font-medium px-3 py-2 rounded-lg whitespace-nowrap shadow-xl border border-zinc-800">
          Наверх
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full">
            <div className="border-8 border-transparent border-r-zinc-900"></div>
          </div>
        </div>
      </div>
    </button>
  );
}

export default ScrollToTopButton;