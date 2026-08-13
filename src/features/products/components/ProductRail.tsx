"use client";

import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";

import { ProductCard } from "@/features/products/components/ProductCard";
import type { Product } from "@/types";

/**
 * Horizontally scrollable carousel of product cards.
 *
 * Built on native scroll rather than a transform-based slider so touch,
 * trackpad and keyboard scrolling all keep working; the arrows are a
 * progressive enhancement that page the strip by one viewport width. Arrow
 * enablement is driven by the real scroll position so they disable at each end.
 */
export function ProductRail({ products }: { products: Product[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    setAtStart(track.scrollLeft <= 1);
    // A sub-pixel gap can survive a full scroll, so allow a small tolerance.
    setAtEnd(track.scrollLeft >= maxScroll - 1);
  }, []);

  useEffect(() => {
    sync();
    const track = trackRef.current;
    if (!track) return;

    // Card widths are percentage-based, so a resize changes what fits.
    const observer = new ResizeObserver(sync);
    observer.observe(track);
    return () => observer.disconnect();
  }, [sync, products]);

  const page = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth * 0.9, behavior: "smooth" });
  };

  if (products.length === 0) return null;

  return (
    <div className="rail-wrap">
      <Button
        shape="circle"
        icon={<LeftOutlined />}
        className="rail-arrow rail-arrow-prev"
        onClick={() => page(-1)}
        disabled={atStart}
        aria-label="Scroll left"
      />

      <div className="rail" ref={trackRef} onScroll={sync}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Button
        shape="circle"
        icon={<RightOutlined />}
        className="rail-arrow rail-arrow-next"
        onClick={() => page(1)}
        disabled={atEnd}
        aria-label="Scroll right"
      />
    </div>
  );
}
