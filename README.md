![alt text](<Снимок экрана 2025-12-14 в 21.49.37.png>)
![alt text](<Снимок экрана 2025-12-14 в 21.33.35.png>)

# TM Engineering - Frontend
Современный веб-сайт IT-компании, специализирующейся на создании и обслуживании IT-инфраструктуры.

## Технологии

- **React 18** - UI библиотека
- **Vite** - сборщик и dev сервер
- **Tailwind CSS** - стилизация
- **React Router** - маршрутизация
- **Axios** - HTTP клиент

## Установка и запуск

```bash
# Установка зависимостей
npm install

# Запуск dev сервера (http://localhost:5173)
npm run dev

# Сборка для production
npm run build

# Preview production сборки
npm run preview
```

## Архитектура проекта

```
src/
├── api/                    # API взаимодействие
│   └── api.js             # Axios инстанс + методы (fetchSettings, createLead, etc)
│
├── assets/                 # Статические файлы
│   └── videos/            # Видео для фона
│
├── Components/             # Переиспользуемые компоненты
│   ├── Header.jsx         # Шапка сайта с навигацией
│   ├── FloatingButton.jsx # Плавающая кнопка "Оставить заявку"
│   ├── ScrollToTopButton.jsx # Кнопка "Наверх"
│   ├── ScrollToTop.jsx    # Автоскролл при смене роута
│   ├── ContactModal.jsx   # Модальное окно с формой
│   ├── ContactForm.jsx    # Форма обратной связи
│   ├── ServicesSection.jsx # Секция услуг (грид карточек)
│   └── RootLayout.jsx     # Обёртка для всех страниц
│
├── Pages/                  # Страницы сайта
│   ├── HomePage.jsx       # Главная страница
│   ├── ServicesPage.jsx   # Страница всех услуг
│   ├── ServiceDetailPage.jsx # Детальная страница услуги
│   ├── AboutPage.jsx      # О компании
│   ├── ContactsPage.jsx   # Контакты
│   └── NotFoundPage.jsx   # 404
│
├── router/                 # Маршрутизация
│   └── Router.jsx         # Конфигурация роутов
│
├── App.jsx                 # Корневой компонент
├── main.jsx               # Точка входа
└── index.css              # Tailwind imports
```

## Роуты

| Путь | Компонент | Описание |
|------|-----------|----------|
| `/` | HomePage | Главная с hero секцией |
| `/services` | ServicesPage | Список всех услуг |
| `/service/:id` | ServiceDetailPage | Детали конкретной услуги |
| `/about` | AboutPage | О компании |
| `/contacts` | ContactsPage | Контактная информация |
| `/*` | NotFoundPage | 404 страница |

## API интеграция

Все запросы проксируются через Vite (см. `vite.config.js`):

```javascript
// Конфигурация прокси
proxy: {
  "/api": "http://127.0.0.1:8000",
  "/media": "http://127.0.0.1:8000"
}
```

**Методы:**
- `fetchSettings()` - получение настроек сайта (логотип, контакты, etc)
- `fetchServiceCategories()` - категории + вложенные услуги
- `createLead(payload)` - отправка заявки

## Дизайн система

**Цветовая схема:**
- Основной: Чёрный (`bg-black`)
- Карточки: `bg-zinc-950/80`
- Акценты: Красные градиенты (`from-red-600 to-red-500`)
- Текст: `text-white`, `text-gray-300`, `text-gray-500`

**Ключевые особенности:**
- Темная тема
- Blur эффекты (`backdrop-blur-xl`)
- Красные hover состояния
- Плавные анимации
- Адаптивный дизайн (mobile-first)

## Особенности

### Форма обратной связи
- Маска телефона: `+993 XX XX XX XX`
- Валидация в реальном времени
- Автозакрытие модалки после отправки

### Навигация
- Sticky header с blur эффектом
- Мобильное меню
- Автоскролл наверх при смене страницы
- Кнопка "Наверх" (появляется после 300px)

### Медиа файлы
- Иконки услуг загружаются из бэкенда
- Видео фон на главной странице
- Fallback SVG иконки если изображение отсутствует

## Конфигурация

### Tailwind
Кастомная конфигурация в `tailwind.config.js`

### Vite
- Проксирование API
- Разрешенные хосты: `.trycloudflare.com`, `localhost`
- Доступ из сети: `host: true`

## Деплой

```bash
# Сборка
npm run build

# Файлы в папке dist/
# Загрузить на хостинг (Nginx, Vercel, Netlify, etc)
```

**Важно:** Настроить fallback на `index.html` для SPA роутинга.

## Структура данных

### Settings (из API)
```javascript
{
  site_name: "TM Engineering",
  logo: "/media/logos/logo.png",
  phone: "+993 XX XX XX XX",
  email: "info@tme.tm",
  address: "Адрес компании",
  whatsapp_link: "https://wa.me/...",
  telegram_link: "https://t.me/...",
  footer_text: "© 2025 TM Engineering"
}
```

### Service Category
```javascript
{
  id: 1,
  title: "Сетевые технологии",
  description: "Описание категории",
  services: [
    {
      id: 1,
      title: "Услуга №1",
      short_description: "Краткое описание",
      full_description: "Полное описание",
      icon: "/media/service_icons/icon.png",
      is_featured: true,
      category: 1
    }
  ]
}
```

### Lead (заявка)
```javascript
{
  name: "Имя",
  phone: "+993 XX XX XX XX",
  email: "email@example.com",
  service: 1, // ID услуги (опционально)
  message: "Комментарий"
}
```

## Разработка

### Добавление новой страницы
1. Создать компонент в `src/Pages/NewPage.jsx`
2. Добавить роут в `src/router/Router.jsx`
3. Добавить ссылку в `Header.jsx`

### Добавление нового компонента
1. Создать в `src/Components/ComponentName.jsx`
2. Импортировать где нужно
3. Следовать цветовой схеме проекта (красные акценты)

---

**Автор:** TM Engineering  
**Дата:** Декабрь 2025