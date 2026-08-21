"use client";

import { App } from "antd";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { useCart } from "@/features/cart/CartProvider";
import { ROUTES } from "@/lib/constants";
import type { PlacedOrder } from "@/types";

/**
 * "Buy again": puts every line of a past order back in the cart.
 *
 * Out-of-stock lines are skipped rather than silently added, and the shopper is
 * told how many made it, because a reorder that quietly drops half an order is
 * worse than one that never ran.
 */
export function useReorder(): (order: PlacedOrder) => void {
  const { addItem } = useCart();
  const { message } = App.useApp();
  const router = useRouter();

  return useCallback(
    (order: PlacedOrder) => {
      const available = order.lines.filter((line) => line.product.inStock);

      if (available.length === 0) {
        message.warning("Nothing from this order is in stock right now");
        return;
      }

      for (const line of available) addItem(line.product, line.quantity);

      const skipped = order.lines.length - available.length;
      message.success(
        skipped > 0
          ? `${available.length} of ${order.lines.length} items added — the rest are out of stock`
          : `${available.length} ${available.length === 1 ? "item" : "items"} added to your cart`,
      );
      router.push(ROUTES.cart);
    },
    [addItem, message, router],
  );
}
