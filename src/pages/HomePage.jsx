import React, { useEffect, useMemo, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const LOGIN_USER = "Max";
const PASSWORD_USER = "justatest";

const BASE_PRODUCTS = [
  {
    key: "p1",
    category: "House Plants",
    size: "Small",
    title: "Barberton Daisy",
    price: 119,
    img: "/images/image 1 (1).png",
    isNew: true,
    isSale: false,
  },
  {
    key: "p2",
    category: "Potter Plants",
    size: "Medium",
    title: "Angel Wing Begonia",
    price: 169,
    img: "/images/product-21-320x320 1.png",
    isNew: false,
    isSale: false,
  },
  {
    key: "p3",
    category: "Seeds",
    size: "Small",
    title: "African Violet",
    price: 199,
    oldPrice: 229,
    img: "/images/image 2 (1).png",
    isNew: false,
    isSale: true,
    discountPercent: 13,
  },
  {
    key: "p4",
    category: "Small Plants",
    size: "Small",
    title: "Beach Spider Lily",
    price: 129,
    img: "/images/01 3.png",
    isNew: true,
    isSale: false,
  },
  {
    key: "p5",
    category: "Big Plants",
    size: "Large",
    title: "Blushing Bromeliad",
    price: 139,
    img: "/images/image 7.png",
    isNew: false,
    isSale: false,
  },
  {
    key: "p6",
    category: "Succulents",
    size: "Medium",
    title: "Aluminum Plant",
    price: 179,
    img: "/images/image 8.png",
    isNew: false,
    isSale: false,
  },
  {
    key: "p7",
    category: "Trerrariums",
    size: "Medium",
    title: "Bird's Nest Fern",
    price: 99,
    img: "/images/image 9.png",
    isNew: true,
    isSale: false,
  },
  {
    key: "p8",
    category: "Gardening",
    size: "Large",
    title: "Broadleaf Lady Palm",
    price: 59,
    img: "/images/product-20-320x320 1.png",
    isNew: false,
    isSale: false,
  },
  {
    key: "p9",
    category: "Accesories",
    size: "Small",
    title: "Chinese Evergreen",
    price: 39,
    img: "/images/image 10.png",
    isNew: false,
    isSale: false,
  },
];

const SIZES = ["Small", "Medium", "Large"];

const CATEGORY_NAMES = Array.from(
  new Set(BASE_PRODUCTS.map((p) => p.category)),
);

function buildProducts() {
  // Делаем больше товаров, чтобы пагинация и фильтры выглядели “как в магазине”.
  const out = [];
  for (let i = 0; i < 36; i++) {
    const base = BASE_PRODUCTS[i % BASE_PRODUCTS.length];

    // На первых 9 элементах оставляем “как на скриншотах”.
    const fixed = i < BASE_PRODUCTS.length;
    const price = fixed
      ? base.price
      : Math.round(base.price * (0.8 + ((i % 7) + 1) * 0.08));

    const isSale = fixed ? Boolean(base.isSale) : i % 6 === 0;
    const isNew = fixed ? Boolean(base.isNew) : i % 5 === 0;

    const oldPrice = isSale ? Math.round(price * 1.15 + (i % 3) * 7) : null;
    const discountPercent = isSale
      ? Math.max(5, Math.round(100 - (price * 100) / oldPrice))
      : 0;

    out.push({
      id: `p-${i + 1}`,
      category: base.category,
      size: base.size,
      title: base.title,
      price,
      img: base.img,
      isSale,
      isNew,
      oldPrice,
      discountPercent,
      position: i,
    });
  }
  return out;
}

const PRODUCTS = buildProducts();

const GLOBAL_PRICE_MIN = Math.min(...PRODUCTS.map((p) => p.price));
const GLOBAL_PRICE_MAX = Math.max(...PRODUCTS.map((p) => p.price));

export default function HomePage() {
  const navigate = useNavigate();

  // modal + auth
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("registration"); // "registration" | "login"
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [failedLogin, setFailedLogin] = useState("");

  // registration fields
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [failedRegistration, setFailedRegistration] = useState("");

  // contact modal
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");

  const PAGE_SIZE = 9;

  // store filters
  const [activeTab, setActiveTab] = useState("all"); // all | new | sale
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedSizes, setSelectedSizes] = useState([]); // array of "Small" | ...
  const [searchQuery, setSearchQuery] = useState("");
  const [sortType, setSortType] = useState("All"); // All | Incr | Descr | Alp

  const [draftPriceMin, setDraftPriceMin] = useState(GLOBAL_PRICE_MIN);
  const [draftPriceMax, setDraftPriceMax] = useState(GLOBAL_PRICE_MAX);
  const [appliedMin, setAppliedMin] = useState(GLOBAL_PRICE_MIN);
  const [appliedMax, setAppliedMax] = useState(GLOBAL_PRICE_MAX);

  const [page, setPage] = useState(1);

  const [newsletterEmail, setNewsletterEmail] = useState("");

  // Reset pagination when any filter changes.
  useEffect(() => {
    setPage(1);
  }, [activeTab, activeCategory, selectedSizes, appliedMin, appliedMax, sortType, searchQuery]);

  const filteredSortedProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    let list = PRODUCTS;
    if (activeTab === "new") list = list.filter((p) => p.isNew);
    if (activeTab === "sale") list = list.filter((p) => p.isSale);

    if (activeCategory !== "All") {
      list = list.filter((p) => p.category === activeCategory);
    }

    if (selectedSizes.length > 0) {
      list = list.filter((p) => selectedSizes.includes(p.size));
    }

    list = list.filter((p) => p.price >= appliedMin && p.price <= appliedMax);

    if (q) {
      list = list.filter((p) => p.title.toLowerCase().includes(q));
    }

    list = list.slice();
    if (sortType === "Incr") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortType === "Descr") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortType === "Alp") {
      list.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      // Default sorting: keep original position to look “like a catalog”.
      list.sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
    }

    return list;
  }, [
    activeCategory,
    activeTab,
    appliedMax,
    appliedMin,
    searchQuery,
    selectedSizes,
    sortType,
  ]);

  const totalPages = Math.max(1, Math.ceil(filteredSortedProducts.length / PAGE_SIZE));
  const pageButtons = useMemo(() => {
    const maxPageButtons = 4;
    const count = Math.min(maxPageButtons, totalPages);
    const start = Math.max(1, Math.min(page, totalPages - count + 1));
    return Array.from({ length: count }, (_, i) => start + i);
  }, [page, totalPages]);
  const pagedProducts = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredSortedProducts.slice(start, start + PAGE_SIZE);
  }, [PAGE_SIZE, filteredSortedProducts, page]);

  const tabProducts = useMemo(() => {
    let list = PRODUCTS;
    if (activeTab === "new") list = list.filter((p) => p.isNew);
    if (activeTab === "sale") list = list.filter((p) => p.isSale);
    return list;
  }, [activeTab]);

  const categoryCounts = useMemo(() => {
    const map = new Map();
    for (const p of tabProducts) {
      map.set(p.category, (map.get(p.category) ?? 0) + 1);
    }
    return map;
  }, [tabProducts]);

  const sizeCounts = useMemo(() => {
    const map = new Map();
    for (const p of tabProducts) {
      map.set(p.size, (map.get(p.size) ?? 0) + 1);
    }
    return map;
  }, [tabProducts]);

  function applyFilter() {
    setAppliedMin(Math.min(draftPriceMin, draftPriceMax));
    setAppliedMax(Math.max(draftPriceMin, draftPriceMax));
  }

  function resetFilter() {
    setActiveCategory("All");
    setSelectedSizes([]);
    setDraftPriceMin(GLOBAL_PRICE_MIN);
    setDraftPriceMax(GLOBAL_PRICE_MAX);
    setAppliedMin(GLOBAL_PRICE_MIN);
    setAppliedMax(GLOBAL_PRICE_MAX);
  }

  function toggleSize(size) {
    setSelectedSizes((prev) => {
      if (prev.includes(size)) return prev.filter((x) => x !== size);
      return [...prev, size];
    });
  }

  function openModal(mode) {
    setAuthMode(mode);
    setIsModalOpen(true);
    setFailedLogin("");
    setFailedRegistration("");
  }

  function closeModal() {
    setIsModalOpen(false);
    setFailedLogin("");
    setFailedRegistration("");
  }

  function openContactModal() {
    setIsContactModalOpen(true);
  }

  function closeContactModal() {
    setIsContactModalOpen(false);
    setContactName("");
    setContactEmail("");
    setContactMessage("");
  }

  function submitContact(e) {
    e.preventDefault();
    // eslint-disable-next-line no-console
    console.log("Contact form submitted:", { contactName, contactEmail, contactMessage });
    alert("Thank you for your message! We will get back to you soon.");
    closeContactModal();
  }

  async function submitLogin(e) {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3002/users');
      if (!response.ok) throw new Error('Failed to fetch users');
      const users = await response.json();

      const user = users.find(u => (u.email === login.trim() || u.name === login.trim()) && u.password === password);
      if (user) {
        closeModal();
        navigate("/cabinet");
        return;
      }
      setFailedLogin("Неправильный логин или пароль");
      setLogin("");
      setPassword("");
    } catch (error) {
      console.error('Login error:', error);
      setFailedLogin("Ошибка при входе. Проверьте, запущен ли сервер (npm run server)");
    }
  }

  async function submitRegistration(e) {
    e.preventDefault();
    if (regPassword !== regConfirmPassword) {
      setFailedRegistration("Пароли не совпадают");
      return;
    }
    if (!regName.trim() || !regEmail.trim() || !regPassword.trim()) {
      setFailedRegistration("Заполните все поля");
      return;
    }

    try {
      // Получить существующих пользователей
      const response = await fetch('http://localhost:3002/users');
      if (!response.ok) throw new Error('Failed to fetch users');
      const users = await response.json();

      // Проверить, существует ли пользователь с таким email
      const existingUser = users.find(user => user.email === regEmail.trim());
      if (existingUser) {
        setFailedRegistration("Пользователь с таким email уже существует");
        return;
      }

      // Добавить нового пользователя
      const newUser = {
        name: regName.trim(),
        email: regEmail.trim(),
        password: regPassword // В реальном приложении пароль должен хэшироваться
      };

      const postResponse = await fetch('http://localhost:3002/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      });

      if (!postResponse.ok) throw new Error('Failed to register user');

      console.log("Регистрация:", newUser);
      alert("Регистрация успешна!");
      closeModal();
      navigate("/cabinet");
      // Сбросить поля
      setRegName("");
      setRegEmail("");
      setRegPassword("");
      setRegConfirmPassword("");
      setFailedRegistration("");
    } catch (error) {
      console.error('Registration error:', error);
      setFailedRegistration("Ошибка при регистрации. Проверьте, запущен ли сервер (npm run server)");
    }
  }

  function joinNewsletter() {
    // eslint-disable-next-line no-console
    console.log("newsletterEmail:", newsletterEmail);
    setNewsletterEmail("");
  }

  return (
    <>
      <header className="header">
        <div className="container">
          <nav className="header_box">
            <img className="logo" src="/images/Logo.png" alt="" />
            <ul className="header_list">
              <li>
                <NavLink to="/" className={({ isActive }) => isActive ? "header_item1" : "header_item"} style={{ textDecoration: "none", color: "inherit" }}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/shop" className={({ isActive }) => isActive ? "header_item1" : "header_item"} style={{ textDecoration: "none", color: "inherit" }}>
                  Shop
                </NavLink>
              </li>
              <li>
                <NavLink to="/plant-care" className={({ isActive }) => isActive ? "header_item1" : "header_item"} style={{ textDecoration: "none", color: "inherit" }}>
                  Plant Care
                </NavLink>
              </li>
              <li>
                <NavLink to="/blogs" className={({ isActive }) => isActive ? "header_item1" : "header_item"} style={{ textDecoration: "none", color: "inherit" }}>
                  Blogs
                </NavLink>
              </li>
            </ul>
            <div className="header_buttons">
              <button className="header_btn header_search" type="button">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.5726 16.0029C10.5755 19.1865 4.988 18.3056 2.02842 14.6542C-0.828088 11.129 -0.64944 6.04347 2.44943 2.82482C5.65137 -0.500594 10.6854 -0.944524 14.3346 1.78337C15.642 2.76051 16.6183 4.00364 17.2542 5.50838C17.8938 7.02186 18.0881 8.59654 17.8663 10.2205C17.6452 11.837 17 13.2775 15.9499 14.6217C16.0349 14.6773 16.1255 14.7173 16.1904 14.7822C17.3448 15.9311 18.4947 17.0843 19.6491 18.2331C19.9227 18.5054 20.0589 18.8225 19.9776 19.2047C19.8165 19.9651 18.9107 20.2586 18.3298 19.7366C18.0575 19.4925 17.807 19.2234 17.5484 18.9649C16.6002 18.0177 15.6526 17.0699 14.7044 16.1227C14.665 16.0853 14.6238 16.0503 14.5726 16.0029ZM15.9605 8.98677C15.9705 5.12689 12.8529 2.00627 8.98261 2.00065C5.12292 1.99503 2.00781 5.09068 1.99094 8.94806C1.97408 12.8173 5.08544 15.9467 8.96762 15.9648C12.8117 15.9829 15.9505 12.8504 15.9605 8.98677Z"
                    fill="#3D3D3D"
                  />
                </svg>
              </button>
              <input
                className="search_products"
                type="text"
                placeholder="Search product"
              />
              <button className="header_btn" type="button">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.1567 20.25H9.89163C6.79003 20.25 4.26667 17.7267 4.26667 14.6251V8.85947C4.26667 5.9762 2.82958 3.30739 0.422521 1.72031C-0.00975775 1.43531 -0.129101 0.853876 0.155897 0.421598C0.440896 -0.0107278 1.02228 -0.130118 1.45465 0.154974C2.82874 1.06097 3.94351 2.2559 4.74067 3.63167C4.91293 3.82466 6.30202 5.29699 8.57919 5.29699H19.3748C22.3201 5.24191 24.6254 8.19769 23.8554 11.0406L22.6126 15.9939C21.9839 18.4998 19.7404 20.25 17.1567 20.25ZM5.90513 6.64234C6.06099 7.36238 6.14166 8.10483 6.14166 8.85947V14.6251C6.14166 16.6928 7.8239 18.375 9.89163 18.375H17.1567C18.8792 18.375 20.3748 17.2082 20.794 15.5376L22.0367 10.5844C22.4943 8.89509 21.1243 7.13931 19.3748 7.17198H8.57914C7.54926 7.17198 6.65283 6.94993 5.90513 6.64234ZM9.42289 22.8281C9.42289 22.1809 8.89822 21.6563 8.25102 21.6563C6.69609 21.7182 6.69745 23.9387 8.25102 24C8.89822 24 9.42289 23.4753 9.42289 22.8281ZM18.751 22.8281C18.751 22.1809 18.2263 21.6563 17.5791 21.6563C16.0242 21.7182 16.0255 23.9387 17.5791 24C18.2263 24 18.751 23.4753 18.751 22.8281ZM20.3123 9.98446C20.3123 9.46668 19.8925 9.04697 19.3748 9.04697H8.95414C7.71027 9.09647 7.71121 10.8729 8.95414 10.922H19.3748C19.8925 10.922 20.3123 10.5022 20.3123 9.98446Z"
                    fill="#3D3D3D"
                  />
                </svg>
              </button>
              <button
                className="header_btn_green"
                type="button"
                onClick={() => openModal("registration")}
              >
                <img src="/images/Logout.png" alt="" />
                Login
              </button>
            </div>
          </nav>
        </div>
      </header>

      <section className="promo">
        <div className="container">
          <div className="promo_box">
            <div className="promo_left">
              <h1 className="promo_title">Welcome to GreenShop</h1>
              <h2 className="promo_title_1">
                Let’s Make a Better <span className="planet">Planet</span>
              </h2>
              <p className="promo_text">
                We are an online plant shop offering a wide range of cheap and
                trendy plants. Use our plants to create an unique Urban Jungle.
                Order your favorite plants!
              </p>
              <button className="promo_btn" type="button" onClick={openContactModal}>
                SHOP NOW
              </button>
            </div>
            <div className="promo_right">
              <img className="promo_img" src="/images/Group 25.png" alt="" />
            </div>
          </div>
        </div>
      </section>

      <section className="products">
        <div className="container">
          <div className="products_box">
            <aside className="products_left storeSidebar">
              <h3 className="categories">Categories</h3>
              <ul className="store_filter_list">
                <li>
                  <button
                    type="button"
                    className={`store_filter_btn ${
                      activeCategory === "All" ? "store_filter_btn_active" : ""
                    }`}
                    onClick={() => setActiveCategory("All")}
                  >
                    <span>All</span>
                    <span className="store_filter_count">{tabProducts.length}</span>
                  </button>
                </li>
                {CATEGORY_NAMES.map((c) => (
                  <li key={c}>
                    <button
                      type="button"
                      className={`store_filter_btn ${
                        activeCategory === c ? "store_filter_btn_active" : ""
                      }`}
                      onClick={() => setActiveCategory(c)}
                    >
                      <span>{c}</span>
                      <span className="store_filter_count">
                        {categoryCounts.get(c) ?? 0}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>

              <h3 className="filter_title">Price Range</h3>
              <div className="store_price_value">
                Price:{" "}
                <span className="store_price_range">
                  ${appliedMin} - ${appliedMax}
                </span>
              </div>

              <div className="price_slider">
                <div className="price_slider_trackWrap">
                  <div
                    className="price_slider_track"
                    style={{
                      left: `${((draftPriceMin - GLOBAL_PRICE_MIN) / (GLOBAL_PRICE_MAX - GLOBAL_PRICE_MIN)) * 100}%`,
                      right: `${100 - ((draftPriceMax - GLOBAL_PRICE_MIN) / (GLOBAL_PRICE_MAX - GLOBAL_PRICE_MIN)) * 100}%`,
                    }}
                  />
                </div>
                <input
                  className="price_slider_input"
                  type="range"
                  min={GLOBAL_PRICE_MIN}
                  max={GLOBAL_PRICE_MAX}
                  step={1}
                  value={draftPriceMin}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    setDraftPriceMin(Math.min(v, draftPriceMax));
                  }}
                  aria-label="Min price"
                />
                <input
                  className="price_slider_input"
                  type="range"
                  min={GLOBAL_PRICE_MIN}
                  max={GLOBAL_PRICE_MAX}
                  step={1}
                  value={draftPriceMax}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    setDraftPriceMax(Math.max(v, draftPriceMin));
                  }}
                  aria-label="Max price"
                />
              </div>

              <div className="store_sidebar_actions">
                <button className="filter_btn" type="button" onClick={applyFilter}>
                  Filter
                </button>
                <button className="reset_btn" type="button" onClick={resetFilter}>
                  Reset Filter
                </button>
              </div>

              <h3 className="filter_title">Size</h3>
              <ul className="store_filter_list">
                {SIZES.map((s) => (
                  <li key={s}>
                    <button
                      type="button"
                      className={`store_filter_btn ${
                        selectedSizes.includes(s)
                          ? "store_filter_btn_active"
                          : ""
                      }`}
                      onClick={() => toggleSize(s)}
                    >
                      <span>{s}</span>
                      <span className="store_filter_count">
                        {sizeCounts.get(s) ?? 0}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>

              <div className="super_sale">
                <img
                  className="super_sale_img"
                  src="/images/image 15.png"
                  alt="Super Sale"
                />
                <div className="super_sale_overlay">
                  <div className="super_sale_title">Super Sale</div>
                  <div className="super_sale_sub">UP TO 75% OFF</div>
                </div>
              </div>
            </aside>

            <main className="products_right storeMain">
              <div className="products_right_sort storeTopBar">
                <ul className="plants_categories storeTabs">
                  <li
                    className={activeTab === "all" ? "active_category" : ""}
                    role="button"
                    tabIndex={0}
                    onClick={() => setActiveTab("all")}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") setActiveTab("all");
                    }}
                  >
                    All Plants
                  </li>
                  <li
                    className={activeTab === "new" ? "active_category" : ""}
                    role="button"
                    tabIndex={0}
                    onClick={() => setActiveTab("new")}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") setActiveTab("new");
                    }}
                  >
                    New Arrivals
                  </li>
                  <li
                    className={activeTab === "sale" ? "active_category" : ""}
                    role="button"
                    tabIndex={0}
                    onClick={() => setActiveTab("sale")}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") setActiveTab("sale");
                    }}
                  >
                    Sale
                  </li>
                </ul>

                <div className="store_sort">
                  <span className="store_sort_label">Short by:</span>
                  <select
                    className="sort"
                    value={sortType}
                    onChange={(e) => setSortType(e.target.value)}
                  >
                    <option value="All">Default sorting</option>
                    <option value="Incr">Increase</option>
                    <option value="Descr">Descrease</option>
                    <option value="Alp">Alphabet</option>
                  </select>
                </div>
              </div>

              <div className="store_products_grid">
                {pagedProducts.map((p) => (
                  <div key={p.id} className="product_card">
                    {p.isSale && (
                      <div className="product_discount">{p.discountPercent}% OFF</div>
                    )}
                    <div className="product_image_wrap">
                      <img className="product_img" src={p.img} alt="" />
                      <div className="product_actions">
                        <button className="product_icon_btn" type="button" aria-label="Favorite">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M12 21s-7-4.534-9.5-8.5C.5 9 2.2 6 5.5 6c1.8 0 3.1 1 3.9 2c.8-1 2.1-2 3.9-2c3.3 0 5 3 3 6.5C19 16.466 12 21 12 21Z"
                              stroke="#46A358"
                              strokeWidth="2"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="product_meta">
                      <div className="product_title">{p.title}</div>
                      <div className="product_price_row">
                        <span className="product_price">${p.price.toFixed(2)}</span>
                        {p.oldPrice != null && (
                          <span className="product_old_price">
                            ${p.oldPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="store_pagination">
                <button
                  type="button"
                  className="store_pagination_btn"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  aria-label="Previous page"
                >
                  {"<"}
                </button>
                {pageButtons.map((n) => (
                  <button
                    key={n}
                    type="button"
                    className={`store_pagination_num ${
                      n === page ? "store_pagination_num_active" : ""
                    }`}
                    onClick={() => setPage(n)}
                  >
                    {n}
                  </button>
                ))}
                <button
                  type="button"
                  className="store_pagination_btn"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  aria-label="Next page"
                >
                  {">"}
                </button>
              </div>
            </main>
          </div>
        </div>
      </section>

      <section className="miniblogs">
        <div className="container">
          <div className="miniblogs_box">
            <div className="miniblogs_item">
              <img className="miniblogs_img" src="/images/image 7.png" alt="" />
              <div className="miniblogs_item_1">
                <h3 className="miniblogs_title">Summer cactus & succulents</h3>
                <p className="miniblogs_text">
                  We are an online plant shop offering a wide range of cheap and
                  trendy plants
                </p>
                <button className="miniblogs_btn" type="button">
                  Find More
                </button>
              </div>
            </div>
            <div className="miniblogs_item">
              <img className="miniblogs_img" src="/images/image 15.png" alt="" />
              <div className="miniblogs_item_1">
                <h3 className="miniblogs_title">Styling Trends & much more</h3>
                <p className="miniblogs_text">
                  We are an online plant shop offering a wide range of cheap and
                  trendy plants
                </p>
                <button className="miniblogs_btn" type="button">
                  Find More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="posts">
        <h3 className="posts_title">Our Blog Posts</h3>
        <p className="posts_text">
          We are an online plant shop offering a wide range of cheap and trendy
          plants.
        </p>
        <div className="container">
          <div className="posts_box">
            <div className="posts_item">
              <img className="posts_img" src="/images/01.png" alt="" />
              <p className="posts_text_1">September 12 I Read in 6 minutes</p>
              <h3 className="posts_title_1">Cactus & Succulent Care Tips</h3>
              <p className="posts_text_2">
                Cacti are succulents are easy care plants for any home or patio.
              </p>
              <button className="posts_btn" type="button">
                Read More
              </button>
            </div>
            <div className="posts_item">
              <img className="posts_img" src="/images/02.png" alt="" />
              <p className="posts_text_1">September 12 I Read in 2 minutes</p>
              <h3 className="posts_title_1">Top 10 Succulents for Your Home</h3>
              <p className="posts_text_2">
                Cacti are succulents are easy care plants for any home or patio.
              </p>
              <button className="posts_btn" type="button">
                Read More
              </button>
            </div>
            <div className="posts_item">
              <img className="posts_img" src="/images/03.png" alt="" />
              <p className="posts_text_1">September 12 I Read in 3 minutes</p>
              <h3 className="posts_title_1">Cactus & Succulent Care Tips</h3>
              <p className="posts_text_2">
                Cacti are succulents are easy care plants for any home or patio.
              </p>
              <button className="posts_btn_1" type="button">
                Read More
              </button>
            </div>
            <div className="posts_item">
              <img className="posts_img" src="/images/04.png" alt="" />
              <p className="posts_text_1">September 12 I Read in 2 minutes</p>
              <h3 className="posts_title_1">Best Houseplants Room by Room</h3>
              <p className="posts_text_2">
                Cacti are succulents are easy care plants for any home or patio.
              </p>
              <button className="posts_btn" type="button">
                Read More
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer_box_top">
            <div className="footer_left">
              <div className="footer_left_item">
                <img src="/images/Group 26.png" alt="" />
                <h3 className="footer_left_title">Garden Care</h3>
                <p className="footer_left_text">
                  We are an online plant shop offering a wide range of cheap and
                  trendy plants.
                </p>
              </div>
              <div className="footer_left_item">
                <img src="/images/Group 27.png" alt="" />
                <h3 className="footer_left_title">Plant Renovation</h3>
                <p className="footer_left_text">
                  We are an online plant shop offering a wide range of cheap and
                  trendy plants.
                </p>
              </div>
              <div className="footer_left_item">
                <img src="/images/Group 28.png" alt="" />
                <h3 className="footer_left_title">Watering Graden</h3>
                <p className="footer_left_text">
                  We are an online plant shop offering a wide range of cheap and
                  trendy plants.
                </p>
              </div>
            </div>
            <div className="footer_right">
              <h3 className="footer_left_title">
                Would you like to join newsletters?
              </h3>
              <div className="input_box">
                <input
                  className="footer_input"
                  type="email"
                  placeholder="enter your email address..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                />
                <button className="footer_btn" type="button" onClick={joinNewsletter}>
                  Join
                </button>
              </div>
              <p className="footer_left_text">
                We usually post offers and challenges in newsletter. We’re your
                online houseplant destination. We offer a wide range of
                houseplants and accessories shipped directly from our (green)house
                to yours!
              </p>
            </div>
          </div>
          <div className="footer_box_middle">
            <img src="/images/Logo.png" alt="" />
            <div className="footer_middle_item">
              <img src="/images/Location.png" alt="" />
              <p className="footer_middle_text_1">
                70 West Buckingham Ave. Farmingdale, NY 11735
              </p>
            </div>
            <div className="footer_middle_item">
              <img src="/images/Message.png" alt="" />
              <p className="footer_middle_text">contact@greenshop.com</p>
            </div>
            <div className="footer_middle_item">
              <img src="/images/Calling.png" alt="" />
              <p className="footer_middle_text">+88 01911 717 490</p>
            </div>
          </div>
          <div className="footer_bottom">
            <div className="footer_bottom_left">
              <ul className="footer_bottom_list">
                <li className="footer_bottom_title">My Account</li>
                <li className="footer_bottom_text">My Account</li>
                <li className="footer_bottom_text">Our Stores</li>
                <li className="footer_bottom_text">Contact Us</li>
                <li className="footer_bottom_text">Career</li>
                <li className="footer_bottom_text">Specials</li>
              </ul>
              <ul className="footer_bottom_list">
                <li className="footer_bottom_title">Help & Guide</li>
                <li className="footer_bottom_text">Help Center</li>
                <li className="footer_bottom_text">How to Buy</li>
                <li className="footer_bottom_text">Shipping & Delivery</li>
                <li className="footer_bottom_text">Product Policy</li>
                <li className="footer_bottom_text">How To Return</li>
              </ul>
              <ul className="footer_bottom_list">
                <li className="footer_bottom_title">Categories</li>
                <li className="footer_bottom_text">House Plants</li>
                <li className="footer_bottom_text">Potter Plants</li>
                <li className="footer_bottom_text">Seeds</li>
                <li className="footer_bottom_text">Small Plants</li>
                <li className="footer_bottom_text">Accessories</li>
              </ul>
            </div>
            <div className="footer_bottom_right">
              <h3 className="footer_bottom_title">Social Media</h3>
              <ul className="social_list">
                <li>
                  <a href="https://www.facebook.com/" className="social_link">
                    <img src="/images/Facebook.png" alt="" />
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/" className="social_link">
                    <img src="/images/Instagram.png" alt="" />
                  </a>
                </li>
                <li>
                  <a href="https://x.com/" className="social_link">
                    <img src="/images/Twitter.png" alt="" />
                  </a>
                </li>
                <li>
                  <a href="https://ua.linkedin.com/" className="social_link">
                    <img src="/images/Linkedin.png" alt="" />
                  </a>
                </li>
                <li>
                  <a href="https://youtube.com/" className="social_link">
                    <img src="/images/Union.png" alt="" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      <div className={`model_registration ${isModalOpen ? "active_model" : ""}`}>
        <div className="modal_content">
          <button className="close_model" type="button" onClick={closeModal}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.17007 3.17007C3.39682 2.94331 3.76447 2.94331 3.99122 3.17007L9 8.17884L14.0088 3.17007C14.2355 2.94331 14.6032 2.94331 14.8299 3.17007C15.0567 3.39682 15.0567 3.76447 14.8299 3.99122L9.82116 9L14.8299 14.0088C15.0567 14.2355 15.0567 14.6032 14.8299 14.8299C14.6032 15.0567 14.2355 15.0567 14.0088 14.8299L9 9.82116L3.99122 14.8299C3.76447 15.0567 3.39682 15.0567 3.17007 14.8299C2.94331 14.6032 2.94331 14.2355 3.17007 14.0088L8.17884 9L3.17007 3.99122C2.94331 3.76447 2.94331 3.39682 3.17007 3.17007Z"
                fill="#ffffff"
              />
            </svg>
          </button>

          <div className="choice">
            <button
              className="login_btn"
              type="button"
              onClick={() => openModal("login")}
            >
              Login
            </button>
            <button
              className="registration_btn"
              type="button"
              onClick={() => openModal("registration")}
            >
              Registration
            </button>
          </div>

          <h3 className="choice_title">Enter your email and password to register.</h3>

          {/* Registration форма */}
          <form className={`form ${authMode === "login" ? "deactivated" : ""}`} onSubmit={submitRegistration}>
            <input
              type="text"
              placeholder="Введите имя"
              value={regName}
              onChange={(e) => setRegName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Введите ваш gmail"
              value={regEmail}
              onChange={(e) => setRegEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Введите пароль"
              value={regPassword}
              onChange={(e) => setRegPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Подтвердите пароль"
              value={regConfirmPassword}
              onChange={(e) => setRegConfirmPassword(e.target.value)}
              required
            />
            <button className="form_btn" type="submit">
              Зарегистрироваться
            </button>
            <p className="failed_login">{failedRegistration}</p>
          </form>

          {/* Login форма */}
          <form
            className={`form1 ${authMode === "registration" ? "deactivated" : ""}`}
            onSubmit={submitLogin}
          >
          <input
            className="login_input"
            type="text"
            placeholder="Введите имя"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <input
            className="password_input"
            type="password"
            placeholder="Введите пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="form_btn" type="submit">
            Войти
          </button>
          <p className="failed_login">{failedLogin}</p>
        </form>
      </div>
    </div>

      {/* Contact Modal */}
      <div className={`model_registration ${isContactModalOpen ? "active_model" : "deactivated"}`}>
        <div className="modal_content">
          <button className="close_model" type="button" onClick={closeContactModal}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.17007 3.17007C3.39682 2.94331 3.76447 2.94331 3.99122 3.17007L9 8.17884L14.0088 3.17007C14.2355 2.94331 14.6032 2.94331 14.8299 3.17007C15.0567 3.39682 15.0567 3.76447 14.8299 3.99122L9.82116 9L14.8299 14.0088C15.0567 14.2355 15.0567 14.6032 14.8299 14.8299C14.6032 15.0567 14.2355 15.0567 14.0088 14.8299L9 9.82116L3.99122 14.8299C3.76447 15.0567 3.39682 15.0567 3.17007 14.8299C2.94331 14.6032 2.94331 14.2355 3.17007 14.0088L8.17884 9L3.17007 3.99122C2.94331 3.76447 2.94331 3.39682 3.17007 3.17007Z"
                fill="#ffffff"
              />
            </svg>
          </button>
          <h2>Contact Us</h2>
          <form onSubmit={submitContact}>
            <input
              type="text"
              placeholder="Your Name"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              required
            />
            <textarea
              placeholder="Your Message"
              value={contactMessage}
              onChange={(e) => setContactMessage(e.target.value)}
              required
            />
            <button className="form_btn" type="submit">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

