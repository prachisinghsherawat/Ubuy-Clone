import { ProductCard } from "@/features/products/components/ProductCard";
import type { Product } from "@/types";

/** Horizontally scrollable row — used for the home page merchandising strips. */
export function ProductRail({ products }: { products: Product[] }) {
  return (
    <div className="rail">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
