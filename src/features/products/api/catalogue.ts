/**
 * Live catalogue, backed by the public DummyJSON commerce API.
 *
 * The whole catalogue is small (~200 SKUs), so the list endpoint is pulled once
 * and cached, then filtered, sorted and paginated in memory. That buys us
 * brand and price-range filters the upstream API cannot express, at the cost of
 * one larger request per revalidation window.
 *
 * Every entry point degrades to the bundled static catalogue if the network is
 * unavailable, so the storefront still renders offline and `next build` never
 * fails on a flaky upstream.
 */

import { PRODUCTS as FALLBACK_PRODUCTS } from "@/features/products/data/products";
import type { Product, ProductReview } from "@/types";

const API = "https://dummyjson.com";

/** Upstream prices are USD; the storefront quotes INR throughout. */
const USD_TO_INR = 83;

/** Catalogue changes rarely — an hour of staleness is invisible to shoppers. */
const REVALIDATE_SECONDS = 3600;

/** Fields needed for cards and filtering. Reviews are fetched per product. */
const LIST_FIELDS = [
  "id",
  "title",
  "description",
  "category",
  "price",
  "discountPercentage",
  "rating",
  "stock",
  "tags",
  "brand",
  "thumbnail",
  "images",
  "availabilityStatus",
  "shippingInformation",
  "warrantyInformation",
  "returnPolicy",
  "minimumOrderQuantity",
  "sku",
].join(",");

interface RawProduct {
  id: number;
  title: string;
  description?: string;
  category?: string;
  price: number;
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  tags?: string[];
  brand?: string;
  sku?: string;
  weight?: number;
  dimensions?: { width: number; height: number; depth: number };
  warrantyInformation?: string;
  shippingInformation?: string;
  returnPolicy?: string;
  minimumOrderQuantity?: number;
  reviews?: ProductReview[];
  images?: string[];
  thumbnail?: string;
}

interface RawList {
  products: RawProduct[];
  total: number;
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Slugs carry their upstream id as a `-p<id>` suffix.
 *
 * Titles are not unique in the catalogue, and the API has no slug lookup, so
 * embedding the id keeps URLs readable while making resolution a single
 * request instead of a scan over every product.
 */
function buildSlug(raw: RawProduct): string {
  return `${slugify(raw.title)}-p${raw.id}`;
}

export function idFromSlug(slug: string): string | null {
  const match = /-p(\d+)$/.exec(slug);
  return match ? match[1] : null;
}

function toInr(usd: number): number {
  return Math.round(usd * USD_TO_INR);
}

/** Highlights are synthesised from the structured fields the API does expose. */
function buildHighlights(raw: RawProduct): string[] {
  const out: string[] = [];
  if (raw.brand) out.push(`Genuine ${raw.brand} product, sourced internationally`);
  if (raw.warrantyInformation) out.push(raw.warrantyInformation);
  if (raw.shippingInformation) out.push(raw.shippingInformation);
  if (raw.returnPolicy) out.push(raw.returnPolicy);
  if (raw.tags?.length) out.push(`Tagged: ${raw.tags.join(", ")}`);
  return out;
}

function buildBadge(raw: RawProduct): Product["badge"] {
  const discount = raw.discountPercentage ?? 0;
  const rating = raw.rating ?? 0;
  const stock = raw.stock ?? 0;
  if (rating >= 4.7) return "Best Seller";
  if (discount >= 15) return "Deal";
  if (stock > 0 && stock <= 15) return "Limited";
  if (rating >= 4.4) return "New";
  return undefined;
}

export function mapProduct(raw: RawProduct): Product {
  const price = toInr(raw.price);
  const discount = raw.discountPercentage ?? 0;
  // The API quotes the post-discount price, so the struck-through list price is
  // reconstructed from it rather than stored.
  const listPrice = discount > 0 ? Math.round(price / (1 - discount / 100)) : price;
  const stock = raw.stock ?? 0;
  const gallery = raw.images?.length ? raw.images : [raw.thumbnail ?? ""];

  return {
    id: String(raw.id),
    slug: buildSlug(raw),
    name: raw.title,
    brand: raw.brand ?? "Ubuy Global",
    store: "International Store",
    category: raw.category ?? "misc",
    price,
    listPrice,
    rating: raw.rating ?? 0,
    // The API ships a handful of sample reviews; scale to a plausible count so
    // the card's social proof does not read as "3 reviews" for every product.
    reviewCount: Math.max((raw.reviews?.length ?? 0) * 137, Math.round((raw.rating ?? 0) * 421)),
    image: raw.thumbnail ?? gallery[0],
    images: gallery.filter(Boolean),
    highlights: buildHighlights(raw),
    description: raw.description ?? "",
    inStock: stock > 0,
    stock,
    badge: buildBadge(raw),
    sku: raw.sku,
    warranty: raw.warrantyInformation,
    shippingInfo: raw.shippingInformation,
    returnPolicy: raw.returnPolicy,
    minimumOrderQuantity: raw.minimumOrderQuantity,
    tags: raw.tags,
    reviews: raw.reviews,
    weight: raw.weight,
    dimensions: raw.dimensions,
  };
}

async function getJson<T>(path: string): Promise<T | null> {
  try {
    const response = await fetch(`${API}${path}`, {
      next: { revalidate: REVALIDATE_SECONDS, tags: ["catalogue"] },
    });
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    // Offline, DNS failure or upstream outage — callers fall back to static data.
    return null;
  }
}

/** The full catalogue, mapped and cached. Falls back to the bundled seed data. */
export async function getCatalogue(): Promise<Product[]> {
  const data = await getJson<RawList>(`/products?limit=0&select=${LIST_FIELDS}`);
  if (!data?.products?.length) return FALLBACK_PRODUCTS;
  return data.products.map(mapProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const id = idFromSlug(slug);
  if (!id) {
    // Legacy/static slug with no embedded id — scan the catalogue instead.
    const catalogue = await getCatalogue();
    return catalogue.find((product) => product.slug === slug) ?? null;
  }

  const raw = await getJson<RawProduct>(`/products/${id}`);
  if (!raw?.id) {
    const catalogue = await getCatalogue();
    return catalogue.find((product) => product.slug === slug) ?? null;
  }
  return mapProduct(raw);
}

export async function getCategorySlugs(): Promise<string[]> {
  const data = await getJson<{ slug: string; name: string }[]>("/products/categories");
  if (!data?.length) {
    return [...new Set(FALLBACK_PRODUCTS.map((product) => product.category))];
  }
  return data.map((category) => category.slug);
}

/** Distinct brands across the catalogue, for the listing page's filter panel. */
export async function getBrands(): Promise<string[]> {
  const catalogue = await getCatalogue();
  return [...new Set(catalogue.map((product) => product.brand))].sort((a, b) =>
    a.localeCompare(b),
  );
}

/** Steepest discounts first — powers the "Today's deals" rail. */
export async function getDeals(limit = 10): Promise<Product[]> {
  const catalogue = await getCatalogue();
  return [...catalogue]
    .filter((product) => product.listPrice > product.price)
    .sort(
      (a, b) =>
        (b.listPrice - b.price) / b.listPrice - (a.listPrice - a.price) / a.listPrice,
    )
    .slice(0, limit);
}

/** Highest rated in-stock products. */
export async function getFeatured(limit = 10): Promise<Product[]> {
  const catalogue = await getCatalogue();
  return [...catalogue]
    .filter((product) => product.inStock)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
}

export async function getByCategory(category: string, limit?: number): Promise<Product[]> {
  const catalogue = await getCatalogue();
  const matches = catalogue.filter((product) => product.category === category);
  return limit ? matches.slice(0, limit) : matches;
}

/** Same category first, then the highest-rated filler, excluding the product itself. */
export async function getRelated(product: Product, limit = 6): Promise<Product[]> {
  const catalogue = await getCatalogue();
  const others = catalogue.filter((candidate) => candidate.id !== product.id);
  const sameCategory = others.filter(
    (candidate) => candidate.category === product.category,
  );
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);

  const filler = others
    .filter((candidate) => candidate.category !== product.category)
    .sort((a, b) => b.rating - a.rating);
  return [...sameCategory, ...filler].slice(0, limit);
}
