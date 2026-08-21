"use client";

import { Heart, LogOut, Package, UserRound } from "lucide-react";
import { App, Skeleton } from "antd";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";

import { EmptyState } from "@/components/ui/EmptyState";
import { useAuth } from "@/features/auth/AuthProvider";
import { ROUTES } from "@/lib/constants";

const NAV = [
  { href: ROUTES.account, label: "Overview", icon: <UserRound /> },
  { href: ROUTES.orders, label: "Your orders", icon: <Package /> },
  { href: ROUTES.wishlist, label: "Your wishlist", icon: <Heart /> },
];

/**
 * Chrome for every /account route: the identity card, the section nav and the
 * signed-out gate.
 *
 * The gate is a panel rather than a redirect on purpose — pushing to /signin
 * from an effect means rendering the private page for a frame first, and the
 * shopper loses the URL they were trying to reach. `?next=` brings them back.
 */
export function AccountShell({ children }: { children: ReactNode }) {
  const { user, hydrated, signOut } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const { message } = App.useApp();

  // The session lives in localStorage, so the first paint knows nothing yet.
  if (!hydrated) return <Skeleton active paragraph={{ rows: 8 }} />;

  if (!user) {
    return (
      <EmptyState
        description="Sign in to see your account"
        hint="Your orders, saved address and wishlist live here."
        action={{
          href: `${ROUTES.signIn}?next=${encodeURIComponent(pathname)}`,
          label: "Sign in",
          icon: <UserRound />,
        }}
      />
    );
  }

  return (
    <div className="account-layout">
      <div className="account-rail">
        <div className="surface-card card-pad account-identity">
          <span className="account-avatar" aria-hidden="true">
            {user.name.trim().charAt(0).toUpperCase()}
          </span>
          <div className="min-w-0">
            <strong>{user.name}</strong>
            <small>{user.email}</small>
          </div>
        </div>

        <nav className="surface-card account-nav" aria-label="Account sections">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                data-active={active}
                aria-current={active ? "page" : undefined}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}

          <button
            type="button"
            className="account-signout"
            onClick={() => {
              signOut();
              message.success("Signed out");
              router.push(ROUTES.home);
            }}
          >
            <LogOut />
            Sign out
          </button>
        </nav>
      </div>

      <div className="min-w-0">{children}</div>
    </div>
  );
}
