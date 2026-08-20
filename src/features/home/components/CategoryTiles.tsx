"use client";

import { Col, Row } from "antd";
import Link from "next/link";

import { categoryIcon } from "@/features/products/components/categoryIcons";
import { ROUTES } from "@/lib/constants";
import type { Category } from "@/types";

export function CategoryTiles({ categories }: { categories: Category[] }) {
  return (
    <Row gutter={[16, 16]}>
      {categories.map((category) => (
        <Col key={category.slug} xs={12} sm={8} md={6} lg={4} xl={3}>
          <Link
            href={`${ROUTES.products}?category=${category.slug}`}
            className="category-tile reveal-item"
          >
            <span className="category-tile-icon">{categoryIcon(category.slug)}</span>
            <strong>{category.label}</strong>
            <span>{category.blurb}</span>
          </Link>
        </Col>
      ))}
    </Row>
  );
}
