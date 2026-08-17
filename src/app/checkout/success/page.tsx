"use client";

import { HomeOutlined, PrinterOutlined, ShoppingOutlined } from "@ant-design/icons";
import { Button, Descriptions, Divider, Result, Skeleton } from "antd";
import Image from "next/image";
import Link from "next/link";

import { OrderSummary } from "@/features/cart/OrderSummary";
import { lastOrderStore } from "@/features/checkout/checkoutStores";
import { CheckoutSteps } from "@/features/checkout/CheckoutSteps";
import { EmptyCartNotice } from "@/features/checkout/EmptyCartNotice";
import { ROUTES } from "@/lib/constants";
import { useCurrency } from "@/features/currency/CurrencyProvider";
import { estimatedDelivery } from "@/lib/format";
import { useHydrated, usePersistentValue } from "@/lib/persistentStore";
import type { PlacedOrder } from "@/types";

/** Orders from an earlier build carry no method, but always carry card digits. */
function paymentLabel(order: PlacedOrder): string {
  switch (order.paymentMethod ?? "card") {
    case "upi":
      return "UPI";
    case "cod":
      return "Cash on delivery";
    default:
      return `Card ending ${order.cardLast4}`;
  }
}

export default function SuccessPage() {
  const order = usePersistentValue(lastOrderStore);
  const hydrated = useHydrated();
  const { format } = useCurrency();

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

  const placedOn = new Date(order.placedAt).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className="container page">
      <CheckoutSteps current={2} />

      <div className="surface-card" style={{ padding: "8px 24px 24px", marginBottom: 24 }}>
        <Result
          status="success"
          title="Order placed successfully"
          subTitle={
            <>
              Order <strong>{order.id}</strong> · placed {placedOn} · arriving by{" "}
              <strong>{estimatedDelivery()}</strong>
            </>
          }
          extra={[
            <Link key="shop" href={ROUTES.products}>
              <Button type="primary" size="large" icon={<ShoppingOutlined />}>
                Continue shopping
              </Button>
            </Link>,
            <Link key="home" href={ROUTES.home}>
              <Button size="large" icon={<HomeOutlined />}>
                Back to home
              </Button>
            </Link>,
            <Button
              key="print"
              size="large"
              icon={<PrinterOutlined />}
              onClick={() => window.print()}
            >
              Print receipt
            </Button>,
          ]}
        />
      </div>

      <div className="checkout-grid">
        <div className="surface-card" style={{ padding: 24 }}>
          <h2 style={{ margin: "0 0 16px", fontSize: 17, fontWeight: 700 }}>
            Delivery details
          </h2>

          <Descriptions
            bordered
            size="small"
            column={1}
            items={[
              { key: "name", label: "Recipient", children: order.address.fullName },
              {
                key: "address",
                label: "Address",
                children: [
                  order.address.addressLine,
                  order.address.landmark,
                  `${order.address.city}, ${order.address.state} ${order.address.pincode}`,
                ]
                  .filter(Boolean)
                  .join(", "),
              },
              { key: "phone", label: "Phone", children: `+91 ${order.address.phone}` },
              { key: "email", label: "Email", children: order.address.email },
              { key: "payment", label: "Payment", children: paymentLabel(order) },
            ]}
          />

          <Divider />

          <h2 style={{ margin: "0 0 4px", fontSize: 17, fontWeight: 700 }}>
            {order.totals.itemCount} {order.totals.itemCount === 1 ? "item" : "items"}
          </h2>

          {order.lines.map((line) => (
            <div className="cart-line" key={line.productId}>
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
                  <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>
                    {line.product.name}
                  </h3>
                </Link>
                <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--ink-muted)" }}>
                  {line.product.brand} · Qty {line.quantity}
                </p>
              </div>

              <div className="cart-line-total" style={{ textAlign: "right" }}>
                <strong>{format(line.lineTotal)}</strong>
              </div>
            </div>
          ))}
        </div>

        <OrderSummary
          totals={order.totals}
          title="Amount paid"
          showShippingMeter={false}
        />
      </div>
    </div>
  );
}
