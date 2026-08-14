"use client";

import { CloseOutlined, FilterOutlined, HeartFilled } from "@ant-design/icons";
import {
  Alert,
  Button,
  Drawer,
  Pagination,
  Select,
  Skeleton,
  Tag,
  Typography,
} from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

import { ProductGrid } from "@/features/products/components/ProductGrid";
import { ProductFilters } from "@/features/products/components/ProductFilters";
import { categoryLabel } from "@/features/products/data/categories";
import { activeFilterCount, queryProducts } from "@/features/products/utils/query";
import {
  PAGE_SIZE,
  parseListingState,
  toSearchString,
  type ListingState,
} from "@/features/products/utils/searchParams";
import { useWishlist } from "@/features/wishlist/WishlistProvider";
import { PRICE_BUCKETS, SORT_OPTIONS } from "@/lib/constants";
import type { Product } from "@/types";

interface ProductListingProps {
  /** The full catalogue, fetched once on the server. */
  catalogue: Product[];
  categories: string[];
  brands: string[];
}

const BUCKET_LABEL = new Map(PRICE_BUCKETS.map((b) => [b.id as string, b.label]));

/**
 * The catalogue browser.
 *
 * The whole catalogue arrives from the server in one payload, so filtering and
 * sorting run in memory and land instantly — no request per checkbox. Filter
 * state lives in the URL (see `searchParams.ts`), which is why this component
 * needs a Suspense boundary at its mount site.
 */
export function ProductListing({ catalogue, categories, brands }: ProductListingProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { products: saved, hydrated } = useWishlist();
  const [filtersOpen, setFiltersOpen] = useState(false);

  const state = useMemo(
    () => parseListingState(new URLSearchParams(searchParams.toString())),
    [searchParams],
  );

  const navigate = useCallback(
    (next: ListingState, { push = false }: { push?: boolean } = {}) => {
      const query = toSearchString(next);
      const href = query ? `${pathname}?${query}` : pathname;
      if (push) {
        router.push(href);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        // Filter edits replace rather than push: stepping back through every
        // checkbox tick would make the back button useless.
        router.replace(href, { scroll: false });
      }
    },
    [pathname, router],
  );

  const update = useCallback(
    (patch: Partial<ListingState>) =>
      // Any filter change invalidates the current page number.
      navigate({ ...state, ...patch, page: 1 }),
    [navigate, state],
  );

  const reset = useCallback(
    () =>
      navigate({
        ...state,
        categories: [],
        brands: [],
        buckets: [],
        minRating: 0,
        inStockOnly: false,
        page: 1,
      }),
    [navigate, state],
  );

  // The saved view reads from localStorage, so it is empty until hydration.
  const source = state.savedOnly ? saved : catalogue;
  const results = useMemo(() => queryProducts(source, state), [source, state]);

  const activeCount = activeFilterCount(state);
  const pageCount = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const page = Math.min(state.page, pageCount);
  const visible = results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const heading = state.savedOnly
    ? "Your wishlist"
    : state.search
      ? `Results for “${state.search}”`
      : state.categories.length === 1
        ? categoryLabel(state.categories[0])
        : "All products";

  const chips = [
    ...state.categories.map((slug) => ({
      key: `category:${slug}`,
      label: categoryLabel(slug),
      clear: () =>
        update({ categories: state.categories.filter((value) => value !== slug) }),
    })),
    ...state.brands.map((brand) => ({
      key: `brand:${brand}`,
      label: brand,
      clear: () => update({ brands: state.brands.filter((value) => value !== brand) }),
    })),
    ...state.buckets.map((id) => ({
      key: `price:${id}`,
      label: BUCKET_LABEL.get(id) ?? id,
      clear: () => update({ buckets: state.buckets.filter((value) => value !== id) }),
    })),
    ...(state.minRating > 0
      ? [
          {
            key: "rating",
            label: `${state.minRating}★ & up`,
            clear: () => update({ minRating: 0 }),
          },
        ]
      : []),
    ...(state.inStockOnly
      ? [
          {
            key: "stock",
            label: "In stock only",
            clear: () => update({ inStockOnly: false }),
          },
        ]
      : []),
  ];

  const filters = (
    <ProductFilters
      categories={categories}
      brands={brands}
      state={state}
      onChange={update}
      onReset={reset}
      activeCount={activeCount}
    />
  );

  return (
    <div className="listing">
      <div className="listing-head">
        <div>
          <h1 className="listing-title">
            {state.savedOnly ? (
              <HeartFilled style={{ color: "var(--brand-orange)", marginRight: 8 }} />
            ) : null}
            {heading}
          </h1>
          <Typography.Text type="secondary">
            {state.savedOnly && !hydrated
              ? "Loading your saved items…"
              : `${results.length} ${results.length === 1 ? "product" : "products"}`}
            {state.search && !state.savedOnly ? " matched" : null}
          </Typography.Text>
        </div>

        <div className="listing-tools">
          <Button
            icon={<FilterOutlined />}
            onClick={() => setFiltersOpen(true)}
            className="listing-filter-trigger"
          >
            Filters{activeCount > 0 ? ` (${activeCount})` : ""}
          </Button>

          <Select
            value={state.sort}
            onChange={(sort) => update({ sort })}
            options={[...SORT_OPTIONS]}
            style={{ minWidth: 190 }}
            aria-label="Sort products"
          />
        </div>
      </div>

      {chips.length > 0 ? (
        <div className="listing-chips">
          {chips.map((chip) => (
            <Tag
              key={chip.key}
              closable
              closeIcon={<CloseOutlined />}
              onClose={(event) => {
                event.preventDefault();
                chip.clear();
              }}
              color="orange"
            >
              {chip.label}
            </Tag>
          ))}
          <Button type="link" size="small" onClick={reset} style={{ paddingInline: 4 }}>
            Clear all
          </Button>
        </div>
      ) : null}

      {state.savedOnly ? (
        <Alert
          type="info"
          showIcon
          style={{ marginBottom: 16 }}
          message="Your wishlist is stored on this device"
          description="Saved items live in this browser's local storage — they are not synced to an account."
        />
      ) : null}

      <div className="listing-body">
        <div className="listing-rail">{filters}</div>

        <div className="listing-results">
          {state.savedOnly && !hydrated ? (
            <Skeleton active paragraph={{ rows: 8 }} />
          ) : (
            <>
              <ProductGrid
                products={visible}
                spans={{ xs: 24, sm: 12, md: 8, lg: 8, xl: 6 }}
                emptyText={
                  state.savedOnly
                    ? "Nothing saved yet — tap the heart on any product"
                    : "No products match these filters"
                }
              />

              {pageCount > 1 ? (
                <div className="listing-pagination">
                  <Pagination
                    current={page}
                    total={results.length}
                    pageSize={PAGE_SIZE}
                    showSizeChanger={false}
                    onChange={(next) => navigate({ ...state, page: next }, { push: true })}
                  />
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>

      <Drawer
        title="Filters"
        placement="left"
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        width={320}
        styles={{ body: { padding: 12 } }}
      >
        {filters}
      </Drawer>
    </div>
  );
}
