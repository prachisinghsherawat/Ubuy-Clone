import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Cart and checkout are per-session and carry no indexable content; the
      // listing's filter permutations would otherwise flood the crawl budget.
      disallow: ["/cart", "/checkout", "/api/", "/products?"],
    },
    sitemap: `${siteUrl()}/sitemap.xml`,
  };
}
