import {
  FacebookFilled,
  InstagramFilled,
  SafetyCertificateOutlined,
  TwitterOutlined,
  YoutubeFilled,
} from "@ant-design/icons";
import Link from "next/link";

import { CATEGORIES } from "@/features/products/data/categories";
import { ROUTES, SITE } from "@/lib/constants";

const COLUMNS = [
  {
    title: "Customer Service",
    links: [
      "Help Centre",
      "Track Your Order",
      "Shipping & Delivery",
      "Returns & Refunds",
      "Payment Options",
    ],
  },
  {
    title: "About Ubuy",
    links: ["Our Story", "Careers", "Press", "Affiliate Programme", "Sell on Ubuy"],
  },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="container footer-grid">
          <div className="footer-col">
            <Link href={ROUTES.home} className="header-brand" style={{ fontSize: 24 }}>
              U<span>buy</span>
            </Link>
            <p style={{ marginTop: 14, fontSize: 13.5, lineHeight: 1.7, maxWidth: "38ch" }}>
              {SITE.tagline}. Shop products from the US, UK, Korea, Japan and China —
              delivered to your door with customs and duties handled for you.
            </p>
            <p style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
              <SafetyCertificateOutlined style={{ color: "var(--brand-amber)" }} />
              100% secure payments
            </p>
          </div>

          <div className="footer-col">
            <h4>Shop</h4>
            <ul>
              {CATEGORIES.slice(0, 5).map((category) => (
                <li key={category.slug}>
                  <Link href={`${ROUTES.products}?category=${category.slug}`}>
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {COLUMNS.map((column) => (
            <div className="footer-col" key={column.title}>
              <h4>{column.title}</h4>
              <ul>
                {column.links.map((link) => (
                  <li key={link}>
                    {/* Informational pages are out of scope for this clone. */}
                    <Link href={ROUTES.products}>{link}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} {SITE.name} clone · Built with Next.js and Ant
          Design
        </span>
        <div className="social-row">
          <a href="#" aria-label="Facebook">
            <FacebookFilled />
          </a>
          <a href="#" aria-label="Twitter">
            <TwitterOutlined />
          </a>
          <a href="#" aria-label="Instagram">
            <InstagramFilled />
          </a>
          <a href="#" aria-label="YouTube">
            <YoutubeFilled />
          </a>
        </div>
      </div>
    </footer>
  );
}
