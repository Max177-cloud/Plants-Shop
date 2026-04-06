import { Link } from 'react-router-dom'
import heroImg from '@images/Group 25.png'
import '../styles/Home.css'

export default function PlantCare() {
  return (
    <section className="promo">
      <div className="container">
        <div className="promo_box">
          <div className="promo_left">
            <h1 className="promo_title">Уход за растениями</h1>
            <h2 className="promo_title_1">
              Как сохранить <span className="planet">растения</span> здоровыми
            </h2>
            <p className="promo_text">
              Полив, освещение, грунт и пересадка — базовые правила для комнатных растений.
            </p>
            <Link to="/shop" className="promo_btn">
              К товарам
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
