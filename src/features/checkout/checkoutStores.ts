"use client";

import { STORAGE_KEYS } from "@/lib/constants";
import { createPersistentStore } from "@/lib/persistentStore";
import type { PlacedOrder, ShippingAddress } from "@/types";

/**
 * Checkout state that has to survive a page change.
 *
 * There is no server in this build, so the address entered at step one and the
 * order confirmed at step two are handed to the next route through
 * localStorage. The address is deliberately kept after checkout so a returning
 * shopper does not retype it.
 */
export const addressStore = createPersistentStore<ShippingAddress | null>(
  STORAGE_KEYS.address,
  null,
);

export const lastOrderStore = createPersistentStore<PlacedOrder | null>(
  STORAGE_KEYS.lastOrder,
  null,
);
