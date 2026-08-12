"use client";

import { ArrowRightOutlined, ThunderboltFilled } from "@ant-design/icons";
import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";

import { getProductBySlug } from "@/features/products/data/products";
import { ROUTES } from "@/lib/constants";

export function Hero() {
  const showcase = getProductBySlug("meta-quest-2-128gb");

  return (
    <section className="hero">
      <div className="hero-copy">
        <span className="hero-eyebrow">
          <ThunderboltFilled /> 100+ countries · one cart
        </span>

        <h1 className="hero-title">
          Shop the world&apos;s brands, delivered to your doorstep in India
        </h1>

        <p className="hero-text">
          Over 300 million products from the US, UK, Japan and Korea — with customs,
          duties and door delivery handled for you.
        </p>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href={ROUTES.products}>
            <Button type="primary" size="large">
              Start shopping <ArrowRightOutlined />
            </Button>
          </Link>
          <Link href={`${ROUTES.products}?sort=discount`}>
            <Button
              size="large"
              ghost
              style={{ borderColor: "rgba(255,255,255,0.5)", color: "#fff" }}
            >
              Today&apos;s deals
            </Button>
          </Link>
        </div>
      </div>

      {showcase ? (
        <div className="hero-art">
          <Image
            src={showcase.image}
            alt={showcase.name}
            width={420}
            height={420}
            priority
          />
        </div>
      ) : null}
    </section>
  );
}
