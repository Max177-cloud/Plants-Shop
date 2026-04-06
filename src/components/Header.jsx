import { useState, useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import AuthContextObj from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import LoginModal from './LoginModal'
import logoImg from '@images/Logo.png'
import '../styles/Header.css'

export default function Header() {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [searchQ, setSearchQ] = useState('')
  const { currentUser, logout } = useContext(AuthContextObj)
  const { cartCount } = useCart()
  const navigate = useNavigate()

  const getInitials = (fullName) => {
    if (!fullName || typeof fullName !== 'string') return '?'
    const names = fullName.trim().split(/\s+/)
    return names.map((n) => n[0]).join('').toUpperCase().slice(0, 2)
  }

  const onSearchSubmit = (e) => {
    e.preventDefault()
    const q = searchQ.trim()
    if (q) navigate(`/shop?q=${encodeURIComponent(q)}`)
    else navigate('/shop')
  }

  return (
    <>
      <header className="header">
        <div className="container header_inner">
          <Link to="/" className="header_logo_link" aria-label="GreenShop">
            <img className="header_logo_img" src={logoImg} alt="GreenShop" />
          </Link>

          <nav className="header_nav" aria-label="Основное меню">
            <NavLink to="/" className={({ isActive }) => `nav_link${isActive ? ' active' : ''}`} end>
              Главная
            </NavLink>
            <NavLink to="/shop" className={({ isActive }) => `nav_link${isActive ? ' active' : ''}`}>
              Магазин
            </NavLink>
            <NavLink to="/plant-care" className={({ isActive }) => `nav_link${isActive ? ' active' : ''}`}>
              Уход
            </NavLink>
            <NavLink to="/blogs" className={({ isActive }) => `nav_link${isActive ? ' active' : ''}`}>
              Блог
            </NavLink>
          </nav>

          <div className="header_tools">
            <form className="header_search_form" onSubmit={onSearchSubmit}>
              <input
                type="search"
                className="header_search_input"
                placeholder="Поиск товара"
                value={searchQ}
                onChange={(e) => setSearchQ(e.target.value)}
                aria-label="Поиск"
              />
              <button type="submit" className="header_search_submit" aria-label="Искать">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
                  <path
                    d="M14.57 16.003c-3.997 3.184-9.584 2.303-12.544-1.348-2.856-3.525-2.677-8.61.421-11.83C5.65-.5 10.685-.944 14.335 1.783a8.96 8.96 0 0 1 2.92 8.438 8.86 8.86 0 0 1-1.682 3.4l4.7 4.612c.274.272.41.59.329.97-.16.76-1.067 1.055-1.648.533-.272-.244-.523-.513-.781-.771-1.1-1.1-2.2-2.2-3.3-3.3-.04-.038-.08-.073-.13-.12Zm.388-7.016c.01-3.86-3.107-6.98-6.977-6.986-3.86-.006-6.975 3.09-6.992 6.947-.017 3.87 3.094 6.999 6.977 7.017 3.844.018 6.983-3.115 6.993-6.978Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </form>

            <Link to="/cart" className="header_cart_link" aria-label="Корзина">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M17.157 20.25H9.892c-3.102 0-5.625-2.523-5.625-5.625V8.86c0-2.883-1.437-5.552-3.844-7.14a.75.75 0 0 1 .733-1.3c1.374.907 2.489 2.102 3.286 3.478.172.193 1.561 1.665 3.838 1.665h10.796c2.945-.055 5.25 2.9 4.48 5.743l-1.243 4.954c-.629 2.506-2.872 4.256-5.456 4.256ZM5.905 6.642a6.2 6.2 0 0 0 .237 2.217v5.766A4.75 4.75 0 0 0 9.892 18.375h7.265a3.48 3.48 0 0 0 3.637-2.837l1.243-4.954a2.58 2.58 0 0 0-2.62-3.412H8.579c-1.03 0-1.926-.222-2.674-.53ZM9.423 22.828a.937.937 0 1 1-1.837.287c.062-1.555 2.283-1.554 2.344 0a.937.937 0 0 1-.507.828Zm9.328 0a.937.937 0 1 1-1.837.287c.062-1.555 2.283-1.554 2.344 0a.937.937 0 0 1-.507.828Zm1.561-12.844a1.937 1.937 0 0 0-1.937-1.937H8.954c-1.244.05-1.243 1.826 0 1.875h10.421c.517 0 .937-.42.937-.938Z"
                  fill="currentColor"
                />
              </svg>
              {cartCount > 0 && <span className="header_cart_badge">{cartCount > 99 ? '99+' : cartCount}</span>}
            </Link>

            {currentUser ? (
              <div className="header_user">
                <Link to="/cabinet" className="header_user_link">
                  <span className="user_avatar">{getInitials(currentUser.name)}</span>
                  <span className="header_user_text">
                    <span className="header_user_name">{currentUser.name}</span>
                    <span className="header_user_email">{currentUser.email}</span>
                  </span>
                </Link>
                <button type="button" className="header_logout_btn" onClick={() => logout()}>
                  Выйти
                </button>
              </div>
            ) : (
              <button type="button" className="login_btn" onClick={() => setShowLoginModal(true)}>
                Войти
              </button>
            )}
          </div>
        </div>
      </header>

      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
    </>
  )
}
