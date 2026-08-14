import { Skeleton } from "antd";
import type { Metadata } from "next";
import { Suspense } from "react";

import {
  getBrands,
  getCatalogue,
  getCategorySlugs,
} from "@/features/products/api/catalogue";
import { ProductListing } from "@/features/products/components/ProductListing";
import { categoryLabel } from "@/features/products/data/categories";

/** Search params arrive as string | string[]; the listing only reads scalars. */
function firstValue(value: string | string[] | undefined): string {
  return Array.isArray(value) ? (value[0] ?? "") : (value ?? "");
}

export async function generateMetadata(
  props: PageProps<"/products">,
): Promise<Metadata> {
  const params = await props.searchParams;
  const search = firstValue(params.q);
  const category = firstValue(params.category);

  if (firstValue(params.saved) === "1") {
    return { title: "Your wishlist", robots: { index: false } };
  }
  if (search) {
    return { title: `Search: ${search}`, robots: { index: false } };
  }
  if (category && !category.includes(",")) {
    return {
      title: categoryLabel(category),
      description: `Shop ${categoryLabel(category).toLowerCase()} on Ubuy — international brands, delivered to India.`,
    };
  }

  return {
    title: "All products",
    description:
      "Browse the full Ubuy catalogue. Filter by category, brand, price and rating, and sort by price, discount or customer rating.",
  };
}

/**
 * Reading `searchParams` above opts this route into dynamic rendering, and that
 * matters for more than the title: on a statically prerendered route the
 * listing's `useSearchParams` call would bail out to client-only rendering and
 * ship an empty grid in the HTML. Rendering per request means the filtered
 * results are in the first response.
 */
export default async function ProductsPage() {
  // Three calls, one upstream request: they all share the cached catalogue
  // fetch, deduped within the render pass.
  const [catalogue, brands, categories] = await Promise.all([
    getCatalogue(),
    getBrands(),
    getCategorySlugs(),
  ]);

  return (
    <div className="container page">
      <Suspense fallback={<Skeleton active paragraph={{ rows: 10 }} />}>
        <ProductListing catalogue={catalogue} brands={brands} categories={categories} />
      </Suspense>
    </div>
  );
}
