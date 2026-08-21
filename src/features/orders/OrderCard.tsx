"use client";

import { RotateCcw } from "lucide-react";
import { Button, Tag } from "antd";
import Image from "next/image";
import Link from "next/link";

import { useCurrency } from "@/features/currency/CurrencyProvider";
import { formatPlacedAt, orderDeliveryDate, orderStatus } from "@/features/orders/status";
import { useReorder } from "@/features/orders/useReorder";
import { ROUTES } from "@/lib/constants";
import { formatDeliveryDate } from "@/lib/format";
import type { PlacedOrder } from "@/types";

/** How many item thumbnails fit the strip before it collapses to a count. */
const THUMB_LIMIT = 4;

/**
 * One row of order history — the summary shown on the account overview and in
 * the full order list.
 */
export function OrderCard({ order }: { order: PlacedOrder }) {
  const { format } = useCurrency();
  const reorder = useReorder();
  const status = orderStatus(order);
  const delivered = status.key === "delivered";
  const shown = order.lines.slice(0, THUMB_LIMIT);
  const hidden = order.lines.length - shown.length;

  return (
    <article className="surface-card order-card">
      <header className="order-card-head">
        <div>
          <Link href={ROUTES.order(order.id)} className="order-card-id">
            Order {order.id}
          </Link>
          <p className="order-card-meta">
            Placed {formatPlacedAt(order.placedAt)} · {order.totals.itemCount}{" "}
            {order.totals.itemCount === 1 ? "item" : "items"}
          </p>
        </div>

        <div className="order-card-head-end">
          <Tag color={status.color}>{status.label}</Tag>
          <strong>{format(order.totals.total)}</strong>
        </div>
      </header>

      <div className="order-card-body">
        <div className="order-thumbs">
          {shown.map((line) => (
            <Link
              key={line.productId}
              href={ROUTES.product(line.product.slug)}
              className="order-thumb"
              title={line.product.name}
            >
              <Image
                src={line.product.image}
                alt={line.product.name}
                width={64}
                height={64}
                style={{ objectFit: "contain" }}
              />
            </Link>
          ))}
          {hidden > 0 ? <span className="order-thumb order-thumb-more">+{hidden}</span> : null}
        </div>

        <div className="order-card-actions">
          <Link href={ROUTES.order(order.id)}>
            <Button>View order</Button>
          </Link>
          <Button type="primary" icon={<RotateCcw />} onClick={() => reorder(order)}>
            Buy again
          </Button>
        </div>
      </div>

      <footer className="order-card-foot">
        {delivered ? "Delivered on " : "Arriving by "}
        <strong>{formatDeliveryDate(orderDeliveryDate(order))}</strong>
      </footer>
    </article>
  );
}
