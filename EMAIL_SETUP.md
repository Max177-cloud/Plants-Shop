# 📧 Email Service Setup Guide

Этот документ содержит инструкции по настройке функции отправки email для подтверждения заказов.

## 📋 Требования

- Node.js v16 или выше
- Gmail аккаунт (или другой SMTP сервис)
- Двухфакторная аутентификация на Gmail (обязательна)

## 🚀 Quick Start (С Gmail)

### Шаг 1: Установите зависимости

```bash
npm install
```

Это установит все необходимые пакеты, включая:
- `express` - веб-сервер
- `nodemailer` - отправка email
- `cors` - кроссдоменные запросы
- `dotenv` - управление переменными окружения

### Шаг 2: Настройте Gmail

**2.1. Включите двухфакторную аутентификацию:**
1. Перейдите на https://myaccount.google.com/
2. Слева нажмите "Безопасность"
3. Прокрутите вниз до "Вход в Google"
4. Нажмите "Двухэтапная проверка"
5. Следуйте инструкциям

**2.2. Создайте App Password:**
1. Перейдите на https://myaccount.google.com/apppasswords
2. Выберите "Приложение: Электронная почта"
3. Выберите "Устройство: Windows (или ваша ОС)"
4. Нажмите "Создать"
5. Google выдаст вам 16-символьный пароль

**Пример пароля:**
```
abcd efgh ijkl mnop  (с пробелами, всего 16 символов)
```

### Шаг 3: Настройте .env файл

Откройте файл `.env` в корне проекта и заполните:

```env
# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=abcdefghijklmnop

# Server Configuration
PORT=3001
NODE_ENV=development
```

**Замените:**
- `your-email@gmail.com` - на ваш Gmail адрес
- `abcdefghijklmnop` - на полученный App Password (БЕЗ пробелов)

### Шаг 4: Запустите email сервер

```bash
npm run email-server
```

Вы должны увидеть:
```
📧 Email server is running on port 3001
📨 Ready to send emails from: your-email@gmail.com
✅ Email server is ready to send messages
```

### Шаг 5: (В отдельном терминале) Запустите приложение

```bash
npm run dev
```

Или запустите всё вместе:

```bash
npm run all
```

## 🧪 Тестирование

1. Откройте приложение на http://localhost:5173
2. Перейдите на страницу Blogs
3. Заполните форму заказа
4. Нажмите "Place Order"
5. Проверьте указанный email на предмет письма с подтверждением

## 🔧 Альтернативные SMTP сервисы

### SendGrid
```env
EMAIL_USER=apikey
EMAIL_PASSWORD=SG.your_sendgrid_api_key
```

### Yandex Mail
```env
EMAIL_USER=your-email@yandex.ru
EMAIL_PASSWORD=your-password
```

### Outlook.com
```env
EMAIL_USER=your-email@outlook.com
EMAIL_PASSWORD=your-password
```

## 🐛 Troubleshooting

### "Email server is not available"
- Проверьте, запущен ли email-server на порте 3001
- Потребуется запустить в отдельном терминале: `npm run email-server`

### "Failed to authenticate user"
- Проверьте правильность EMAIL_USER и EMAIL_PASSWORD в .env
- Убедитесь что используется App Password, а не обычный пароль
- Для Gmail: двухфакторная аутентификация ОБЯЗАТЕЛЬНА

### "Connection timeout"
- Проверьте интернет соединение
- Убедитесь, что firewall не блокирует порт 3001
- Попробуйте перезагрузить email-server

### Email отправляется, но HTML форматирование не работает
- Некоторые почтовые клиенты могут не поддерживать HTML
- Email будет работать, но может выглядеть иначе

## 📧 Содержание отправляемого email

Когда клиент размещает заказ, он получает красиво отформатированное письмо с:
- ✅ Данные клиента (имя, адрес, телефон)
- ✅ Список заказанных товаров
- ✅ Количество и цены
- ✅ Итоговая стоимость с доставкой
- ✅ Способ оплаты
- ✅ Примечания к заказу
- ✅ Дату заказа

## 📝 Файлы

### Frontend
- `src/utils/emailService.js` - функции для отправки email
- `src/pages/BlogsPage.jsx` - интеграция email при Place Order

### Backend
- `server.js` - Express сервер с endpoint для отправки email
- `.env` - конфигурация (не коммитить в git!)

## ⚠️ Важно

1. **Не делитесь .env файлом** - он содержит вашу почту и пароль
2. **App Password сильно отличается от обычного пароля** - используйте только специально созданный пароль приложения
3. **Для production** - используйте более безопасные способы хранения секретов (например, переменные окружения сервера)

## 🔒 Безопасность

- Email пароль хранится только в .env файле на вашем компьютере
- Пароль НЕ отправляется на фронтенд
- Все запросы к email серверу идут через localhost
- Используются только HTTPS для отправки на Gmail

## 📞 Поддержка

Если у вас возникли проблемы:
1. Проверьте консоль браузера (F12 → Console)
2. Проверьте консоль terminal где запущен email-server
3. Убедитесь что .env файл заполнен правильно

---

**Приложение готово принимать заказы с подтверждением по email! 🎉**
