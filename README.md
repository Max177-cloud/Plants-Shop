# 🌿 Travel Shop - React E-commerce приложение

![Status](https://img.shields.io/badge/status-active-brightgreen)
![Version](https://img.shields.io/badge/version-0.0.1-blue)
![License](https://img.shields.io/badge/license-MIT-green)

Полнофункциональное веб-приложение для онлайн-магазина растений с аутентификацией пользователей, корзиной покупок, каталогом товаров и системой отправки email-уведомлений.

## ✨ Основные функции

- 🛍️ **Каталог товаров** - просмотр растений с описаниями и изображениями
- 🔐 **Аутентификация** - вход/регистрация пользователей
- 🛒 **Корзина покупок** - добавление и управление товарами
- 📝 **Оформление заказа** - форма доставки и информации
- 📧 **Email уведомления** - автоматическая отправка подтверждения заказа
- 👤 **Личный кабинет** - история заказов и управление профилем
- 📚 **Блог и советы** - статьи об уходе за растениями
- 🎨 **Отзывчивый дизайн** - работает на всех устройствах

## 🚀 Быстрый старт

### Требования

- **Node.js** v16+ 
- **npm** или **yarn**
- **Gmail аккаунт** (для отправки писем)

### Установка зависимостей

```bash
npm install
```

Это установит все необходимые пакеты:
- React 18
- React Router DOM
- Vite (build tool)
- Express (для email сервера)
- Nodemailer
- JSON Server

### Конфигурация Email (Gmail)

1. **Получить App Password для Gmail:**
   - Перейти на https://myaccount.google.com/
   - Включить двухфакторную аутентификацию
   - Создать App Password на https://myaccount.google.com/apppasswords
   - Скопировать пароль

2. **Обновить `.env` файл:**
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   PORT=3001
   NODE_ENV=development
   ```

## 📋 Доступные команды

### Разработка

```bash
# Запустить React приложение на http://localhost:5173
npm run dev

# Запустить email сервер на http://localhost:3001
npm run email-server

# Запустить JSON Server (данные) на http://localhost:3000
npm run server

# Запустить все серверы одновременно
npm run all-servers
```

### Production

```bash
# Собрать приложение для production
npm run build

# Превью production сборки
npm run preview
```

## 🏗️ Структура проекта

```
travel_react/
├── src/
│   ├── components/          # Переиспользуемые компоненты
│   │   ├── Header.jsx       # Навигация и шапка
│   │   ├── Footer.jsx       # Подвал сайта
│   │   └── LoginModal.jsx   # Модальное окно входа
│   ├── pages/               # Страницы приложения
│   │   ├── Home.jsx         # Главная страница
│   │   ├── Shop.jsx         # Каталог товаров
│   │   ├── ProductDetail.jsx # Детали товара
│   │   ├── Cart.jsx         # Корзина покупок
│   │   ├── Checkout.jsx     # Оформление заказа
│   │   ├── Cabinet.jsx      # Личный кабинет
│   │   ├── Blogs.jsx        # Страница блога
│   │   └── PlantCare.jsx    # Советы по уходу
│   ├── context/             # React Context (глобальное состояние)
│   │   ├── AuthContext.jsx  # Аутентификация пользователя
│   │   ├── CartContext.jsx  # Состояние корзины
│   │   └── OrdersContext.jsx # История заказов
│   ├── styles/              # CSS стили
│   ├── data/                # Статические данные
│   │   └── products.js      # Каталог товаров
│   ├── utils/               # Вспомогательные функции
│   │   └── users.js         # Управление пользователями
│   ├── App.jsx              # Главный компонент
│   └── main.jsx             # Entry point
├── public/                  # Публичные файлы
│   ├── data.json            # JSON Server данные
│   └── images/              # Изображения товаров
├── server.js                # Email сервер (Express + Nodemailer)
├── vite.config.js           # Конфигурация Vite
├── package.json             # Зависимости проекта
├── .env                     # Переменные окружения
└── README.md                # Этот файл
```

## 🔧 Архитектура

### Frontend (React + Vite)

- **Состояние:** React Context API для управления аутентификацией, корзиной и заказами
- **Роутинг:** React Router DOM v6
- **Стили:** CSS модули и CSS файлы
- **Build:** Vite для быстрой разработки и оптимизированной production сборки

### Backend (Node.js + Express)

- **Email сервер:** Express сервер на порте 3001
- **Email отправка:** Nodemailer с Gmail SMTP
- **API:** REST endpoint для отправки email уведомлений

### База данных

- **JSON Server:** Mock API для данных (порт 3000)
- **localStorage:** Клиентское хранилище для корзины и аутентификации

## 📧 Email система

### Функцональность

При оформлении заказа автоматически отправляется email на почту пользователя с:
- Номером и датой заказа
- Список товаров с ценами
- Информация о доставке
- Общей стоимостью
- Профессиональное HTML оформление

### API Endpoint

```
POST http://localhost:3001/api/send-order-email

Request:
{
  "order": { ... },
  "userEmail": "user@example.com"
}

Response:
{
  "success": true,
  "message": "Email отправлено успешно",
  "messageId": "..."
}
```

Подробнее в [EMAIL_SETUP.md](EMAIL_SETUP.md)

## 🚦 Как работает приложение

### Пользовательский поток

1. **Регистрация/Вход**
   - Пользователь заполняет форму входа в модальном окне
   - Данные сохраняются в localStorage
   - Пользователь получает доступ к корзине и оформлению

2. **Покупки**
   - Просмотр товаров в каталоге Shop
   - Клик на товар показывает детали в ProductDetail
   - Добавление в корзину через кнопку "Add to Cart"

3. **Оформление заказа**
   - Переход в Cart для просмотра товаров
   - Клик "Checkout" ведет на страницу оформления
   - Заполнение адреса доставки
   - Клик "Подтвердить заказ" отправляет email и сохраняет заказ

4. **История заказов**
   - Просмотр в личном кабинете Cabinet
   - Отслеживание статуса заказов

## 🔐 Аутентификация

Система использует простую аутентификацию на основе localStorage:

```javascript
// users.json содержит:
{
  id: "1",
  email: "user@example.com",
  password: "password123",
  name: "User Name"
}
```

⚠️ **Важно:** Это демо система! В production используйте JWT и безопасную передачу паролей.

## 🎨 Стили и дизайн

- Мобильный адаптивный дизайн (mobile-first)
- CSS переменные для согласованности
- Плавные переходы и анимации
- Иконки и изображения в папке `/images`

## 🧪 Тестирование

### Тестовые аккаунты (если есть в users.js)

```
Email: test@example.com
Password: test123
```

### Проверка email функции

```bash
curl -X POST http://localhost:3001/api/send-order-email \
  -H "Content-Type: application/json" \
  -d '{
    "order": {...},
    "userEmail": "test@example.com"
  }'
```

## 🚨 Troubleshooting

### Email не отправляется

- ✅ Проверьте что `npm run email-server` запущен
- ✅ Проверьте credentials в `.env`
- ✅ Убедитесь что Gmail 2FA включена и App Password создан
- ✅ Проверьте что порт 3001 не занят

### Данные товаров не загружаются

- ✅ Запустите `npm run server` (JSON Server)
- ✅ Проверьте файл `public/data.json`
- ✅ Убедитесь что порт 3000 не занят

### Приложение медленно загружается

- ✅ Очистите кэш браузера
- ✅ Проверьте размеры изображений
- ✅ Запустите `npm run build` и проверьте размер сборки

## 📦 Зависимости

### Production
- **react** ^18.2.0 - UI библиотека
- **react-dom** ^18.2.0 - DOM рендеринг
- **react-router-dom** ^6.20.0 - Маршрутизация
- **axios** или **fetch** - HTTP клиент
- **express** ^5.2.1 - Web сервер
- **nodemailer** ^8.0.4 - Email отправка
- **dotenv** ^17.4.1 - Переменные окружения
- **cors** ^2.8.6 - Cross-Origin поддержка
- **json-server** ^0.17.4 - Mock API

### Development
- **vite** ^5.0.0 - Build tool
- **@vitejs/plugin-react** ^4.2.0 - React поддержка
- **concurrently** ^9.2.1 - Параллельный запуск

## 📝 Лицензия

MIT License - смотрите LICENSE файл для деталей

## 🤝 Контакт

Вопросы? Свяжитесь:
- Email: starodubmax60@gmail.com
- GitHub Issues в этом репозитории

## 🎯 Будущие улучшения

- [ ] Интеграция с платежными системами (Stripe, PayPal)
- [ ] Загрузка товаров администратором
- [ ] Система рейтингов и отзывов
- [ ] Push уведомления
- [ ] Письма об изменении статуса заказа
- [ ] Google Analytics интеграция
- [ ] Поиск и фильтрация товаров
- [ ] Wishlist функционал

## 📚 Дополнительные ресурсы

- [React документация](https://react.dev)
- [React Router](https://reactrouter.com)
- [Vite документация](https://vitejs.dev)
- [Nodemailer](https://nodemailer.com)
- [Express.js](https://expressjs.com)

---

**Создано:** 2024  
**Последнее обновление:** April 2026  
**Версия:** 0.0.1  
**Статус:** 🚀 In Development
