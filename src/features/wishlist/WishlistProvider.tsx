"use client";

import { createContext, useCallback, useContext, useMemo, type ReactNode } from "react";

import { STORAGE_KEYS } from "@/lib/constants";
import {
  createPersistentStore,
  useHydrated,
  usePersistentValue,
} from "@/lib/persistentStore";
import type { Product } from "@/types";

interface WishlistContextValue {
  ids: string[];
  products: Product[];
  hydrated: boolean;
  /** Returns true when the product ended up saved, false when it was removed. */
  toggle: (product: Product) => boolean;
  remove: (productId: string) => void;
  has: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

// Saved products are snapshotted for the same reason cart lines are: the
// catalogue is remote, so an id alone cannot be resolved during render.
const wishlistStore = createPersistentStore<Product[]>(STORAGE_KEYS.wishlist, []);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const products = usePersistentValue(wishlistStore);
  const hydrated = useHydrated();

  const toggle = useCallback((product: Product) => {
    const saved = !wishlistStore
      .getSnapshot()
      .some((entry) => entry.id === product.id);

    wishlistStore.set((current) =>
      saved
        ? [...current, product]
        : current.filter((entry) => entry.id !== product.id),
    );
    return saved;
  }, []);

  const remove = useCallback((productId: string) => {
    wishlistStore.set((current) => current.filter((entry) => entry.id !== productId));
  }, []);

  const ids = useMemo(() => products.map((product) => product.id), [products]);

  const has = useCallback(
    (productId: string) => products.some((product) => product.id === productId),
    [products],
  );

  const value = useMemo(
    () => ({ ids, products, hydrated, toggle, remove, has }),
    [ids, products, hydrated, toggle, remove, has],
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
