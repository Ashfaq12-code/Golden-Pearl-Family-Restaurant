import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product } from '../lib/supabase';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, size: 'small' | 'large', quantity: number) => void;
  removeFromCart: (productId: string, size: 'small' | 'large') => void;
  updateQuantity: (productId: string, size: 'small' | 'large', quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, size: 'small' | 'large', quantity: number) => {
    const price = size === 'small' ? product.price_small : product.price_large;
    if (!price) return;

    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(
        item => item.product.id === product.id && item.size === size
      );

      if (existingIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingIndex].quantity += quantity;
        return newCart;
      }

      return [...prevCart, { product, size, quantity, price }];
    });
  };

  const removeFromCart = (productId: string, size: 'small' | 'large') => {
    setCart(prevCart => prevCart.filter(
      item => !(item.product.id === productId && item.size === size)
    ));
  };

  const updateQuantity = (productId: string, size: 'small' | 'large', quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }

    setCart(prevCart => {
      const newCart = [...prevCart];
      const index = newCart.findIndex(
        item => item.product.id === productId && item.size === size
      );
      if (index > -1) {
        newCart[index].quantity = quantity;
      }
      return newCart;
    });
  };

  const clearCart = () => setCart([]);

  const getTotalItems = () => cart.reduce((sum, item) => sum + item.quantity, 0);

  const getTotalPrice = () => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalItems,
      getTotalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
