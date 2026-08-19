"use client";

import { Col, Row, Skeleton } from "antd";

/**
 * Layout-matched loading placeholders.
 *
 * These mirror the real grids rather than using a generic block, so a streamed
 * fallback and the resolved page occupy the same space and content does not
 * jump when it swaps in.
 *
 * The `"use client"` directive is load-bearing. antd ships its components as
 * client components, and a Server Component that reaches for a *property* of
 * one — `Skeleton.Image` — reads it off the client reference proxy, which
 * yields `undefined` and fails the render with "Element type is invalid".
 * Rendering these from a client module resolves the real component instead.
 */

/** One product card: square image well, then two text lines and a price. */
export function ProductCardSkeleton() {
  return (
    <div className="surface-card" style={{ padding: 12 }}>
      <Skeleton.Image active style={{ width: "100%", height: 168 }} />
      <Skeleton
        active
        title={false}
        paragraph={{ rows: 3, width: ["90%", "60%", "40%"] }}
        style={{ marginTop: 14 }}
      />
    </div>
  );
}

/** A responsive grid of card skeletons matching `ProductGrid`'s spans. */
export function ProductGridSkeleton({
  count = 8,
  spans = { xs: 24, sm: 12, md: 8, lg: 6, xl: 6 },
}: {
  count?: number;
  spans?: { xs: number; sm: number; md: number; lg: number; xl: number };
}) {
  return (
    <Row gutter={[20, 26]}>
      {Array.from({ length: count }, (_, index) => (
        <Col key={index} {...spans}>
          <ProductCardSkeleton />
        </Col>
      ))}
    </Row>
  );
}

/** The listing shell: filter rail beside a grid of cards. */
export function ProductListingSkeleton() {
  return (
    <div className="listing">
      <div className="listing-head">
        <Skeleton active title={{ width: 240 }} paragraph={{ rows: 1, width: 320 }} />
      </div>

      <div className="listing-body">
        <div className="listing-rail">
          <div className="surface-card" style={{ padding: 16 }}>
            <Skeleton active paragraph={{ rows: 12 }} />
          </div>
        </div>

        <div className="listing-results">
          <ProductGridSkeleton count={8} />
        </div>
      </div>
    </div>
  );
}

/** The detail shell: gallery, copy column and buy box, matching `detail-grid`. */
export function ProductDetailSkeleton() {
  return (
    <>
      <Skeleton active title={false} paragraph={{ rows: 1, width: 320 }} />

      <div className="detail-grid" style={{ marginTop: 18 }}>
        <Skeleton.Image active style={{ width: "100%", height: 420 }} />

        <div>
          <Skeleton active title={{ width: "80%" }} paragraph={{ rows: 6 }} />
        </div>

        <div className="detail-buy">
          <div className="surface-card" style={{ padding: 20 }}>
            <Skeleton active paragraph={{ rows: 8 }} />
          </div>
        </div>
      </div>
    </>
  );
}
