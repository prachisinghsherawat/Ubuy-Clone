"use client";

import { ArrowLeft, Printer, RotateCcw } from "lucide-react";
import { Button, Steps, Tag } from "antd";
import Link from "next/link";
import { useParams } from "next/navigation";

import { EmptyState } from "@/components/ui/EmptyState";
import { OrderSummary } from "@/features/cart/OrderSummary";
import { OrderReceipt } from "@/features/orders/OrderReceipt";
import { useOrder } from "@/features/orders/orderStore";
import {
  formatPlacedAt,
  orderDeliveryDate,
  orderStatus,
} from "@/features/orders/status";
import { useReorder } from "@/features/orders/useReorder";
import { ROUTES } from "@/lib/constants";
import { formatDeliveryDate } from "@/lib/format";
import { useHydrated } from "@/lib/persistentStore";

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const order = useOrder(id);
  const hydrated = useHydrated();
  const reorder = useReorder();

  // Orders live in localStorage, so "not found" is only true once the client
  // has actually read it — before that, every order looks missing.
  if (!hydrated) return null;

  if (!order) {
    return (
      <EmptyState
        description="We could not find that order"
        hint="It may have been placed in another browser, or trimmed from this one's history."
        action={{ href: ROUTES.orders, label: "Back to your orders" }}
      />
    );
  }

  const status = orderStatus(order);

  return (
    <>
      <Link href={ROUTES.orders} className="account-back">
        <ArrowLeft /> All orders
      </Link>

      <div className="listing-head account-orders-head">
        <div>
          <h1 className="listing-title account-title">Order {order.id}</h1>
          <p className="account-subtitle">
            Placed {formatPlacedAt(order.placedAt)} · <Tag color={status.color}>{status.label}</Tag>
          </p>
        </div>

        <div className="order-detail-actions">
          <Button icon={<Printer />} onClick={() => window.print()}>
            Print receipt
          </Button>
          <Button type="primary" icon={<RotateCcw />} onClick={() => reorder(order)}>
            Buy again
          </Button>
        </div>
      </div>

      <div className="surface-card card-pad-lg order-progress">
        <Steps
          size="small"
          current={status.step}
          items={[
            { title: "Ordered", description: formatPlacedAt(order.placedAt) },
            { title: "Shipped", description: "Handed to the courier" },
            {
              title: "Delivered",
              description:
                (status.key === "delivered" ? "Delivered " : "Expected ") +
                formatDeliveryDate(orderDeliveryDate(order)),
            },
          ]}
        />
      </div>

      <div className="checkout-grid">
        <OrderReceipt order={order} />
        <OrderSummary
          totals={order.totals}
          title="Amount paid"
          showShippingMeter={false}
        />
      </div>
    </>
  );
}
