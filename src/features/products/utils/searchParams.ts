/**
 * The listing page keeps its entire filter state in the query string.
 *
 * That makes every filter shareable, bookmarkable and back-button friendly, and
 * lets links elsewhere in the app (the category bar, the header search, the
 * "view all" headings) deep-link straight into a filtered view without any
 * shared client state.
 */

import {
  PRICE_BUCKETS,
  SORT_OPTIONS,
  type PriceBucketId,
  type SortOption,
} from "@/lib/constants";
import { EMPTY_QUERY, type ProductQuery } from "@/features/products/utils/query";

export const PAGE_SIZE = 24;

/** Everything the listing needs from the URL: the filters plus view state. */
export interface ListingState extends ProductQuery {
  page: number;
  /** `?saved=1` swaps the catalogue for the shopper's wishlist. */
  savedOnly: boolean;
}

const BUCKET_IDS = new Set<string>(PRICE_BUCKETS.map((bucket) => bucket.id));
const SORT_VALUES = new Set<string>(SORT_OPTIONS.map((option) => option.value));

/** Splits a comma-separated param, dropping empties. */
function readList(params: URLSearchParams, key: string): string[] {
  const raw = params.get(key);
  if (!raw) return [];
  return raw.split(",").filter(Boolean);
}

export function parseListingState(params: URLSearchParams): ListingState {
  const page = Number.parseInt(params.get("page") ?? "1", 10);
  const rating = Number.parseFloat(params.get("rating") ?? "0");
  const sort = params.get("sort") ?? "";

  return {
    ...EMPTY_QUERY,
    search: params.get("q") ?? "",
    categories: readList(params, "category"),
    brands: readList(params, "brand"),
    // Unknown bucket ids are dropped rather than passed through, so a
    // hand-edited URL cannot filter everything out with no way to tell why.
    buckets: readList(params, "price").filter((id): id is PriceBucketId =>
      BUCKET_IDS.has(id),
    ),
    minRating: Number.isFinite(rating) ? Math.min(Math.max(rating, 0), 5) : 0,
    inStockOnly: params.get("stock") === "1",
    sort: (SORT_VALUES.has(sort) ? sort : "featured") as SortOption,
    page: Number.isFinite(page) && page > 0 ? page : 1,
    savedOnly: params.get("saved") === "1",
  };
}

/**
 * Serialises state back to a query string, omitting defaults so the URL stays
 * short — `/products` rather than `/products?q=&sort=featured&page=1`.
 */
export function toSearchString(state: ListingState): string {
  const params = new URLSearchParams();

  if (state.search.trim()) params.set("q", state.search.trim());
  if (state.categories.length) params.set("category", state.categories.join(","));
  if (state.brands.length) params.set("brand", state.brands.join(","));
  if (state.buckets.length) params.set("price", state.buckets.join(","));
  if (state.minRating > 0) params.set("rating", String(state.minRating));
  if (state.inStockOnly) params.set("stock", "1");
  if (state.sort !== "featured") params.set("sort", state.sort);
  if (state.savedOnly) params.set("saved", "1");
  if (state.page > 1) params.set("page", String(state.page));

  return params.toString();
}
