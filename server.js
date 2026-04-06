import express from 'express'
import cors from 'cors'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(cors())

// Настройка транспорта для отправки почты через Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})

// Проверка подключения
transporter.verify((error, success) => {
  if (error) {
    console.log('Email config error:', error)
  } else {
    console.log('Email server ready:', success)
  }
})

// Типичный HTML шаблон для письма
const generateOrderEmail = (order, userEmail) => {
  const itemsList = order.items
    .map(
      (item) => `
    <tr>
      <td>${item.name}</td>
      <td>${item.qty}</td>
      <td>${item.price} ₽</td>
      <td>${(item.price * item.qty).toFixed(2)} ₽</td>
    </tr>
  `
    )
    .join('')

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #4CAF50; color: white; padding: 20px; border-radius: 5px 5px 0 0; }
          .content { background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
          th { background-color: #f2f2f2; font-weight: bold; }
          .section { margin: 20px 0; }
          .label { font-weight: bold; }
          .total { font-size: 18px; font-weight: bold; color: #4CAF50; }
          .footer { color: #666; font-size: 12px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Спасибо за заказ!</h1>
          </div>
          <div class="content">
            <div class="section">
              <p>Здравствуйте, ${order.delivery.fullName}!</p>
              <p>Ваш заказ успешно принят и находится в обработке.</p>
            </div>

            <div class="section">
              <p><span class="label">ID заказа:</span> ${order.id}</p>
              <p><span class="label">Дата заказа:</span> ${new Date(order.createdAt).toLocaleString('ru-RU')}</p>
              <p><span class="label">Статус:</span> ${order.status}</p>
            </div>

            <div class="section">
              <h3>Товары в заказе:</h3>
              <table>
                <thead>
                  <tr>
                    <th>Название</th>
                    <th>Количество</th>
                    <th>Цена</th>
                    <th>Сумма</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsList}
                </tbody>
              </table>
              <p class="total">Итого: ${order.total.toFixed(2)} ₽</p>
            </div>

            <div class="section">
              <h3>Информация доставки:</h3>
              <p><span class="label">ФИО:</span> ${order.delivery.fullName}</p>
              <p><span class="label">Телефон:</span> ${order.delivery.phone}</p>
              <p><span class="label">Город:</span> ${order.delivery.city}</p>
              <p><span class="label">Адрес:</span> ${order.delivery.address}</p>
              ${order.delivery.comment ? `<p><span class="label">Комментарий:</span> ${order.delivery.comment}</p>` : ''}
            </div>

            <div class="section">
              <p>Вы можете отследить статус заказа в розделе "Личный кабинет".</p>
              <p>Если у вас есть вопросы, свяжитесь с нами.</p>
            </div>

            <div class="footer">
              <p>С уважением,<br>Команда магазина Travel Shop</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `
}

// Эндпоинт для отправки письма при оформлении заказа
app.post('/api/send-order-email', async (req, res) => {
  try {
    const { order, userEmail } = req.body

    if (!order || !userEmail) {
      return res.status(400).json({ error: 'Order и userEmail обязательны' })
    }

    const html = generateOrderEmail(order, userEmail)

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: `Заказ #${order.id.substring(0, 8)} успешно принят`,
      html: html,
    }

    const info = await transporter.sendMail(mailOptions)

    console.log('Email sent:', info.response)
    res.status(200).json({ success: true, message: 'Email отправлено успешно', messageId: info.messageId })
  } catch (error) {
    console.error('Email send error:', error)
    res.status(500).json({ error: 'Ошибка при отправке письма', details: error.message })
  }
})

// Проверка здоровья сервера
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' })
})

app.listen(PORT, () => {
  console.log(`Email server is running on http://localhost:${PORT}`)
})
