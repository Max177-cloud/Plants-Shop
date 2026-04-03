import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { CartContext } from "../context/CartContext.jsx";

export default function ShoppingCartPage() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useContext(CartContext);
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);

  const handleQuantityChange = (id, newQuantity) => {
    updateQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id) => {
    removeFromCart(id);
  };

  const handleApplyCoupon = () => {
    if (couponCode.toLowerCase() === "save10") {
      setCouponDiscount(Math.round(subtotal * 0.1));
      alert("Coupon applied! 10% discount");
    } else if (couponCode.toLowerCase() === "save20") {
      setCouponDiscount(Math.round(subtotal * 0.2));
      alert("Coupon applied! 20% discount");
    } else {
      alert("Invalid coupon code");
      setCouponDiscount(0);
    }
    setCouponCode("");
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 16;
  const total = subtotal - couponDiscount + shipping;

  return (
    <div>
      {/* Header */}
      <header className="header">
        <div className="container">
          <nav className="header_box">
            <img className="logo" src="/images/Logo.png" alt="GreenShop Logo" />
            <ul className="header_list">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "header_item1" : "header_item"
                  }
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/shop"
                  className={({ isActive }) =>
                    isActive ? "header_item1" : "header_item"
                  }
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Shop
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/plant-care"
                  className={({ isActive }) =>
                    isActive ? "header_item1" : "header_item"
                  }
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Plant Care
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/blogs"
                  className={({ isActive }) =>
                    isActive ? "header_item1" : "header_item"
                  }
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Blogs
                </NavLink>
              </li>
            </ul>
            <div className="header_buttons">
              <button className="header_btn">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M14.5726 16.0029C10.5755 19.1865 4.988 18.3056 2.02842 14.6542C-0.828088 11.129 -0.64944 6.04347 2.44943 2.82482C5.65137 -0.500594 10.6854 -0.944524 14.3346 1.78337C15.642 2.76051 16.6183 4.00364 17.2542 5.50838C17.8938 7.02186 18.0881 8.59654 17.8663 10.2205C17.6452 11.837 17 13.2775 15.9499 14.6217C16.0349 14.6773 16.1255 14.7173 16.1904 14.7822C17.3448 15.9311 18.4947 17.0843 19.6491 18.2331C19.9227 18.5054 20.0589 18.8225 19.9776 19.2047C19.8165 19.9651 18.9107 20.2586 18.3298 19.7366C18.0575 19.4925 17.807 19.2234 17.5484 18.9649C16.6002 18.0177 15.6526 17.0699 14.7044 16.1227C14.665 16.0853 14.6238 16.0503 14.5726 16.0029ZM15.9605 8.98677C15.9705 5.12689 12.8529 2.00627 8.98261 2.00065C5.12292 1.99503 2.00781 5.09068 1.99094 8.94806C1.97408 12.8173 5.08544 15.9467 8.96762 15.9648C12.8117 15.9829 15.9505 12.8504 15.9605 8.98677Z"
                    fill="#3D3D3D"
                  />
                </svg>
              </button>
              <NavLink to="/cart" className="header_btn" style={{ textDecoration: "none", color: "inherit", position: "relative" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M17.1567 20.25H9.89163C6.79003 20.25 4.26667 17.7267 4.26667 14.6251V8.85947C4.26667 5.9762 2.82958 3.30739 0.422521 1.72031C-0.00975775 1.43531 -0.129101 0.853876 0.155897 0.421598C0.440896 -0.0107278 1.02228 -0.130118 1.45465 0.154974C2.82874 1.06097 3.94351 2.2559 4.74067 3.63167C4.91293 3.82466 6.30202 5.29699 8.57919 5.29699H19.3748C22.3201 5.24191 24.6254 8.19769 23.8554 11.0406L22.6126 15.9939C21.9839 18.4998 19.7404 20.25 17.1567 20.25ZM5.90513 6.64234C6.06099 7.36238 6.14166 8.10483 6.14166 8.85947V14.6251C6.14166 16.6928 7.8239 18.375 9.89163 18.375H17.1567C18.8792 18.375 20.3748 17.2082 20.794 15.5376L22.0367 10.5844C22.4943 8.89509 21.1243 7.13931 19.3748 7.17198H8.57914C7.54926 7.17198 6.65283 6.94993 5.90513 6.64234ZM9.42289 22.8281C9.42289 22.1809 8.89822 21.6563 8.25102 21.6563C6.69609 21.7182 6.69745 23.9387 8.25102 24C8.89822 24 9.42289 23.4753 9.42289 22.8281ZM18.751 22.8281C18.751 22.1809 18.2263 21.6563 17.5791 21.6563C16.0242 21.7182 16.0255 23.9387 17.5791 24C18.2263 24 18.751 23.4753 18.751 22.8281ZM20.3123 9.98446C20.3123 9.46668 19.8925 9.04697 19.3748 9.04697H8.95414C7.71027 9.09647 7.71121 10.8729 8.95414 10.922H19.3748C19.8925 10.922 20.3123 10.5022 20.3123 9.98446Z"
                    fill="#3D3D3D"
                  />
                </svg>
                {cartTotal > 0 && <span style={{ position: "absolute", top: "-8px", right: "-8px", background: "#46a358", color: "#fff", width: "20px", height: "20px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "bold" }}>{cartTotal}</span>}
              </NavLink>
              <button className="header_btn_green">Login</button>
            </div>
          </nav>
        </div>
      </header>

      <div className="container">
        {/* Breadcrumb */}
        <div className="cart_breadcrumb">
          <NavLink to="/" style={{ textDecoration: "none", color: "inherit" }}>
            Home
          </NavLink>{" "}
          /{" "}
          <NavLink to="/shop" style={{ textDecoration: "none", color: "inherit" }}>
            Shop
          </NavLink>{" "}
          / <span>Shopping Cart</span>
        </div>

        {/* Page Title */}
        <h1 className="cart_page_title">Shopping Cart</h1>

        {/* Cart Content */}
        <div className="cart_wrapper">
          {/* Left Side - Products Table */}
          <div className="cart_left">
            <div className="cart_table">
              {/* Table Header */}
              <div className="cart_table_header">
                <div className="col_products">Products</div>
                <div className="col_price">Price</div>
                <div className="col_quantity">Quantity</div>
                <div className="col_total">Total</div>
                <div className="col_remove"></div>
              </div>

              {/* Table Rows */}
              {cartItems.map((item) => (
                <div key={item.id} className="cart_table_row">
                  <div className="col_products">
                    <img src={item.image} alt={item.title} className="cart_item_image" />
                    <div className="cart_item_info">
                      <p className="cart_item_title">{item.title}</p>
                      <p className="cart_item_sku">SKU: {item.sku}</p>
                    </div>
                  </div>

                  <div className="col_price">${item.price}</div>

                  <div className="col_quantity">
                    <div className="quantity_controls">
                      <button
                        className="qty_btn"
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                      >
                        −
                      </button>
                      <span className="qty_value">{item.quantity}</span>
                      <button
                        className="qty_btn"
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="col_total">${item.price * item.quantity}</div>

                  <div className="col_remove">
                    <button
                      className="remove_btn"
                      onClick={() => handleRemoveItem(item.id)}
                      title="Remove item"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Cart Totals */}
          <div className="cart_right">
            <div className="cart_totals_box">
              <h2 className="cart_totals_title">Cart Totals</h2>

              {/* Coupon Section */}
              <div className="coupon_section">
                <label className="coupon_label">Coupon Apply</label>
                <div className="coupon_input_group">
                  <input
                    type="text"
                    placeholder="Enter coupon code here..."
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="coupon_input"
                  />
                  <button className="coupon_btn" onClick={handleApplyCoupon}>
                    Apply
                  </button>
                </div>
              </div>

              {/* Totals */}
              <div className="totals_breakdown">
                <div className="total_row">
                  <span>Subtotal</span>
                  <span>${subtotal}</span>
                </div>
                <div className="total_row">
                  <span>Coupon Discount</span>
                  <span>({couponDiscount > 0 ? "-" : ""}) ${couponDiscount.toFixed(2)}</span>
                </div>
                <div className="total_row">
                  <span>
                    Shipping
                    <a href="#shipping" className="view_shipping">
                      View shipping charge
                    </a>
                  </span>
                  <span>${shipping}</span>
                </div>
              </div>

              {/* Final Total */}
              <div className="total_final">
                <span>Total</span>
                <span>${total}</span>
              </div>

              {/* Buttons */}
              <NavLink to="/blogs" className="checkout_btn" style={{ textDecoration: "none", color: "inherit" }}>
                Proceed To Checkout
              </NavLink>
              <a href="/shop" className="continue_shopping">
                Continue Shopping
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features_section">
        <div className="container">
          <div className="features_grid">
            <div className="feature_item">
              <div className="feature_icon">🌵</div>
              <h3 className="feature_title">Garden Care</h3>
              <p className="feature_text">
                We are an online plant shop offering a wide range of cheap and
                trendy plants.
              </p>
            </div>
            <div className="feature_item">
              <div className="feature_icon">💚</div>
              <h3 className="feature_title">Plant Renovation</h3>
              <p className="feature_text">
                We are an online plant shop offering a wide range of cheap and
                trendy plants.
              </p>
            </div>
            <div className="feature_item">
              <div className="feature_icon">🤍</div>
              <h3 className="feature_title">Watering Garden</h3>
              <p className="feature_text">
                We are an online plant shop offering a wide range of cheap and
                trendy plants.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="newsletter_section">
        <div className="container">
          <div className="newsletter_wrapper">
            <div className="newsletter_content">
              <h3 className="newsletter_title">Would you like to join newsletters?</h3>
              <p className="newsletter_text">
                We usually post offers and challenges in newsletter. We're your
                online houseplant destination. We offer a wide range of
                houseplants and accessories shipped directly from our
                greenhouse to yours!
              </p>
            </div>
            <div className="newsletter_form">
              <input
                type="email"
                placeholder="enter your email address..."
                className="newsletter_input"
              />
              <button className="newsletter_btn">Join</button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer_top">
            <div className="footer_top_content">
              <div className="footer_left">
                <div className="footer_logo_section">
                  <img
                    src="/images/Logo.png"
                    alt="GreenShop"
                    className="footer_logo"
                  />
                </div>
                <p className="footer_company_info">
                  We are an online plant shop offering a wide range of cheap and
                  trendy plants, offering a wide range of cheap and trendy
                  plants.
                </p>
                <div className="footer_contact">
                  <p className="footer_contact_item">
                    📍 70 West Buckingham Ave., Farmingdale, NY 11735
                  </p>
                  <p className="footer_contact_item">✉️ contact@greenshop.com</p>
                  <p className="footer_contact_item">📞 +88 (0)101 717 490</p>
                </div>
              </div>
              <div className="footer_right">
                <div className="footer_accept">
                  <p className="footer_accept_title">We accept</p>
                  <div className="payment_methods">
                    <span className="payment_icon">💳 PayPal</span>
                    <span className="payment_icon">💳 Mastercard</span>
                    <span className="payment_icon">💳 Visa</span>
                    <span className="payment_icon">💳 AmEx</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="footer_bottom_content">
            <div className="footer_bottom_columns">
              <div className="footer_section">
                <h4 className="footer_title">My Account</h4>
                <ul className="footer_links">
                  <li>
                    <a href="#account">My Account</a>
                  </li>
                  <li>
                    <a href="#stores">Our stores</a>
                  </li>
                  <li>
                    <a href="#contact">Contact us</a>
                  </li>
                  <li>
                    <a href="#career">Career</a>
                  </li>
                  <li>
                    <a href="#specials">Specials</a>
                  </li>
                </ul>
              </div>
              <div className="footer_section">
                <h4 className="footer_title">Help & Guide</h4>
                <ul className="footer_links">
                  <li>
                    <a href="#help">Help Center</a>
                  </li>
                  <li>
                    <a href="#howto">How to Buy</a>
                  </li>
                  <li>
                    <a href="#shipping">Shipping & Delivery</a>
                  </li>
                  <li>
                    <a href="#policy">Product Policy</a>
                  </li>
                  <li>
                    <a href="#return">How to Return</a>
                  </li>
                </ul>
              </div>
              <div className="footer_section">
                <h4 className="footer_title">Categories</h4>
                <ul className="footer_links">
                  <li>
                    <a href="#house">House Plants</a>
                  </li>
                  <li>
                    <a href="#potter">Potter Plants</a>
                  </li>
                  <li>
                    <a href="#seeds">Seeds</a>
                  </li>
                  <li>
                    <a href="#small">Small Plants</a>
                  </li>
                  <li>
                    <a href="#accessories">Accessories</a>
                  </li>
                </ul>
              </div>
              <div className="footer_section">
                <h4 className="footer_title">Social Media</h4>
                <div className="footer_social_links">
                  <a href="#facebook">f</a>
                  <a href="#instagram">📷</a>
                  <a href="#twitter">𝕏</a>
                  <a href="#linkedin">in</a>
                </div>
              </div>
            </div>
          </div>

          <div className="footer_copyright">
            <p>&copy; 2021 GreenShop. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
