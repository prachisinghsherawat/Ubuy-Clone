/** Display formatters. Rupee amounts are whole-number by convention here. */

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

/** "Wednesday, 22 December" style delivery estimate, N days out. */
export function estimatedDelivery(daysFromNow = 5): string {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export function maskCardNumber(cardNumber: string): string {
  const digits = cardNumber.replace(/\D/g, "");
  return digits.slice(-4).padStart(4, "•");
}
