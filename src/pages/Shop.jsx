import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { products } from '../data/products'
import { useCart } from '../context/CartContext'
import '../styles/Shop.css'

const CATEGORIES = ['Все', 'Indoor', 'Low care', 'Accessories']

const SORTS = [
  { value: 'popular', label: 'По рейтингу' },
  { value: 'price-asc', label: 'Цена ↑' },
  { value: 'price-desc', label: 'Цена ↓' },
  { value: 'name', label: 'По названию' },
]

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const q = (searchParams.get('q') || '').trim().toLowerCase()
  const categoryParam = searchParams.get('cat') || ''
  const sort = searchParams.get('sort') || 'popular'
  const activeCategory = categoryParam || 'Все'

  const [localSearch, setLocalSearch] = useState(searchParams.get('q') || '')

  useEffect(() => {
    setLocalSearch(searchParams.get('q') || '')
  }, [searchParams])

  const { addToCart } = useCart()

  const filtered = useMemo(() => {
    let list = [...products]

    if (categoryParam) {
      list = list.filter((p) => p.category === categoryParam)
    }

    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q),
      )
    }

    switch (sort) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        list.sort((a, b) => b.price - a.price)
        break
      case 'name':
        list.sort((a, b) => a.name.localeCompare(b.name, 'ru'))
        break
      default:
        list.sort((a, b) => b.rating - a.rating)
    }

    return list
  }, [q, categoryParam, sort])

  const setCat = (cat) => {
    const next = new URLSearchParams(searchParams)
    if (cat === 'Все') next.delete('cat')
    else next.set('cat', cat)
    setSearchParams(next)
  }

  const setSort = (value) => {
    const next = new URLSearchParams(searchParams)
    next.set('sort', value)
    setSearchParams(next)
  }

  const applySearch = (e) => {
    e.preventDefault()
    const next = new URLSearchParams(searchParams)
    if (localSearch.trim()) next.set('q', localSearch.trim())
    else next.delete('q')
    setSearchParams(next)
  }

  return (
    <section className="shop_section">
      <div className="container">
        <div className="shop_hero">
          <h1 className="shop_page_title">Магазин</h1>
          <p className="shop_page_sub">
            Растения и аксессуары для дома. Доставка по городу.
          </p>
        </div>

        <form className="shop_toolbar" onSubmit={applySearch}>
          <input
            type="search"
            className="shop_search_input"
            placeholder="Поиск по названию..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            aria-label="Поиск"
          />
          <button type="submit" className="btn btn_primary shop_search_btn">
            Найти
          </button>
        </form>

        <div className="shop_filters">
          <div className="shop_categories">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`shop_cat_btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setCat(cat)}
              >
                {cat === 'Все' ? 'Все' : cat}
              </button>
            ))}
          </div>
          <div className="shop_sort">
            <label htmlFor="shop-sort" className="shop_sort_label">
              Сортировка
            </label>
            <select
              id="shop-sort"
              className="shop_sort_select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="shop_empty">Ничего не найдено. Измените фильтры или запрос.</p>
        ) : (
          <ul className="shop_grid">
            {filtered.map((product) => (
              <li key={product.id} className="shop_card">
                <Link to={`/shop/${product.id}`} className="shop_card_img_link">
                  <img src={product.image} alt="" className="shop_card_img" />
                </Link>
                <div className="shop_card_body">
                  <p className="shop_card_cat">{product.category}</p>
                  <Link to={`/shop/${product.id}`} className="shop_card_title">
                    {product.name}
                  </Link>
                  <p className="shop_card_rating">★ {product.rating.toFixed(1)}</p>
                  <p className="shop_card_price">{product.price.toFixed(2)} €</p>
                  <div className="shop_card_actions">
                    <button
                      type="button"
                      className="btn btn_primary shop_card_btn"
                      onClick={() => addToCart(product, 1)}
                    >
                      В корзину
                    </button>
                    <Link to={`/shop/${product.id}`} className="shop_card_more">
                      Подробнее
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
