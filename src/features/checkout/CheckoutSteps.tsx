"use client";

import { CreditCard, House, Smile } from "lucide-react";
import { Steps } from "antd";

/** Shared progress indicator across the three checkout routes. */
export function CheckoutSteps({ current }: { current: 0 | 1 | 2 }) {
  return (
    <Steps
      className="checkout-steps"
      current={current}
      responsive
      items={[
        { title: "Address", icon: <House /> },
        { title: "Payment", icon: <CreditCard /> },
        { title: "Confirmation", icon: <Smile /> },
      ]}
    />
  );
}
