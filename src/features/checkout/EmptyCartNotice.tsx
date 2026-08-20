"use client";

import { Package } from "lucide-react";

import { EmptyState } from "@/components/ui/EmptyState";
import { ROUTES } from "@/lib/constants";

/**
 * Shown when a checkout step is reached with nothing to buy.
 *
 * Rendered in place rather than redirecting: a redirect fired from an effect
 * would flash the form first and steal the back button.
 */
export function EmptyCartNotice({
  message = "There is nothing to check out",
}: {
  message?: string;
}) {
  return (
    <EmptyState
      description={message}
      action={{ href: ROUTES.products, label: "Browse products", icon: <Package /> }}
    />
  );
}
