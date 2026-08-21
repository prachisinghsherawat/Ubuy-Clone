"use client";

import { Descriptions, Divider } from "antd";
import Image from "next/image";
import Link from "next/link";

import { useCurrency } from "@/features/currency/CurrencyProvider";
import { paymentLabel } from "@/features/orders/status";
import { ROUTES } from "@/lib/constants";
import type { PlacedOrder } from "@/types";

/**
 * Delivery details plus the ordered items.
 *
 * The confirmation screen and the order history detail page show the same
 * receipt — they only differ in what sits above it — so the markup lives here
 * rather than being written twice and drifting.
 */
export function OrderReceipt({ order }: { order: PlacedOrder }) {
  const { format } = useCurrency();

  return (
    <div className="surface-card card-pad-lg">
      <h2 className="card-heading">Delivery details</h2>

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

      <h2 className="card-heading card-heading-tight">
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

          <div className="min-w-0">
            <Link href={ROUTES.product(line.product.slug)}>
              <h3 className="receipt-line-name">{line.product.name}</h3>
            </Link>
            <p className="receipt-line-meta">
              {line.product.brand} · Qty {line.quantity}
            </p>
          </div>

          <div className="cart-line-total" style={{ textAlign: "right" }}>
            <strong>{format(line.lineTotal)}</strong>
          </div>
        </div>
      ))}
    </div>
  );
}
