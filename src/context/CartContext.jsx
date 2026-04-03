import React, { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "Barberton Daisy",
      sku: "19975187796",
      price: 119,
      quantity: 2,
      image: "/images/image 1 (1).png",
    },
    {
      id: 2,
      title: "Blushing Bromeliad",
      sku: "19975187505",
      price: 139,
      quantity: 6,
      image: "/images/image 7.png",
    },
    {
      id: 3,
      title: "Aluminum Plant",
      sku: "19975187786",
      price: 179,
      quantity: 9,
      image: "/images/image 8.png",
    },
  ]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
      }
      return [
        ...prev,
        {
          ...product,
          sku: product.sku || `SKU${product.id}`,
          quantity: product.quantity || 1,
        },
      ];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.length;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
