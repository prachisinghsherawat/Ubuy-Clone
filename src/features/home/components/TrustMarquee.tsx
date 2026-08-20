"use client";

import { CircleCheck, CreditCard, Crown, Globe, Rocket, ShieldCheck, Tag } from "lucide-react";
import type { ReactNode } from "react";

const ITEMS: { icon: ReactNode; label: string }[] = [
  { icon: <Globe />, label: "Sourced from 100+ countries" },
  { icon: <Rocket fill="currentColor" />, label: "Express air shipping" },
  { icon: <ShieldCheck fill="currentColor" />, label: "100% genuine products" },
  { icon: <CreditCard fill="currentColor" />, label: "Pay in rupees" },
  { icon: <Tag fill="currentColor" />, label: "Customs & duties included" },
  { icon: <CircleCheck fill="currentColor" />, label: "Buyer protection" },
  { icon: <Crown fill="currentColor" />, label: "Authorised sellers only" },
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
