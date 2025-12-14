// src/Pages/HomePage.jsx
import React, { useEffect, useState } from "react";
import { fetchSettings, fetchServiceCategories } from "../api/api";
import Header from "../Components/Header";
import ContactModal from "../Components/ContactModal";
import FloatingButton from "../Components/FloatingButton";
import ServicesSection from "../Components/ServicesSection";

function HomePage() {
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

      <main>
        {/* HERO SECTION */}
        <section id="hero" className="relative overflow-hidden min-h-screen flex items-center">
          {/* Video Background */}
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-20"
            >
              <source src="/videos/video-1.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/20"></div>
          </div>

          {/* Subtle red glow */}
          <div className="absolute inset-0 z-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.05),rgba(0,0,0,0))]"></div>
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>

          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
            <div className="max-w-4xl mx-auto text-center text-white space-y-8">
              <div className="inline-block animate-fade-in">
                <span className="bg-red-600/10 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-semibold border border-red-600/20 shadow-lg">
                  Инженерный подход к IT-решениям
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight animate-fade-in-up">
                <span className="bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent drop-shadow-2xl">
                  {settings?.hero_title ||
                    "Проектируем, монтируем и обслуживаем IT-инфраструктуру"}
                </span>
              </h1>

              <p className="text-xl sm:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                {settings?.hero_subtitle ||
                  "Сайты, видеонаблюдение, серверы, оптика и обслуживание. Делаем так, чтобы всё просто работало."}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="group inline-flex items-center px-10 py-5 rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white text-lg font-semibold transition-all shadow-2xl shadow-red-500/40 hover:shadow-red-500/60 transform hover:-translate-y-1 hover:scale-105"
                >
                  <svg className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Оставить заявку
                </button>
                
                <a
                  href="#contacts"
                  className="inline-flex items-center px-10 py-5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-lg border border-zinc-800 hover:border-zinc-700 font-semibold transition-all transform hover:-translate-y-1"
                >
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Позвонить
                </a>
              </div>

              <div className="flex flex-wrap justify-center gap-6 pt-4 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
                {settings?.whatsapp_link && (
                  <a
                    href={settings.whatsapp_link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center text-gray-400 hover:text-white transition-all hover:scale-110"
                  >
                    <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    <span className="text-lg font-medium">WhatsApp</span>
                  </a>
                )}
                {settings?.telegram_link && (
                  <a
                    href={settings.telegram_link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center text-gray-400 hover:text-white transition-all hover:scale-110"
                  >
                    <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                    </svg>
                    <span className="text-lg font-medium">Telegram</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* WHAT WE DO SECTION */}
        <section className="py-24 bg-zinc-950 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(239,68,68,0.03),rgba(0,0,0,0))]"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                <span className="bg-gradient-to-r from-red-400 to-red-200 bg-clip-text text-transparent">
                  Чем мы занимаемся
                </span>
              </h2>
              <p className="text-xl text-gray-400 leading-relaxed">
                Полный спектр услуг по созданию и поддержке IT-инфраструктуры вашего бизнеса
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Проектирование */}
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-red-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative bg-zinc-950/80 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-8 h-full transform group-hover:-translate-y-2 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-red-400 transition-colors">
                    Проектирование
                  </h3>
                  <p className="text-gray-500 leading-relaxed">
                    Разработка и дизайн современных Web-сайтов с адаптивным интерфейсом
                  </p>
                </div>
              </div>

              {/* Видеонаблюдение */}
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-red-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative bg-zinc-950/80 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-8 h-full transform group-hover:-translate-y-2 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-red-400 transition-colors">
                    Видеонаблюдение
                  </h3>
                  <ul className="text-gray-500 leading-relaxed space-y-2 text-sm">
                    <li>• Разработка индивидуальных проектов</li>
                    <li>• Монтаж оборудования и кабельных систем</li>
                    <li>• Настройка мобильного доступа</li>
                    <li>• Профилактика и обслуживание</li>
                  </ul>
                </div>
              </div>

              {/* Серверы и ПК */}
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-red-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative bg-zinc-950/80 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-8 h-full transform group-hover:-translate-y-2 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-red-400 transition-colors">
                    Серверы и ПК
                  </h3>
                  <ul className="text-gray-500 leading-relaxed space-y-2 text-sm">
                    <li>• Установка ПО и замена комплектующих</li>
                    <li>• Регламентное обслуживание</li>
                    <li>• Диагностика и ремонт</li>
                    <li>• Прошивка оборудования</li>
                  </ul>
                </div>
              </div>

              {/* Другие услуги */}
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-red-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative bg-zinc-950/80 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-8 h-full transform group-hover:-translate-y-2 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-red-400 transition-colors">
                    Дополнительно
                  </h3>
                  <ul className="text-gray-500 leading-relaxed space-y-2 text-sm">
                    <li>• Работы с оптоволокном</li>
                    <li>• Мониторинг серверов 24/7</li>
                    <li>• Системы контроля доступа</li>
                    <li>• Интеграция со шлагбаумами</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS SECTION */}
        <section className="py-20 bg-black relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-red-400 to-red-200 bg-clip-text text-transparent mb-3">
                  5+
                </div>
                <p className="text-lg text-gray-500 font-medium">Лет опыта</p>
              </div>
              
              <div className="text-center">
                <div className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-red-400 to-red-200 bg-clip-text text-transparent mb-3">
                  100+
                </div>
                <p className="text-lg text-gray-500 font-medium">Проектов</p>
              </div>
              
              <div className="text-center">
                <div className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-red-400 to-red-200 bg-clip-text text-transparent mb-3">
                  24/7
                </div>
                <p className="text-lg text-gray-500 font-medium">Поддержка</p>
              </div>
              
              <div className="text-center">
                <div className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-red-400 to-red-200 bg-clip-text text-transparent mb-3">
                  99%
                </div>
                <p className="text-lg text-gray-500 font-medium">Uptime</p>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section id="services" className="py-20 bg-zinc-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                Наши услуги
              </h2>
              <p className="text-xl text-gray-400">
                Берём на себя весь цикл: от проекта и закупки оборудования до монтажа
                и последующей поддержки.
              </p>
            </div>

            <ServicesSection categories={categories} />
          </div>
        </section>

        {/* CONTACTS SECTION */}
        <section id="contacts" className="py-20 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                Контакты
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-red-400/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition"></div>
                <div className="relative bg-zinc-950/80 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-8 text-center transform hover:scale-105 transition-transform duration-200">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    Адрес
                  </h3>
                  <p className="text-lg text-white">
                    {settings?.address || "Адрес будет указан позже"}
                  </p>
                </div>
              </div>

              {settings?.phone && (
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-red-400/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition"></div>
                  <div className="relative bg-zinc-950/80 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-8 text-center transform hover:scale-105 transition-transform duration-200">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      Телефон
                    </h3>
                    <a
                      href={`tel:${settings.phone}`}
                      className="text-lg text-red-400 hover:text-red-300 font-medium"
                    >
                      {settings.phone}
                    </a>
                  </div>
                </div>
              )}

              {settings?.email && (
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-red-400/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition"></div>
                  <div className="relative bg-zinc-950/80 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-8 text-center transform hover:scale-105 transition-transform duration-200">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      Email
                    </h3>
                    <a
                      href={`mailto:${settings.email}`}
                      className="text-lg text-red-400 hover:text-red-300 font-medium break-all"
                    >
                      {settings.email}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-black border-t border-zinc-900 text-white py-8">
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

export default HomePage;