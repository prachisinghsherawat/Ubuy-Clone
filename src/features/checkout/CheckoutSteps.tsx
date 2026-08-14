"use client";

import { CreditCardOutlined, HomeOutlined, SmileOutlined } from "@ant-design/icons";
import { Steps } from "antd";

/** Shared progress indicator across the three checkout routes. */
export function CheckoutSteps({ current }: { current: 0 | 1 | 2 }) {
  return (
    <Steps
      className="checkout-steps"
      current={current}
      responsive
      items={[
        { title: "Address", icon: <HomeOutlined /> },
        { title: "Payment", icon: <CreditCardOutlined /> },
        { title: "Confirmation", icon: <SmileOutlined /> },
      ]}
    />
  );
}
