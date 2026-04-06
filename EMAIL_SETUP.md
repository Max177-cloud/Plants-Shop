# 📧 Email отправка заказов

## Что было реализовано

Добавлена функция автоматической отправки email-уведомления клиентам после оформления заказа.

### Компоненты системы:

1. **Email Server** (`server.js`)
   - Node.js/Express сервер на порте 3001
   - Nodemailer для отправки писем через Gmail
   - API endpoint: `POST /api/send-order-email`

2. **Frontend Integration**
   - Обновлен компонент `Checkout.jsx`
   - Добавлена отправка email после успешного оформления заказа
   - Визуальная обратная связь (loading state, error messages)

3. **Email Template**
   - Красивое HTML письмо с деталями заказа
   - Информация о товарах, доставке, стоимости
   - Профессиональное оформление

## Как запустить

### 1. Стартар почтового сервера

```bash
npm run email-server
```

Или запустить все серверы одновременно:

```bash
npm run all-servers
```

Это запустит:
- Email сервер (порт 3001)
- JSON Server (порт 3000)

### 2. Запустить в отдельных терминалах

**Терминал 1 - Frontend:**
```bash
npm run dev
```

**Терминал 2 - Email сервер:**
```bash
npm run email-server
```

**Терминал 3 - JSON сервер (опционально):**
```bash
npm run server
```

## Конфигурация Gmail

Credentials уже настроены в `.env` файле:
- `EMAIL_USER=starodubmax60@gmail.com`
- `EMAIL_PASSWORD=jifptblsoqdyoebj` (App Password для Gmail)

### Если нужно изменить почту:

1. Получить App Password для своего Gmail:
   - Перейти на https://myaccount.google.com/
   - Включить двухфакторную аутентификацию
   - Создать App Password на https://myaccount.google.com/apppasswords
   - Скопировать пароль приложения

2. Обновить в `.env`:
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   ```

## Как это работает

1. Пользователь заполняет форму оформления заказа в `/checkout`
2. При клике на "Подтвердить заказ":
   - Проверяется структура заказа
   - Отправляется POST запрос на `http://localhost:3001/api/send-order-email`
   - Сервер отправляет письмо на email пользователя
   - Если письмо отправлено успешно:
     - Заказ сохраняется в localStorage
     - Корзина очищается
     - Показывается страница спасибо
   - Если есть ошибка:
     - Показывается сообщение об ошибке
     - Данные заказа не теряются

## API Endpoint

### POST `/api/send-order-email`

**Request:**
```json
{
  "order": {
    "id": "uuid",
    "userId": "userId",
    "createdAt": "ISO timestamp",
    "items": [
      {
        "productId": "id",
        "name": "Product Name",
        "price": 100,
        "qty": 1,
        "image": "image.jpg"
      }
    ],
    "total": 100,
    "delivery": {
      "fullName": "И.О. Фамилия",
      "phone": "+7 900 000 00 00",
      "city": "Москва",
      "address": "ул. Пушкина, д. 10",
      "comment": "опционально"
    },
    "status": "В обработке"
  },
  "userEmail": "user@example.com"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Email отправлено успешно",
  "messageId": "message-id-from-gmail"
}
```

**Response (Error):**
```json
{
  "error": "Описание ошибки",
  "details": "Детали ошибки"
}
```

## Тестирование

### Тест 1: Отправка письма через API

```bash
curl -X POST http://localhost:3001/api/send-order-email \
  -H "Content-Type: application/json" \
  -d '{
    "order": {
      "id": "test-123",
      "userId": "user1",
      "createdAt": "2024-01-01T10:00:00Z",
      "items": [
        {
          "productId": "prod1",
          "name": "Тестовый товар",
          "price": 100,
          "qty": 1,
          "image": ""
        }
      ],
      "total": 100,
      "delivery": {
        "fullName": "Иван Иванов",
        "phone": "+7 900 000 00 00",
        "city": "Москва",
        "address": "ул. Пушкина, д. 10",
        "comment": ""
      },
      "status": "В обработке"
    },
    "userEmail": "your-email@gmail.com"
  }'
```

## Важно ⚠️

1. Email сервер должен быть запущен перед используй приложение
2. Убедитесь, что порт 3001 не занят
3. Проверьте что `.env` файл на месте и содержит правильные credentials
4. Если письма не отправляются, проверьте:
   - Запущен ли email сервер
   - Правильны ли Gmail credentials
   - Не заблокирована ли отправка на стороне Gmail

## Возможные улучшения

- [ ] Сохранение логов отправки писем в БД
- [ ] Retry логика для неудачных отправок
- [ ] Отправка email администратору при новом заказе
- [ ] Письmá для подтверждения email при регистрации
- [ ] Письма об изменении статуса заказа
- [ ] Отправка чека в PDF формате

## Встроенные переменные окружения

```env
EMAIL_USER=starodubmax60@gmail.com
EMAIL_PASSWORD=jifptblsoqdyoebj
PORT=3001
NODE_ENV=development
```

---

**Создано:** 2024
**Технологии:** Node.js, Express, Nodemailer, React
