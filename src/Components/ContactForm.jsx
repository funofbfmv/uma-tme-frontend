import React, { useState } from "react";
import { createLead } from "../api/api";

function ContactForm({ services, onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    phone: "+993 ",
    email: "",
    service: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  // Функция форматирования номера телефона
  const formatPhoneNumber = (value) => {
    // Убираем все кроме цифр
    const cleaned = value.replace(/\D/g, "");
    
    // Всегда начинаем с 993
    let formatted = "+993 ";
    
    // Берем только цифры после 993 (максимум 8)
    const digits = cleaned.startsWith("993") 
      ? cleaned.slice(3, 11) // 8 цифр после 993
      : cleaned.slice(0, 8);
    
    // Форматируем: XX XX XX XX
    if (digits.length > 0) {
      formatted += digits.slice(0, 2);
    }
    if (digits.length > 2) {
      formatted += " " + digits.slice(2, 4);
    }
    if (digits.length > 4) {
      formatted += " " + digits.slice(4, 6);
    }
    if (digits.length > 6) {
      formatted += " " + digits.slice(6, 8);
    }
    
    return formatted;
  };

  // Обработчик изменения телефона
  const handlePhoneChange = (e) => {
    const input = e.target.value;
    
    // Если пользователь пытается удалить +993, возвращаем
    if (input.length < 5) {
      setForm((prev) => ({ ...prev, phone: "+993 " }));
      return;
    }
    
    const formatted = formatPhoneNumber(input);
    setForm((prev) => ({ ...prev, phone: formatted }));
  };

  function handleChange(e) {
    const { name, value } = e.target;
    
    // Для телефона используем специальную обработку
    if (name === "phone") {
      handlePhoneChange(e);
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    // Проверка что телефон полностью заполнен (должно быть 17 символов: +993 XX XX XX XX)
    if (form.phone.replace(/\s/g, "").length < 12) {
      setError("Пожалуйста, введите полный номер телефона");
      return;
    }
    
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
        phone: "+993 ",
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
          className="w-full rounded-lg bg-zinc-950/50 border border-white/10 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
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
          className="w-full rounded-lg bg-zinc-950/50 border border-white/10 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
          placeholder="+993 XX XX XX XX"
          maxLength={17}
        />
        <p className="text-xs text-gray-500">Формат: +993 61 00 00 00</p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full rounded-lg bg-zinc-950/50 border border-white/10 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
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
            className="w-full rounded-lg bg-zinc-950/50 border border-white/10 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
          >
            <option value="" className="bg-zinc-950">Не выбрано</option>
            {services.map((s) => (
              <option key={s.id} value={s.id} className="bg-zinc-950">
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
          className="w-full rounded-lg bg-zinc-950/50 border border-white/10 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
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
        className="w-full py-3.5 rounded-lg bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-semibold disabled:opacity-60 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-red-500/30"
      >
        {loading ? "Отправка..." : "Отправить заявку"}
      </button>
    </form>
  );
}

export default ContactForm;