"use client";

import { useCurrency } from "@/features/currency/CurrencyProvider";
import { discountPercent } from "@/lib/format";

interface PriceTagProps {
  price: number;
  listPrice: number;
  /** Bumps the "now" price for the product detail page. */
  size?: "default" | "large";
}

export function PriceTag({ price, listPrice, size = "default" }: PriceTagProps) {
  // Amounts are stored in the base currency; the provider converts to whatever
  // destination the shopper picked in the header.
  const { format } = useCurrency();
  const off = discountPercent(price, listPrice);

  return (
    <div className="price-row">
      <span className="price-now" style={size === "large" ? { fontSize: 30 } : undefined}>
        {format(price)}
      </span>
      {off > 0 ? (
        <>
          <span className="price-was">{format(listPrice)}</span>
          <span className="price-off">{off}% off</span>
        </>
      ) : null}
    </div>
  );
}
