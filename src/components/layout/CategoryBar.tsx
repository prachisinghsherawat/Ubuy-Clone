"use client";

import { AppstoreOutlined, FireOutlined } from "@ant-design/icons";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import {
  FEATURED_CATEGORY_SLUGS,
  categoryMeta,
} from "@/features/products/data/categories";
import { categoryIcon } from "@/features/products/components/categoryIcons";
import { ROUTES } from "@/lib/constants";

/**
 * Category navigation.
 *
 * Reads the active category off the query string, so the highlighted tab tracks
 * what the listing page is actually filtered to. That makes this component
 * dependent on URL data — see the Suspense boundary at its mount site.
 */
export function CategoryBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onListing = pathname === ROUTES.products;
  const activeCategory = searchParams.get("category");
  const activeSort = searchParams.get("sort");
  const onDeals = onListing && activeSort === "discount";

  return (
    <nav className="category-bar" aria-label="Product categories">
      <div className="container category-bar-inner">
        <Link
          href={ROUTES.products}
          className="category-link"
          data-active={onListing && !activeCategory && !activeSort}
        >
          <AppstoreOutlined /> All Products
        </Link>

        {FEATURED_CATEGORY_SLUGS.map(categoryMeta).map((category) => (
          <Link
            key={category.slug}
            href={`${ROUTES.products}?category=${category.slug}`}
            className="category-link"
            data-active={onListing && activeCategory === category.slug}
          >
            {categoryIcon(category.icon)} {category.label}
          </Link>
        ))}

        <Link
          href={`${ROUTES.products}?sort=discount`}
          className="category-link"
          data-active={onDeals}
        >
          <FireOutlined style={{ color: onDeals ? undefined : "var(--brand-amber)" }} />{" "}
          Today&apos;s Deals
        </Link>
      </div>
    </nav>
  );
}
