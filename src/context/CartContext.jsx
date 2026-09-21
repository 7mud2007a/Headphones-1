import React, { createContext, useContext, useEffect, useMemo, useReducer, useState, useCallback } from 'react';

const CartContext = createContext(null);
const STORAGE_KEY = 'aura-cart-v1';

function loadInitialState() {
  if (typeof window === 'undefined') return { items: [] };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { items: [] };
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed?.items)) return { items: [] };
    return parsed;
  } catch (err) {
    console.warn('Could not read cart from storage', err);
    return { items: [] };
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { item, qty } = action.payload;
      const existing = state.items.find((i) => i.key === item.key);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.key === item.key ? { ...i, qty: Math.min(i.qty + qty, 99) } : i
          ),
        };
      }
      return { ...state, items: [...state.items, { ...item, qty }] };
    }
    case 'REMOVE_ITEM': {
      return { ...state, items: state.items.filter((i) => i.key !== action.payload.key) };
    }
    case 'UPDATE_QTY': {
      const { key, qty } = action.payload;
      if (qty <= 0) {
        return { ...state, items: state.items.filter((i) => i.key !== key) };
      }
      return {
        ...state,
        items: state.items.map((i) => (i.key === key ? { ...i, qty: Math.min(qty, 99) } : i)),
      };
    }
    case 'CLEAR_CART':
      return { ...state, items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadInitialState);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (err) {
      console.warn('Could not persist cart to storage', err);
    }
  }, [state]);

  const addItem = useCallback((item, qty = 1, options = {}) => {
    const { openCart = true } = options;
    dispatch({ type: 'ADD_ITEM', payload: { item, qty } });
    if (openCart) setDrawerOpen(true);
  }, []);

  const removeItem = useCallback((key) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { key } });
  }, []);

  const updateQty = useCallback((key, qty) => {
    dispatch({ type: 'UPDATE_QTY', payload: { key, qty } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);
  const toggleDrawer = useCallback(() => setDrawerOpen((v) => !v), []);

  const { subtotal, totalCount } = useMemo(() => {
    return state.items.reduce(
      (acc, i) => {
        acc.subtotal += i.price * i.qty;
        acc.totalCount += i.qty;
        return acc;
      },
      { subtotal: 0, totalCount: 0 }
    );
  }, [state.items]);

  const value = useMemo(
    () => ({
      items: state.items,
      addItem,
      removeItem,
      updateQty,
      clearCart,
      subtotal,
      totalCount,
      isDrawerOpen,
      openDrawer,
      closeDrawer,
      toggleDrawer,
    }),
    [state.items, addItem, removeItem, updateQty, clearCart, subtotal, totalCount, isDrawerOpen, openDrawer, closeDrawer, toggleDrawer]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
