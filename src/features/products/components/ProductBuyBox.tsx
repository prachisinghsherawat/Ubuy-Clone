"use client";

import {
  CheckCircleFilled,
  SafetyCertificateOutlined,
  ShoppingCartOutlined,
  ThunderboltFilled,
  TruckOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import { App, Button, Divider, InputNumber, Space, Tag } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { PriceTag } from "@/components/ui/PriceTag";
import { MAX_QUANTITY, useCart } from "@/features/cart/CartProvider";
import { WishlistButton } from "@/features/wishlist/WishlistButton";
import { ROUTES } from "@/lib/constants";
import { useCurrency } from "@/features/currency/CurrencyProvider";
import type { Product } from "@/types";

interface ProductBuyBoxProps {
  product: Product;
  /** Rendered on the server so the date never differs between the two renders. */
  deliveryDate: string;
}

const LOW_STOCK_THRESHOLD = 20;

export function ProductBuyBox({ product, deliveryDate }: ProductBuyBoxProps) {
  const router = useRouter();
  const { addItem, isInCart } = useCart();
  const { format } = useCurrency();
  const { message } = App.useApp();

  const minQuantity = Math.max(1, product.minimumOrderQuantity ?? 1);
  const maxQuantity = Math.max(minQuantity, Math.min(MAX_QUANTITY, product.stock));
  const [quantity, setQuantity] = useState(minQuantity);

  const inCart = isInCart(product.id);
  const lowStock = product.inStock && product.stock <= LOW_STOCK_THRESHOLD;

  const add = () => {
    addItem(product, quantity);
    message.success(
      `${quantity} × ${product.name} added to cart`,
    );
  };

  const buyNow = () => {
    addItem(product, quantity);
    router.push(ROUTES.cart);
  };

  return (
    <aside className="surface-card buy-box detail-buy" style={{ padding: 20 }}>
      <PriceTag price={product.price} listPrice={product.listPrice} size="large" />

      <p style={{ margin: "6px 0 14px", fontSize: 13, color: "var(--ink-muted)" }}>
        Inclusive of all taxes · {format(product.price * quantity)} for {quantity}{" "}
        {quantity === 1 ? "unit" : "units"}
      </p>

      {product.inStock ? (
        <Tag icon={<CheckCircleFilled />} color="success">
          In stock
        </Tag>
      ) : (
        <Tag color="error">Out of stock</Tag>
      )}

      {lowStock ? (
        <Tag icon={<ThunderboltFilled />} color="warning">
          Only {product.stock} left
        </Tag>
      ) : null}

      <Divider style={{ margin: "16px 0" }} />

      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
        <span style={{ fontSize: 14, color: "var(--ink-muted)" }}>Quantity</span>
        <InputNumber
          min={minQuantity}
          max={maxQuantity}
          value={quantity}
          onChange={(value) => setQuantity(value ?? minQuantity)}
          disabled={!product.inStock}
          aria-label="Quantity"
        />
      </div>

      {minQuantity > 1 ? (
        <p style={{ margin: "-6px 0 12px", fontSize: 12.5, color: "var(--ink-muted)" }}>
          Minimum order quantity for this item is {minQuantity}.
        </p>
      ) : null}

      <Space direction="vertical" size={10} style={{ width: "100%" }}>
        <Button
          type="primary"
          size="large"
          block
          icon={<ShoppingCartOutlined />}
          onClick={add}
          disabled={!product.inStock}
        >
          {inCart ? "Add another" : "Add to cart"}
        </Button>

        <Button
          size="large"
          block
          onClick={buyNow}
          disabled={!product.inStock}
          style={{
            background: "var(--brand-amber)",
            borderColor: "var(--brand-amber)",
            color: "var(--brand-navy-deep)",
            fontWeight: 600,
          }}
        >
          Buy now
        </Button>

        <WishlistButton product={product} shape="default" block />
      </Space>

      <Divider style={{ margin: "18px 0 14px" }} />

      <ul className="spec-list" style={{ listStyle: "none", paddingLeft: 0 }}>
        <li>
          <TruckOutlined /> Delivery by <strong>{deliveryDate}</strong>
        </li>
        {product.shippingInfo ? (
          <li>
            <TruckOutlined /> {product.shippingInfo}
          </li>
        ) : null}
        {product.returnPolicy ? (
          <li>
            <UndoOutlined /> {product.returnPolicy}
          </li>
        ) : null}
        {product.warranty ? (
          <li>
            <SafetyCertificateOutlined /> {product.warranty}
          </li>
        ) : null}
      </ul>
    </aside>
  );
}
