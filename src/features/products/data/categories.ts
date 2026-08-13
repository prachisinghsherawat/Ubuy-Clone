import type { Category } from "@/types";

/**
 * Presentation metadata for the live catalogue's taxonomy.
 *
 * The API returns category slugs but no icon or marketing copy, so that lives
 * here keyed by slug. Unknown slugs still render — `categoryMeta` derives a
 * readable label and falls back to a generic icon — so a new upstream category
 * never breaks the nav.
 */
const META: Record<string, { label: string; icon: string; blurb: string }> = {
  beauty: { label: "Beauty", icon: "smile", blurb: "Makeup, lashes and everyday glow" },
  fragrances: {
    label: "Fragrances",
    icon: "experiment",
    blurb: "Designer perfumes and eau de toilette",
  },
  furniture: { label: "Furniture", icon: "home", blurb: "Sofas, beds and statement pieces" },
  groceries: {
    label: "Groceries",
    icon: "cart",
    blurb: "Pantry staples and fresh essentials",
  },
  "home-decoration": {
    label: "Home Decoration",
    icon: "decor",
    blurb: "Art, mirrors and finishing touches",
  },
  "kitchen-accessories": {
    label: "Kitchen",
    icon: "coffee",
    blurb: "Cookware, gadgets and prep tools",
  },
  laptops: { label: "Laptops", icon: "laptop", blurb: "Ultrabooks, gaming rigs and Macs" },
  "mens-shirts": { label: "Men's Shirts", icon: "man", blurb: "Casual, formal and everything between" },
  "mens-shoes": { label: "Men's Shoes", icon: "shopping", blurb: "Sneakers, loafers and boots" },
  "mens-watches": {
    label: "Men's Watches",
    icon: "clock",
    blurb: "Chronographs and everyday classics",
  },
  "mobile-accessories": {
    label: "Mobile Accessories",
    icon: "thunderbolt",
    blurb: "Cases, chargers and cables",
  },
  motorcycle: { label: "Motorcycle", icon: "dashboard", blurb: "Bikes, gear and spares" },
  "skin-care": { label: "Skin Care", icon: "heart", blurb: "Serums, creams and treatments" },
  smartphones: {
    label: "Smartphones",
    icon: "mobile",
    blurb: "Flagships from Apple, Samsung and more",
  },
  "sports-accessories": {
    label: "Sports",
    icon: "trophy",
    blurb: "Training kit and match-day gear",
  },
  sunglasses: { label: "Sunglasses", icon: "eye", blurb: "Polarised and designer frames" },
  tablets: { label: "Tablets", icon: "tablet", blurb: "iPads and Android slates" },
  tops: { label: "Tops", icon: "skin", blurb: "Blouses, tees and knitwear" },
  vehicle: { label: "Vehicle", icon: "car", blurb: "Cars, parts and accessories" },
  "womens-bags": { label: "Women's Bags", icon: "gift", blurb: "Totes, clutches and crossbodies" },
  "womens-dresses": {
    label: "Women's Dresses",
    icon: "woman",
    blurb: "Day, work and occasion wear",
  },
  "womens-jewellery": {
    label: "Jewellery",
    icon: "crown",
    blurb: "Gold, silver and statement sets",
  },
  "womens-shoes": { label: "Women's Shoes", icon: "star", blurb: "Heels, flats and trainers" },
  "womens-watches": {
    label: "Women's Watches",
    icon: "fieldTime",
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
    icon: "appstore",
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
export const FEATURED_CATEGORY_SLUGS = [
  "smartphones",
  "laptops",
  "tablets",
  "mens-watches",
  "womens-bags",
  "fragrances",
  "beauty",
  "sunglasses",
  "groceries",
  "furniture",
];
