"use client";

import { ShoppingCart, Star, Zap } from "lucide-react";
import { App, Button, Tag } from "antd";
import Image from "next/image";
import Link from "next/link";
import type { MouseEvent } from "react";

import { PriceTag } from "@/components/ui/PriceTag";
import { useCart } from "@/features/cart/CartProvider";
import { WishlistButton } from "@/features/wishlist/WishlistButton";
import { ROUTES } from "@/lib/constants";
import { discountPercent, formatCount } from "@/lib/format";
import type { Product } from "@/types";

const BADGE_COLOR: Record<NonNullable<Product["badge"]>, string> = {
  "Best Seller": "volcano",
  New: "blue",
  Deal: "green",
  Limited: "purple",
};

/** Below this, the card nudges with a scarcity line instead of a plain count. */
const LOW_STOCK_THRESHOLD = 20;

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { message } = App.useApp();
  const off = discountPercent(product.price, product.listPrice);
  const lowStock = product.inStock && product.stock <= LOW_STOCK_THRESHOLD;

  const handleAdd = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    addItem(product);
    message.success(`${product.name} added to cart`);
  };

  return (
    <Link href={ROUTES.product(product.slug)} className="product-card">
      <div className="product-media">
        {off > 0 ? <span className="product-ribbon">-{off}%</span> : null}

        {product.badge ? (
          <Tag color={BADGE_COLOR[product.badge]} className="product-badge">
            {product.badge}
          </Tag>
        ) : null}

        <div className="product-wish">
          <WishlistButton product={product} />
        </div>

        <Image
          src={product.image}
          alt={product.name}
          fill
          className="product-img"
          sizes="(max-width: 640px) 50vw, (max-width: 1200px) 25vw, 260px"
        />

        {!product.inStock ? (
          <span className="product-oos">Out of stock</span>
        ) : null}
      </div>

      <div className="product-body">
        <span className="product-brand">{product.brand}</span>
        <h3 className="product-name">{product.name}</h3>

        <span className="product-rating">
          <Star fill="currentColor" />
          {product.rating.toFixed(1)}
          <span className="product-rating-count">
            ({formatCount(product.reviewCount)})
          </span>
        </span>

        <PriceTag price={product.price} listPrice={product.listPrice} />

        {lowStock ? (
          <span className="product-stock">
            <Zap fill="currentColor" /> Only {product.stock} left
          </span>
        ) : null}

        <Button
          type="primary"
          icon={<ShoppingCart />}
          onClick={handleAdd}
          disabled={!product.inStock}
          block
          className="product-add"
        >
          {product.inStock ? "Add to cart" : "Out of stock"}
        </Button>
      </div>
    </Link>
  );
}
