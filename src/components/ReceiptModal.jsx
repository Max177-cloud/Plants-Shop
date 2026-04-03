import React from "react";

export default function ReceiptModal({ isOpen, cartItems, totals, paymentMethod, firstName, lastName, onClose }) {
  if (!isOpen) return null;

  const { subtotal, couponDiscount, shipping, total } = totals;

  return (
    <div className="model_registration active_model">
      <div className="modal_content">
        <button className="close_model" onClick={onClose}>✕</button>
        
        <h2>Order Receipt</h2>
        
        <div style={{ borderTop: "1px solid #dbe8d5", paddingTop: "15px" }}>
          <div style={{ marginBottom: "15px" }}>
            <p style={{ margin: "0 0 5px 0", fontSize: "12px", color: "#666" }}>Customer</p>
            <p style={{ margin: "0", fontSize: "14px", fontWeight: "600" }}>
              {firstName} {lastName}
            </p>
          </div>
        </div>

        <div style={{ borderTop: "1px solid #dbe8d5", paddingTop: "15px" }}>
          <p style={{ margin: "0 0 10px 0", fontSize: "12px", fontWeight: "600", color: "#333" }}>Items</p>
          {cartItems.map((item) => (
            <div key={item.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", fontSize: "13px" }}>
              <div>
                <p style={{ margin: "0", fontWeight: "500" }}>{item.title}</p>
                <p style={{ margin: "2px 0 0 0", fontSize: "12px", color: "#666" }}>x{item.quantity}</p>
              </div>
              <p style={{ margin: "0", fontWeight: "500" }}>${item.price * item.quantity}</p>
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid #dbe8d5", paddingTop: "15px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "13px" }}>
            <span>Subtotal</span>
            <span>${subtotal}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "13px" }}>
            <span>Coupon Discount</span>
            <span>-${couponDiscount.toFixed(2)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", fontSize: "13px" }}>
            <span>Shipping</span>
            <span>${shipping}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "10px", borderTop: "1px solid #dbe8d5", fontSize: "15px", fontWeight: "700" }}>
            <span>Total</span>
            <span style={{ color: "#46a358" }}>${total}</span>
          </div>
        </div>

        <div style={{ borderTop: "1px solid #dbe8d5", paddingTop: "15px" }}>
          <p style={{ margin: "0 0 5px 0", fontSize: "12px", color: "#666" }}>Payment Method</p>
          <p style={{ margin: "0", fontSize: "14px", fontWeight: "600", textTransform: "capitalize" }}>
            {paymentMethod === "card" ? "PayPal / Mastercard / Visa / Amex" : paymentMethod === "bank" ? "Direct bank transfer" : "Cash on delivery"}
          </p>
        </div>

        <button 
          className="form_btn" 
          onClick={onClose}
          style={{ marginTop: "10px" }}
        >
          Done
        </button>
      </div>
    </div>
  );
}
