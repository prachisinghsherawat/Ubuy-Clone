"use client";

import {
  DeleteOutlined,
  MinusOutlined,
  PlusOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Badge, Button, Popover } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { MAX_QUANTITY, useCart } from "@/features/cart/CartProvider";
import { FREE_SHIPPING_THRESHOLD, ROUTES } from "@/lib/constants";
import { useCurrency } from "@/features/currency/CurrencyProvider";


const PREVIEW_LIMIT = 3;

export function MiniCart() {
  const { lines, totals, hydrated, removeItem, setQuantity } = useCart();
  const { format } = useCurrency();
  const [open, setOpen] = useState(false);
  const [bumping, setBumping] = useState(false);
  const baseline = useRef<number | null>(null);

  const count = hydrated ? totals.itemCount : 0;

  useEffect(() => {
    if (!hydrated) return;

    const previous = baseline.current;
    baseline.current = count;

    if (previous === null || count <= previous) return;

    setBumping(true);
    const timer = setTimeout(() => setBumping(false), 420);
    return () => clearTimeout(timer);
  }, [count, hydrated]);

  const remaining = FREE_SHIPPING_THRESHOLD - totals.subtotal;
  const progress = Math.min(100, (totals.subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const panel = (
    <div className="mini-cart">
      {lines.length === 0 ? (
        <div className="mini-cart-empty">
          <ShoppingCartOutlined />
          <p>Your cart is empty</p>
          <Link href={ROUTES.products} onClick={() => setOpen(false)}>
            <Button type="primary" block>
              Start shopping
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="mini-cart-ship">
            {remaining > 0 ? (
              <span>
                Add <strong>{format(remaining)}</strong> for free delivery
              </span>
            ) : (
              <span className="mini-cart-ship-done">
                You&apos;ve unlocked free delivery
              </span>
            )}
            <div className="ship-meter">
              <span style={{ width: `${progress}%` }} />
            </div>
          </div>

          <ul className="mini-cart-lines">
            {lines.slice(0, PREVIEW_LIMIT).map((line) => (
              <li key={line.productId} className="mini-cart-line">
                <Link
                  href={ROUTES.product(line.product.slug)}
                  className="mini-cart-thumb"
                  onClick={() => setOpen(false)}
                >
                  <Image src={line.product.image} alt="" fill sizes="52px" />
                </Link>
                <div className="mini-cart-copy">
                  <Link
                    href={ROUTES.product(line.product.slug)}
                    onClick={() => setOpen(false)}
                  >
                    {line.product.name}
                  </Link>
                  <small>{format(line.product.price)} each</small>

                  {/* Adjusting here saves a trip to the cart page for the most
                      common correction — one too many of something. */}
                  <div className="mini-cart-qty">
                    <Button
                      type="text"
                      size="small"
                      icon={<MinusOutlined />}
                      disabled={line.quantity <= 1}
                      onClick={() => setQuantity(line.productId, line.quantity - 1)}
                      aria-label={`Decrease quantity of ${line.product.name}`}
                    />
                    <span aria-live="polite">{line.quantity}</span>
                    <Button
                      type="text"
                      size="small"
                      icon={<PlusOutlined />}
                      disabled={line.quantity >= MAX_QUANTITY}
                      onClick={() => setQuantity(line.productId, line.quantity + 1)}
                      aria-label={`Increase quantity of ${line.product.name}`}
                    />
                  </div>
                </div>
                <Button
                  type="text"
                  size="small"
                  icon={<DeleteOutlined />}
                  onClick={() => removeItem(line.productId)}
                  aria-label={`Remove ${line.product.name}`}
                />
              </li>
            ))}
          </ul>

          {lines.length > PREVIEW_LIMIT ? (
            <p className="mini-cart-more">
              + {lines.length - PREVIEW_LIMIT} more in your cart
            </p>
          ) : null}

          <div className="mini-cart-total">
            <span>Subtotal</span>
            <strong>{format(totals.subtotal)}</strong>
          </div>

          <div className="mini-cart-actions">
            <Link href={ROUTES.cart} onClick={() => setOpen(false)}>
              <Button block>View cart</Button>
            </Link>
            <Link href={ROUTES.checkout} onClick={() => setOpen(false)}>
              <Button type="primary" block>
                Checkout
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );

  return (
    <Popover
      content={panel}
      open={open}
      onOpenChange={setOpen}
      trigger={["hover", "click"]}
      placement="bottomRight"
      arrow
      // No `styles` override: antd already pads `.ant-popover-inner` by 12px
      // from its `innerPadding` token, so `.mini-cart` carries width only and
      // lets that token own the gutter rather than stacking a second one.
      mouseEnterDelay={0.15}
    >
      <Link href={ROUTES.cart} className="header-action" aria-label="Cart">
        <Badge
          count={count}
          size="small"
          offset={[2, -2]}
          className={bumping ? "is-bumping" : undefined}
        >
          <ShoppingCartOutlined style={{ fontSize: 20 }} />
        </Badge>
        <span className="header-action-label">
          <small>Cart</small>
          <strong>{count} items</strong>
        </span>
      </Link>
    </Popover>
  );
}
