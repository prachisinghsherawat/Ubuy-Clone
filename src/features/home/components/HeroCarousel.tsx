"use client";

import { ArrowRight, Zap } from "lucide-react";
import { Button, Carousel } from "antd";
import Image from "next/image";
import Link from "next/link";

import { ROUTES } from "@/lib/constants";
import { useCurrency } from "@/features/currency/CurrencyProvider";
import type { Product } from "@/types";

interface Slide {
  eyebrow: string;
  title: string;
  text: string;
  cta: string;
  href: string;
  background: string;
}

/** Trust markers, shown under the copy on every slide. */
const STATS = [
  { value: "300M+", label: "Products worldwide" },
  { value: "100+", label: "Countries sourced" },
  { value: "4.6★", label: "Average rating" },
];

/**
 * Editorial copy for the hero. Each slide is paired at render time with a real
 * product pulled from the catalogue, so the artwork and price are never stale
 * against what the shop actually sells.
 */
const SLIDES: Slide[] = [
  {
    eyebrow: "100+ countries · one cart",
    title: "Shop the world's brands, delivered to your doorstep in India",
    text: "Over 300 million products from the US, UK, Japan and Korea — with customs, duties and door delivery handled for you.",
    cta: "Start shopping",
    href: ROUTES.products,
    background:
      "radial-gradient(circle at 80% 20%, rgba(255,180,61,0.34), transparent 55%), linear-gradient(135deg, #3d1f36 0%, #a4432f 100%)",
  },
  {
    eyebrow: "Tech week",
    title: "Flagship smartphones and laptops, up to 30% off",
    text: "Genuine imports with international warranty. Pay in rupees, track every step to your door.",
    cta: "Shop electronics",
    href: `${ROUTES.products}?category=smartphones`,
    background:
      "radial-gradient(circle at 75% 30%, rgba(255,106,61,0.40), transparent 55%), linear-gradient(135deg, #40203c 0%, #8c3a6b 100%)",
  },
  {
    eyebrow: "Beauty & fragrance",
    title: "Luxury beauty you cannot find on the high street",
    text: "Designer perfumes, skincare and cosmetics sourced direct from authorised international sellers.",
    cta: "Shop beauty",
    href: `${ROUTES.products}?category=fragrances`,
    background:
      "radial-gradient(circle at 78% 25%, rgba(255,180,61,0.30), transparent 52%), linear-gradient(135deg, #7a1f3e 0%, #c95570 100%)",
  },
];

export function HeroCarousel({ products }: { products: Product[] }) {
  const { format } = useCurrency();

  return (
    <Carousel
      // `dotDuration` animates the active dot across the autoplay interval, so
      // the carousel shows how long the slide has left rather than just cutting.
      autoplay={{ dotDuration: true }}
      autoplaySpeed={6000}
      className="hero-carousel"
      draggable
      arrows
      pauseOnHover
      dotPlacement="bottom"
    >
      {SLIDES.map((slide, index) => {
        // Cycle through whatever the catalogue returned so a short list still
        // fills every slide.
        const product = products.length ? products[index % products.length] : null;

        return (
          <div key={slide.title}>
            <section className="hero" style={{ background: slide.background }}>
              {/* Decorative depth only — no content, so kept out of the a11y
                  tree rather than described. */}
              <span className="hero-orb hero-orb-a" aria-hidden="true" />
              <span className="hero-orb hero-orb-b" aria-hidden="true" />

              <div className="hero-inner">
                <div className="hero-copy">
                  <span className="hero-eyebrow">
                    <Zap fill="currentColor" /> {slide.eyebrow}
                  </span>
                  <h1 className="hero-title">{slide.title}</h1>
                  <p className="hero-text">{slide.text}</p>

                  <div className="hero-actions">
                    <Link href={slide.href}>
                      <Button
                        type="primary"
                        size="large"
                        icon={<ArrowRight />}
                        iconPlacement="end"
                      >
                        {slide.cta}
                      </Button>
                    </Link>
                    <Link href={`${ROUTES.products}?sort=discount`}>
                      <Button size="large" className="hero-ghost">
                        Today&apos;s deals
                      </Button>
                    </Link>
                  </div>

                  <div className="hero-stats">
                    {STATS.map((stat) => (
                      <div className="hero-stat" key={stat.label}>
                        <strong>{stat.value}</strong>
                        <span>{stat.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {product ? (
                  <Link href={ROUTES.product(product.slug)} className="hero-art">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      // The first slide's art is the LCP element. `priority` is
                      // deprecated in Next 16, and `preload` is the wrong tool
                      // here because the remaining slides are equally likely to
                      // be the LCP once the carousel advances.
                      loading={index === 0 ? "eager" : "lazy"}
                      fetchPriority={index === 0 ? "high" : "auto"}
                      sizes="(max-width: 900px) 100vw, 440px"
                      style={{ objectFit: "contain" }}
                    />
                    <span className="hero-price">
                      <small>{product.brand}</small>
                      <strong>{format(product.price)}</strong>
                    </span>
                  </Link>
                ) : null}
              </div>
            </section>
          </div>
        );
      })}
    </Carousel>
  );
}
