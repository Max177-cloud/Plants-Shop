import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContextObj from '../context/AuthContext'
import { fetchAllUsers, registerLocalUser } from '../utils/users'
import '../styles/LoginModal.css'

export default function LoginModal({ onClose }) {
  const [loginValue, setLoginValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [regName, setRegName] = useState('')
  const [regEmail, setRegEmail] = useState('')
  const [regPassword, setRegPassword] = useState('')
  const [error, setError] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)
  const { login } = useContext(AuthContextObj)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const users = await fetchAllUsers()
      const user = users.find(
        (u) =>
          (u.name === loginValue || u.email === loginValue) && u.password === passwordValue,
      )
      if (user) {
        login(user)
        onClose()
        navigate('/cabinet')
      } else {
        setError('Неверный логин или пароль')
      }
    } catch {
      setError('Не удалось загрузить данные. Проверьте подключение.')
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')
    if (!regName.trim() || !regEmail.trim() || !regPassword) {
      setError('Заполните все поля')
      return
    }
    try {
      const users = await fetchAllUsers()
      const taken = users.some((u) => u.email === regEmail.trim() || u.name === regName.trim())
      if (taken) {
        setError('Пользователь с таким email или именем уже есть')
        return
      }
      const newUser = {
        id: crypto.randomUUID(),
        name: regName.trim(),
        email: regEmail.trim(),
        password: regPassword,
      }
      registerLocalUser(newUser)
      login(newUser)
      onClose()
      navigate('/cabinet')
    } catch {
      setError('Ошибка регистрации')
    }
  }

  return (
    <div
      className="modal_overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      onClick={onClose}
    >
      <div className="login_modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal_close" onClick={onClose} aria-label="Закрыть">
          ×
        </button>

        {!isRegistering ? (
          <>
            <h2 id="auth-modal-title" className="modal_title">
              Вход
            </h2>
            <form className="modal_form" onSubmit={handleLogin}>
              {error && <div className="modal_error">{error}</div>}
              <div className="form_group">
                <label className="form_label" htmlFor="login-user">
                  Логин или email
                </label>
                <input
                  id="login-user"
                  className="form_input"
                  type="text"
                  autoComplete="username"
                  value={loginValue}
                  onChange={(e) => setLoginValue(e.target.value)}
                  required
                />
              </div>
              <div className="form_group">
                <label className="form_label" htmlFor="login-pass">
                  Пароль
                </label>
                <input
                  id="login-pass"
                  className="form_input"
                  type="password"
                  autoComplete="current-password"
                  value={passwordValue}
                  onChange={(e) => setPasswordValue(e.target.value)}
                  required
                />
              </div>
              <div className="modal_actions">
                <button type="submit" className="modal_submit">
                  Войти
                </button>
              </div>
              <p className="modal_toggle">
                Нет аккаунта?{' '}
                <button type="button" onClick={() => { setError(''); setIsRegistering(true) }}>
                  Зарегистрироваться
                </button>
              </p>
            </form>
          </>
        ) : (
          <>
            <h2 id="auth-modal-title" className="modal_title">
              Регистрация
            </h2>
            <form className="modal_form" onSubmit={handleRegister}>
              {error && <div className="modal_error">{error}</div>}
              <div className="form_group">
                <label className="form_label" htmlFor="reg-name">
                  Имя пользователя
                </label>
                <input
                  id="reg-name"
                  className="form_input"
                  type="text"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  required
                />
              </div>
              <div className="form_group">
                <label className="form_label" htmlFor="reg-email">
                  Email
                </label>
                <input
                  id="reg-email"
                  className="form_input"
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form_group">
                <label className="form_label" htmlFor="reg-pass">
                  Пароль
                </label>
                <input
                  id="reg-pass"
                  className="form_input"
                  type="password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  required
                />
              </div>
              <div className="modal_actions">
                <button type="submit" className="modal_submit">
                  Создать аккаунт
                </button>
              </div>
              <p className="modal_toggle">
                Уже есть аккаунт?{' '}
                <button type="button" onClick={() => { setError(''); setIsRegistering(false) }}>
                  Войти
                </button>
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
