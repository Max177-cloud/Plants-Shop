import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'greenshop_orders'

const OrdersContextObj = createContext()

function loadOrders() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveOrders(orders) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders))
}

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState(loadOrders)

  useEffect(() => {
    saveOrders(orders)
  }, [orders])

  const addOrder = useCallback((order) => {
    setOrders((prev) => [order, ...prev])
  }, [])

  const getOrdersForUser = useCallback(
    (userId) => orders.filter((o) => o.userId === userId),
    [orders],
  )

  const value = useMemo(
    () => ({ orders, addOrder, getOrdersForUser }),
    [orders, addOrder, getOrdersForUser],
  )

  return <OrdersContextObj.Provider value={value}>{children}</OrdersContextObj.Provider>
}

export function useOrders() {
  const ctx = useContext(OrdersContextObj)
  if (!ctx) throw new Error('useOrders must be used within OrdersProvider')
  return ctx
}

export default OrdersContextObj
