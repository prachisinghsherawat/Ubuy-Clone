"use client";

import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { App, Button, Tooltip } from "antd";
import type { MouseEvent } from "react";

import { useWishlist } from "@/features/wishlist/WishlistProvider";

interface WishlistButtonProps {
  productId: string;
  productName: string;
  shape?: "circle" | "default";
  block?: boolean;
}

export function WishlistButton({
  productId,
  productName,
  shape = "circle",
  block = false,
}: WishlistButtonProps) {
  const { has, toggle } = useWishlist();
  const { message } = App.useApp();
  const saved = has(productId);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    // Cards wrap the whole tile in a link — keep the click from navigating.
    event.preventDefault();
    event.stopPropagation();
    const nowSaved = toggle(productId);
    message.open({
      type: "success",
      content: nowSaved
        ? `${productName} saved to your wishlist`
        : `${productName} removed from your wishlist`,
    });
  };

  return (
    <Tooltip title={saved ? "Remove from wishlist" : "Save to wishlist"}>
      <Button
        shape={shape === "circle" ? "circle" : "default"}
        block={block}
        onClick={handleClick}
        aria-pressed={saved}
        aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
        icon={saved ? <HeartFilled style={{ color: "var(--brand-orange)" }} /> : <HeartOutlined />}
      >
        {shape === "default" ? (saved ? "Saved" : "Save") : null}
      </Button>
    </Tooltip>
  );
}
