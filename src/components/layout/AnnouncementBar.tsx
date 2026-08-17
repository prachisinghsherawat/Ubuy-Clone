"use client";

import {
  CustomerServiceOutlined,
  SafetyCertificateOutlined,
  TruckOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";

const MESSAGES = [
  {
    icon: <TruckOutlined />,
    text: "Free delivery on orders above ₹25,000 · Ships from 100+ countries",
  },
  {
    icon: <SafetyCertificateOutlined />,
    text: "Customs and duties included — no surprise charges at your door",
  },
  {
    icon: <CustomerServiceOutlined />,
    text: "30-day returns on every order, handled by real humans",
  },
];

const ROTATE_MS = 5000;

/** Reserves layout for the widest line, so rotating never resizes the strip. */
const LONGEST = MESSAGES.reduce(
  (longest, message) => (message.text.length > longest.length ? message.text : longest),
  "",
);

/**
 * Rotating promo line in the top strip.
 *
 * The index is plain state advanced on an interval, so the server renders
 * message 0 and the client starts from the same one — nothing here depends on
 * a clock, which keeps the markup identical across hydration.
 */
export function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((current) => (current + 1) % MESSAGES.length),
      ROTATE_MS,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <span className="announce" aria-live="polite">
      {MESSAGES.map((message, position) => (
        <span
          key={message.text}
          className="announce-item"
          data-active={position === index}
          // Only the visible line should reach a screen reader; the stack is a
          // visual crossfade, not three simultaneous announcements.
          aria-hidden={position !== index}
        >
          {message.icon} {message.text}
        </span>
      ))}
      {/* Holds the strip's width and height while every line above is
          absolutely positioned out of flow. Uses the longest message so the
          reserved box never clips a rotation. */}
      <span className="announce-spacer" aria-hidden="true">
        {LONGEST}
      </span>
    </span>
  );
}
