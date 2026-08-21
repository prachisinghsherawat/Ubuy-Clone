import type { Metadata } from "next";

import { AccountShell } from "@/features/account/AccountShell";

export const metadata: Metadata = {
  title: "Your account",
  // Everything under /account is personal and sits behind the sign-in gate, so
  // it has no business in an index. Inherited by every child route.
  robots: { index: false, follow: false },
};

export default function AccountLayout({ children }: LayoutProps<"/account">) {
  return (
    <div className="container page">
      <AccountShell>{children}</AccountShell>
    </div>
  );
}
