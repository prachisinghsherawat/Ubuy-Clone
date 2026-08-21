"use client";

import {
  Flame,
  Heart,
  LogIn,
  LogOut,
  Menu,
  Package,
  ReceiptText,
  UserPlus,
  UserRound,
} from "lucide-react";
import { App, Button, Divider, Drawer, Select } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useAuth } from "@/features/auth/AuthProvider";
import { useCurrency } from "@/features/currency/CurrencyProvider";
import { DESTINATIONS } from "@/features/currency/destinations";
import { categoryIcon } from "@/features/products/components/categoryIcons";
import { ROUTES } from "@/lib/constants";
import type { Category } from "@/types";

export function MobileNav({ categories }: { categories: Category[] }) {
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { destination, setCountry } = useCurrency();
  const { message } = App.useApp();
  const router = useRouter();

  const close = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        className="header-action mobile-nav-trigger"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
      >
        <Menu style={{ fontSize: 18 }} />
      </button>

      <Drawer
        title="Browse Ubuy"
        placement="left"
        open={open}
        onClose={close}
        size={310}
        styles={{ body: { padding: "12px 0" } }}
      >
        <div className="drawer-account">
          {user ? (
            <>
              <p>
                Signed in as <strong>{user.name}</strong>
              </p>
              <Link href={ROUTES.account} onClick={close}>
                <Button icon={<UserRound />} block style={{ marginBottom: 8 }}>
                  Your account
                </Button>
              </Link>
              <Button
                icon={<LogOut />}
                danger
                block
                onClick={() => {
                  signOut();
                  message.success("Signed out");
                  close();
                  router.push(ROUTES.home);
                }}
              >
                Sign out
              </Button>
            </>
          ) : (
            <div className="drawer-auth-actions">
              <Link href={ROUTES.signIn} onClick={close}>
                <Button type="primary" icon={<LogIn />} block>
                  Sign in
                </Button>
              </Link>
              <Link href={ROUTES.signUp} onClick={close}>
                <Button icon={<UserPlus />} block>
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>

        <Divider style={{ margin: "12px 0" }} />

        <nav className="drawer-links" aria-label="Quick links">
          <Link href={`${ROUTES.products}?sort=discount`} onClick={close}>
            <Flame /> Today&apos;s Deals
          </Link>
          <Link href={ROUTES.wishlist} onClick={close}>
            <Heart /> Your Wishlist
          </Link>
          {user ? (
            <Link href={ROUTES.orders} onClick={close}>
              <ReceiptText /> Your Orders
            </Link>
          ) : null}
          <Link href={ROUTES.products} onClick={close}>
            <Package /> All Products
          </Link>
        </nav>

        <Divider style={{ margin: "12px 0" }} />

        {/* The header's "Deliver to" control is hidden at phone widths so the
            cart and account still fit the row, so it lives here instead —
            hiding it outright would strand the currency on mobile. */}
        <p className="drawer-heading">Ship to &amp; currency</p>
        <div style={{ padding: "0 16px 4px" }}>
          <Select
            value={destination.country}
            onChange={setCountry}
            style={{ width: "100%" }}
            options={DESTINATIONS.map((entry) => ({
              value: entry.country,
              label: `${entry.flag}  ${entry.country} · ${entry.currency}`,
            }))}
          />
        </div>

        <Divider style={{ margin: "12px 0" }} />

        <p className="drawer-heading">Shop by department</p>
        <nav className="drawer-links" aria-label="Categories">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`${ROUTES.products}?category=${category.slug}`}
              onClick={close}
            >
              {categoryIcon(category.slug)} {category.label}
            </Link>
          ))}
        </nav>
      </Drawer>
    </>
  );
}
