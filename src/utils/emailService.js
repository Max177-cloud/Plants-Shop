/**
 * Функция для отправки информации о заказе на email клиента
 * @param {Object} orderData - Данные заказа
 * @returns {Promise<Object>} Результат отправки
 */
export const sendOrderEmail = async (orderData) => {
  try {
    const response = await fetch('http://localhost:3001/api/send-order-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to send email');
    }

    return {
      success: true,
      message: data.message,
    };
  } catch (error) {
    console.error('Email sending error:', error);
    return {
      success: false,
      message: error.message || 'Failed to send order email. Please check if the email server is running.',
    };
  }
};

/**
 * Функция для проверки доступности email сервера
 * @returns {Promise<boolean>} true если сервер доступен
 */
export const checkEmailServerHealth = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/health');
    return response.ok;
  } catch (error) {
    console.warn('Email server is not available');
    return false;
  }
};
