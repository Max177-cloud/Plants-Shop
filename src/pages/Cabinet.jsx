import { useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContextObj from '../context/AuthContext'
import { useOrders } from '../context/OrdersContext'
import '../styles/Cabinet.css'

export default function Cabinet() {
  const { currentUser, userProfile, updateProfile, updateEmail, logout } = useContext(AuthContextObj)
  const { getOrdersForUser } = useOrders()
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('profile')
  const [formData, setFormData] = useState({
    firstName: userProfile.firstName || '',
    lastName: userProfile.lastName || '',
    email: currentUser?.email || '',
    phone: userProfile.phone || '',
    about: userProfile.about || '',
    birthday: userProfile.birthday || '',
    country: userProfile.country || '',
  })

  useEffect(() => {
    if (!currentUser) {
      navigate('/')
    }
  }, [currentUser, navigate])

  if (!currentUser) {
    return null
  }

  const handleSaveProfile = (e) => {
    e.preventDefault()
    updateEmail(formData.email)
    updateProfile({
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      about: formData.about,
      birthday: formData.birthday,
      country: formData.country,
    })
    alert('Профиль сохранён')
  }

  const getInitials = (name) => {
    const names = name.split(' ')
    return names.map((n) => n[0]).join('').toUpperCase()
  }

  const fullName =
    formData.firstName && formData.lastName
      ? `${formData.firstName} ${formData.lastName}`
      : currentUser.name

  const myOrders = getOrdersForUser(currentUser.id)

  const formatDate = (iso) => {
    try {
      return new Date(iso).toLocaleString('ru-RU', {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    } catch {
      return iso
    }
  }

  return (
    <div className="cabinet_wrapper">
      <div className="container">
        <div className="cabinet_header">
          <h1 className="cabinet_title">Личный кабинет</h1>
          <div className="cabinet_user_info">
            <div className="cabinet_avatar">{getInitials(currentUser.name)}</div>
            <div className="cabinet_user_details">
              <h3>{fullName}</h3>
              <p>{formData.email}</p>
            </div>
          </div>
        </div>

        <div className="cabinet_main">
          <aside className="cabinet_sidebar">
            <ul className="cabinet_menu">
              <li className="cabinet_menu_item">
                <button
                  className={`cabinet_menu_link ${activeSection === 'profile' ? 'active' : ''}`}
                  onClick={() => setActiveSection('profile')}
                >
                  <span>👤</span>
                  Профиль
                </button>
              </li>
              <li className="cabinet_menu_item">
                <button
                  className={`cabinet_menu_link ${activeSection === 'orders' ? 'active' : ''}`}
                  onClick={() => setActiveSection('orders')}
                >
                  <span>📦</span>
                  Заказы
                </button>
              </li>
              <li className="cabinet_menu_item">
                <button
                  className={`cabinet_menu_link ${activeSection === 'settings' ? 'active' : ''}`}
                  onClick={() => setActiveSection('settings')}
                >
                  <span>⚙️</span>
                  Настройки
                </button>
              </li>
              <li className="cabinet_menu_item">
                <button
                  className="cabinet_menu_link"
                  onClick={() => {
                    logout()
                    navigate('/')
                  }}
                  style={{ color: '#dc3545' }}
                >
                  <span>🚪</span>
                  Выйти
                </button>
              </li>
            </ul>
          </aside>

          <main className="cabinet_content">
            {activeSection === 'profile' && (
              <section>
                <h2 className="cabinet_section_title">
                  <span>👤</span>
                  Профиль
                </h2>
                <form className="profile_form" onSubmit={handleSaveProfile}>
                  <div className="form_group">
                    <label className="form_label">Имя пользователя</label>
                    <input type="text" className="form_input" value={currentUser.name} disabled />
                  </div>
                  <div className="form_group">
                    <label className="form_label">Email</label>
                    <input
                      type="email"
                      className="form_input"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="form_group">
                    <label className="form_label">Имя</label>
                    <input
                      type="text"
                      className="form_input"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    />
                  </div>
                  <div className="form_group">
                    <label className="form_label">Фамилия</label>
                    <input
                      type="text"
                      className="form_input"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    />
                  </div>
                  <div className="form_group">
                    <label className="form_label">Телефон</label>
                    <input
                      type="tel"
                      className="form_input"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="form_group full">
                    <label className="form_label">О себе</label>
                    <input
                      type="text"
                      className="form_input"
                      value={formData.about}
                      onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                    />
                  </div>
                  <div className="form_actions">
                    <button type="submit" className="btn btn_primary">
                      Сохранить
                    </button>
                  </div>
                </form>
              </section>
            )}

            {activeSection === 'orders' && (
              <section>
                <h2 className="cabinet_section_title">
                  <span>📦</span>
                  Мои заказы
                </h2>
                {myOrders.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px', color: '#727272' }}>
                    <p style={{ marginBottom: '16px' }}>Заказов пока нет.</p>
                    <Link to="/shop" className="btn btn_primary" style={{ display: 'inline-block' }}>
                      Перейти в магазин
                    </Link>
                  </div>
                ) : (
                  <ul className="cabinet_orders">
                    {myOrders.map((order) => (
                      <li key={order.id} className="cabinet_order_card">
                        <div className="cabinet_order_head">
                          <span className="cabinet_order_id">№ {order.id.slice(0, 8)}…</span>
                          <span className="cabinet_order_date">{formatDate(order.createdAt)}</span>
                          <span className="cabinet_order_status">{order.status}</span>
                          <span className="cabinet_order_total">{order.total.toFixed(2)} €</span>
                        </div>
                        <ul className="cabinet_order_lines">
                          {order.items.map((line) => (
                            <li key={`${order.id}-${line.productId}`} className="cabinet_order_line">
                              {line.image && <img src={line.image} alt="" className="cabinet_order_thumb" />}
                              <span>
                                {line.name} × {line.qty}
                              </span>
                              <span>{(line.price * line.qty).toFixed(2)} €</span>
                            </li>
                          ))}
                        </ul>
                        {order.delivery && (
                          <p className="cabinet_order_delivery">
                            {order.delivery.city}, {order.delivery.address}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            )}

            {activeSection === 'settings' && (
              <section>
                <h2 className="cabinet_section_title">
                  <span>⚙️</span>
                  Настройки
                </h2>
                <div style={{ padding: '40px', color: '#727272' }}>
                  Раздел в разработке: уведомления и способ оплаты появятся здесь позже.
                </div>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
