// src/Pages/ContactsPage.jsx
import React, { useEffect, useState } from "react";
import { fetchSettings } from "../api/api";
import Header from "../Components/Header";
import FloatingButton from "../Components/FloatingButton";
import ContactModal from "../Components/ContactModal";

function ContactsPage() {
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
        {/* Subtle purple glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(239,68,68,0.05),transparent_50%)]"></div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-red-600/5 rounded-full blur-3xl"></div>

        {/* Page Hero */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-red-400 to-red-200 bg-clip-text text-transparent">
                Контакты
              </span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              Свяжитесь с нами удобным для вас способом. Мы всегда готовы ответить на ваши вопросы
              и помочь в реализации IT-проектов.
            </p>
          </div>
        </section>

        {/* Contact Cards */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Address */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-red-400/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition"></div>
              <div className="relative bg-zinc-950/80 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-8 text-center h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                  Адрес
                </h3>
                <p className="text-lg text-white font-medium">
                  {settings?.address || "Адрес будет указан позже"}
                </p>
              </div>
            </div>

            {/* Phone */}
            {settings?.phone && (
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-red-400/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition"></div>
                <div className="relative bg-zinc-950/80 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-8 text-center h-full">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                    Телефон
                  </h3>
                  <a
                    href={`tel:${settings.phone}`}
                    className="text-lg text-red-400 hover:text-red-300 font-medium transition-colors"
                  >
                    {settings.phone}
                  </a>
                </div>
              </div>
            )}

            {/* Email */}
            {settings?.email && (
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-red-400/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition"></div>
                <div className="relative bg-zinc-950/80 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-8 text-center h-full">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                    Email
                  </h3>
                  <a
                    href={`mailto:${settings.email}`}
                    className="text-lg text-red-400 hover:text-red-300 font-medium transition-colors break-all"
                  >
                    {settings.email}
                  </a>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Social Links */}
        {(settings?.whatsapp_link || settings?.telegram_link) && (
          <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                Мессенджеры
              </h2>
              <p className="text-gray-400">
                Напишите нам в удобном для вас мессенджере
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-2xl mx-auto">
              {settings?.whatsapp_link && (
                <a
                  href={settings.whatsapp_link}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative flex-1"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-600/20 to-green-400/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition"></div>
                  <div className="relative bg-zinc-950/80 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-8 text-center transform group-hover:-translate-y-1 transition-all">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">WhatsApp</h3>
                    <p className="text-sm text-gray-500">Напишите нам</p>
                  </div>
                </a>
              )}

              {settings?.telegram_link && (
                <a
                  href={settings.telegram_link}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative flex-1"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-blue-400/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition"></div>
                  <div className="relative bg-zinc-950/80 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-8 text-center transform group-hover:-translate-y-1 transition-all">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Telegram</h3>
                    <p className="text-sm text-gray-500">Напишите нам</p>
                  </div>
                </a>
              )}
            </div>
          </section>
        )}

        {/* Working Hours / CTA */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-red-600/10 to-red-400/10 rounded-3xl blur-2xl group-hover:from-red-600/15 group-hover:to-red-400/15 transition-all duration-500"></div>
            <div className="relative bg-zinc-950/90 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Left - Working Hours */}
                <div>
                  <h2 className="text-3xl font-bold text-white mb-6">
                    Режим работы
                  </h2>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-zinc-800">
                      <span className="text-gray-400">Понедельник - Пятница</span>
                      <span className="text-white font-semibold">9:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-zinc-800">
                      <span className="text-gray-400">Суббота</span>
                      <span className="text-white font-semibold">10:00 - 15:00</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-gray-400">Воскресенье</span>
                      <span className="text-white font-semibold">Выходной</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-6">
                    * Поддержка клиентов доступна 24/7 по критическим вопросам
                  </p>
                </div>

                {/* Right - CTA */}
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Готовы начать работу?
                  </h3>
                  <p className="text-gray-400 mb-8">
                    Оставьте заявку, и мы свяжемся с вами в ближайшее время для обсуждения вашего проекта.
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

export default ContactsPage;