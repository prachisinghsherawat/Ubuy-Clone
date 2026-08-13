"use client";

import { createContext, useCallback, useContext, useMemo, type ReactNode } from "react";

import {
  FLAT_SHIPPING,
  FREE_SHIPPING_THRESHOLD,
  STORAGE_KEYS,
  TAX_RATE,
} from "@/lib/constants";
import {
  createPersistentStore,
  useHydrated,
  usePersistentValue,
} from "@/lib/persistentStore";
import type { CartLine, CartLineView, CartTotals, Product } from "@/types";

const MAX_QUANTITY = 10;

interface CartContextValue {
  lines: CartLineView[];
  totals: CartTotals;
  /** False until localStorage has been read, so the UI can hold off rendering counts. */
  hydrated: boolean;
  addItem: (product: Product, quantity?: number) => void;
  setQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

const cartStore = createPersistentStore<CartLine[]>(STORAGE_KEYS.cart, []);

function computeTotals(lines: CartLineView[]): CartTotals {
  const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0);
  const savings = lines.reduce(
    (sum, line) => sum + (line.product.listPrice - line.product.price) * line.quantity,
    0,
  );
  const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0);
  const shipping =
    subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING;
  const tax = Math.round(subtotal * TAX_RATE);

  return { itemCount, subtotal, savings, shipping, tax, total: subtotal + shipping + tax };
}

export function CartProvider({ children }: { children: ReactNode }) {
  const rawLines = usePersistentValue(cartStore);
  const hydrated = useHydrated();

  const addItem = useCallback((product: Product, quantity = 1) => {
    cartStore.set((current) => {
      const existing = current.find((line) => line.productId === product.id);
      if (!existing) return [...current, { productId: product.id, quantity, product }];
      return current.map((line) =>
        line.productId === product.id
          ? {
              ...line,
              quantity: Math.min(line.quantity + quantity, MAX_QUANTITY),
              // Refresh the snapshot so a price change is picked up on re-add.
              product,
            }
          : line,
      );
    });
  }, []);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    cartStore.set((current) =>
      quantity <= 0
        ? current.filter((line) => line.productId !== productId)
        : current.map((line) =>
            line.productId === productId
              ? { ...line, quantity: Math.min(quantity, MAX_QUANTITY) }
              : line,
          ),
    );
  }, []);

  const removeItem = useCallback((productId: string) => {
    cartStore.set((current) => current.filter((line) => line.productId !== productId));
  }, []);

  const clearCart = useCallback(() => cartStore.set([]), []);

  // Lines written by an older build may predate the snapshot field; drop them
  // rather than rendering holes.
  const lines = useMemo<CartLineView[]>(
    () =>
      rawLines.flatMap((line) =>
        line.product
          ? [{ ...line, lineTotal: line.product.price * line.quantity }]
          : [],
      ),
    [rawLines],
  );

  const totals = useMemo(() => computeTotals(lines), [lines]);

  const isInCart = useCallback(
    (productId: string) => rawLines.some((line) => line.productId === productId),
    [rawLines],
  );

  const value = useMemo(
    () => ({
      lines,
      totals,
      hydrated,
      addItem,
      setQuantity,
      removeItem,
      clearCart,
      isInCart,
    }),
    [lines, totals, hydrated, addItem, setQuantity, removeItem, clearCart, isInCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside <CartProvider>");
  return context;
}
