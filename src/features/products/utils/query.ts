import { PRICE_BUCKETS, type PriceBucketId, type SortOption } from "@/lib/constants";
import { discountPercent } from "@/lib/format";
import type { CategorySlug, Product } from "@/types";

export interface ProductQuery {
  search: string;
  categories: CategorySlug[];
  brands: string[];
  buckets: PriceBucketId[];
  minRating: number;
  inStockOnly: boolean;
  sort: SortOption;
}

export const EMPTY_QUERY: ProductQuery = {
  search: "",
  categories: [],
  brands: [],
  buckets: [],
  minRating: 0,
  inStockOnly: false,
  sort: "featured",
};

const BUCKET_BY_ID = new Map(PRICE_BUCKETS.map((b) => [b.id, b]));

function matchesBuckets(price: number, bucketIds: PriceBucketId[]): boolean {
  if (bucketIds.length === 0) return true;
  return bucketIds.some((id) => {
    const bucket = BUCKET_BY_ID.get(id);
    return bucket ? price >= bucket.min && price < bucket.max : true;
  });
}

function matchesSearch(product: Product, search: string): boolean {
  const term = search.trim().toLowerCase();
  if (!term) return true;
  return (
    product.name.toLowerCase().includes(term) ||
    product.brand.toLowerCase().includes(term) ||
    product.category.includes(term)
  );
}

const SORTERS: Record<SortOption, (a: Product, b: Product) => number> = {
  featured: (a, b) => Number(Boolean(b.badge)) - Number(Boolean(a.badge)),
  "price-asc": (a, b) => a.price - b.price,
  "price-desc": (a, b) => b.price - a.price,
  discount: (a, b) =>
    discountPercent(b.price, b.listPrice) - discountPercent(a.price, a.listPrice),
  rating: (a, b) => b.rating - a.rating,
};

/** Filter then sort. Returns a new array; the source catalogue is never mutated. */
export function queryProducts(products: Product[], query: ProductQuery): Product[] {
  const filtered = products.filter(
    (product) =>
      matchesSearch(product, query.search) &&
      (query.categories.length === 0 || query.categories.includes(product.category)) &&
      (query.brands.length === 0 || query.brands.includes(product.brand)) &&
      matchesBuckets(product.price, query.buckets) &&
      product.rating >= query.minRating &&
      (!query.inStockOnly || product.inStock),
  );

  return filtered.sort(SORTERS[query.sort]);
}

/** How many filter groups are currently narrowing the results. */
export function activeFilterCount(query: ProductQuery): number {
  return (
    query.categories.length +
    query.brands.length +
    query.buckets.length +
    (query.minRating > 0 ? 1 : 0) +
    (query.inStockOnly ? 1 : 0)
  );
}
