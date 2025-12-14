import React, { useState, useEffect } from "react";
import ContactForm from "./ContactForm";

function ContactModal({ isOpen, onClose, services }) {
  // Закрытие по ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg animate-in fade-in zoom-in duration-300">
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-red-600/30 to-red-500/30 rounded-2xl blur"></div>
        
        {/* Modal content */}
        <div className="relative bg-zinc-950/95 backdrop-blur-xl border border-zinc-800/50 rounded-2xl shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-zinc-800/50">
            <div>
              <h2 className="text-2xl font-bold text-white">
                Оставить заявку
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                Подберём решение под ваш объект и бюджет
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-zinc-800/50 transition-colors group"
            >
              <svg
                className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Form */}
          <div className="p-6 max-h-[70vh] overflow-y-auto">
            <ContactForm services={services} onSuccess={onClose} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactModal;