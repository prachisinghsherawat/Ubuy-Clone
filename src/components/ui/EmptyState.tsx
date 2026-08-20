"use client";

import { Button, Empty } from "antd";
import Link from "next/link";
import type { ReactNode } from "react";

interface EmptyStateProps {
  /** The headline antd renders beneath its illustration. */
  description: string;
  /** Optional supporting line under the description. */
  hint?: string;
  action?: { href: string; label: string; icon?: ReactNode };
  /** Drops the card chrome where the caller already provides a surface. */
  bare?: boolean;
}

/**
 * The "nothing here" panel.
 *
 * The cart, both checkout steps, the wishlist and the product grid all showed
 * the same illustration/description/CTA stack, each assembled by hand with its
 * own inline styles — so they drifted in padding and button size. One component
 * keeps every dead end looking the same.
 */
export function EmptyState({ description, hint, action, bare = false }: EmptyStateProps) {
  return (
    <div className={bare ? "empty-state" : "surface-card empty-state"}>
      <Empty description={description} />
      {hint ? <p className="empty-state-hint">{hint}</p> : null}
      {action ? (
        <Link href={action.href}>
          <Button type="primary" size="large" icon={action.icon}>
            {action.label}
          </Button>
        </Link>
      ) : null}
    </div>
  );
}
