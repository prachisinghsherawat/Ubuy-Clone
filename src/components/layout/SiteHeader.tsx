"use client";

import { ChevronDown, Heart, LogOut, Package, User, UserRound } from "lucide-react";
import { App, Badge, Dropdown, type MenuProps } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

import { CategoryBar } from "@/components/layout/CategoryBar";
import { DeliverTo } from "@/components/layout/DeliverTo";
import { HeaderSearch } from "@/components/layout/HeaderSearch";
import { MegaMenu } from "@/components/layout/MegaMenu";
import { MiniCart } from "@/components/layout/MiniCart";
import { MobileNav } from "@/components/layout/MobileNav";
import { useAuth } from "@/features/auth/AuthProvider";
import { useWishlist } from "@/features/wishlist/WishlistProvider";
import { ROUTES } from "@/lib/constants";
import type { Category, SearchSuggestion } from "@/types";

interface SiteHeaderProps {
  /** Live catalogue taxonomy, fetched once in the root layout. */
  categories: Category[];
  /** Top-rated products for the mega menu's merchandising strip. */
  trending: SearchSuggestion[];
}

export function SiteHeader({ categories, trending }: SiteHeaderProps) {
  const router = useRouter();
  const { message } = App.useApp();
  const { ids: wishlistIds } = useWishlist();
  const { user, signOut } = useAuth();
  const accountItems: MenuProps["items"] = user
    ? [
        { key: "greeting", label: `Hi, ${user.name.split(" ")[0]}`, disabled: true },
        { type: "divider" },
        {
          key: "account",
          icon: <UserRound />,
          label: <Link href={ROUTES.account}>Your Account</Link>,
        },
        {
          key: "orders",
          icon: <Package />,
          label: <Link href={ROUTES.orders}>Your Orders</Link>,
        },
        {
          key: "wishlist",
          icon: <Heart />,
          label: <Link href={ROUTES.wishlist}>Your Wishlist</Link>,
        },
        { type: "divider" },
        {
          key: "signout",
          icon: <LogOut />,
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
          icon: <User />,
          label: <Link href={ROUTES.signIn}>Sign in</Link>,
        },
        {
          key: "signup",
          icon: <Package />,
          label: <Link href={ROUTES.signUp}>Create an account</Link>,
        },
      ];

  return (
    <header className="site-header">
      <div className="container header-main">
        <MobileNav categories={categories} />

        <Link href={ROUTES.home} className="header-brand" aria-label="Ubuy home">
          U<span>buy</span>
        </Link>

        <HeaderSearch categories={categories} />

        <div className="header-actions">
          <DeliverTo />

          <Dropdown menu={{ items: accountItems }} placement="bottomRight" arrow>
            <button type="button" className="header-action">
              <User />
              <span className="header-action-label">
                <small>{user ? "Account" : "Sign in"}</small>
                <strong>{user ? user.name.split(" ")[0] : "Account"}</strong>
              </span>
              <ChevronDown style={{ fontSize: 10, opacity: 0.7 }} />
            </button>
          </Dropdown>

          <Link
            href={ROUTES.wishlist}
            className="header-action"
            aria-label="Wishlist"
          >
            <Badge count={wishlistIds.length} size="small" offset={[2, -2]}>
              <Heart style={{ fontSize: 18 }} />
            </Badge>
          </Link>

          <MiniCart />
        </div>
      </div>

      <div className="header-nav">
        <div className="container header-nav-inner">
          <MegaMenu categories={categories} trending={trending} />

          {/* CategoryBar reads the query string to mark the active tab.
              Isolating it behind Suspense keeps the rest of the header
              prerenderable — without a boundary, a static route calling
              useSearchParams fails the build. */}
          <Suspense fallback={<div className="category-bar-placeholder" />}>
            <CategoryBar />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
