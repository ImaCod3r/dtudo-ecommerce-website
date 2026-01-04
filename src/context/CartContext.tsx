import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import type { CartItem, Product } from '../types';
import { add, getCart, remove, update, clear } from '../services/cart';
import { AuthContext } from '../auth/AuthContext';

interface CartContextType {
  cart: CartItem[];
  cartId: string | null;
  addToCart: (product: Product, quantity?: number) => Promise<void>;
  removeFromCart: (itemId: number) => Promise<void>;
  updateQuantity: (itemId: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartId, setCartId] = useState<string | null>(null);

  const totalItems = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);
  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0), [cart]);

  const refreshCart = async () => {
    if (!user) {
      setCart([]);
      setCartId(null);
      return;
    }
    try {
      const response = await getCart();
      if (response?.cart) {
        setCart(response.cart.items);
        setCartId(response.cart.public_id);
      }
    } catch (error) {
      console.error("Failed to refresh cart:", error);
    }
  };

  useEffect(() => {
    refreshCart();
  }, [user]);

  const addToCart = async (product: Product, quantity: number = 1) => {
    if (!user) {
      console.error("User must be logged in to add to cart");
      return;
    }

    try {
      await add(product.id, quantity);
      await refreshCart();
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  const removeFromCart = async (itemId: number) => {
    if (!user) {
      console.error("User must be logged in to remove from cart");
      return;
    }
    try {
      await remove(itemId.toString());
      await refreshCart();
    } catch (error) {
      console.error("Failed to remove from cart:", error);
    }
  };

  const updateQuantity = async (itemId: number, quantity: number) => {
    if (!user) {
      console.error("User must be logged in to update quantity");
      return;
    }
    try {
      await update(user.public_id, itemId.toString(), quantity);
      await refreshCart();
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  const clearCart = async () => {
    try {
      await clear();
      await refreshCart();
    } catch (error) {
      console.error("Failed to clear cart:", error);
    }
  }

  return (
    <CartContext.Provider value={{ cart, cartId, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, subtotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};