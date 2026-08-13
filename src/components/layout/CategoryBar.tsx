"use client";

import { AppstoreOutlined, FireOutlined } from "@ant-design/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  FEATURED_CATEGORY_SLUGS,
  categoryMeta,
} from "@/features/products/data/categories";
import { categoryIcon } from "@/features/products/components/categoryIcons";
import { ROUTES } from "@/lib/constants";

export function CategoryBar() {
  const pathname = usePathname();

  return (
    <nav className="category-bar" aria-label="Product categories">
      <div className="container category-bar-inner">
        <Link
          href={ROUTES.products}
          className="category-link"
          data-active={pathname === ROUTES.products}
        >
          <AppstoreOutlined /> All Products
        </Link>

        {FEATURED_CATEGORY_SLUGS.map(categoryMeta).map((category) => (
          <Link
            key={category.slug}
            href={`${ROUTES.products}?category=${category.slug}`}
            className="category-link"
          >
            {categoryIcon(category.icon)} {category.label}
          </Link>
        ))}

        <Link href={`${ROUTES.products}?sort=discount`} className="category-link">
          <FireOutlined style={{ color: "var(--brand-amber)" }} /> Today&apos;s Deals
        </Link>
      </div>
    </nav>
  );
}
