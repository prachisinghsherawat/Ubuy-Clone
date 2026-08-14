"use client";

import { Descriptions, Empty, Progress, Rate, Tabs } from "antd";

import { categoryLabel } from "@/features/products/data/categories";
import { formatCount } from "@/lib/format";
import type { Product } from "@/types";

/** Reviews carry an ISO timestamp; render it the same way on both sides. */
function reviewDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function Specifications({ product }: { product: Product }) {
  const items = [
    { key: "brand", label: "Brand", children: product.brand },
    { key: "category", label: "Category", children: categoryLabel(product.category) },
    { key: "sku", label: "SKU", children: product.sku ?? "—" },
    {
      key: "stock",
      label: "Availability",
      children: product.inStock ? `${product.stock} in stock` : "Out of stock",
    },
    {
      key: "weight",
      label: "Weight",
      children: product.weight ? `${product.weight} g` : "—",
    },
    {
      key: "dimensions",
      label: "Dimensions",
      children: product.dimensions
        ? `${product.dimensions.width} × ${product.dimensions.height} × ${product.dimensions.depth} cm`
        : "—",
    },
    { key: "warranty", label: "Warranty", children: product.warranty ?? "—" },
    { key: "shipping", label: "Shipping", children: product.shippingInfo ?? "—" },
    { key: "returns", label: "Returns", children: product.returnPolicy ?? "—" },
    {
      key: "moq",
      label: "Minimum order",
      children: `${product.minimumOrderQuantity ?? 1} unit(s)`,
    },
  ];

  return <Descriptions bordered size="small" column={1} items={items} />;
}

function Reviews({ product }: { product: Product }) {
  const reviews = product.reviews ?? [];

  if (reviews.length === 0) {
    return <Empty description="No reviews yet for this product" />;
  }

  // Star histogram over the sample the API returns.
  const buckets = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((review) => Math.round(review.rating) === star).length,
  }));

  return (
    <div style={{ display: "grid", gap: 24 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto minmax(0, 320px)",
          gap: 28,
          alignItems: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 40, fontWeight: 700, lineHeight: 1.1 }}>
            {product.rating.toFixed(1)}
          </div>
          <Rate disabled allowHalf value={product.rating} style={{ fontSize: 15 }} />
          <div style={{ fontSize: 13, color: "var(--ink-muted)", marginTop: 4 }}>
            {formatCount(product.reviewCount)} ratings
          </div>
        </div>

        <div>
          {buckets.map((bucket) => (
            <div
              key={bucket.star}
              style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13 }}
            >
              <span style={{ width: 30 }}>{bucket.star}★</span>
              <Progress
                percent={Math.round((bucket.count / reviews.length) * 100)}
                showInfo={false}
                strokeColor="var(--brand-amber)"
                size="small"
                style={{ flex: 1, margin: 0 }}
              />
              <span style={{ width: 24, color: "var(--ink-muted)" }}>{bucket.count}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        {reviews.map((review, index) => (
          <div className="review-card" key={`${review.reviewerName}-${index}`}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <strong style={{ fontSize: 14 }}>{review.reviewerName}</strong>
              <Rate disabled value={review.rating} style={{ fontSize: 12 }} />
              <span style={{ fontSize: 12.5, color: "var(--ink-subtle)" }}>
                {reviewDate(review.date)}
              </span>
            </div>
            <p style={{ margin: "6px 0 0", color: "var(--ink-muted)", fontSize: 14 }}>
              {review.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProductTabs({ product }: { product: Product }) {
  return (
    <Tabs
      defaultActiveKey="description"
      items={[
        {
          key: "description",
          label: "Description",
          children: (
            <div style={{ maxWidth: "72ch" }}>
              <p style={{ color: "var(--ink-muted)", lineHeight: 1.8 }}>
                {product.description}
              </p>
              {product.highlights.length > 0 ? (
                <ul className="spec-list">
                  {product.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          ),
        },
        {
          key: "specifications",
          label: "Specifications",
          children: <Specifications product={product} />,
        },
        {
          key: "reviews",
          label: `Reviews (${product.reviews?.length ?? 0})`,
          children: <Reviews product={product} />,
        },
      ]}
    />
  );
}
