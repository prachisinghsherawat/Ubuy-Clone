"use client";

import { Headset, RefreshCw, ShieldCheck, Truck } from "lucide-react";

const VALUES = [
  {
    icon: <Truck />,
    title: "Free delivery",
    text: "On every order above ₹25,000",
  },
  {
    icon: <ShieldCheck />,
    title: "Secure payments",
    text: "Cards, UPI and net banking",
  },
  {
    icon: <RefreshCw />,
    title: "Easy returns",
    text: "30-day return window",
  },
  {
    icon: <Headset />,
    title: "Support 24×7",
    text: "Real humans, any time zone",
  },
];

export function ValueStrip() {
  return (
    <div className="value-strip">
      {VALUES.map((value) => (
        <div className="value-item reveal-item" key={value.title}>
          <span className="value-icon">{value.icon}</span>
          <div>
            <strong>{value.title}</strong>
            <span>{value.text}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
