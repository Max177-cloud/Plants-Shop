import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { CartContext } from "../context/CartContext.jsx";

const CARE_PRODUCTS = [
  {
    id: 1,
    title: "Beach Spider Lily",
    price: 129,
    img: "/images/01 3.png",
  },
  {
    id: 2,
    title: "Blushing Bromeliad",
    price: 139,
    img: "/images/image 7.png",
  },
  {
    id: 3,
    title: "Aluminum Plant",
    price: 179,
    img: "/images/image 8.png",
  },
  {
    id: 4,
    title: "Bird's Nest Fern",
    price: 99,
    img: "/images/image 9.png",
  },
  {
    id: 5,
    title: "Chinese Evergreen",
    price: 39,
    img: "/images/image 10.png",
  },
];

export default function PlantCarePage() {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const { addToCart, cartTotal } = useContext(CartContext);
  const [addedProduct, setAddedProduct] = useState(null);

  const handlePrevSlide = () => {
    setCarouselIndex((prev) => (prev === 0 ? CARE_PRODUCTS.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCarouselIndex((prev) => (prev === CARE_PRODUCTS.length - 1 ? 0 : prev + 1));
  };

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.img,
      quantity: 1,
    });
    setAddedProduct(product.id);
    setTimeout(() => setAddedProduct(null), 1500);
  };

  return (
    <div>
      {/* Header */}
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
              <button className="header_btn">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M14.5726 16.0029C10.5755 19.1865 4.988 18.3056 2.02842 14.6542C-0.828088 11.129 -0.64944 6.04347 2.44943 2.82482C5.65137 -0.500594 10.6854 -0.944524 14.3346 1.78337C15.642 2.76051 16.6183 4.00364 17.2542 5.50838C17.8938 7.02186 18.0881 8.59654 17.8663 10.2205C17.6452 11.837 17 13.2775 15.9499 14.6217C16.0349 14.6773 16.1255 14.7173 16.1904 14.7822C17.3448 15.9311 18.4947 17.0843 19.6491 18.2331C19.9227 18.5054 20.0589 18.8225 19.9776 19.2047C19.8165 19.9651 18.9107 20.2586 18.3298 19.7366C18.0575 19.4925 17.807 19.2234 17.5484 18.9649C16.6002 18.0177 15.6526 17.0699 14.7044 16.1227C14.665 16.0853 14.6238 16.0503 14.5726 16.0029ZM15.9605 8.98677C15.9705 5.12689 12.8529 2.00627 8.98261 2.00065C5.12292 1.99503 2.00781 5.09068 1.99094 8.94806C1.97408 12.8173 5.08544 15.9467 8.96762 15.9648C12.8117 15.9829 15.9505 12.8504 15.9605 8.98677Z" fill="#3D3D3D"/>
                </svg>
              </button>
              <NavLink to="/cart" className="header_btn" style={{ textDecoration: "none", color: "inherit", position: "relative" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M17.1567 20.25H9.89163C6.79003 20.25 4.26667 17.7267 4.26667 14.6251V8.85947C4.26667 5.9762 2.82958 3.30739 0.422521 1.72031C-0.00975775 1.43531 -0.129101 0.853876 0.155897 0.421598C0.440896 -0.0107278 1.02228 -0.130118 1.45465 0.154974C2.82874 1.06097 3.94351 2.2559 4.74067 3.63167C4.91293 3.82466 6.30202 5.29699 8.57919 5.29699H19.3748C22.3201 5.24191 24.6254 8.19769 23.8554 11.0406L22.6126 15.9939C21.9839 18.4998 19.7404 20.25 17.1567 20.25ZM5.90513 6.64234C6.06099 7.36238 6.14166 8.10483 6.14166 8.85947V14.6251C6.14166 16.6928 7.8239 18.375 9.89163 18.375H17.1567C18.8792 18.375 20.3748 17.2082 20.794 15.5376L22.0367 10.5844C22.4943 8.89509 21.1243 7.13931 19.3748 7.17198H8.57914C7.54926 7.17198 6.65283 6.94993 5.90513 6.64234ZM9.42289 22.8281C9.42289 22.1809 8.89822 21.6563 8.25102 21.6563C6.69609 21.7182 6.69745 23.9387 8.25102 24C8.89822 24 9.42289 23.4753 9.42289 22.8281ZM18.751 22.8281C18.751 22.1809 18.2263 21.6563 17.5791 21.6563C16.0242 21.7182 16.0255 23.9387 17.5791 24C18.2263 24 18.751 23.4753 18.751 22.8281ZM20.3123 9.98446C20.3123 9.46668 19.8925 9.04697 19.3748 9.04697H8.95414C7.71027 9.09647 7.71121 10.8729 8.95414 10.922H19.3748C19.8925 10.922 20.3123 10.5022 20.3123 9.98446Z" fill="#3D3D3D"/>
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
        <div className="checkout_breadcrumb">
          <span>Home</span> / <span>Plant Care</span>
        </div>

        {/* Hero with Title */}
        <section className="plant_care_hero_section">
          <h1 className="plant_care_hero_title">Plant Care</h1>
          <p className="plant_care_hero_description">Everything you need to know about plant care and maintenance</p>
        </section>

        {/* Products Carousel - "You may be interested in" */}
        <section className="interested_section">
          <h2 className="interested_title">You may be interested in</h2>
          
          <div className="carousel_container">
            <div className="carousel_wrapper">
              <div className="carousel_track" style={{ transform: `translateX(calc(-${carouselIndex * 20}% - ${carouselIndex * 24}px))` }}>
                {CARE_PRODUCTS.map((product) => (
                  <div key={product.id} className="carousel_item">
                    <div className="product_carousel_card">
                      <div className="product_carousel_image">
                        <img src={product.img} alt={product.title} />
                      </div>
                      <div className="product_carousel_info">
                        <h3 className="product_carousel_title">{product.title}</h3>
                        <p className="product_carousel_price">${product.price}</p>
                        <button
                          className={`product_carousel_btn ${addedProduct === product.id ? 'added' : ''}`}
                          onClick={() => handleAddToCart(product)}
                        >
                          {addedProduct === product.id ? '✓ Added' : 'Add to Cart'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button className="carousel_btn carousel_prev" onClick={handlePrevSlide}>
              &#10094;
            </button>
            <button className="carousel_btn carousel_next" onClick={handleNextSlide}>
              &#10095;
            </button>
          </div>

          {/* Carousel dots */}
          <div className="carousel_dots">
            {CARE_PRODUCTS.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === carouselIndex ? "active" : ""}`}
                onClick={() => setCarouselIndex(index)}
              />
            ))}
          </div>
        </section>

        {/* Care Guide Section */}
        <section className="care_guide_section">
          <h2 className="care_guide_title">Plant Care Guide</h2>
          <div className="care_cards_grid">
            <div className="care_card">
              <div className="care_card_icon">💧</div>
              <h3>Watering</h3>
              <p>Water your plants when the top inch of soil feels dry. Most plants need water 2-3 times per week. Always check soil moisture before watering.</p>
            </div>
            <div className="care_card">
              <div className="care_card_icon">☀️</div>
              <h3>Light</h3>
              <p>Place plants in indirect sunlight for best results. Most houseplants thrive with 6-8 hours of light daily. Rotate plants weekly for even growth.</p>
            </div>
            <div className="care_card">
              <div className="care_card_icon">🌡️</div>
              <h3>Temperature</h3>
              <p>Keep plants in temperatures between 65-75°F (18-24°C). Avoid sudden temperature changes and drafts from windows or vents.</p>
            </div>
            <div className="care_card">
              <div className="care_card_icon">🧪</div>
              <h3>Fertilizing</h3>
              <p>Fertilize plant every 2-4 weeks during growing season. Use balanced fertilizer (10-10-10) or specialized formulas for specific plants.</p>
            </div>
            <div className="care_card">
              <div className="care_card_icon">✂️</div>
              <h3>Pruning</h3>
              <p>Remove dead or yellowing leaves regularly. Prune overgrown branches to encourage bushier growth and improve plant shape.</p>
            </div>
            <div className="care_card">
              <div className="care_card_icon">🪴</div>
              <h3>Repotting</h3>
              <p>Repot plants when roots emerge from drainage holes. Use soil one size larger pot with fresh potting soil every 12-18 months.</p>
            </div>
          </div>
        </section>

        {/* Problems & Solutions Section */}
        <section className="problems_section">
          <h2 className="problems_title">Common Plant Problems & Solutions</h2>
          <div className="problems_grid">
            <div className="problem_item">
              <div className="problem_number">1</div>
              <h3>Yellow Leaves</h3>
              <p><strong>Cause:</strong> Overwatering, poor drainage, or nutrient deficiency</p>
              <p><strong>Solution:</strong> Check soil moisture, improve drainage, reduce watering frequency. Consider fertilizing if nutrient-deficient.</p>
            </div>
            <div className="problem_item">
              <div className="problem_number">2</div>
              <h3>Brown Leaf Tips</h3>
              <p><strong>Cause:</strong> Low humidity, underwatering, or excessive salt in soil</p>
              <p><strong>Solution:</strong> Increase humidity by misting, water more frequently, or flush soil with distilled water.</p>
            </div>
            <div className="problem_item">
              <div className="problem_number">3</div>
              <h3>Pest Infestations</h3>
              <p><strong>Cause:</strong> Spider mites, mealybugs, scale insects, or aphids</p>
              <p><strong>Solution:</strong> Isolate plant, spray with neem oil or insecticidal soap. Repeat every 7-10 days as needed.</p>
            </div>
            <div className="problem_item">
              <div className="problem_number">4</div>
              <h3>Wilting Leaves</h3>
              <p><strong>Cause:</strong> Underwatering, root rot, or high temperature</p>
              <p><strong>Solution:</strong> Water immediately if underwatered. If root rot, repot with fresh soil and improve drainage.</p>
            </div>
            <div className="problem_item">
              <div className="problem_number">5</div>
              <h3>Leggy Growth</h3>
              <p><strong>Cause:</strong> Insufficient light or too much nitrogen fertilizer</p>
              <p><strong>Solution:</strong> Move plant to brighter location, prune to encourage bushier growth. Reduce nitrogen fertilizer.</p>
            </div>
            <div className="problem_item">
              <div className="problem_number">6</div>
              <h3>Fungal Issues</h3>
              <p><strong>Cause:</strong> High humidity, poor air circulation, or overwatering</p>
              <p><strong>Solution:</strong> Improve ventilation, avoid wetting leaves, reduce humidity. Apply fungicide if severe.</p>
            </div>
          </div>
        </section>

        {/* Seasonal Care Section */}
        <section className="seasonal_section">
          <h2 className="seasonal_title">Seasonal Plant Care</h2>
          <div className="seasonal_cards">
            <div className="seasonal_card">
              <h3>🌸 Spring</h3>
              <p>Begin fertilizing as plants start growing. Repot plants if needed. Increase watering as temperatures rise. Prune winter damage.</p>
            </div>
            <div className="seasonal_card">
              <h3>☀️ Summer</h3>
              <p>Water more frequently due to heat. Provide afternoon shade in hot climates. Continue fertilizing every 2 weeks. Mist leaves to maintain humidity.</p>
            </div>
            <div className="seasonal_card">
              <h3>🍂 Fall</h3>
              <p>Gradually reduce watering as temperatures drop. Prepare plants for dormancy. Stop fertilizing in late fall. Move plants away from cooling vents.</p>
            </div>
            <div className="seasonal_card">
              <h3>❄️ Winter</h3>
              <p>Reduce watering significantly. No fertilizing needed. Provide brighter light if possible. Keep plants away from cold drafts and heating vents.</p>
            </div>
          </div>
        </section>

        {/* Plant Selection Tips Section */}
        <section className="selection_tips_section">
          <h2 className="selection_tips_title">Tips for Choosing the Right Plant</h2>
          <div className="tips_list">
            <div className="tip_item">
              <div className="tip_icon">🏠</div>
              <div className="tip_content">
                <h4>Consider Your Space</h4>
                <p>Measure your space and check light availability. Choose compact plants for small spaces or tall varieties for corners and walls.</p>
              </div>
            </div>
            <div className="tip_item">
              <div className="tip_icon">⏰</div>
              <div className="tip_content">
                <h4>Time & Effort</h4>
                <p>If you're a beginner, start with low-maintenance plants like pothos, snake plants, or ZZ plants. They're forgiving and beautiful.</p>
              </div>
            </div>
            <div className="tip_item">
              <div className="tip_icon">💡</div>
              <div className="tip_content">
                <h4>Light Conditions</h4>
                <p>Match plants to your home's lighting. Low-light plants: pothos, peace lily. Medium-light: dracaena. High-light: succulents, cacti.</p>
              </div>
            </div>
            <div className="tip_item">
              <div className="tip_icon">🌍</div>
              <div className="tip_content">
                <h4>Climate & Humidity</h4>
                <p>Consider your room's temperature and humidity. Tropical plants prefer warmth and humidity. Desert plants like it dry.</p>
              </div>
            </div>
            <div className="tip_item">
              <div className="tip_icon">🐾</div>
              <div className="tip_content">
                <h4>Pet Safety</h4>
                <p>If you have pets, choose non-toxic plants. Avoid lilies, sago palms, and oleanders. Spider plants and prayer plants are pet-safe.</p>
              </div>
            </div>
            <div className="tip_item">
              <div className="tip_icon">💚</div>
              <div className="tip_content">
                <h4>Personal Preference</h4>
                <p>Choose plants you love! Your enjoyment matters. Flowering plants add color, while foliage plants provide texture and greenery.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq_section">
          <h2 className="faq_title">Frequently Asked Questions</h2>
          <div className="faq_items">
            <details className="faq_item">
              <summary className="faq_question">How often should I water my plants?</summary>
              <div className="faq_answer">
                <p>Most indoor plants need water when the top 1-2 inches of soil feels dry. This usually means watering 1-3 times per week depending on season and plant type. Always check soil moisture before watering to avoid overwatering.</p>
              </div>
            </details>
            <details className="faq_item">
              <summary className="faq_question">Can I use tap water for my plants?</summary>
              <div className="faq_answer">
                <p>Tap water is generally fine for most plants. However, if your tap water is heavily chlorinated, let it sit for 24 hours before using. For sensitive plants, distilled or filtered water may be better.</p>
              </div>
            </details>
            <details className="faq_item">
              <summary className="faq_question">What are the best plants for low-light areas?</summary>
              <div className="faq_answer">
                <p>Excellent low-light plants include: Pothos (Devil's Ivy), Snake Plant (Sansevieria), ZZ Plant, Peace Lily, Philodendron, and Cast Iron Plant. These can thrive in offices, bathrooms, or rooms without direct sunlight.</p>
              </div>
            </details>
            <details className="faq_item">
              <summary className="faq_question">How do I know if my plant is getting too much water?</summary>
              <div className="faq_answer">
                <p>Signs of overwatering include: yellowing leaves, soft mushy stems, mold on soil, sour soil smell, and root rot. Reduce watering frequency and improve drainage by repotting if necessary.</p>
              </div>
            </details>
            <details className="faq_item">
              <summary className="faq_question">When is the best time to repot a plant?</summary>
              <div className="faq_answer">
                <p>The best time is early spring when plants begin their active growth. Signs your plant needs repotting include: roots emerging from drainage holes, soil drying out quickly, or the plant becoming top-heavy.</p>
              </div>
            </details>
            <details className="faq_item">
              <summary className="faq_question">Can houseplants improve air quality?</summary>
              <div className="faq_answer">
                <p>Yes! Plants like spider plant, pothos, snake plant, and peace lily help purify air by absorbing toxins. However, you'd need many plants to significantly impact air quality. They do add oxygen and bring fresh vibes!</p>
              </div>
            </details>
          </div>
        </section>
      </div>

      {/* Features Section */}
      <div className="features_section">
        <div className="container">
          <div className="features_grid">
            <div className="feature_item">
              <div className="feature_icon">🌵</div>
              <h3 className="feature_title">Garden Care</h3>
              <p className="feature_text">We are an online plant shop offering a wide range of cheap and trendy plants.</p>
            </div>
            <div className="feature_item">
              <div className="feature_icon">💚</div>
              <h3 className="feature_title">Plant Renovation</h3>
              <p className="feature_text">We are an online plant shop offering a wide range of cheap and trendy plants.</p>
            </div>
            <div className="feature_item">
              <div className="feature_icon">🤍</div>
              <h3 className="feature_title">Watering Garden</h3>
              <p className="feature_text">We are an online plant shop offering a wide range of cheap and trendy plants.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="newsletter_section">
        <div className="container">
          <div className="newsletter_wrapper">
            <div className="newsletter_content">
              <h3 className="newsletter_title">Would you like to join newsletters?</h3>
              <p className="newsletter_text">We usually post offers and challenges in newsletter. We're your online houseplant destination. We offer a wide range of houseplants and accessories shipped directly from our greenhouse to yours!</p>
            </div>
            <div className="newsletter_form">
              <input type="email" placeholder="enter your email address..." className="newsletter_input" />
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
                  <img src="/images/Logo.png" alt="GreenShop" className="footer_logo" />
                </div>
                <p className="footer_company_info">We are an online plant shop offering a wide range of cheap and trendy plants, offering a wide range of cheap and trendy plants.</p>
                <div className="footer_contact">
                  <p className="footer_contact_item">📍 70 West Buckingham Ave., Farmingdale, NY 11735</p>
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
                  <li><a href="#account">My Account</a></li>
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
                  <li><a href="#howto">How to Buy</a></li>
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
