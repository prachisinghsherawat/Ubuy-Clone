"use client";

import {
  AppstoreOutlined,
  FireOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  FEATURED_CATEGORY_SLUGS,
  categoryMeta,
} from "@/features/products/data/categories";
import { categoryIcon } from "@/features/products/components/categoryIcons";
import { ROUTES } from "@/lib/constants";

export function CategoryBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(true);

  const onListing = pathname === ROUTES.products;
  const activeCategory = searchParams.get("category");
  const activeSort = searchParams.get("sort");
  const onDeals = onListing && activeSort === "discount";

  const sync = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    setAtStart(track.scrollLeft <= 1);
    setAtEnd(track.scrollLeft >= maxScroll - 1);
  }, []);

  useEffect(() => {
    sync();
    const track = trackRef.current;
    if (!track) return;

    const observer = new ResizeObserver(sync);
    observer.observe(track);
    return () => observer.disconnect();
  }, [sync]);

  const page = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth * 0.7, behavior: "smooth" });
  };

  return (
    <nav className="category-bar" aria-label="Product categories">
      <button
        type="button"
        className="category-nav category-nav-prev"
        onClick={() => page(-1)}
        hidden={atStart}
        aria-label="Scroll categories left"
      >
        <LeftOutlined />
      </button>

      <div className="category-bar-inner" ref={trackRef} onScroll={sync}>
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
          className="category-link category-link-deals"
          data-active={onDeals}
        >
          <FireOutlined /> Today&apos;s Deals
        </Link>
      </div>

      <button
        type="button"
        className="category-nav category-nav-next"
        onClick={() => page(1)}
        hidden={atEnd}
        aria-label="Scroll categories right"
      >
        <RightOutlined />
      </button>
    </nav>
  );
}
