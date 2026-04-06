import { Link } from 'react-router-dom'
import '../styles/Footer.css'

export default function Footer() {
  return (
    <footer className="app_footer">
      <div className="container">
        <div className="app_footer_grid">
          <div>
            <h4 className="app_footer_heading">О нас</h4>
            <p className="app_footer_text">
              Интернет-магазин комнатных растений и аксессуаров. Доставка и поддержка на каждом этапе.
            </p>
          </div>
          <div>
            <h4 className="app_footer_heading">Разделы</h4>
            <ul className="app_footer_links">
              <li>
                <Link to="/">Главная</Link>
              </li>
              <li>
                <Link to="/shop">Магазин</Link>
              </li>
              <li>
                <Link to="/plant-care">Уход за растениями</Link>
              </li>
              <li>
                <Link to="/blogs">Блог</Link>
              </li>
              <li>
                <Link to="/cabinet">Личный кабинет</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="app_footer_heading">Помощь</h4>
            <ul className="app_footer_links">
              <li>
                <a href="mailto:info@greenshop.ru">Написать нам</a>
              </li>
              <li>
                <Link to="/shop">Каталог</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="app_footer_heading">Контакты</h4>
            <p className="app_footer_text">+7 (999) 999-99-99</p>
            <p className="app_footer_text">info@greenshop.ru</p>
          </div>
        </div>
        <div className="app_footer_copy">&copy; {new Date().getFullYear()} GreenShop</div>
      </div>
    </footer>
  )
}
