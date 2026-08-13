"use client";

import { useSyncExternalStore } from "react";

import { readStorage, writeStorage } from "@/lib/storage";

/**
 * A localStorage-backed external store for `useSyncExternalStore`.
 *
 * Reading storage inside an effect and calling `setState` works, but it
 * cascades an extra render on every mount and trips React's
 * `set-state-in-effect` rule. Modelling storage as what it actually is — an
 * external store — lets React read it during render instead, and gives
 * cross-tab sync for free.
 */
export interface PersistentStore<T> {
  subscribe: (listener: () => void) => () => void;
  getSnapshot: () => T;
  getServerSnapshot: () => T;
  set: (updater: T | ((current: T) => T)) => void;
}

export function createPersistentStore<T>(key: string, fallback: T): PersistentStore<T> {
  // Cached so repeated getSnapshot calls return a stable reference; returning a
  // fresh object each time would loop React forever.
  let cache: T | undefined;
  const listeners = new Set<() => void>();

  function getSnapshot(): T {
    if (cache === undefined) cache = readStorage<T>(key, fallback);
    return cache;
  }

  function emit(): void {
    for (const listener of listeners) listener();
  }

  function onStorage(event: StorageEvent): void {
    if (event.key !== key) return;
    // Another tab wrote this key — drop the cache so the next read re-parses.
    cache = undefined;
    emit();
  }

  return {
    subscribe(listener) {
      if (listeners.size === 0 && typeof window !== "undefined") {
        window.addEventListener("storage", onStorage);
      }
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
        if (listeners.size === 0 && typeof window !== "undefined") {
          window.removeEventListener("storage", onStorage);
        }
      };
    },
    getSnapshot,
    // The server has no storage, so SSR and the hydrating render both see the
    // fallback. React swaps in the real value immediately after hydration.
    getServerSnapshot: () => fallback,
    set(updater) {
      const next =
        typeof updater === "function"
          ? (updater as (current: T) => T)(getSnapshot())
          : updater;
      cache = next;
      writeStorage(key, next);
      emit();
    },
  };
}

export function usePersistentValue<T>(store: PersistentStore<T>): T {
  return useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot,
  );
}

const subscribeToNothing = () => () => {};

/**
 * False during SSR and the hydrating render, true afterwards.
 *
 * Lets storage-dependent UI (cart counts, saved badges) hold off until the
 * client render, without an effect-driven `setState`.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );
}
