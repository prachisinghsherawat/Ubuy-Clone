"use client";

import {
  Armchair,
  Bike,
  Cable,
  Car,
  Dumbbell,
  Flower,
  Footprints,
  Gem,
  Glasses,
  Lamp,
  Laptop,
  LayoutGrid,
  ShoppingBag,
  ShoppingBasket,
  Shirt,
  Smartphone,
  Sparkles,
  SprayCan,
  Tablet,
  Utensils,
  Watch,
} from "lucide-react";
import type { ReactNode } from "react";

/**
 * Department icons, keyed by the catalogue's own slug.
 *
 * Previously this mapped an abstract key (`smile`, `gift`, `experiment`) that
 * each category chose for itself, and the indirection is what made the icons
 * read wrong — Beauty got a smiley face, Women's Bags a wrapped present and
 * Fragrances a laboratory flask. Keying on the slug means there is exactly one
 * place to look, and no way for a department to point at an unrelated glyph.
 *
 * Lucide rather than `@ant-design/icons`: its set actually covers retail nouns
 * (a handbag, a watch, a perfume bottle) where antd's product-UI set only had
 * approximations.
 */
const CATEGORY_ICONS: Record<string, ReactNode> = {
  beauty: <Sparkles />,
  fragrances: <SprayCan />,
  furniture: <Armchair />,
  groceries: <ShoppingBasket />,
  "home-decoration": <Lamp />,
  "kitchen-accessories": <Utensils />,
  laptops: <Laptop />,
  "mens-shirts": <Shirt />,
  "mens-shoes": <Footprints />,
  "mens-watches": <Watch />,
  "mobile-accessories": <Cable />,
  motorcycle: <Bike />,
  "skin-care": <Flower />,
  smartphones: <Smartphone />,
  "sports-accessories": <Dumbbell />,
  sunglasses: <Glasses />,
  tablets: <Tablet />,
  tops: <Shirt />,
  vehicle: <Car />,
  "womens-bags": <ShoppingBag />,
  "womens-dresses": <Shirt />,
  "womens-jewellery": <Gem />,
  "womens-shoes": <Footprints />,
  "womens-watches": <Watch />,
};

/** Falls back to a neutral grid for any slug the catalogue adds later. */
export function categoryIcon(slug: string): ReactNode {
  return CATEGORY_ICONS[slug] ?? <LayoutGrid />;
}
