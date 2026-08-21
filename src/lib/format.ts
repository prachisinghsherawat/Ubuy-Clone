/** Display formatters. Rupee amounts are whole-number by convention here. */

import { DELIVERY_DAYS } from "@/lib/constants";

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const compact = new Intl.NumberFormat("en-IN", { notation: "compact" });

export function formatPrice(value: number): string {
  return inr.format(Math.round(value));
}

export function formatCount(value: number): string {
  return compact.format(value);
}

/** Percentage saved versus the list price, rounded to a whole number. */
export function discountPercent(price: number, listPrice: number): number {
  if (listPrice <= price) return 0;
  return Math.round(((listPrice - price) / listPrice) * 100);
}

/** "Wednesday, 22 December" — the long form used for delivery dates. */
export function formatDeliveryDate(date: Date): string {
  return date.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

/** Delivery estimate for something ordered now. */
export function estimatedDelivery(daysFromNow = DELIVERY_DAYS): string {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return formatDeliveryDate(date);
}

/** Delivery estimate for an order placed at `isoDate`. */
export function deliveryDateFor(isoDate: string, days = DELIVERY_DAYS): Date {
  const date = new Date(isoDate);
  date.setDate(date.getDate() + days);
  return date;
}

export function maskCardNumber(cardNumber: string): string {
  const digits = cardNumber.replace(/\D/g, "");
  return digits.slice(-4).padStart(4, "•");
}
