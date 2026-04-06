import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import '../styles/Cart.css'

export default function Cart() {
  const { items, setQty, removeLine, subtotal } = useCart()

  if (items.length === 0) {
    return (
      <section className="cart_section">
        <div className="container">
          <h1 className="cart_title">Корзина</h1>
          <p className="cart_empty">Корзина пуста.</p>
          <Link to="/shop" className="btn btn_primary">
            Перейти в магазин
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="cart_section">
      <div className="container">
        <h1 className="cart_title">Корзина</h1>
        <div className="cart_layout">
          <ul className="cart_list">
            {items.map((line) => (
              <li key={line.productId} className="cart_line">
                <img src={line.image} alt="" className="cart_line_img" />
                <div className="cart_line_info">
                  <Link to={`/shop/${line.productId}`} className="cart_line_name">
                    {line.name}
                  </Link>
                  <p className="cart_line_price">{line.price.toFixed(2)} €</p>
                </div>
                <div className="cart_line_qty">
                  <button
                    type="button"
                    aria-label="Меньше"
                    onClick={() => setQty(line.productId, line.qty - 1)}
                  >
                    −
                  </button>
                  <span>{line.qty}</span>
                  <button
                    type="button"
                    aria-label="Больше"
                    onClick={() => setQty(line.productId, line.qty + 1)}
                  >
                    +
                  </button>
                </div>
                <div className="cart_line_sum">{(line.price * line.qty).toFixed(2)} €</div>
                <button
                  type="button"
                  className="cart_line_remove"
                  onClick={() => removeLine(line.productId)}
                  aria-label="Удалить"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
          <aside className="cart_summary">
            <p className="cart_summary_label">Итого</p>
            <p className="cart_summary_total">{subtotal.toFixed(2)} €</p>
            <Link to="/checkout" className="btn btn_primary cart_checkout_btn">
              Оформить заказ
            </Link>
            <Link to="/shop" className="cart_continue">
              Продолжить покупки
            </Link>
          </aside>
        </div>
      </div>
    </section>
  )
}
