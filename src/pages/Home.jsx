import { Link } from 'react-router-dom'
import heroImg from '@images/Group 25.png'
import '../styles/Home.css'

export default function Home() {
  return (
    <section className="promo">
      <div className="container">
        <div className="promo_box">
          <div className="promo_left">
            <h1 className="promo_title">Добро пожаловать в GreenShop</h1>
            <h2 className="promo_title_1">
              Сделаем планету <span className="planet">зеленее</span>
            </h2>
            <p className="promo_text">
              Комнатные растения и всё для ухода в одном месте: выберите растение, добавьте в корзину и оформите
              заказ в личном кабинете.
            </p>
            <Link to="/shop" className="promo_btn">
              В магазин
            </Link>
          </div>
          <div className="promo_right">
            <img className="promo_img" src={heroImg} alt="" />
          </div>
        </div>
      </div>
    </section>
  )
}
