import { Skeleton } from "antd";
import type { Metadata } from "next";
import { Suspense } from "react";

import { AuthShell } from "@/features/auth/AuthShell";
import { SignInForm } from "@/features/auth/SignInForm";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your Ubuy account to track orders and sync your wishlist.",
};

export default function SignInPage() {
  return (
    <AuthShell
      heading="Welcome back to Ubuy"
      blurb="Pick up where you left off — your cart, wishlist and saved address are waiting."
    >
      {/* The form reads `?next=` to know where to return the shopper. */}
      <Suspense fallback={<Skeleton active paragraph={{ rows: 5 }} />}>
        <SignInForm />
      </Suspense>
    </AuthShell>
  );
}
