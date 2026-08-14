"use client";

import { ArrowRightOutlined } from "@ant-design/icons";
import Link from "next/link";
import type { ReactNode } from "react";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  /**
   * Small caps label above the title, for sections that want extra weight.
   * Plain text rather than a node: the home page renders on the server, and
   * anything icon-shaped would have to cross the client boundary to get here.
   */
  kicker?: string;
  /** Optional "view all" target rendered on the right. */
  href?: string;
  linkLabel?: string;
  extra?: ReactNode;
}

export function SectionHeading({
  title,
  subtitle,
  kicker,
  href,
  linkLabel = "View all",
  extra,
}: SectionHeadingProps) {
  return (
    <div className="section-head">
      <div>
        {kicker ? (
          <span className="section-kicker">
            <i className="section-kicker-dot" aria-hidden="true" />
            {kicker}
          </span>
        ) : null}
        <h2 className="section-title">{title}</h2>
        {subtitle ? <p className="section-subtitle">{subtitle}</p> : null}
      </div>

      {extra}

      {href ? (
        <Link href={href} className="section-link">
          {linkLabel} <ArrowRightOutlined />
        </Link>
      ) : null}
    </div>
  );
}
