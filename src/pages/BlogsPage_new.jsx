import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const CART_ITEMS = [
  {
    id: 1,
    title: "Barberton Daisy",
    sku: "19975187796",
    price: 238,
    quantity: 2,
    image: "/images/image 1 (1).png",
  },
  {
    id: 2,
    title: "Blushing Bromeliad",
    sku: "19975187505",
    price: 834,
    quantity: 4,
    image: "/images/image 7.png",
  },
  {
    id: 3,
    title: "Aluminum Plant",
    sku: "19975187786",
    price: 1611,
    quantity: 9,
    image: "/images/image 8.png",
  },
];

export default function BlogsPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [apt, setApt] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+966");
  const [shippingAddress, setShippingAddress] = useState(false);
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const subtotal = CART_ITEMS.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const couponDiscount = 0;
  const shipping = 16;
  const total = subtotal - couponDiscount + shipping;

  const handlePlaceOrder = () => {
    if (!firstName || !lastName || !email || !phone) {
      alert("Please fill in all required fields");
      return;
    }
    alert(`Order placed successfully!\nPayment Method: ${paymentMethod}\nTotal: $${total}`);
  };

  return (
    <div>
      <header className="header">
        <div className="container">
          <nav className="header_box">
            <img className="logo" src="/images/Logo.png" alt="GreenShop Logo" />
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
                <NavLink to="/blogs" className={({ isActive }) => isActive ? "header_item1" : "header_item"} style={{ textDecoration: "none", color: "inherit" }}>
                  Blogs
                </NavLink>
              </li>
            </ul>
            <div className="header_buttons">
              <button className="header_btn">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M14.5726 16.0029C10.5755 19.1865 4.988 18.3056 2.02842 14.6542C-0.828088 11.129 -0.64944 6.04347 2.44943 2.82482C5.65137 -0.500594 10.6854 -0.944524 14.3346 1.78337C15.642 2.76051 16.6183 4.00364 17.2542 5.50838C17.8938 7.02186 18.0881 8.59654 17.8663 10.2205C17.6452 11.837 17 13.2775 15.9499 14.6217C16.0349 14.6773 16.1255 14.7173 16.1904 14.7822C17.3448 15.9311 18.4947 17.0843 19.6491 18.2331C19.9227 18.5054 20.0589 18.8225 19.9776 19.2047C19.8165 19.9651 18.9107 20.2586 18.3298 19.7366C18.0575 19.4925 17.807 19.2234 17.5484 18.9649C16.6002 18.0177 15.6526 17.0699 14.7044 16.1227C14.665 16.0853 14.6238 16.0503 14.5726 16.0029ZM15.9605 8.98677C15.9705 5.12689 12.8529 2.00627 8.98261 2.00065C5.12292 1.99503 2.00781 5.09068 1.99094 8.94806C1.97408 12.8173 5.08544 15.9467 8.96762 15.9648C12.8117 15.9829 15.9505 12.8504 15.9605 8.98677Z" fill="#3D3D3D"/>
                </svg>
              </button>
              <button className="header_btn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M17.1567 20.25H9.89163C6.79003 20.25 4.26667 17.7267 4.26667 14.6251V8.85947C4.26667 5.9762 2.82958 3.30739 0.422521 1.72031C-0.00975775 1.43531 -0.129101 0.853876 0.155897 0.421598C0.440896 -0.0107278 1.02228 -0.130118 1.45465 0.154974C2.82874 1.06097 3.94351 2.2559 4.74067 3.63167C4.91293 3.82466 6.30202 5.29699 8.57919 5.29699H19.3748C22.3201 5.24191 24.6254 8.19769 23.8554 11.0406L22.6126 15.9939C21.9839 18.4998 19.7404 20.25 17.1567 20.25ZM5.90513 6.64234C6.06099 7.36238 6.14166 8.10483 6.14166 8.85947V14.6251C6.14166 16.6928 7.8239 18.375 9.89163 18.375H17.1567C18.8792 18.375 20.3748 17.2082 20.794 15.5376L22.0367 10.5844C22.4943 8.89509 21.1243 7.13931 19.3748 7.17198H8.57914C7.54926 7.17198 6.65283 6.94993 5.90513 6.64234ZM9.42289 22.8281C9.42289 22.1809 8.89822 21.6563 8.25102 21.6563C6.69609 21.7182 6.69745 23.9387 8.25102 24C8.89822 24 9.42289 23.4753 9.42289 22.8281ZM18.751 22.8281C18.751 22.1809 18.2263 21.6563 17.5791 21.6563C16.0242 21.7182 16.0255 23.9387 17.5791 24C18.2263 24 18.751 23.4753 18.751 22.8281ZM20.3123 9.98446C20.3123 9.46668 19.8925 9.04697 19.3748 9.04697H8.95414C7.71027 9.09647 7.71121 10.8729 8.95414 10.922H19.3748C19.8925 10.922 20.3123 10.5022 20.3123 9.98446Z" fill="#3D3D3D"/>
                </svg>
              </button>
              <button className="header_btn_green">Login</button>
            </div>
          </nav>
        </div>
      </header>

      <div className="container">
        <div className="checkout_breadcrumb">
          <span>Home</span> / <span>Shop</span> / <span>Checkout</span>
        </div>

        <div className="checkout_wrapper">
          {/* LEFT SIDE - FORM */}
          <div className="checkout_left">
            <h2 className="checkout_form_title">Billing Address</h2>
            
            <div className="form_row">
              <div className="form_group">
                <label>First Name <span className="required">*</span></label>
                <input type="text" placeholder="" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </div>
              <div className="form_group">
                <label>Last Name <span className="required">*</span></label>
                <input type="text" placeholder="" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </div>
            </div>

            <div className="form_row">
              <div className="form_group">
                <label>Country / Region <span className="required">*</span></label>
                <select value={country} onChange={(e) => setCountry(e.target.value)}>
                  <option value="">Select a country / region</option>
                  <option value="usa">USA</option>
                  <option value="canada">Canada</option>
                  <option value="uk">UK</option>
                </select>
              </div>
              <div className="form_group">
                <label>Town / City <span className="required">*</span></label>
                <input type="text" placeholder="" value={city} onChange={(e) => setCity(e.target.value)} />
              </div>
            </div>

            <div className="form_row_full">
              <div className="form_group_full">
                <label>Street Address <span className="required">*</span></label>
                <input type="text" placeholder="House number and street name" value={street} onChange={(e) => setStreet(e.target.value)} />
              </div>
              <div className="form_group_full">
                <input type="text" placeholder="Apartment, suite, unit, etc. (optional)" value={apt} onChange={(e) => setApt(e.target.value)} />
              </div>
            </div>

            <div className="form_row">
              <div className="form_group">
                <label>State <span className="required">*</span></label>
                <select value={state} onChange={(e) => setState(e.target.value)}>
                  <option value="">Select a state</option>
                  <option value="ca">California</option>
                  <option value="ny">New York</option>
                  <option value="tx">Texas</option>
                </select>
              </div>
              <div className="form_group">
                <label>Zip <span className="required">*</span></label>
                <input type="text" placeholder="" value={zip} onChange={(e) => setZip(e.target.value)} />
              </div>
            </div>

            <div className="form_row">
              <div className="form_group">
                <label>Email address <span className="required">*</span></label>
                <input type="email" placeholder="" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="form_group">
                <label>Phone Number <span className="required">*</span></label>
                <input type="tel" placeholder="" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
            </div>

            <div className="form_checkbox">
              <input 
                type="checkbox" 
                id="shipping" 
                checked={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.checked)}
              />
              <label htmlFor="shipping">Ship to a different address?</label>
            </div>

            <div className="form_group_full">
              <label>Order notes (optional)</label>
              <textarea placeholder="" value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
            </div>
          </div>

          {/* RIGHT SIDE - ORDER */}
          <div className="checkout_right">
            <div className="order_section">
              <h2 className="order_title">Your Order</h2>
              
              <div className="order_items_header">
                <span className="col_products">Products</span>
                <span className="col_subtotal">Subtotal</span>
              </div>

              <div className="order_items">
                {CART_ITEMS.map((item) => (
                  <div key={item.id} className="order_item">
                    <div className="order_item_info">
                      <img src={item.image} alt={item.title} className="order_item_image" />
                      <div className="order_item_text">
                        <span className="order_item_title">{item.title}</span>
                        <span className="order_item_sku">SKU: {item.sku}</span>
                      </div>
                      <span className="order_item_qty">({item.quantity}x)</span>
                    </div>
                    <span className="order_item_price">${item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="order_totals">
                <div className="total_row">
                  <span>Subtotal</span>
                  <span>${subtotal}</span>
                </div>
                <div className="total_row">
                  <span>Coupon Discount</span>
                  <span>({couponDiscount}) ${couponDiscount.toFixed(2)}</span>
                </div>
                <div className="total_row">
                  <span>Shipping
                    <a href="#shipping" className="view_shipping">View shipping charge</a>
                  </span>
                  <span>${shipping}</span>
                </div>
                <div className="total_row total_final">
                  <span>Total</span>
                  <span>${total}</span>
                </div>
              </div>

              <div className="payment_section">
                <h3 className="payment_title">Payment Method</h3>
                
                <div className="payment_options">
                  <div className="payment_option">
                    <input 
                      type="radio" 
                      id="payment-card" 
                      name="payment"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <label htmlFor="payment-card">
                      <span className="payment_icons">PayPal / Mastercard / Visa / Amex</span>
                    </label>
                  </div>
                  
                  <div className="payment_option">
                    <input 
                      type="radio" 
                      id="payment-bank" 
                      name="payment"
                      value="bank"
                      checked={paymentMethod === "bank"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <label htmlFor="payment-bank">Direct bank transfer</label>
                  </div>
                  
                  <div className="payment_option active_payment">
                    <input 
                      type="radio" 
                      id="payment-cash" 
                      name="payment"
                      value="cash"
                      checked={paymentMethod === "cash"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <label htmlFor="payment-cash">Cash on delivery</label>
                  </div>
                </div>
              </div>

              <button className="place_order_btn" onClick={handlePlaceOrder}>Place Order</button>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="container">
          <div className="footer_content">
            <div className="footer_section">
              <h4 className="footer_title">My Account</h4>
              <ul className="footer_links">
                <li><a href="#my-account">My Account</a></li>
                <li><a href="#stores">Our stores</a></li>
                <li><a href="#contact">Contact us</a></li>
                <li><a href="#career">Career</a></li>
                <li><a href="#specials">Specials</a></li>
              </ul>
            </div>
            <div className="footer_section">
              <h4 className="footer_title">Help & Guide</h4>
              <ul className="footer_links">
                <li><a href="#help">Help Center</a></li>
                <li><a href="#how-to-buy">How to Buy</a></li>
                <li><a href="#shipping">Shipping & Delivery</a></li>
                <li><a href="#policy">Product Policy</a></li>
                <li><a href="#return">How to Return</a></li>
              </ul>
            </div>
            <div className="footer_section">
              <h4 className="footer_title">Categories</h4>
              <ul className="footer_links">
                <li><a href="#house">House Plants</a></li>
                <li><a href="#potter">Potter Plants</a></li>
                <li><a href="#seeds">Seeds</a></li>
                <li><a href="#small">Small Plants</a></li>
                <li><a href="#accessories">Accessories</a></li>
              </ul>
            </div>
            <div className="footer_section">
              <h4 className="footer_title">Social Media</h4>
              <div className="footer_social_links">
                <a href="#facebook" className="social_link">f</a>
                <a href="#instagram" className="social_link">📷</a>
                <a href="#twitter" className="social_link">𝕏</a>
                <a href="#linkedin" className="social_link">in</a>
              </div>
            </div>
          </div>

          <div className="footer_bottom">
            <p>&copy; 2026 GreenShop. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
