// `@ant-design/icons` builds a React context at module scope, so it only
// evaluates inside a client bundle — any component importing it must be one.
"use client";

import {
  CheckCircleFilled,
  CreditCardFilled,
  CrownFilled,
  GlobalOutlined,
  RocketFilled,
  SafetyCertificateFilled,
  TagFilled,
} from "@ant-design/icons";
import type { ReactNode } from "react";

const ITEMS: { icon: ReactNode; label: string }[] = [
  { icon: <GlobalOutlined />, label: "Sourced from 100+ countries" },
  { icon: <RocketFilled />, label: "Express air shipping" },
  { icon: <SafetyCertificateFilled />, label: "100% genuine products" },
  { icon: <CreditCardFilled />, label: "Pay in rupees" },
  { icon: <TagFilled />, label: "Customs & duties included" },
  { icon: <CheckCircleFilled />, label: "Buyer protection" },
  { icon: <CrownFilled />, label: "Authorised sellers only" },
];

/**
 * Infinite trust strip.
 *
 * The item list is rendered twice into one track that translates by -50%, so
 * the copy scrolls back to its exact starting position and the loop is
 * seamless. The duplicate is `aria-hidden` — it is a visual device, and a
 * screen reader should hear each claim once.
 */
export function TrustMarquee() {
  const row = ITEMS.map((item) => (
    <span className="marquee-item" key={item.label}>
      {item.icon}
      {item.label}
    </span>
  ));

  return (
    <div className="marquee">
      <div className="marquee-track">
        {row}
        <span aria-hidden="true" style={{ display: "contents" }}>
          {row}
        </span>
      </div>
    </div>
  );
}
