import { CategoryTiles } from "@/features/home/components/CategoryTiles";
import { Hero } from "@/features/home/components/Hero";
import { Newsletter } from "@/features/home/components/Newsletter";
import { PromoTiles } from "@/features/home/components/PromoTiles";
import { ValueStrip } from "@/features/home/components/ValueStrip";
import { ProductGrid } from "@/features/products/components/ProductGrid";
import { ProductRail } from "@/features/products/components/ProductRail";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  getByCategory,
  getDeals,
  getFeatured,
} from "@/features/products/data/products";
import { ROUTES } from "@/lib/constants";

export default function HomePage() {
  const deals = getDeals(8);
  const featured = getFeatured(8);
  const gaming = getByCategory("gaming", 8);

  return (
    <div className="container page">
      <Hero />

      <div style={{ marginTop: 24 }}>
        <ValueStrip />
      </div>

      <section className="section">
        <SectionHeading
          title="Shop by category"
          subtitle="Eight departments, one international checkout"
          href={ROUTES.products}
        />
        <CategoryTiles />
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
          title="Best sellers & new arrivals"
          subtitle="What everyone else is adding to their cart this week"
          href={ROUTES.products}
        />
        <ProductGrid products={featured} />
      </section>

      <section className="section">
        <SectionHeading
          title="Gaming HQ"
          subtitle="Consoles, controllers and VR — ready to ship"
          href={`${ROUTES.products}?category=gaming`}
        />
        <ProductRail products={gaming} />
      </section>

      <section className="section">
        <Newsletter />
      </section>
    </div>
  );
}
