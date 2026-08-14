"use client";

import {
  DownOutlined,
  GlobalOutlined,
  HeartOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  TruckOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { App, Badge, Dropdown, type MenuProps } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import { CategoryBar } from "@/components/layout/CategoryBar";
import { HeaderSearch } from "@/components/layout/HeaderSearch";
import { MiniCart } from "@/components/layout/MiniCart";
import { useAuth } from "@/features/auth/AuthProvider";
import { useWishlist } from "@/features/wishlist/WishlistProvider";
import { ROUTES, SITE } from "@/lib/constants";

/** Scroll depth at which the header condenses. */
const CONDENSE_AT = 40;

export function SiteHeader() {
  const router = useRouter();
  const { message } = App.useApp();
  const { ids: wishlistIds } = useWishlist();
  const { user, signOut } = useAuth();
  const [condensed, setCondensed] = useState(false);

  /**
   * Collapse the promo strip once the page scrolls.
   *
   * The flag is written to `<html>` rather than kept in this component's markup
   * because `--header-strip-h` feeds `--header-height`, and that token is read
   * by `.page`, `.buy-box` and every `.sticky-*` element *outside* the header.
   * Toggling it at the document root is what keeps all those sticky offsets in
   * sync with the height the header actually measures — a class on the header
   * alone would leave them 34px out.
   */
  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > CONDENSE_AT);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (condensed) root.dataset.scrolled = "true";
    else delete root.dataset.scrolled;

    // Leaving the attribute behind on unmount would strand every sticky offset
    // in the condensed geometry with no header to match it.
    return () => {
      delete root.dataset.scrolled;
    };
  }, [condensed]);

  const accountItems: MenuProps["items"] = user
    ? [
        { key: "greeting", label: `Hi, ${user.name.split(" ")[0]}`, disabled: true },
        { type: "divider" },
        {
          key: "orders",
          icon: <ShoppingOutlined />,
          // There is no order history in this build — only the most recent
          // order is kept, and that is what the success route renders.
          label: <Link href={ROUTES.success}>Your Last Order</Link>,
        },
        {
          key: "wishlist",
          icon: <HeartOutlined />,
          label: <Link href={`${ROUTES.products}?saved=1`}>Your Wishlist</Link>,
        },
        { type: "divider" },
        {
          key: "signout",
          icon: <LogoutOutlined />,
          danger: true,
          label: "Sign out",
          onClick: () => {
            signOut();
            message.success("Signed out");
            router.push(ROUTES.home);
          },
        },
      ]
    : [
        { key: "welcome", label: "Welcome to Ubuy", disabled: true },
        { type: "divider" },
        {
          key: "signin",
          icon: <UserOutlined />,
          label: <Link href={ROUTES.signIn}>Sign in</Link>,
        },
        {
          key: "signup",
          icon: <ShoppingOutlined />,
          label: <Link href={ROUTES.signUp}>Create an account</Link>,
        },
      ];

  return (
    <header className="site-header" data-condensed={condensed}>
      <div className="header-strip">
        <div className="container header-strip-inner">
          <span>
            <TruckOutlined /> Free delivery on orders above ₹25,000 · Ships from 100+
            countries
          </span>
          <span>Customer care {SITE.supportPhone}</span>
        </div>
      </div>

      <div className="container header-main">
        <Link href={ROUTES.home} className="header-brand" aria-label="Ubuy home">
          U<span>buy</span>
        </Link>

        <HeaderSearch />

        <div className="header-actions">
          <button type="button" className="header-action">
            <GlobalOutlined />
            <span className="header-action-label">
              <small>Deliver to</small>
              <strong>India</strong>
            </span>
            <DownOutlined style={{ fontSize: 10, opacity: 0.7 }} />
          </button>

          <Dropdown menu={{ items: accountItems }} placement="bottomRight" arrow>
            <button type="button" className="header-action">
              <UserOutlined />
              <span className="header-action-label">
                <small>{user ? "Account" : "Sign in"}</small>
                <strong>{user ? user.name.split(" ")[0] : "Account"}</strong>
              </span>
              <DownOutlined style={{ fontSize: 10, opacity: 0.7 }} />
            </button>
          </Dropdown>

          <Link
            href={`${ROUTES.products}?saved=1`}
            className="header-action"
            aria-label="Wishlist"
          >
            <Badge count={wishlistIds.length} size="small" offset={[2, -2]}>
              <HeartOutlined style={{ color: "#fff", fontSize: 18 }} />
            </Badge>
          </Link>

          <MiniCart />
        </div>
      </div>

      {/* CategoryBar reads the query string to mark the active tab. Isolating it
          behind Suspense keeps the rest of the header prerenderable — without a
          boundary, a static route calling useSearchParams fails the build. */}
      <Suspense fallback={<div className="category-bar category-bar-placeholder" />}>
        <CategoryBar />
      </Suspense>
    </header>
  );
}
