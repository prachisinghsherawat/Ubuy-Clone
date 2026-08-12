"use client";

import { Col, Row } from "antd";
import Link from "next/link";

import { categoryIcon } from "@/features/products/components/categoryIcons";
import { CATEGORIES } from "@/features/products/data/categories";
import { ROUTES } from "@/lib/constants";

export function CategoryTiles() {
  return (
    <Row gutter={[16, 16]}>
      {CATEGORIES.map((category) => (
        <Col key={category.slug} xs={12} sm={8} md={6} lg={3}>
          <Link
            href={`${ROUTES.products}?category=${category.slug}`}
            className="category-tile"
          >
            <span className="category-tile-icon">{categoryIcon(category.icon)}</span>
            <strong>{category.label}</strong>
            <span>{category.blurb}</span>
          </Link>
        </Col>
      ))}
    </Row>
  );
}
