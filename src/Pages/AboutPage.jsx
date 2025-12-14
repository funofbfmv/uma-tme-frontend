// src/Pages/AboutPage.jsx
import React, { useEffect, useState } from "react";
import { fetchSettings } from "../api/api";
import Header from "../Components/Header";
import FloatingButton from "../Components/FloatingButton";
import ContactModal from "../Components/ContactModal";

function AboutPage() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const s = await fetchSettings();
        setSettings(s);
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
        {/* Subtle red glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(239,68,68,0.05),transparent_50%)]"></div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-red-600/5 rounded-full blur-3xl"></div>

        {/* Hero Section */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-red-400 to-red-200 bg-clip-text text-transparent">
                О компании
              </span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed mb-8">
              Мы — команда профессионалов в области IT-инфраструктуры, специализирующаяся на комплексных решениях 
              для бизнеса любого масштаба. От проектирования до круглосуточной поддержки — мы берём на себя все этапы.
            </p>
            <div className="inline-flex items-center gap-3 text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>5+ лет опыта</span>
              </div>
              <div className="w-1 h-1 bg-gray-700 rounded-full"></div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>100+ проектов</span>
              </div>
              <div className="w-1 h-1 bg-gray-700 rounded-full"></div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>24/7 поддержка</span>
              </div>
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Наши компетенции
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Полный цикл услуг: от анализа и проектирования до внедрения, обслуживания и круглосуточной поддержки
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Web-разработка */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-red-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative bg-zinc-950/80 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-8">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-red-600 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors">
                      Web-разработка и SaaS решения
                    </h3>
                    <ul className="space-y-2 text-gray-500 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 mt-1">•</span>
                        <span>Разработка современных Web-сайтов и приложений</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 mt-1">•</span>
                        <span>Создание SaaS платформ и облачных решений</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 mt-1">•</span>
                        <span>Адаптивный дизайн и UX/UI проектирование</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 mt-1">•</span>
                        <span>Интеграция с внешними сервисами и API</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 mt-1">•</span>
                        <span>Разработка панелей управления и CRM систем</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Видеонаблюдение */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-red-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative bg-zinc-950/80 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-8">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-red-600 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors">
                      Системы видеонаблюдения
                    </h3>
                    <ul className="space-y-2 text-gray-500 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 mt-1">•</span>
                        <span>Расчет и проектирование под каждый объект</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 mt-1">•</span>
                        <span>Монтаж камер, видеорегистраторов, сетевого оборудования</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 mt-1">•</span>
                        <span>Прокладка и монтаж кабельных систем</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 mt-1">•</span>
                        <span>Настройка мобильного доступа и беспроводных систем</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 mt-1">•</span>
                        <span>Профилактика, ремонт и замена оборудования</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Обслуживание серверов */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-red-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative bg-zinc-950/80 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-8">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-red-600 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors">
                      Обслуживание IT-инфраструктуры
                    </h3>
                    <ul className="space-y-2 text-gray-500 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 mt-1">•</span>
                        <span>Установка ПО на сервера и персональные компьютеры</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 mt-1">•</span>
                        <span>Замена комплектующих и модернизация оборудования</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 mt-1">•</span>
                        <span>Регламентное техническое обслуживание</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 mt-1">•</span>
                        <span>Диагностика и проверка оборудования</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 mt-1">•</span>
                        <span>Ремонт, прошивка и восстановление доступа</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Дополнительные услуги */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-red-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative bg-zinc-950/80 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-8">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-red-600 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors">
                      Дополнительные решения
                    </h3>
                    <ul className="space-y-2 text-gray-500 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 mt-1">•</span>
                        <span>Работы с оптоволоконным кабелем и оборудованием</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 mt-1">•</span>
                        <span>Мониторинг серверов 24/7 с уведомлениями</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 mt-1">•</span>
                        <span>Системы контроля и управления доступом (СКУД)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 mt-1">•</span>
                        <span>Интеграция со шлагбаумами и электронными замками</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 mt-1">•</span>
                        <span>Настройка и поддержка сетевой инфраструктуры</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Почему выбирают нас
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-red-400/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition"></div>
              <div className="relative bg-zinc-950/80 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Профессионализм</h3>
                <p className="text-gray-500 text-sm">
                  Опытная команда специалистов с подтвержденной квалификацией и многолетним опытом
                </p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-red-400/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition"></div>
              <div className="relative bg-zinc-950/80 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Оперативность</h3>
                <p className="text-gray-500 text-sm">
                  Быстрое реагирование на заявки и выполнение работ точно в срок
                </p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-red-400/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition"></div>
              <div className="relative bg-zinc-950/80 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Прозрачность</h3>
                <p className="text-gray-500 text-sm">
                  Честное ценообразование и гарантия на все виды работ
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-red-600/10 to-red-400/10 rounded-3xl blur-2xl group-hover:from-red-600/15 group-hover:to-red-400/15 transition-all duration-500"></div>
            <div className="relative bg-zinc-950/90 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-12 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Готовы начать работу?
              </h2>
              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                Свяжитесь с нами для обсуждения вашего проекта. Мы подберем оптимальное решение 
                под ваши задачи и бюджет.
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
        services={[]}
      />
    </div>
  );
}

export default AboutPage;