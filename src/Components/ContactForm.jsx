import React, { useState } from "react";
import { createLead } from "../api/api";

function ContactForm({ services, onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      await createLead({
        name: form.name,
        phone: form.phone,
        email: form.email || undefined,
        service: form.service || null,
        message: form.message,
      });
      setSuccess("Заявка отправлена! Мы свяжемся с вами.");
      setForm({
        name: "",
        phone: "",
        email: "",
        service: "",
        message: "",
      });
      
      // Закрываем модалку через 2 секунды после успеха
      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 2000);
      }
    } catch (err) {
      console.error(err);
      setError("Ошибка отправки. Попробуйте ещё раз.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Имя*</label>
        <input
          type="text"
          name="name"
          required
          value={form.name}
          onChange={handleChange}
          className="w-full rounded-lg bg-slate-900/50 border border-white/10 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          placeholder="Введите ваше имя"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Телефон*</label>
        <input
          type="tel"
          name="phone"
          required
          value={form.phone}
          onChange={handleChange}
          className="w-full rounded-lg bg-slate-900/50 border border-white/10 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          placeholder="+998 __ ___ __ __"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full rounded-lg bg-slate-900/50 border border-white/10 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          placeholder="example@email.com"
        />
      </div>

      {services && services.length > 0 && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Интересующая услуга</label>
          <select
            name="service"
            value={form.service}
            onChange={handleChange}
            className="w-full rounded-lg bg-slate-900/50 border border-white/10 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          >
            <option value="" className="bg-slate-900">Не выбрано</option>
            {services.map((s) => (
              <option key={s.id} value={s.id} className="bg-slate-900">
                {s.title}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Комментарий</label>
        <textarea
          name="message"
          rows={4}
          value={form.message}
          onChange={handleChange}
          className="w-full rounded-lg bg-slate-900/50 border border-white/10 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
          placeholder="Расскажите о вашем проекте..."
        />
      </div>

      {success && (
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 backdrop-blur-sm">
          <p className="text-sm text-green-400">{success}</p>
        </div>
      )}
      
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 backdrop-blur-sm">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-semibold disabled:opacity-60 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-purple-500/30"
      >
        {loading ? "Отправка..." : "Отправить заявку"}
      </button>
    </form>
  );
}

export default ContactForm;