import React from "react";

function ServicesSection({ categories }) {
  if (!categories || categories.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Услуги скоро появятся</p>
      </div>
    );
  }

  return (
    <div className="space-y-16">
      {categories.map((category) => (
        <div key={category.id} className="space-y-8">
          {/* Category Title */}
          <div className="text-center">
            <h3 className="text-3xl font-bold text-white mb-2">
              {category.title}
            </h3>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full"></div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.services.map((service) => (
              <div key={service.id} className="group relative">
                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl blur opacity-0 group-hover:opacity-25 transition duration-500"></div>
                
                {/* Card */}
                <div className="relative bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-xl hover:border-white/20 transition-all duration-300 overflow-hidden transform group-hover:-translate-y-1">
                  <div className="p-6 space-y-4">
                    {/* Icon and Title */}
                    <div className="flex items-start gap-4">
                      {service.icon ? (
                        <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform border border-white/10">
                          <img
                            src={service.icon}
                            alt={service.title}
                            className="w-8 h-8 object-contain"
                          />
                        </div>
                      ) : (
                        <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                          <svg
                            className="w-7 h-7 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                      )}
                      <div className="flex-1">
                        <h4 className="font-bold text-lg text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all">
                          {service.title}
                        </h4>
                        {service.is_featured && (
                          <span className="inline-block mt-1 text-xs font-semibold text-purple-400 bg-purple-500/10 px-2 py-1 rounded border border-purple-500/20">
                            Популярно
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    {service.short_description && (
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {service.short_description}
                      </p>
                    )}

                    {/* Full Description (if exists) */}
                    {service.full_description && service.full_description !== service.short_description && (
                      <p className="text-gray-500 text-xs leading-relaxed pt-2 border-t border-white/5">
                        {service.full_description}
                      </p>
                    )}
                  </div>

                  {/* Bottom Gradient Bar */}
                  <div className="h-1 bg-gradient-to-r from-purple-500 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
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