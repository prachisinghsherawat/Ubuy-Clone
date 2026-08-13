import { SectionHeading } from "@/components/ui/SectionHeading";
import { CategoryTiles } from "@/features/home/components/CategoryTiles";
import { HeroCarousel } from "@/features/home/components/HeroCarousel";
import { Newsletter } from "@/features/home/components/Newsletter";
import { PromoTiles } from "@/features/home/components/PromoTiles";
import { ValueStrip } from "@/features/home/components/ValueStrip";
import {
  getByCategory,
  getCategorySlugs,
  getDeals,
  getFeatured,
} from "@/features/products/api/catalogue";
import { ProductGrid } from "@/features/products/components/ProductGrid";
import { ProductRail } from "@/features/products/components/ProductRail";
import { toCategories } from "@/features/products/data/categories";
import { ROUTES } from "@/lib/constants";

export default async function HomePage() {
  // One cached catalogue fetch backs all of these; the requests are deduped
  // within the render pass, so this is a single upstream call.
  const [deals, featured, categorySlugs, smartphones, beauty] = await Promise.all([
    getDeals(10),
    getFeatured(10),
    getCategorySlugs(),
    getByCategory("smartphones", 10),
    getByCategory("fragrances", 10),
  ]);

  return (
    <>
      {/* Outside the container on purpose: the hero spans the full viewport
          width and re-constrains its own content to the page grid. */}
      <HeroCarousel products={featured.slice(0, 3)} />

      <div className="container page">
        <ValueStrip />

        <section className="section">
          <SectionHeading
            title="Shop by category"
            subtitle={`${categorySlugs.length} departments, one international checkout`}
            href={ROUTES.products}
          />
          <CategoryTiles categories={toCategories(categorySlugs)} />
        </section>

        <section className="section">
          <SectionHeading
            title="Today's deals"
            subtitle="Biggest price drops across the catalogue"
            href={`${ROUTES.products}?sort=discount`}
          />
          <ProductRail products={deals} />
        </section>

        <section className="section">
          <PromoTiles />
        </section>

        <section className="section">
          <SectionHeading
            title="Top rated this week"
            subtitle="What everyone else is adding to their cart"
            href={`${ROUTES.products}?sort=rating`}
          />
          <ProductGrid products={featured.slice(0, 8)} />
        </section>

        <section className="section">
          <SectionHeading
            title="Smartphones"
            subtitle="Flagships and daily drivers, ready to ship"
            href={`${ROUTES.products}?category=smartphones`}
          />
          <ProductRail products={smartphones} />
        </section>

        <section className="section">
          <SectionHeading
            title="Fragrances"
            subtitle="Designer scents sourced from authorised sellers"
            href={`${ROUTES.products}?category=fragrances`}
          />
          <ProductRail products={beauty} />
        </section>

        <section className="section">
          <Newsletter />
        </section>
      </div>
    </>
  );
}
