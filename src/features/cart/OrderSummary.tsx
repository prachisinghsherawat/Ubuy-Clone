"use client";

import { TruckOutlined } from "@ant-design/icons";
import { Divider } from "antd";
import type { ReactNode } from "react";

import { FREE_SHIPPING_THRESHOLD } from "@/lib/constants";
import { formatPrice } from "@/lib/format";
import type { CartTotals } from "@/types";

interface OrderSummaryProps {
  totals: CartTotals;
  title?: string;
  /** Primary CTA rendered under the totals. */
  action?: ReactNode;
  /** Hidden once the order is placed, where the nudge is no longer actionable. */
  showShippingMeter?: boolean;
}

/**
 * Order totals panel, shared by the cart, both checkout steps and the receipt,
 * so a single set of numbers is rendered the same way at every stage.
 */
export function OrderSummary({
  totals,
  title = "Order summary",
  action,
  showShippingMeter = true,
}: OrderSummaryProps) {
  const remaining = FREE_SHIPPING_THRESHOLD - totals.subtotal;
  const qualifies = remaining <= 0;
  const progress = Math.min(100, (totals.subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <aside className="surface-card sticky-panel" style={{ padding: 20 }}>
      <h2 style={{ margin: "0 0 12px", fontSize: 17, fontWeight: 700 }}>{title}</h2>

      <div className="summary-row">
        <span>
          Items ({totals.itemCount})
        </span>
        <strong>{formatPrice(totals.subtotal)}</strong>
      </div>

      {totals.savings > 0 ? (
        <div className="summary-row">
          <span>Discount</span>
          <strong style={{ color: "var(--brand-mint)" }}>
            −{formatPrice(totals.savings)}
          </strong>
        </div>
      ) : null}

      <div className="summary-row">
        <span>Shipping</span>
        <strong style={{ color: totals.shipping === 0 ? "var(--brand-mint)" : undefined }}>
          {totals.shipping === 0 ? "Free" : formatPrice(totals.shipping)}
        </strong>
      </div>

      <div className="summary-row">
        <span>Estimated tax</span>
        <strong>{formatPrice(totals.tax)}</strong>
      </div>

      <Divider style={{ margin: "12px 0" }} />

      <div className="summary-row summary-total">
        <span>Total</span>
        <span>{formatPrice(totals.total)}</span>
      </div>

      {showShippingMeter && totals.itemCount > 0 ? (
        <div style={{ marginTop: 14, fontSize: 13, color: "var(--ink-muted)" }}>
          <TruckOutlined />{" "}
          {qualifies ? (
            <span style={{ color: "var(--brand-mint)" }}>
              Your order ships free.
            </span>
          ) : (
            <>
              Add <strong>{formatPrice(remaining)}</strong> more for free shipping.
            </>
          )}
          <div className="ship-meter" aria-hidden="true">
            <span style={{ width: `${progress}%` }} />
          </div>
        </div>
      ) : null}

      {action ? <div style={{ marginTop: 16 }}>{action}</div> : null}
    </aside>
  );
}
