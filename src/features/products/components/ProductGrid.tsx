"use client";

import { Col, Empty, Row } from "antd";

import { ProductCard } from "@/features/products/components/ProductCard";
import type { Product } from "@/types";

interface ProductGridProps {
  products: Product[];
  /** Column spans per breakpoint; defaults suit a full-width grid. */
  spans?: { xs: number; sm: number; md: number; lg: number; xl: number };
  emptyText?: string;
}

const DEFAULT_SPANS = { xs: 24, sm: 12, md: 8, lg: 6, xl: 6 };

export function ProductGrid({
  products,
  spans = DEFAULT_SPANS,
  emptyText = "No products match these filters",
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="empty-state">
        <Empty description={emptyText} />
      </div>
    );
  }

  return (
    // Vertical gutter runs larger than the horizontal one: cards lift on hover,
    // and a row gap equal to the column gap left the shadow of one row clipping
    // into the card below it.
    <Row gutter={[20, 26]}>
      {products.map((product) => (
        <Col key={product.id} {...spans}>
          <ProductCard product={product} />
        </Col>
      ))}
    </Row>
  );
}
