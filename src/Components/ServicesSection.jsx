// src/Components/ServicesSection.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function ServicesSection({ categories }) {
  const navigate = useNavigate();

  if (!categories || categories.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">Услуги загружаются...</p>
      </div>
    );
  }

  return (
    <div className="space-y-16">
      {categories.map((category) => (
        <div key={category.id} className="space-y-8">
          {/* Category Title */}
          <div className="text-center">
            <h3 className="text-3xl font-bold text-white mb-3">
              <span className="bg-gradient-to-r from-red-400 to-red-200 bg-clip-text text-transparent">
                {category.title}
              </span>
            </h3>
            {category.description && (
              <p className="text-gray-400 max-w-2xl mx-auto">
                {category.description}
              </p>
            )}
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.services.map((service) => (
              <div
                key={service.id}
                onClick={() => navigate(`/service/${service.id}`)}
                className="group relative cursor-pointer"
              >
                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-red-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                
                {/* Card */}
                <div className="relative bg-zinc-950/80 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-8 h-full transform group-hover:-translate-y-2 transition-all duration-300">
                  {/* Service Icon */}
                  {service.icon ? (
                    <div className="w-14 h-14 bg-gradient-to-br from-red-600 to-red-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform overflow-hidden">
                      <img 
                        src={service.icon} 
                        alt={service.title}
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-14 h-14 bg-gradient-to-br from-red-600 to-red-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}

                  {/* Service Title */}
                  <h4 className="text-xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors">
                    {service.title}
                  </h4>

                  {/* Service Description */}
                  <p className="text-gray-500 leading-relaxed mb-4 line-clamp-3">
                    {service.short_description}
                  </p>

                  {/* Learn More Link */}
                  <div className="flex items-center text-red-400 text-sm font-semibold mt-auto">
                    <span>Подробнее</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ServicesSection;