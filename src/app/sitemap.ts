import type { MetadataRoute } from "next";

import { getCatalogue, getCategorySlugs } from "@/features/products/api/catalogue";
import { ROUTES } from "@/lib/constants";
import { siteUrl } from "@/lib/site-url";

/** Regenerated on the same hourly cadence as the catalogue itself. */
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl();
  const lastModified = new Date();

  const [catalogue, categories] = await Promise.all([
    getCatalogue(),
    getCategorySlugs(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified, changeFrequency: "daily", priority: 1 },
    {
      url: `${base}${ROUTES.products}`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.9,
    },
    { url: `${base}${ROUTES.signIn}`, lastModified, priority: 0.3 },
    { url: `${base}${ROUTES.signUp}`, lastModified, priority: 0.3 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${base}${ROUTES.products}?category=${category}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const productRoutes: MetadataRoute.Sitemap = catalogue.map((product) => ({
    url: `${base}${ROUTES.product(product.slug)}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
