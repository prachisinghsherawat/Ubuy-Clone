"use client";

import { STORAGE_KEYS } from "@/lib/constants";
import { createPersistentStore, usePersistentValue } from "@/lib/persistentStore";
import { readStorage, removeStorage, writeStorage } from "@/lib/storage";
import type { PlacedOrder } from "@/types";

/**
 * Order history.
 *
 * Checkout used to keep only the most recent order under `ubuy.lastOrder`,
 * which meant placing a second order silently destroyed the first and the
 * account menu had nothing to link to but the confirmation screen. Orders are
 * now a list, newest first, and the confirmation screen simply reads its head.
 */
const ordersStore = createPersistentStore<PlacedOrder[]>(STORAGE_KEYS.orders, []);

/**
 * Only this many orders are kept.
 *
 * Every line carries a full product snapshot — image URLs, description, review
 * list — so an unbounded history is the one thing here big enough to hit the
 * ~5MB localStorage quota. Trimming keeps writes from silently failing.
 */
export const MAX_STORED_ORDERS = 20;

/**
 * Lifts a pre-history order into the list, once.
 *
 * Runs at module scope rather than in an effect so it lands before the store's
 * first snapshot is cached; `readStorage`/`writeStorage` no-op on the server,
 * so the SSR pass of this module does nothing.
 */
function migrateLegacyOrder(): void {
  if (typeof window === "undefined") return;

  const legacy = readStorage<PlacedOrder | null>(STORAGE_KEYS.lastOrder, null);
  if (!legacy?.id) {
    removeStorage(STORAGE_KEYS.lastOrder);
    return;
  }

  const existing = readStorage<PlacedOrder[]>(STORAGE_KEYS.orders, []);
  if (!existing.some((order) => order.id === legacy.id)) {
    writeStorage(STORAGE_KEYS.orders, [legacy, ...existing].slice(0, MAX_STORED_ORDERS));
  }
  removeStorage(STORAGE_KEYS.lastOrder);
}

migrateLegacyOrder();

/** Adds a freshly placed order to the top of the history. */
export function recordOrder(order: PlacedOrder): void {
  ordersStore.set((current) => [order, ...current].slice(0, MAX_STORED_ORDERS));
}

/** Every order this browser has placed, newest first. */
export function useOrders(): PlacedOrder[] {
  return usePersistentValue(ordersStore);
}

/** The most recent order, or null before anything has been placed. */
export function useLatestOrder(): PlacedOrder | null {
  return useOrders()[0] ?? null;
}

export function useOrder(id: string): PlacedOrder | null {
  return useOrders().find((order) => order.id === id) ?? null;
}
