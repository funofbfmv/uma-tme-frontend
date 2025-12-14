// src/Pages/NotFoundPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchSettings } from "../api/api";
import Header from "../Components/Header";

function NotFoundPage() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const s = await fetchSettings();
        setSettings(s);
      } catch (e) {
        console.error(e);
      }
    }
    load();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header settings={settings} />

      <main className="flex items-center justify-center min-h-[80vh]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* 404 Animation */}
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-full blur-3xl"></div>
            <div className="relative">
              <h1 className="text-9xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                404
              </h1>
            </div>
          </div>

          {/* Error Message */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/10 to-cyan-600/10 rounded-2xl blur-xl"></div>
            <div className="relative bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                Страница не найдена
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                К сожалению, страница, которую вы ищете, не существует или была перемещена.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate("/")}
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-semibold transition-all shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transform hover:scale-105"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  На главную
                </button>

                <button
                  onClick={() => navigate("/services")}
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 font-semibold transition-all backdrop-blur-sm"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Наши услуги
                </button>
              </div>
            </div>
          </div>

          {/* Popular Links */}
          <div className="mt-12">
            <p className="text-sm text-gray-400 mb-4">Популярные разделы:</p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => navigate("/")}
                className="px-4 py-2 rounded-lg bg-slate-800/50 border border-white/10 text-gray-300 hover:text-white hover:border-white/20 transition-all text-sm"
              >
                Главная
              </button>
              <button
                onClick={() => navigate("/services")}
                className="px-4 py-2 rounded-lg bg-slate-800/50 border border-white/10 text-gray-300 hover:text-white hover:border-white/20 transition-all text-sm"
              >
                Услуги
              </button>
              <button
                onClick={() => {
                  navigate("/");
                  setTimeout(() => {
                    document.getElementById("contacts")?.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }}
                className="px-4 py-2 rounded-lg bg-slate-800/50 border border-white/10 text-gray-300 hover:text-white hover:border-white/20 transition-all text-sm"
              >
                Контакты
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <span className="text-gray-400">
              © {new Date().getFullYear()} {settings?.site_name || "TME"}
            </span>
            {settings?.footer_text && (
              <span className="text-gray-400">{settings.footer_text}</span>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default NotFoundPage;