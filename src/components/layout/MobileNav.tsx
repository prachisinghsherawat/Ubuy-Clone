"use client";

import {
  FireOutlined,
  HeartOutlined,
  LoginOutlined,
  LogoutOutlined,
  MenuOutlined,
  ShoppingOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { App, Button, Divider, Drawer } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useAuth } from "@/features/auth/AuthProvider";
import { categoryIcon } from "@/features/products/components/categoryIcons";
import { ROUTES } from "@/lib/constants";
import type { Category } from "@/types";

/**
 * Hamburger navigation for phone widths.
 *
 * The desktop header hides the account dropdown's labels and the category strip
 * scrolls off-screen, so on a phone this drawer is the only place the full
 * taxonomy and the account actions are reachable.
 */
export function MobileNav({ categories }: { categories: Category[] }) {
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();
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
        <MenuOutlined style={{ fontSize: 18 }} />
      </button>

      <Drawer
        title="Browse Ubuy"
        placement="left"
        open={open}
        onClose={close}
        width={310}
        styles={{ body: { padding: "12px 0" } }}
      >
        <div className="drawer-account">
          {user ? (
            <>
              <p>
                Signed in as <strong>{user.name}</strong>
              </p>
              <Button
                icon={<LogoutOutlined />}
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
                <Button type="primary" icon={<LoginOutlined />} block>
                  Sign in
                </Button>
              </Link>
              <Link href={ROUTES.signUp} onClick={close}>
                <Button icon={<UserAddOutlined />} block>
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>

        <Divider style={{ margin: "12px 0" }} />

        <nav className="drawer-links" aria-label="Quick links">
          <Link href={`${ROUTES.products}?sort=discount`} onClick={close}>
            <FireOutlined /> Today&apos;s Deals
          </Link>
          <Link href={`${ROUTES.products}?saved=1`} onClick={close}>
            <HeartOutlined /> Your Wishlist
          </Link>
          <Link href={ROUTES.products} onClick={close}>
            <ShoppingOutlined /> All Products
          </Link>
        </nav>

        <Divider style={{ margin: "12px 0" }} />

        <p className="drawer-heading">Shop by department</p>
        <nav className="drawer-links" aria-label="Categories">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`${ROUTES.products}?category=${category.slug}`}
              onClick={close}
            >
              {categoryIcon(category.icon)} {category.label}
            </Link>
          ))}
        </nav>
      </Drawer>
    </>
  );
}
