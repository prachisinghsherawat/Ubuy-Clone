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
import { STORAGE_KEYS } from "@/lib/constants";
import { readStorage, writeStorage } from "@/lib/storage";
import type { Product } from "@/types";

interface WishlistContextValue {
  ids: string[];
  products: Product[];
  hydrated: boolean;
  /** Returns true when the product ended up saved, false when it was removed. */
  toggle: (productId: string) => boolean;
  has: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setIds(readStorage<string[]>(STORAGE_KEYS.wishlist, []));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) writeStorage(STORAGE_KEYS.wishlist, ids);
  }, [ids, hydrated]);

  const toggle = useCallback((productId: string) => {
    let saved = false;
    setIds((current) => {
      saved = !current.includes(productId);
      return saved
        ? [...current, productId]
        : current.filter((id) => id !== productId);
    });
    return saved;
  }, []);

  const has = useCallback((productId: string) => ids.includes(productId), [ids]);

  const products = useMemo(
    () => ids.flatMap((id) => getProductById(id) ?? []),
    [ids],
  );

  const value = useMemo(
    () => ({ ids, products, hydrated, toggle, has }),
    [ids, products, hydrated, toggle, has],
  );

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  );
}

export function useWishlist(): WishlistContextValue {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used inside <WishlistProvider>");
  return context;
}
