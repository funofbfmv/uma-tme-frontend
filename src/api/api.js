import axios from "axios";

const api = axios.create({
  baseURL: "/api", // проксируется в Django через vite.config.js
});

// Получить настройки сайта
export async function fetchSettings() {
  const { data } = await api.get("/settings/");
  return data;
}

// Получить категории + вложенные услуги
export async function fetchServiceCategories() {
  const { data } = await api.get("/service-categories/");
  return data;
}

// Отправить заявку
export async function createLead(payload) {
  const { data } = await api.post("/leads/", payload);
  return data;
}
