"use client";

import { Button, Checkbox, Collapse, Rate, Select, Switch } from "antd";

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
  const items = [
    {
      key: "category",
      label: "Category",
      children: (
        <Checkbox.Group
          value={state.categories}
          onChange={(values) => onChange({ categories: values as string[] })}
          // The taxonomy runs to ~24 departments; a capped scroll area keeps the
          // rest of the panel reachable without collapsing the group.
          style={{
            display: "grid",
            gap: 8,
            maxHeight: 260,
            overflowY: "auto",
          }}
        >
          {categories.map((slug) => (
            <Checkbox key={slug} value={slug}>
              {categoryLabel(slug)}
            </Checkbox>
          ))}
        </Checkbox.Group>
      ),
    },
    {
      key: "brand",
      label: "Brand",
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
      label: "Price",
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
      label: "Customer rating",
      children: (
        <div style={{ display: "grid", gap: 8 }}>
          {RATING_STEPS.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() =>
                // Clicking the active step clears it, so the group needs no
                // separate "any rating" row.
                onChange({ minRating: state.minRating === value ? 0 : value })
              }
              aria-pressed={state.minRating === value}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "4px 8px",
                border: "1px solid",
                borderColor:
                  state.minRating === value ? "var(--brand-coral)" : "transparent",
                borderRadius: "var(--radius-sm)",
                background: "transparent",
                cursor: "pointer",
                font: "inherit",
                fontSize: 13,
                color: "var(--ink-muted)",
                textAlign: "left",
              }}
            >
              <Rate disabled allowHalf value={value} style={{ fontSize: 13 }} />
              &amp; up
            </button>
          ))}
        </div>
      ),
    },
    {
      key: "availability",
      label: "Availability",
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
    <aside className="surface-card sticky-filters" style={{ padding: "8px 4px 12px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 16px 4px",
        }}
      >
        <strong style={{ fontSize: 15 }}>Filters</strong>
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

      <Collapse
        ghost
        items={items}
        defaultActiveKey={["category", "brand", "price"]}
        expandIconPosition="end"
      />
    </aside>
  );
}
