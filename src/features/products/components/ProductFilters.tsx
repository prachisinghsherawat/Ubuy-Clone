"use client";

import { Button, Checkbox, Collapse, Rate, Select, Switch } from "antd";
import { useState } from "react";

import { categoryLabel } from "@/features/products/data/categories";
import type { ListingState } from "@/features/products/utils/searchParams";
import { PRICE_BUCKETS } from "@/lib/constants";

interface ProductFiltersProps {
  categories: string[];
  brands: string[];
  state: ListingState;
  onChange: (patch: Partial<ListingState>) => void;
  onReset: () => void;
  activeCount: number;
}

const RATING_STEPS = [4.5, 4, 3.5, 3];

/** Departments shown before the list asks to be expanded. */
const CATEGORY_PREVIEW = 8;

/**
 * The listing's filter panel.
 *
 * Purely controlled — it never holds filter state of its own, it just reports
 * changes upward so the URL stays the single source of truth.
 */
export function ProductFilters({
  categories,
  brands,
  state,
  onChange,
  onReset,
  activeCount,
}: ProductFiltersProps) {
  const [showAllCategories, setShowAllCategories] = useState(false);

  // The taxonomy runs to ~24 departments. It used to sit in a 260px scroll box,
  // which put a second scrollbar inside a page that already had one; showing a
  // preview and letting the reader ask for the rest keeps the rail flat.
  const visibleCategories = showAllCategories
    ? categories
    : categories.slice(0, CATEGORY_PREVIEW);

  /**
   * A section's heading, with a count of what is narrowing it.
   *
   * Collapsed groups otherwise hide the fact that they are filtering at all —
   * the reader had to open each one to find out where the results went.
   */
  const sectionLabel = (title: string, count: number) => (
    <span className="filter-section-label">
      {title}
      {count > 0 ? <span className="filter-count">{count}</span> : null}
    </span>
  );

  const items = [
    {
      key: "category",
      label: sectionLabel("Category", state.categories.length),
      children: (
        <>
          <Checkbox.Group
            value={state.categories}
            onChange={(values) => onChange({ categories: values as string[] })}
            style={{ display: "grid", gap: 10 }}
          >
            {visibleCategories.map((slug) => (
              <Checkbox key={slug} value={slug}>
                {categoryLabel(slug)}
              </Checkbox>
            ))}
          </Checkbox.Group>

          {categories.length > CATEGORY_PREVIEW ? (
            <button
              type="button"
              className="filter-more"
              onClick={() => setShowAllCategories((current) => !current)}
            >
              {showAllCategories
                ? "Show fewer"
                : `Show all ${categories.length} departments`}
            </button>
          ) : null}
        </>
      ),
    },
    {
      key: "brand",
      label: sectionLabel("Brand", state.brands.length),
      children: (
        // There are far too many brands for a checkbox list, so this is a
        // type-ahead multi-select instead.
        <Select
          mode="multiple"
          allowClear
          showSearch
          placeholder="Search brands"
          value={state.brands}
          onChange={(values: string[]) => onChange({ brands: values })}
          options={brands.map((brand) => ({ value: brand, label: brand }))}
          style={{ width: "100%" }}
          maxTagCount="responsive"
        />
      ),
    },
    {
      key: "price",
      label: sectionLabel("Price", state.buckets.length),
      children: (
        <Checkbox.Group
          value={state.buckets}
          onChange={(values) =>
            onChange({ buckets: values as ListingState["buckets"] })
          }
          style={{ display: "grid", gap: 8 }}
        >
          {PRICE_BUCKETS.map((bucket) => (
            <Checkbox key={bucket.id} value={bucket.id}>
              {bucket.label}
            </Checkbox>
          ))}
        </Checkbox.Group>
      ),
    },
    {
      key: "rating",
      label: sectionLabel("Customer rating", state.minRating > 0 ? 1 : 0),
      children: (
        <div style={{ display: "grid", gap: 8 }}>
          {RATING_STEPS.map((value) => (
            <button
              key={value}
              type="button"
              className="filter-rating"
              onClick={() =>
                // Clicking the active step clears it, so the group needs no
                // separate "any rating" row.
                onChange({ minRating: state.minRating === value ? 0 : value })
              }
              aria-pressed={state.minRating === value}
              data-selected={state.minRating === value}
            >
              <Rate disabled allowHalf value={value} style={{ fontSize: 14 }} />
              &amp; up
            </button>
          ))}
        </div>
      ),
    },
    {
      key: "availability",
      label: sectionLabel("Availability", state.inStockOnly ? 1 : 0),
      children: (
        <label style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14 }}>
          <Switch
            size="small"
            checked={state.inStockOnly}
            onChange={(checked) => onChange({ inStockOnly: checked })}
          />
          In stock only
        </label>
      ),
    },
  ];

  return (
    <aside className="sticky-filters filter-panel">
      <div className="filter-panel-head">
        <strong>
          Filters
          {activeCount > 0 ? (
            <span className="filter-count filter-count-total">{activeCount}</span>
          ) : null}
        </strong>
        <Button
          type="link"
          size="small"
          onClick={onReset}
          disabled={activeCount === 0}
          style={{ paddingInline: 0 }}
        >
          Clear all
        </Button>
      </div>

      {/* Only Category opens by default. Expanding three groups at once filled
          the rail past the fold, which is what made the sidebar feel dense —
          the rest are one click away. */}
      <Collapse
        ghost
        items={items}
        defaultActiveKey={["category"]}
        expandIconPlacement="end"
      />
    </aside>
  );
}
