"use client";

import { ArrowRight, ChevronDown, Flame, LayoutGrid } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

import { useCurrency } from "@/features/currency/CurrencyProvider";
import { categoryIcon } from "@/features/products/components/categoryIcons";
import { ROUTES } from "@/lib/constants";
import type { Category, SearchSuggestion } from "@/types";

/**
 * Departments listed in the panel.
 *
 * The catalogue carries ~24. Showing them all made the panel taller than the
 * viewport; capping it and scrolling instead put a scrollbar inside a dropdown.
 * A short list plus a link to the full listing avoids both.
 */
const PANEL_LIMIT = 12;

interface MegaMenuProps {
  /** Every category the catalogue API returned, already mapped for display. */
  categories: Category[];
  /** Top-rated products, shown as the panel's merchandising strip. */
  trending: SearchSuggestion[];
}

/**
 * "All Categories" mega menu.
 *
 * Opens on hover *and* on click/keyboard: hover alone is unusable on touch and
 * unreachable by keyboard, so the button stays a real toggle and the pointer
 * enter/leave handlers are layered on top for desktop.
 */
export function MegaMenu({ categories, trending }: MegaMenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  /**
   * Pointer-leave is delayed so the diagonal travel from the button down to the
   * panel does not close it mid-move — without this the menu snaps shut as soon
   * as the cursor clips the gap between trigger and panel.
   */
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 160);
  };

  useEffect(() => cancelClose, []);

  // Escape closes, and a click anywhere outside dismisses.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const { format } = useCurrency();

  return (
    <div
      className="mega"
      ref={rootRef}
      onPointerEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onPointerLeave={scheduleClose}
    >
      <button
        type="button"
        className="mega-trigger"
        data-open={open}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((current) => !current)}
      >
        <LayoutGrid />
        <span>All Categories</span>
        <ChevronDown className="mega-caret" />
      </button>

      <div className="mega-panel" id={panelId} hidden={!open}>
        <div className="mega-inner">
          <div className="mega-cats">
            <p className="mega-heading">Shop by department</p>
            <ul>
              {categories.slice(0, PANEL_LIMIT).map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`${ROUTES.products}?category=${category.slug}`}
                    onClick={() => setOpen(false)}
                  >
                    <span className="mega-cat-icon">{categoryIcon(category.slug)}</span>
                    <span className="mega-cat-copy">
                      <strong>{category.label}</strong>
                      <small>{category.blurb}</small>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            {categories.length > PANEL_LIMIT ? (
              <Link
                href={ROUTES.products}
                className="mega-all"
                onClick={() => setOpen(false)}
              >
                View all {categories.length} departments <ArrowRight />
              </Link>
            ) : null}
          </div>

          <div className="mega-side">
            <p className="mega-heading">
              <Flame /> Trending right now
            </p>

            <ul className="mega-trending">
              {trending.map((item) => (
                <li key={item.id}>
                  <Link
                    href={ROUTES.product(item.slug)}
                    onClick={() => setOpen(false)}
                  >
                    <span className="mega-trend-media">
                      <Image src={item.image} alt="" fill sizes="52px" />
                    </span>
                    <span className="mega-trend-copy">
                      <strong>{item.name}</strong>
                      <small>{format(item.price)}</small>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href={`${ROUTES.products}?sort=discount`}
              className="mega-promo"
              onClick={() => setOpen(false)}
            >
              <strong>Today&apos;s biggest price drops</strong>
              <span>
                Up to 30% off <ArrowRight />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
