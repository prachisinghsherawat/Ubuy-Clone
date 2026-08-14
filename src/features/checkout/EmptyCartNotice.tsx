"use client";

import { ShoppingOutlined } from "@ant-design/icons";
import { Button, Empty } from "antd";
import Link from "next/link";

import { ROUTES } from "@/lib/constants";

/**
 * Shown when a checkout step is reached with nothing to buy.
 *
 * Rendered in place rather than redirecting: a redirect fired from an effect
 * would flash the form first and steal the back button.
 */
export function EmptyCartNotice({
  message = "There is nothing to check out",
}: {
  message?: string;
}) {
  return (
    <div className="surface-card empty-state">
      <Empty description={message} />
      <Link href={ROUTES.products}>
        <Button type="primary" size="large" icon={<ShoppingOutlined />}>
          Browse products
        </Button>
      </Link>
    </div>
  );
}
