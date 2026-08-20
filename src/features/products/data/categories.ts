import type { Category } from "@/types";

/**
 * Presentation metadata for the live catalogue's taxonomy.
 *
 * The API returns category slugs but no icon or marketing copy, so that lives
 * here keyed by slug. Unknown slugs still render — `categoryMeta` derives a
 * readable label and falls back to a generic icon — so a new upstream category
 * never breaks the nav.
 */
const META: Record<string, { label: string; blurb: string }> = {
  beauty: { label: "Beauty", blurb: "Makeup, lashes and everyday glow" },
  fragrances: {
    label: "Fragrances",
    blurb: "Designer perfumes and eau de toilette",
  },
  furniture: { label: "Furniture", blurb: "Sofas, beds and statement pieces" },
  groceries: {
    label: "Groceries",
    blurb: "Pantry staples and fresh essentials",
  },
  "home-decoration": {
    label: "Home Decoration",
    blurb: "Art, mirrors and finishing touches",
  },
  "kitchen-accessories": {
    label: "Kitchen",
    blurb: "Cookware, gadgets and prep tools",
  },
  laptops: { label: "Laptops", blurb: "Ultrabooks, gaming rigs and Macs" },
  "mens-shirts": { label: "Men's Shirts", blurb: "Casual, formal and everything between" },
  "mens-shoes": { label: "Men's Shoes", blurb: "Sneakers, loafers and boots" },
  "mens-watches": {
    label: "Men's Watches",
    blurb: "Chronographs and everyday classics",
  },
  "mobile-accessories": {
    label: "Mobile Accessories",
    blurb: "Cases, chargers and cables",
  },
  motorcycle: { label: "Motorcycle", blurb: "Bikes, gear and spares" },
  "skin-care": { label: "Skin Care", blurb: "Serums, creams and treatments" },
  smartphones: {
    label: "Smartphones",
    blurb: "Flagships from Apple, Samsung and more",
  },
  "sports-accessories": {
    label: "Sports",
    blurb: "Training kit and match-day gear",
  },
  sunglasses: { label: "Sunglasses", blurb: "Polarised and designer frames" },
  tablets: { label: "Tablets", blurb: "iPads and Android slates" },
  tops: { label: "Tops", blurb: "Blouses, tees and knitwear" },
  vehicle: { label: "Vehicle", blurb: "Cars, parts and accessories" },
  "womens-bags": { label: "Women's Bags", blurb: "Totes, clutches and crossbodies" },
  "womens-dresses": {
    label: "Women's Dresses",
    blurb: "Day, work and occasion wear",
  },
  "womens-jewellery": {
    label: "Jewellery",
    blurb: "Gold, silver and statement sets",
  },
  "womens-shoes": { label: "Women's Shoes", blurb: "Heels, flats and trainers" },
  "womens-watches": {
    label: "Women's Watches",
    blurb: "Elegant dials and smart bands",
  },
};

/** Title-cases an unknown slug so it is still presentable in the UI. */
function labelFromSlug(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function categoryMeta(slug: string): Category {
  const meta = META[slug];
  if (meta) return { slug, ...meta };
  return {
    slug,
    label: labelFromSlug(slug),
    blurb: `Shop ${labelFromSlug(slug).toLowerCase()} from global sellers`,
  };
}

export function categoryLabel(slug: string): string {
  return META[slug]?.label ?? labelFromSlug(slug);
}

/** Builds the display list for a set of slugs returned by the API. */
export function toCategories(slugs: string[]): Category[] {
  return slugs.map(categoryMeta);
}

/**
 * Slugs promoted into the header strip, in merchandising order. Filtered
 * against what the API actually returns before rendering.
 */
/**
 * Departments promoted to the header strip.
 *
 * Deliberately short. The strip used to carry ten, which overflowed the row at
 * common widths and left the last tab clipped behind the scroll fade — the
 * full taxonomy is one click away in the mega menu and the listing filters.
 */
export const FEATURED_CATEGORY_SLUGS = [
  "smartphones",
  "laptops",
  "mens-watches",
  "womens-bags",
  "beauty",
];
