import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthContextObj from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useOrders } from '../context/OrdersContext'
import '../styles/Checkout.css'

const EMAIL_API_URL = 'http://localhost:3001/api/send-order-email'

export default function Checkout() {
  const { currentUser } = useContext(AuthContextObj)
  const { items, subtotal, clearCart } = useCart()
  const { addOrder } = useOrders()

  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    city: '',
    address: '',
    comment: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  if (!currentUser) {
    return (
      <section className="checkout_section">
        <div className="container checkout_narrow">
          <h1 className="checkout_title">Оформление заказа</h1>
          <p className="checkout_hint">
            Войдите в аккаунт, чтобы оформить заказ и видеть его в личном кабинете.
          </p>
          <Link to="/" className="btn btn_primary">
            На главную
          </Link>
        </div>
      </section>
    )
  }

  if (items.length === 0 && !submitted) {
    return (
      <section className="checkout_section">
        <div className="container checkout_narrow">
          <h1 className="checkout_title">Оформление заказа</h1>
          <p className="checkout_hint">Корзина пуста.</p>
          <Link to="/shop" className="btn btn_primary">
            В магазин
          </Link>
        </div>
      </section>
    )
  }

  if (submitted) {
    return (
      <section className="checkout_section">
        <div className="container checkout_narrow">
          <h1 className="checkout_title">Спасибо</h1>
          <p className="checkout_hint">Заказ принят. Статус можно посмотреть в личном кабинете.</p>
          <Link to="/cabinet" className="btn btn_primary">
            Личный кабинет
          </Link>
        </div>
      </section>
    )
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const order = {
        id: crypto.randomUUID(),
        userId: currentUser.id,
        createdAt: new Date().toISOString(),
        items: items.map((line) => ({
          productId: line.productId,
          name: line.name,
          price: line.price,
          qty: line.qty,
          image: line.image,
        })),
        total: subtotal,
        delivery: {
          fullName: form.fullName,
          phone: form.phone,
          city: form.city,
          address: form.address,
          comment: form.comment,
        },
        status: 'В обработке',
      }

      // Отправляем письмо
      const emailResponse = await fetch(EMAIL_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order,
          userEmail: currentUser.email,
        }),
      })

      if (!emailResponse.ok) {
        const errorData = await emailResponse.json()
        throw new Error(errorData.error || 'Ошибка при отправке письма')
      }

      // Если письмо отправлено успешно, сохраняем заказ
      addOrder(order)
      clearCart()
      setSubmitted(true)
    } catch (err) {
      console.error('Error:', err)
      setError(err.message || 'Произошла ошибка при оформлении заказа')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="checkout_section">
      <div className="container checkout_layout">
        <div>
          <h1 className="checkout_title">Оформление заказа</h1>
          {error && <div className="checkout_error">{error}</div>}
          <form className="checkout_form" onSubmit={handleSubmit}>
            <div className="form_group">
              <label className="form_label" htmlFor="fullName">
                ФИО
              </label>
              <input
                id="fullName"
                name="fullName"
                className="form_input"
                value={form.fullName}
                onChange={handleChange}
                required
                autoComplete="name"
              />
            </div>
            <div className="form_group">
              <label className="form_label" htmlFor="phone">
                Телефон
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                className="form_input"
                value={form.phone}
                onChange={handleChange}
                required
                autoComplete="tel"
              />
            </div>
            <div className="form_group">
              <label className="form_label" htmlFor="city">
                Город
              </label>
              <input
                id="city"
                name="city"
                className="form_input"
                value={form.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form_group full">
              <label className="form_label" htmlFor="address">
                Адрес доставки
              </label>
              <input
                id="address"
                name="address"
                className="form_input"
                value={form.address}
                onChange={handleChange}
                required
                autoComplete="street-address"
              />
            </div>
            <div className="form_group full">
              <label className="form_label" htmlFor="comment">
                Комментарий
              </label>
              <textarea
                id="comment"
                name="comment"
                className="form_input checkout_textarea"
                rows={3}
                value={form.comment}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn_primary checkout_submit" disabled={isLoading}>
              {isLoading ? 'Обработка заказа...' : 'Подтвердить заказ'}
            </button>
          </form>
        </div>
        <aside className="checkout_aside">
          <h2 className="checkout_aside_title">Ваш заказ</h2>
          <ul className="checkout_items">
            {items.map((line) => (
              <li key={line.productId} className="checkout_item">
                <span>
                  {line.name} × {line.qty}
                </span>
                <span>{(line.price * line.qty).toFixed(2)} €</span>
              </li>
            ))}
          </ul>
          <p className="checkout_total">
            <span>Итого</span>
            <span>{subtotal.toFixed(2)} €</span>
          </p>
        </aside>
      </div>
    </section>
  )
}
