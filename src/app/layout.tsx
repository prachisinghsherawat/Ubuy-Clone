import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { BackToTop } from "@/components/layout/BackToTop";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import {
  getCategorySlugs,
  getFeatured,
} from "@/features/products/api/catalogue";
import { toCategories } from "@/features/products/data/categories";
import { SITE } from "@/lib/constants";
import { AppProviders } from "./providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s · ${SITE.name}`,
  },
  description:
    "A Next.js and Ant Design rebuild of the Ubuy storefront: browse the catalogue, filter by brand and price, and run through a full cart and checkout flow.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  // The nav is built from the live catalogue, not a hardcoded list. Both calls
  // are backed by the same hourly-revalidated fetch the pages use, so this adds
  // no upstream traffic — it is deduped within the render pass.
  const [categorySlugs, featured] = await Promise.all([
    getCategorySlugs(),
    getFeatured(4),
  ]);

  const categories = toCategories(categorySlugs);
  // Only the fields the mega menu renders cross into the client bundle.
  const trending = featured.map((product) => ({
    id: product.id,
    slug: product.slug,
    name: product.name,
    brand: product.brand,
    category: product.category,
    price: product.price,
    listPrice: product.listPrice,
    image: product.image,
  }));

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <AppProviders>
          <SiteHeader categories={categories} trending={trending} />
          <main>{children}</main>
          <SiteFooter />
          <BackToTop />
        </AppProviders>
      </body>
    </html>
  );
}
