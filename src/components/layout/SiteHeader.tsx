"use client";

import {
  DownOutlined,
  GlobalOutlined,
  HeartOutlined,
  LogoutOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  TruckOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { App, Badge, Button, Dropdown, Input, type MenuProps } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";

import { CategoryBar } from "@/components/layout/CategoryBar";
import { useAuth } from "@/features/auth/AuthProvider";
import { useCart } from "@/features/cart/CartProvider";
import { useWishlist } from "@/features/wishlist/WishlistProvider";
import { ROUTES, SITE } from "@/lib/constants";

export function SiteHeader() {
  const router = useRouter();
  const { message } = App.useApp();
  const { totals, hydrated } = useCart();
  const { ids: wishlistIds } = useWishlist();
  const { user, signOut } = useAuth();
  const [term, setTerm] = useState("");

  const submitSearch = () => {
    const trimmed = term.trim();
    router.push(trimmed ? `${ROUTES.products}?q=${encodeURIComponent(trimmed)}` : ROUTES.products);
  };

  const accountItems: MenuProps["items"] = user
    ? [
        { key: "greeting", label: `Hi, ${user.name.split(" ")[0]}`, disabled: true },
        { type: "divider" },
        {
          key: "orders",
          icon: <ShoppingOutlined />,
          label: <Link href={ROUTES.cart}>Your Orders</Link>,
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
    <header className="site-header">
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

        <div className="header-search">
          <Input
            size="large"
            allowClear
            value={term}
            onChange={(event) => setTerm(event.target.value)}
            onPressEnter={submitSearch}
            placeholder="Search for products, brands and categories"
            aria-label="Search products"
            suffix={
              <Button
                type="primary"
                icon={<SearchOutlined />}
                onClick={submitSearch}
                aria-label="Search"
              />
            }
            styles={{ root: { paddingInlineEnd: 4 } }}
          />
        </div>

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

          <Link href={ROUTES.cart} className="header-action" aria-label="Cart">
            <Badge count={hydrated ? totals.itemCount : 0} size="small" offset={[2, -2]}>
              <ShoppingCartOutlined style={{ color: "#fff", fontSize: 20 }} />
            </Badge>
            <span className="header-action-label">
              <small>Cart</small>
              <strong>{hydrated ? totals.itemCount : 0} items</strong>
            </span>
          </Link>
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
