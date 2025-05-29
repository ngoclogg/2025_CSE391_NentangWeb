import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState({});

  const addToCart = (id, product) => {
    setCart((prev) => {
      const item = prev[id] || { ...product, qty: 0 };
      return { ...prev, [id]: { ...item, qty: item.qty + 1 } };
    });
  };

  const updateQty = (id, change) => {
    setCart((prev) => {
      const item = prev[id];
      if (!item) return prev;
      const newQty = item.qty + change;
      if (newQty <= 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: { ...item, qty: newQty } };
    });
  };

  const clearCart = () => setCart({});

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQty, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);