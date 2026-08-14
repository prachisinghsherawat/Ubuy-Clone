"use client";

import { useSearchParams } from "next/navigation";

/**
 * Where to send the shopper once they are signed in.
 *
 * `?next=` is attacker-controllable, so only same-origin absolute paths are
 * honoured — `//evil.com` and `https://evil.com` both fall back to the cart.
 */
export function useAuthRedirect(fallback: string): string {
  const next = useSearchParams().get("next");
  if (!next || !next.startsWith("/") || next.startsWith("//")) return fallback;
  return next;
}
