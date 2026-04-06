import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'greenshop_cart'

const CartContextObj = createContext()

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveCart(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart)

  useEffect(() => {
    saveCart(items)
  }, [items])

  const addToCart = useCallback((product, qty = 1) => {
    setItems((prev) => {
      const i = prev.findIndex((line) => line.productId === product.id)
      if (i === -1) {
        return [
          ...prev,
          {
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            qty: Math.max(1, qty),
          },
        ]
      }
      const next = [...prev]
      next[i] = { ...next[i], qty: next[i].qty + Math.max(1, qty) }
      return next
    })
  }, [])

  const setQty = useCallback((productId, qty) => {
    const q = Math.max(0, Math.floor(Number(qty) || 0))
    setItems((prev) => {
      if (q === 0) return prev.filter((line) => line.productId !== productId)
      return prev.map((line) =>
        line.productId === productId ? { ...line, qty: q } : line,
      )
    })
  }, [])

  const removeLine = useCallback((productId) => {
    setItems((prev) => prev.filter((line) => line.productId !== productId))
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const cartCount = useMemo(
    () => items.reduce((sum, line) => sum + line.qty, 0),
    [items],
  )

  const subtotal = useMemo(
    () => items.reduce((sum, line) => sum + line.price * line.qty, 0),
    [items],
  )

  const value = useMemo(
    () => ({
      items,
      addToCart,
      setQty,
      removeLine,
      clearCart,
      cartCount,
      subtotal,
    }),
    [items, addToCart, setQty, removeLine, clearCart, cartCount, subtotal],
  )

  return <CartContextObj.Provider value={value}>{children}</CartContextObj.Provider>
}

export function useCart() {
  const ctx = useContext(CartContextObj)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

export default CartContextObj
