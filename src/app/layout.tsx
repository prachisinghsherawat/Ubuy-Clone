import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import { BackToTop } from "@/components/layout/BackToTop";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import {
  getCategorySlugs,
  getFeatured,
} from "@/features/products/api/catalogue";
import { toCategories } from "@/features/products/data/categories";
import { SITE } from "@/lib/constants";
import { siteUrl } from "@/lib/site-url";
import { AppProviders } from "./providers";
import "./globals.css";

/**
 * Inter, self-hosted by `next/font`.
 *
 * Replaces Geist, whose wide geometric forms read oddly at UI sizes and made
 * dense rows (prices, filter labels, nav) look uneven. Inter is designed for
 * exactly this: tight vertical metrics, unambiguous digits and a large x-height
 * that stays legible at 12-13px. The mono face that shipped alongside Geist was
 * never referenced anywhere, so it is gone rather than downloaded for nothing.
 */
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  // Makes every relative OG/canonical URL in child metadata resolve absolutely.
  metadataBase: new URL(siteUrl()),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s · ${SITE.name}`,
  },
  description:
    "A Next.js and Ant Design rebuild of the Ubuy storefront: browse the catalogue, filter by brand and price, and run through a full cart and checkout flow.",
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_IN",
  },
};

/** Split from `metadata`: Next serves these as their own meta tags. */
export const viewport: Viewport = {
  themeColor: "#ff6a00",
  colorScheme: "light",
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
    <html lang="en" className={inter.variable}>
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
