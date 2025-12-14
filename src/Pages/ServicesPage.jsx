// src/Pages/ServicesPage.jsx
import React, { useEffect, useState } from "react";
import { fetchSettings, fetchServiceCategories } from "../api/api";
import Header from "../Components/Header";
import FloatingButton from "../Components/FloatingButton";
import ContactModal from "../Components/ContactModal";
import ServicesSection from "../Components/ServicesSection";

function ServicesPage() {
  const [settings, setSettings] = useState(null);
  const [categories, setCategories] = useState([]);
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
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

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

  return (
    <div className="min-h-screen bg-black">
      <Header settings={settings} />

      <main className="py-20 relative">
        {/* Subtle purple glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(239,68,68,0.05),transparent_50%)]"></div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-red-600/5 rounded-full blur-3xl"></div>

        {/* Page Hero */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-red-400 to-red-200 bg-clip-text text-transparent">
                Наши услуги
              </span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              Полный спектр услуг по созданию и поддержке IT-инфраструктуры вашего бизнеса.
              Берём на себя весь цикл: от проекта и закупки оборудования до монтажа и последующей поддержки.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ServicesSection categories={categories} />
        </section>

        {/* CTA Section */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-red-600/10 to-red-400/10 rounded-3xl blur-2xl group-hover:from-red-600/15 group-hover:to-red-400/15 transition-all duration-500"></div>
            <div className="relative bg-zinc-950/90 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-12 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Не нашли нужную услугу?
              </h2>
              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                Свяжитесь с нами, и мы подберем индивидуальное решение для вашего бизнеса
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center px-10 py-5 rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white text-lg font-semibold transition-all shadow-2xl shadow-red-500/30 hover:shadow-red-500/50 transform hover:scale-105"
              >
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Оставить заявку
              </button>
            </div>
          </div>
        </section>
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

      <FloatingButton onClick={() => setIsModalOpen(true)} />
      
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        services={categories.flatMap((c) => c.services)}
      />
    </div>
  );
}

export default ServicesPage;