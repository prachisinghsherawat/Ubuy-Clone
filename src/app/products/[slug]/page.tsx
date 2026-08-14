import { Breadcrumb, Tag } from "antd";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { getProductBySlug, getRelated } from "@/features/products/api/catalogue";
import { ProductBuyBox } from "@/features/products/components/ProductBuyBox";
import { ProductGallery } from "@/features/products/components/ProductGallery";
import { ProductRail } from "@/features/products/components/ProductRail";
import { ProductTabs } from "@/features/products/components/ProductTabs";
import { categoryLabel } from "@/features/products/data/categories";
import { ROUTES } from "@/lib/constants";
import { estimatedDelivery, formatCount } from "@/lib/format";

export async function generateMetadata(
  props: PageProps<"/products/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product not found" };

  return {
    title: product.name,
    description: product.description.slice(0, 160),
    openGraph: {
      title: product.name,
      description: product.description.slice(0, 160),
      images: product.image ? [product.image] : undefined,
    },
  };
}

export default async function ProductPage(props: PageProps<"/products/[slug]">) {
  const { slug } = await props.params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = await getRelated(product, 10);

  return (
    <div className="container page">
      <Breadcrumb
        style={{ marginBottom: 18 }}
        items={[
          { title: <Link href={ROUTES.home}>Home</Link> },
          { title: <Link href={ROUTES.products}>Products</Link> },
          {
            title: (
              <Link href={`${ROUTES.products}?category=${product.category}`}>
                {categoryLabel(product.category)}
              </Link>
            ),
          },
          { title: product.name },
        ]}
      />

      <div className="detail-grid">
        <ProductGallery images={product.images} name={product.name} />

        <div>
          <Link
            href={`${ROUTES.products}?brand=${encodeURIComponent(product.brand)}`}
            style={{ color: "var(--brand-orange)", fontWeight: 600, fontSize: 13.5 }}
          >
            {product.brand}
          </Link>

          <h1 className="detail-title">{product.name}</h1>

          <div className="detail-meta">
            {/* A glyph rather than `@ant-design/icons`: that package creates a
                React context at module scope and cannot be imported from a
                Server Component. */}
            <span style={{ color: "var(--brand-amber)" }}>
              ★ {product.rating.toFixed(1)}
            </span>
            <span>{formatCount(product.reviewCount)} ratings</span>
            <span>·</span>
            <span>Sold by {product.store}</span>
            {product.badge ? <Tag color="volcano">{product.badge}</Tag> : null}
          </div>

          {product.highlights.length > 0 ? (
            <ul className="spec-list" style={{ marginTop: 18 }}>
              {product.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          ) : null}

          {product.tags?.length ? (
            <div style={{ marginTop: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
              {product.tags.map((tag) => (
                <Link key={tag} href={`${ROUTES.products}?q=${encodeURIComponent(tag)}`}>
                  <Tag style={{ cursor: "pointer" }}>#{tag}</Tag>
                </Link>
              ))}
            </div>
          ) : null}
        </div>

        {/* The estimate is computed here so the server and client renders agree —
            calling `new Date()` inside the client component would not. */}
        <ProductBuyBox product={product} deliveryDate={estimatedDelivery()} />
      </div>

      <section className="section">
        <div className="surface-card" style={{ padding: "8px 20px 20px" }}>
          <ProductTabs product={product} />
        </div>
      </section>

      {related.length > 0 ? (
        <section className="section">
          <SectionHeading
            title="You may also like"
            subtitle={`More from ${categoryLabel(product.category)} and other top-rated picks`}
            href={`${ROUTES.products}?category=${product.category}`}
          />
          <ProductRail products={related} />
        </section>
      ) : null}
    </div>
  );
}
