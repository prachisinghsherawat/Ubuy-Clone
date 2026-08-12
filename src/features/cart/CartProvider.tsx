"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { getProductById } from "@/features/products/data/products";
import {
  FLAT_SHIPPING,
  FREE_SHIPPING_THRESHOLD,
  STORAGE_KEYS,
  TAX_RATE,
} from "@/lib/constants";
import { readStorage, writeStorage } from "@/lib/storage";
import type { CartLine, CartLineView, CartTotals } from "@/types";

const MAX_QUANTITY = 10;

interface CartContextValue {
  lines: CartLineView[];
  totals: CartTotals;
  /** False until localStorage has been read, so the UI can hold off rendering counts. */
  hydrated: boolean;
  addItem: (productId: string, quantity?: number) => void;
  setQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

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
  const [rawLines, setRawLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Read once on mount rather than during useState init: the server render must
  // match the first client render, and the server has no localStorage.
  useEffect(() => {
    setRawLines(readStorage<CartLine[]>(STORAGE_KEYS.cart, []));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) writeStorage(STORAGE_KEYS.cart, rawLines);
  }, [rawLines, hydrated]);

  const addItem = useCallback((productId: string, quantity = 1) => {
    setRawLines((current) => {
      const existing = current.find((line) => line.productId === productId);
      if (!existing) return [...current, { productId, quantity }];
      return current.map((line) =>
        line.productId === productId
          ? { ...line, quantity: Math.min(line.quantity + quantity, MAX_QUANTITY) }
          : line,
      );
    });
  }, []);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    setRawLines((current) =>
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
    setRawLines((current) => current.filter((line) => line.productId !== productId));
  }, []);

  const clearCart = useCallback(() => setRawLines([]), []);

  // Lines whose product has vanished from the catalogue are dropped rather than
  // rendered as holes — stale ids can survive in storage across deploys.
  const lines = useMemo<CartLineView[]>(
    () =>
      rawLines.flatMap((line) => {
        const product = getProductById(line.productId);
        if (!product) return [];
        return [{ ...line, product, lineTotal: product.price * line.quantity }];
      }),
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
