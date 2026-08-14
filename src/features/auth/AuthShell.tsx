"use client";

import {
  GlobalOutlined,
  SafetyCertificateOutlined,
  TruckOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import type { ReactNode } from "react";

import { SITE } from "@/lib/constants";

const POINTS = [
  {
    icon: <GlobalOutlined />,
    text: "Shop from 100+ countries with a single Indian checkout",
  },
  { icon: <TruckOutlined />, text: "Free delivery on every order above ₹25,000" },
  { icon: <UndoOutlined />, text: "30-day returns on most of the catalogue" },
  { icon: <SafetyCertificateOutlined />, text: "Genuine products from authorised sellers" },
];

/** Split-screen frame shared by the sign-in and sign-up routes. */
export function AuthShell({
  heading,
  blurb,
  children,
}: {
  heading: string;
  blurb: string;
  children: ReactNode;
}) {
  return (
    <div className="auth-shell">
      <div className="auth-aside">
        <h2>{heading}</h2>
        <p>{blurb}</p>

        <ul className="auth-points">
          {POINTS.map((point) => (
            <li key={point.text}>
              {point.icon}
              <span>{point.text}</span>
            </li>
          ))}
        </ul>

        <p style={{ marginTop: 32, fontSize: 13, opacity: 0.7 }}>
          {SITE.name} — {SITE.tagline}
        </p>
      </div>

      <div className="auth-panel">
        <div className="auth-form">{children}</div>
      </div>
    </div>
  );
}
