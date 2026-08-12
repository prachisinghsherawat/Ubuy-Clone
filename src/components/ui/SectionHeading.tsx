import { ArrowRightOutlined } from "@ant-design/icons";
import Link from "next/link";
import type { ReactNode } from "react";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  /** Optional "view all" target rendered on the right. */
  href?: string;
  linkLabel?: string;
  extra?: ReactNode;
}

export function SectionHeading({
  title,
  subtitle,
  href,
  linkLabel = "View all",
  extra,
}: SectionHeadingProps) {
  return (
    <div className="section-head">
      <div>
        <h2 className="section-title">{title}</h2>
        {subtitle ? <p className="section-subtitle">{subtitle}</p> : null}
      </div>

      {extra}

      {href ? (
        <Link
          href={href}
          style={{
            color: "var(--brand-orange)",
            fontWeight: 600,
            fontSize: 14,
            whiteSpace: "nowrap",
          }}
        >
          {linkLabel} <ArrowRightOutlined />
        </Link>
      ) : null}
    </div>
  );
}
