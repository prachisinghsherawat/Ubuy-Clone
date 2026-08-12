import { discountPercent, formatPrice } from "@/lib/format";

interface PriceTagProps {
  price: number;
  listPrice: number;
  /** Bumps the "now" price for the product detail page. */
  size?: "default" | "large";
}

export function PriceTag({ price, listPrice, size = "default" }: PriceTagProps) {
  const off = discountPercent(price, listPrice);

  return (
    <div className="price-row">
      <span className="price-now" style={size === "large" ? { fontSize: 30 } : undefined}>
        {formatPrice(price)}
      </span>
      {off > 0 ? (
        <>
          <span className="price-was">{formatPrice(listPrice)}</span>
          <span className="price-off">{off}% off</span>
        </>
      ) : null}
    </div>
  );
}
