import { Skeleton } from "antd";
import type { Metadata } from "next";
import { Suspense } from "react";

import { AuthShell } from "@/features/auth/AuthShell";
import { SignUpForm } from "@/features/auth/SignUpForm";

export const metadata: Metadata = {
  title: "Create an account",
  description:
    "Create a Ubuy account to check out faster, save products and follow your orders.",
};

export default function SignUpPage() {
  return (
    <AuthShell
      heading="Shop the world, delivered to India"
      blurb="One account for a catalogue sourced from more than a hundred countries, with a single checkout in rupees."
    >
      <Suspense fallback={<Skeleton active paragraph={{ rows: 6 }} />}>
        <SignUpForm />
      </Suspense>
    </AuthShell>
  );
}
