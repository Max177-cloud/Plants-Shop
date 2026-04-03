import React, { useMemo, useState } from "react";
import { Link, NavLink } from "react-router-dom";

const PRODUCTS = [
  { id: "s1", title: "Barberton Daisy", category: "House Plants", price: 119, isNew: true, isSale: false },
  { id: "s2", title: "Angel Wing Begonia", category: "Potter Plants", price: 169, isNew: false, isSale: false },
  { id: "s3", title: "African Violet", category: "Seeds", price: 199, isNew: false, isSale: true, oldPrice: 229 },
  { id: "s4", title: "Beach Spider Lily", category: "Small Plants", price: 129, isNew: true, isSale: false },
  { id: "s5", title: "Blushing Bromeliad", category: "Big Plants", price: 139, isNew: false, isSale: false },
  { id: "s6", title: "Aluminum Plant", category: "Succulents", price: 179, isNew: false, isSale: false },
  { id: "s7", title: "Bird's Nest Fern", category: "Terrariums", price: 99, isNew: true, isSale: false },
  { id: "s8", title: "Broadleaf Lady Palm", category: "Large Plants", price: 59, isNew: false, isSale: false },
  { id: "s9", title: "Chinese Evergreen", category: "Accessories", price: 39, isNew: false, isSale: false },
];

const CATEGORIES = ["All", ...Array.from(new Set(PRODUCTS.map((p) => p.category)))];

export default function ShopPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [activeTab, setActiveTab] = useState("all");
  const [sortType, setSortType] = useState("All");

  const filtered = useMemo(() => {
    let list = PRODUCTS;

    if (activeTab === "new") list = list.filter((p) => p.isNew);
    if (activeTab === "sale") list = list.filter((p) => p.isSale);
    if (category !== "All") list = list.filter((p) => p.category === category);

    const q = search.trim().toLowerCase();
    if (q) list = list.filter((p) => p.title.toLowerCase().includes(q));

    if (sortType === "Incr") list = list.slice().sort((a, b) => a.price - b.price);
    else if (sortType === "Descr") list = list.slice().sort((a, b) => b.price - a.price);
    else if (sortType === "Alp") list = list.slice().sort((a, b) => a.title.localeCompare(b.title));

    return list;
  }, [activeTab, category, search, sortType]);

  return (
    <div>
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
                    onClick={() => openModal("login")}
                  >
                    <img src="/images/Logout.png" alt="" />
                    Login
                  </button>
                </div>
              </nav>
            </div>
          </header>
          
    <section className="products" style={{ padding: "30px 0" }}>
      <div className="container">
        <div className="products_box">
          <aside className="products_left storeSidebar">
            <h3 className="categories">Categories</h3>
            <ul className="store_filter_list">
              {CATEGORIES.map((c) => (
                <li key={c}>
                  <button
                    type="button"
                    className={`store_filter_btn ${category === c ? "store_filter_btn_active" : ""}`}
                    onClick={() => setCategory(c)}
                  >
                    <span>{c}</span>
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          <main className="products_right storeMain">
            <div className="products_right_sort storeTopBar">
              <ul className="plants_categories storeTabs">
                <li className={activeTab === "all" ? "active_category" : ""} onClick={() => setActiveTab("all")}>All Plants</li>
                <li className={activeTab === "new" ? "active_category" : ""} onClick={() => setActiveTab("new")}>New Arrivals</li>
                <li className={activeTab === "sale" ? "active_category" : ""} onClick={() => setActiveTab("sale")}>Sale</li>
              </ul>

              <div className="store_sort">
                <span className="store_sort_label">Sort by:</span>
                <select className="sort" value={sortType} onChange={(e) => setSortType(e.target.value)}>
                  <option value="All">Default sorting</option>
                  <option value="Incr">Increase</option>
                  <option value="Descr">Descrease</option>
                  <option value="Alp">Alphabet</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: 18 }}>
              <Link to="/" style={{ textDecoration: "none", color: "#46a358", marginRight: 12 }}>Home</Link>
              <span> / Shop</span>
            </div>

            <input
              type="text"
              placeholder="Поиск по продуктам"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ padding: "8px 10px", borderRadius: 6, border: "1px solid #dbe8d5", width: "100%", maxWidth: 340, marginBottom: 16 }}
            />

            <div className="store_products_grid">
              {filtered.length > 0 ? (
                filtered.map((p) => (
                  <div key={p.id} className="product_card">
                    {p.isSale && <div className="product_discount">{p.oldPrice ? `${Math.round((1 - p.price / p.oldPrice) * 100)}% OFF` : "SALE"}</div>}
                    <div className="product_image_wrap" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: 100, background: "#f4f4f4", borderRadius: 8, marginBottom: 10 }}>
                      <span style={{ color: "#999" }}>No image</span>
                    </div>
                    <div className="product_meta">
                      <div className="product_title">{p.title}</div>
                      <div className="product_price_row">
                        <span className="product_price">${p.price.toFixed(2)}</span>
                        {p.oldPrice != null && <span className="product_old_price">${p.oldPrice.toFixed(2)}</span>}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ color: "#727272" }}>Нет товаров, соответствующих критериям.</p>
              )}
            </div>
          </main>
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
                />
                <button className="footer_btn" type="button">
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
    </div>
  );
}
