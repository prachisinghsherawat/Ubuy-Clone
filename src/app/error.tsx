"use client";

import { Button, Result } from "antd";
import Link from "next/link";
import { useEffect } from "react";

import { ROUTES } from "@/lib/constants";

/**
 * Route-level error boundary.
 *
 * The catalogue degrades to bundled data when the upstream API is down, so a
 * throw here is genuinely unexpected — surface it and offer `reset()`, which
 * re-runs the failed render without a full document load.
 */
export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Route render failed:", error);
  }, [error]);

  return (
    <div className="container page">
      <div className="surface-card" style={{ padding: "24px 0" }}>
        <Result
          status="500"
          title="Something went wrong"
          subTitle={
            error.digest
              ? `Please try again. Reference: ${error.digest}`
              : "Please try again — the page failed to render."
          }
          extra={
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <Button type="primary" size="large" onClick={reset}>
                Try again
              </Button>
              <Link href={ROUTES.home}>
                <Button size="large">Back to home</Button>
              </Link>
            </div>
          }
        />
      </div>
    </div>
  );
}
