import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// Настройка Nodemailer - используем Gmail (нужны настройки App Password)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'your-app-password',
  },
});

// Тестирование подключения
transporter.verify((error, success) => {
  if (error) {
    console.log('❌ Email configuration error:', error);
  } else {
    console.log('✅ Email server is ready to send messages');
  }
});

// Endpoint для отправки email с информацией о заказе
app.post('/api/send-order-email', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      state,
      zip,
      cartItems,
      subtotal,
      shipping,
      discount,
      total,
      paymentMethod,
      notes,
    } = req.body;

    // Проверка необходимых полей
    if (!email || !cartItems || cartItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Email and cart items are required',
      });
    }

    // Формирование HTML шаблона письма
    const itemsHTML = cartItems
      .map(
        (item) => `
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 12px; text-align: left;">${item.title}</td>
        <td style="padding: 12px; text-align: center;">x${item.quantity}</td>
        <td style="padding: 12px; text-align: right;">$${item.price}</td>
        <td style="padding: 12px; text-align: right;">$${(item.price * item.quantity).toFixed(2)}</td>
      </tr>
    `
      )
      .join('');

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #46a358; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
          .header h1 { margin: 0; font-size: 24px; }
          .content { background: #f9f9f9; padding: 20px; }
          .section { margin-bottom: 25px; background: white; padding: 20px; border-radius: 8px; }
          .section h2 { color: #46a358; font-size: 16px; margin-top: 0; }
          .customer-info { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
          .info-item { }
          .info-label { color: #727272; font-size: 12px; font-weight: bold; }
          .info-value { color: #333; font-size: 14px; margin-top: 4px; }
          table { width: 100%; border-collapse: collapse; margin: 15px 0; }
          table th { background: #f0f0f0; padding: 12px; text-align: left; font-weight: bold; color: #333; border-bottom: 2px solid #46a358; }
          .totals { background: #f9f9f9; padding: 15px; border-radius: 8px; }
          .total-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
          .total-row:last-child { border-bottom: none; }
          .total-label { font-weight: 500; }
          .final-total { display: flex; justify-content: space-between; padding: 12px 0; font-size: 18px; font-weight: bold; color: #46a358; border-top: 2px solid #46a358; margin-top: 10px; }
          .footer { text-align: center; padding: 20px; color: #727272; font-size: 12px; background: #f0f0f0; border-radius: 0 0 8px 8px; }
          .payment-method { background: #e8f5e9; padding: 12px; border-radius: 4px; color: #2e7d32; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🌿 Order Confirmation</h1>
            <p>Thank you for your order from GreenShop!</p>
          </div>
          
          <div class="content">
            <!-- Customer Information -->
            <div class="section">
              <h2>Customer Information</h2>
              <div class="customer-info">
                <div class="info-item">
                  <div class="info-label">Name</div>
                  <div class="info-value">${firstName} ${lastName}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Email</div>
                  <div class="info-value">${email}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Phone</div>
                  <div class="info-value">${phone}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Address</div>
                  <div class="info-value">${address}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">City</div>
                  <div class="info-value">${city}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Zip Code</div>
                  <div class="info-value">${zip}</div>
                </div>
              </div>
            </div>

            <!-- Order Items -->
            <div class="section">
              <h2>Order Items</h2>
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHTML}
                </tbody>
              </table>
            </div>

            <!-- Order Totals -->
            <div class="section">
              <h2>Order Summary</h2>
              <div class="totals">
                <div class="total-row">
                  <span class="total-label">Subtotal:</span>
                  <span>$${subtotal.toFixed(2)}</span>
                </div>
                ${discount > 0 ? `<div class="total-row">
                  <span class="total-label">Discount:</span>
                  <span>-$${discount.toFixed(2)}</span>
                </div>` : ''}
                <div class="total-row">
                  <span class="total-label">Shipping:</span>
                  <span>$${shipping.toFixed(2)}</span>
                </div>
                <div class="final-total">
                  <span>Total:</span>
                  <span>$${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <!-- Payment Method -->
            <div class="section">
              <h2>Payment Method</h2>
              <div class="payment-method">
                ${paymentMethod === 'cash' ? '💵 Cash on Delivery' : paymentMethod === 'card' ? '💳 Credit Card' : '🏦 Bank Transfer'}
              </div>
              ${notes ? `<p style="margin-top: 15px; color: #727272;"><strong>Notes:</strong> ${notes}</p>` : ''}
            </div>

            <!-- Thank You Message -->
            <div class="section" style="text-align: center; border: 2px solid #46a358;">
              <h2 style="color: #46a358;">Thank You! 🎉</h2>
              <p>Your order has been received and is being processed. You will receive a shipping notification soon.</p>
              <p><strong>Order Date:</strong> ${new Date().toLocaleDateString()}</p>
            </div>
          </div>

          <div class="footer">
            <p>© 2026 GreenShop. All rights reserved.</p>
            <p>If you have any questions, please contact us at contact@greenshop.com</p>
            <p>Thank you for shopping with us! 🌱</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Отправка письма
    const mailOptions = {
      from: process.env.EMAIL_USER || 'noreply@greenshop.com',
      to: email,
      subject: `Order Confirmation - GreenShop 🌿 Order #${Date.now()}`,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: 'Order email sent successfully!',
    });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send order email',
      error: error.message,
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Email server is running' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`📧 Email server is running on port ${PORT}`);
  console.log(`📨 Ready to send emails from: ${process.env.EMAIL_USER || 'your-email@gmail.com'}`);
});
