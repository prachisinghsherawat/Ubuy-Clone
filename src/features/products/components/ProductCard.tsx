"use client";

import { ShoppingCartOutlined, StarFilled } from "@ant-design/icons";
import { App, Button, Tag } from "antd";
import Image from "next/image";
import Link from "next/link";
import type { MouseEvent } from "react";

import { PriceTag } from "@/components/ui/PriceTag";
import { useCart } from "@/features/cart/CartProvider";
import { WishlistButton } from "@/features/wishlist/WishlistButton";
import { formatCount } from "@/lib/format";
import { ROUTES } from "@/lib/constants";
import type { Product } from "@/types";

const BADGE_COLOR: Record<NonNullable<Product["badge"]>, string> = {
  "Best Seller": "volcano",
  New: "blue",
  Deal: "green",
  Limited: "purple",
};

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { message } = App.useApp();

  const handleAdd = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    addItem(product.id);
    message.success(`${product.name} added to cart`);
  };

  return (
    <Link href={ROUTES.product(product.slug)} className="product-card">
      {product.badge ? (
        <Tag color={BADGE_COLOR[product.badge]} className="product-badge">
          {product.badge}
        </Tag>
      ) : null}

      <div className="product-wish">
        <WishlistButton productId={product.id} productName={product.name} />
      </div>

      <div className="product-media">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1200px) 25vw, 260px"
        />
      </div>

      <div className="product-body">
        <span className="product-brand">{product.brand}</span>
        <h3 className="product-name">{product.name}</h3>

        <span style={{ fontSize: 12.5, color: "var(--ink-muted)" }}>
          <StarFilled style={{ color: "var(--brand-amber)" }} /> {product.rating.toFixed(1)}
          <span style={{ color: "var(--ink-subtle)" }}>
            {" "}
            ({formatCount(product.reviewCount)})
          </span>
        </span>

        <PriceTag price={product.price} listPrice={product.listPrice} />

        <Button
          type="primary"
          icon={<ShoppingCartOutlined />}
          onClick={handleAdd}
          disabled={!product.inStock}
          block
          style={{ marginTop: 10 }}
        >
          {product.inStock ? "Add to cart" : "Out of stock"}
        </Button>
      </div>
    </Link>
  );
}
