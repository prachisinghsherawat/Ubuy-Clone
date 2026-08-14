"use client";

import {
  ArrowRightOutlined,
  DeleteOutlined,
  HeartOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { App, Button, Empty, InputNumber, Popconfirm, Skeleton, Tag } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { PriceTag } from "@/components/ui/PriceTag";
import { MAX_QUANTITY, useCart } from "@/features/cart/CartProvider";
import { OrderSummary } from "@/features/cart/OrderSummary";
import { useWishlist } from "@/features/wishlist/WishlistProvider";
import { ROUTES } from "@/lib/constants";
import { estimatedDelivery, formatPrice } from "@/lib/format";
import type { CartLineView } from "@/types";

function CartLine({ line }: { line: CartLineView }) {
  const { setQuantity, removeItem } = useCart();
  const { toggle } = useWishlist();
  const { message } = App.useApp();

  const saveForLater = () => {
    toggle(line.product);
    removeItem(line.productId);
    message.success(`${line.product.name} moved to your wishlist`);
  };

  return (
    <div className="cart-line">
      <Link href={ROUTES.product(line.product.slug)} className="cart-thumb">
        <Image
          src={line.product.image}
          alt={line.product.name}
          width={92}
          height={92}
          style={{ objectFit: "contain" }}
        />
      </Link>

      <div style={{ minWidth: 0 }}>
        <Link href={ROUTES.product(line.product.slug)}>
          <h3
            style={{
              margin: 0,
              fontSize: 15.5,
              fontWeight: 600,
              lineHeight: 1.4,
            }}
          >
            {line.product.name}
          </h3>
        </Link>

        <p style={{ margin: "4px 0 8px", fontSize: 13, color: "var(--ink-muted)" }}>
          {line.product.brand} · {line.product.store}
        </p>

        {line.product.inStock ? (
          <Tag color="success">In stock</Tag>
        ) : (
          <Tag color="error">Out of stock</Tag>
        )}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            flexWrap: "wrap",
            marginTop: 12,
          }}
        >
          <InputNumber
            min={1}
            max={MAX_QUANTITY}
            value={line.quantity}
            onChange={(value) => setQuantity(line.productId, value ?? 1)}
            aria-label={`Quantity for ${line.product.name}`}
          />

          <Button type="text" icon={<HeartOutlined />} onClick={saveForLater} size="small">
            Save for later
          </Button>

          <Popconfirm
            title="Remove this item?"
            okText="Remove"
            cancelText="Keep"
            onConfirm={() => {
              removeItem(line.productId);
              message.success("Item removed from cart");
            }}
          >
            <Button type="text" danger icon={<DeleteOutlined />} size="small">
              Remove
            </Button>
          </Popconfirm>
        </div>
      </div>

      <div className="cart-line-total" style={{ textAlign: "right" }}>
        <PriceTag price={line.lineTotal} listPrice={line.product.listPrice * line.quantity} />
        {line.quantity > 1 ? (
          <p style={{ margin: "4px 0 0", fontSize: 12.5, color: "var(--ink-muted)" }}>
            {formatPrice(line.product.price)} each
          </p>
        ) : null}
      </div>
    </div>
  );
}

export default function CartPage() {
  const router = useRouter();
  const { lines, totals, hydrated, clearCart } = useCart();
  const { message } = App.useApp();

  // The cart lives in localStorage, so the first paint has nothing to show.
  if (!hydrated) {
    return (
      <div className="container page">
        <Skeleton active paragraph={{ rows: 8 }} />
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="container page">
        <div className="surface-card empty-state">
          <Empty
            image={Empty.PRESENTED_IMAGE_DEFAULT}
            description="Your cart is empty"
          />
          <p style={{ color: "var(--ink-muted)", margin: 0 }}>
            Browse the catalogue and add something you like.
          </p>
          <Link href={ROUTES.products}>
            <Button type="primary" size="large" icon={<ShoppingOutlined />}>
              Start shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container page">
      <div className="listing-head">
        <div>
          <h1 className="listing-title">Your cart</h1>
          <span style={{ color: "var(--ink-muted)", fontSize: 14 }}>
            {totals.itemCount} {totals.itemCount === 1 ? "item" : "items"} · arriving by{" "}
            {estimatedDelivery()}
          </span>
        </div>

        <Popconfirm
          title="Empty your cart?"
          okText="Empty cart"
          cancelText="Cancel"
          onConfirm={() => {
            clearCart();
            message.success("Cart emptied");
          }}
        >
          <Button danger type="text" icon={<DeleteOutlined />}>
            Empty cart
          </Button>
        </Popconfirm>
      </div>

      <div className="checkout-grid">
        <div className="surface-card" style={{ padding: "4px 20px" }}>
          {lines.map((line) => (
            <CartLine key={line.productId} line={line} />
          ))}
        </div>

        <OrderSummary
          totals={totals}
          action={
            <>
              <Button
                type="primary"
                size="large"
                block
                icon={<ArrowRightOutlined />}
                iconPosition="end"
                onClick={() => router.push(ROUTES.checkout)}
              >
                Proceed to checkout
              </Button>
              <Link href={ROUTES.products}>
                <Button type="link" block style={{ marginTop: 8 }}>
                  Continue shopping
                </Button>
              </Link>
            </>
          }
        />
      </div>
    </div>
  );
}
