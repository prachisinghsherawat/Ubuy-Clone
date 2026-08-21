import { DELIVERY_DAYS } from "@/lib/constants";
import { deliveryDateFor } from "@/lib/format";
import type { PlacedOrder } from "@/types";

export type OrderStatus = "processing" | "shipped" | "delivered";

interface OrderStatusView {
  key: OrderStatus;
  label: string;
  /** antd Tag colour. */
  color: string;
  /** Index into the three-stop progress used on the order detail page. */
  step: number;
}

const STATUSES: Record<OrderStatus, OrderStatusView> = {
  processing: { key: "processing", label: "Processing", color: "gold", step: 0 },
  shipped: { key: "shipped", label: "Shipped", color: "blue", step: 1 },
  delivered: { key: "delivered", label: "Delivered", color: "success", step: 2 },
};

export const ORDER_STATUSES = Object.values(STATUSES);

/**
 * Where an order is in its life.
 *
 * There is no backend to ask, so the stage is derived from how long ago the
 * order was placed — the same schedule the delivery estimate quotes, so the
 * two can never contradict each other on screen.
 */
export function orderStatus(order: PlacedOrder, now: Date = new Date()): OrderStatusView {
  const elapsedDays = (now.getTime() - new Date(order.placedAt).getTime()) / 86_400_000;
  if (elapsedDays >= DELIVERY_DAYS) return STATUSES.delivered;
  if (elapsedDays >= 1) return STATUSES.shipped;
  return STATUSES.processing;
}

/** The date this order is expected to land — or did. */
export function orderDeliveryDate(order: PlacedOrder): Date {
  return deliveryDateFor(order.placedAt);
}

/** Orders from an earlier build carry no method, but always carry card digits. */
export function paymentLabel(order: PlacedOrder): string {
  switch (order.paymentMethod ?? "card") {
    case "upi":
      return "UPI";
    case "cod":
      return "Cash on delivery";
    default:
      return `Card ending ${order.cardLast4}`;
  }
}

/** "12 August 2026, 4:05 pm" — how an order's timestamp is shown everywhere. */
export function formatPlacedAt(isoDate: string): string {
  return new Date(isoDate).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}
