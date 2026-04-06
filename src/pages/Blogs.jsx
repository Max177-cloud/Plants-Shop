import { Link } from 'react-router-dom'
import heroImg from '@images/Group 25.png'
import '../styles/Home.css'

export default function Blogs() {
  return (
    <section className="promo">
      <div className="container">
        <div className="promo_box">
          <div className="promo_left">
            <h1 className="promo_title">Блог</h1>
            <h2 className="promo_title_1">
              Истории о <span className="planet">растениях</span>
            </h2>
            <p className="promo_text">
              Советы по уходу и подбор растений под интерьер.
            </p>
            <Link to="/shop" className="promo_btn">
              В каталог
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
