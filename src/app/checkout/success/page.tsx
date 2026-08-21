"use client";

import { House, Package, Printer, ReceiptText } from "lucide-react";
import { Button, Result, Skeleton } from "antd";
import Link from "next/link";

import { OrderSummary } from "@/features/cart/OrderSummary";
import { CheckoutSteps } from "@/features/checkout/CheckoutSteps";
import { EmptyCartNotice } from "@/features/checkout/EmptyCartNotice";
import { OrderReceipt } from "@/features/orders/OrderReceipt";
import { useLatestOrder } from "@/features/orders/orderStore";
import { formatPlacedAt } from "@/features/orders/status";
import { ROUTES } from "@/lib/constants";
import { estimatedDelivery } from "@/lib/format";
import { useHydrated } from "@/lib/persistentStore";

export default function SuccessPage() {
  // The head of the order history is the order that was just placed.
  const order = useLatestOrder();
  const hydrated = useHydrated();

  if (!hydrated) {
    return (
      <div className="container page">
        <Skeleton active paragraph={{ rows: 8 }} />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container page">
        <CheckoutSteps current={2} />
        <EmptyCartNotice message="No recent order to show" />
      </div>
    );
  }

  return (
    <div className="container page">
      <CheckoutSteps current={2} />

      <div className="surface-card" style={{ padding: "8px 24px 24px", marginBottom: 24 }}>
        <Result
          status="success"
          title="Order placed successfully"
          subTitle={
            <>
              Order <strong>{order.id}</strong> · placed {formatPlacedAt(order.placedAt)} ·
              arriving by <strong>{estimatedDelivery()}</strong>
            </>
          }
          extra={[
            <Link key="shop" href={ROUTES.products}>
              <Button type="primary" size="large" icon={<Package />}>
                Continue shopping
              </Button>
            </Link>,
            <Link key="orders" href={ROUTES.orders}>
              <Button size="large" icon={<ReceiptText />}>
                Your orders
              </Button>
            </Link>,
            <Link key="home" href={ROUTES.home}>
              <Button size="large" icon={<House />}>
                Back to home
              </Button>
            </Link>,
            <Button
              key="print"
              size="large"
              icon={<Printer />}
              onClick={() => window.print()}
            >
              Print receipt
            </Button>,
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
    </div>
  );
}
