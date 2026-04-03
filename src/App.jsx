import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { CartProvider } from "./context/CartContext.jsx";
import HomePage from "./pages/HomePage.jsx";
import ShopPage from "./pages/ShopPage.jsx";
import CabinetPage from "./pages/CabinetPage.jsx";
import BlogsPage from "./pages/BlogsPage.jsx";
import PlantCarePage from "./pages/PlantCarePage.jsx";
import ShoppingCartPage from "./pages/ShoppingCartPage.jsx";

export default function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/cart" element={<ShoppingCartPage />} />
        <Route path="/plant-care" element={<PlantCarePage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/cabinet" element={<CabinetPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </CartProvider>
  );
}

