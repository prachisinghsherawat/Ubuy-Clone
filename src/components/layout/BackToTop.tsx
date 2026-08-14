"use client";

import { ArrowUpOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

/** Roughly one viewport down — far enough that scrolling back is a real chore. */
const SHOW_AFTER = 600;

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      className="back-to-top"
      data-visible={visible}
      // Hidden from both the pointer and the tab order when off-screen — a
      // focusable control the user cannot see is a keyboard trap.
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
    >
      <ArrowUpOutlined />
    </button>
  );
}
