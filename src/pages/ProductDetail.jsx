import { Link, useNavigate, useParams } from 'react-router-dom'
import { getProductById } from '../data/products'
import { useCart } from '../context/CartContext'
import '../styles/Shop.css'

export default function ProductDetail() {
  const { productId } = useParams()
  const product = getProductById(productId)
  const { addToCart } = useCart()
  const navigate = useNavigate()

  if (!product) {
    return (
      <section className="shop_section">
        <div className="container">
          <p className="shop_empty">Товар не найден.</p>
          <Link to="/shop" className="btn btn_primary">
            В каталог
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="shop_section product_detail">
      <div className="container">
        <nav className="breadcrumb">
          <Link to="/">Главная</Link>
          <span>/</span>
          <Link to="/shop">Магазин</Link>
          <span>/</span>
          <span>{product.name}</span>
        </nav>
        <div className="product_detail_grid">
          <div className="product_detail_img_wrap">
            <img src={product.image} alt={product.name} className="product_detail_img" />
          </div>
          <div className="product_detail_info">
            <p className="product_detail_cat">{product.category}</p>
            <h1 className="product_detail_title">{product.name}</h1>
            <p className="product_detail_rating">★ {product.rating.toFixed(1)}</p>
            <p className="product_detail_price">{product.price.toFixed(2)} €</p>
            <p className="product_detail_desc">{product.description}</p>
            <div className="product_detail_actions">
              <button
                type="button"
                className="btn btn_primary"
                onClick={() => {
                  addToCart(product, 1)
                  navigate('/cart')
                }}
              >
                В корзину
              </button>
              <button type="button" className="btn btn_secondary" onClick={() => addToCart(product, 1)}>
                Добавить и остаться
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
