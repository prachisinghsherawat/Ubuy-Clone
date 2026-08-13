"use client";

import { ArrowRightOutlined, ThunderboltFilled } from "@ant-design/icons";
import { Button, Carousel } from "antd";
import Image from "next/image";
import Link from "next/link";

import { ROUTES } from "@/lib/constants";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/types";

interface Slide {
  eyebrow: string;
  title: string;
  text: string;
  cta: string;
  href: string;
  background: string;
}

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
      "radial-gradient(circle at 80% 20%, rgba(255,177,0,0.32), transparent 55%), linear-gradient(135deg, #0f2540 0%, #1d4f7c 100%)",
  },
  {
    eyebrow: "Tech week",
    title: "Flagship smartphones and laptops, up to 30% off",
    text: "Genuine imports with international warranty. Pay in rupees, track every step to your door.",
    cta: "Shop electronics",
    href: `${ROUTES.products}?category=smartphones`,
    background:
      "radial-gradient(circle at 75% 30%, rgba(226,87,31,0.38), transparent 55%), linear-gradient(135deg, #2a1a4d 0%, #4b2a86 100%)",
  },
  {
    eyebrow: "Beauty & fragrance",
    title: "Luxury beauty you cannot find on the high street",
    text: "Designer perfumes, skincare and cosmetics sourced direct from authorised international sellers.",
    cta: "Shop beauty",
    href: `${ROUTES.products}?category=fragrances`,
    background:
      "radial-gradient(circle at 78% 25%, rgba(255,177,0,0.28), transparent 52%), linear-gradient(135deg, #6d1b3f 0%, #a83a63 100%)",
  },
];

export function HeroCarousel({ products }: { products: Product[] }) {
  return (
    <Carousel autoplay autoplaySpeed={6000} className="hero-carousel" draggable>
      {SLIDES.map((slide, index) => {
        // Cycle through whatever the catalogue returned so a short list still
        // fills every slide.
        const product = products.length ? products[index % products.length] : null;

        return (
          <div key={slide.title}>
            <section className="hero" style={{ background: slide.background }}>
              <div className="hero-copy">
                <span className="hero-eyebrow">
                  <ThunderboltFilled /> {slide.eyebrow}
                </span>
                <h1 className="hero-title">{slide.title}</h1>
                <p className="hero-text">{slide.text}</p>

                <div className="hero-actions">
                  <Link href={slide.href}>
                    <Button type="primary" size="large" icon={<ArrowRightOutlined />} iconPosition="end">
                      {slide.cta}
                    </Button>
                  </Link>
                  <Link href={`${ROUTES.products}?sort=discount`}>
                    <Button size="large" className="hero-ghost">
                      Today&apos;s deals
                    </Button>
                  </Link>
                </div>
              </div>

              {product ? (
                <Link href={ROUTES.product(product.slug)} className="hero-art">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 900px) 100vw, 480px"
                    style={{ objectFit: "contain" }}
                  />
                  <span className="hero-price">
                    <small>{product.brand}</small>
                    <strong>{formatPrice(product.price)}</strong>
                  </span>
                </Link>
              ) : null}
            </section>
          </div>
        );
      })}
    </Carousel>
  );
}
