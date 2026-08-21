"use client";

import { STORAGE_KEYS } from "@/lib/constants";
import { createPersistentStore } from "@/lib/persistentStore";
import type { ShippingAddress } from "@/types";

/**
 * Checkout state that has to survive a page change.
 *
 * There is no server in this build, so the address entered at step one is
 * handed to the next route through localStorage, and deliberately kept after
 * checkout so a returning shopper does not retype it. The placed order itself
 * lives in the order history (`@/features/orders/orderStore`), which the
 * confirmation screen reads the head of.
 */
export const addressStore = createPersistentStore<ShippingAddress | null>(
  STORAGE_KEYS.address,
  null,
);
