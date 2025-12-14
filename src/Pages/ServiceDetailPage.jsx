// src/Pages/ServiceDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchSettings, fetchServiceCategories } from "../api/api";
import Header from "../Components/Header";
import FloatingButton from "../Components/FloatingButton";
import ContactModal from "../Components/ContactModal";

function ServiceDetailPage() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [settings, setSettings] = useState(null);
  const [service, setService] = useState(null);
  const [categories, setCategories] = useState([]);
  const [relatedServices, setRelatedServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const [s, cats] = await Promise.all([
          fetchSettings(),
          fetchServiceCategories(),
        ]);
        setSettings(s);
        setCategories(cats);

        // Находим услугу по ID
        let foundService = null;
        let foundCategory = null;
        
        for (const category of cats) {
          const found = category.services.find(
            (srv) => srv.id === parseInt(serviceId)
          );
          if (found) {
            foundService = found;
            foundCategory = category;
            break;
          }
        }

        if (foundService && foundCategory) {
          setService({ ...foundService, category: foundCategory.title });
          // Получаем связанные услуги из той же категории
          const related = foundCategory.services
            .filter((s) => s.id !== foundService.id)
            .slice(0, 3);
          setRelatedServices(related);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [serviceId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-500"></div>
          <p className="mt-4 text-lg text-gray-300 font-medium">Загрузка...</p>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-black">
        <Header settings={settings} />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Услуга не найдена</h1>
            <button
              onClick={() => navigate("/")}
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-semibold transition-all"
            >
              На главную
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Header settings={settings} />

      <main className="py-20 relative">
        {/* Subtle purple glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(239,68,68,0.05),transparent_50%)]"></div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-red-600/5 rounded-full blur-3xl"></div>

        {/* Breadcrumbs */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="flex items-center space-x-2 text-sm">
            <button
              onClick={() => navigate("/")}
              className="text-gray-500 hover:text-white transition-colors"
            >
              Главная
            </button>
            <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-500">{service.category}</span>
            <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-white">{service.title}</span>
          </div>
        </div>

        {/* Service Hero */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-red-600/10 to-red-400/10 rounded-3xl blur-2xl"></div>
            <div className="relative bg-zinc-950/80 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-8 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <div>
                  <div className="inline-block mb-4">
                    <span className="bg-red-600/10 backdrop-blur-sm text-red-300 px-4 py-2 rounded-full text-sm font-semibold border border-red-600/20">
                      {service.category}
                    </span>
                  </div>
                  
                  <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                    {service.title}
                  </h1>
                  
                  {service.full_description && (
                    <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                      {service.full_description}
                    </p>
                  )}

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-semibold transition-all shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transform hover:scale-105"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Заказать услугу
                    </button>
                    
                    <button
                      onClick={() => navigate("/services")}
                      className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 hover:border-zinc-700 font-semibold transition-all"
                    >
                      Назад к услугам
                    </button>
                  </div>
                </div>

                {/* Right - Service Icon */}
                <div className="flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-red-600/20 to-red-400/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="relative w-64 h-64 bg-gradient-to-br from-red-600/10 to-red-400/10 rounded-full flex items-center justify-center backdrop-blur-xl border border-red-600/20">
                      {service.icon ? (
                        <img 
                          src={service.icon} 
                          alt={service.title}
                          className="w-32 h-32 object-contain"
                        />
                      ) : (
                        <svg className="w-32 h-32 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Почему выбирают нас
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-red-400/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition"></div>
              <div className="relative bg-zinc-950/80 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-500 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Профессионализм</h3>
                <p className="text-gray-500 text-sm">Опытная команда специалистов с подтвержденной квалификацией</p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-red-400/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition"></div>
              <div className="relative bg-zinc-950/80 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-500 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Оперативность</h3>
                <p className="text-gray-500 text-sm">Быстрое реагирование на заявки и выполнение работ в срок</p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-red-400/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition"></div>
              <div className="relative bg-zinc-950/80 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-500 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Прозрачность</h3>
                <p className="text-gray-500 text-sm">Честное ценообразование и гарантия на все виды работ</p>
              </div>
            </div>
          </div>
        </section>

        {/* Related Services */}
        {relatedServices.length > 0 && (
          <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Другие услуги в категории "{service.category}"
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedServices.map((relatedService) => (
                <div
                  key={relatedService.id}
                  onClick={() => navigate(`/service/${relatedService.id}`)}
                  className="group relative cursor-pointer"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-red-400/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                  <div className="relative bg-zinc-950/80 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-6 transform group-hover:-translate-y-2 transition-all duration-300">
                    {/* Service Icon */}
                    {relatedService.icon && (
                      <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-500 rounded-lg flex items-center justify-center mb-4 overflow-hidden">
                        <img 
                          src={relatedService.icon} 
                          alt={relatedService.title}
                          className="w-6 h-6 object-contain"
                        />
                      </div>
                    )}
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors">
                      {relatedService.title}
                    </h3>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                      {relatedService.short_description}
                    </p>
                    <div className="flex items-center text-red-400 text-sm font-semibold">
                      Подробнее
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-zinc-900 text-white py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <span className="text-gray-500">
              © {new Date().getFullYear()} {settings?.site_name || "TME"}
            </span>
            {settings?.footer_text && (
              <span className="text-gray-500">{settings.footer_text}</span>
            )}
          </div>
        </div>
      </footer>

      {/* Floating Button */}
      <FloatingButton onClick={() => setIsModalOpen(true)} />

      {/* Contact Modal */}
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        services={categories.flatMap((c) => c.services)}
      />
    </div>
  );
}

export default ServiceDetailPage;