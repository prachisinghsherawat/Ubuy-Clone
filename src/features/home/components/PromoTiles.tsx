import { ArrowRightOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import Link from "next/link";

import { ROUTES } from "@/lib/constants";

const TILES = [
  {
    title: "Audio, up to 30% off",
    text: "AirPods, Bose and JBL — noise cancelled, price cut.",
    href: `${ROUTES.products}?category=audio`,
    background:
      "radial-gradient(circle at 78% 22%, rgba(255,177,0,0.35), transparent 52%), linear-gradient(135deg, #2a1a4d 0%, #4b2a86 100%)",
  },
  {
    title: "Build your gaming setup",
    text: "Consoles, VR headsets and 240Hz panels from global stores.",
    href: `${ROUTES.products}?category=gaming`,
    background:
      "radial-gradient(circle at 20% 20%, rgba(226,87,31,0.42), transparent 55%), linear-gradient(135deg, #10243f 0%, #16506b 100%)",
  },
  {
    title: "Big-screen 4K TVs",
    text: "Samsung, TCL and VIZIO — shipped and duty paid.",
    href: `${ROUTES.products}?category=tv`,
    background:
      "radial-gradient(circle at 80% 80%, rgba(15,157,118,0.45), transparent 50%), linear-gradient(135deg, #0c2f2a 0%, #14584a 100%)",
  },
];

export function PromoTiles() {
  return (
    <Row gutter={[16, 16]}>
      {TILES.map((tile) => (
        <Col key={tile.title} xs={24} md={8}>
          <Link href={tile.href} className="promo-tile" style={{ background: tile.background }}>
            <h3>{tile.title}</h3>
            <p>{tile.text}</p>
            <span style={{ color: "var(--brand-amber)", fontWeight: 600, fontSize: 14 }}>
              Shop now <ArrowRightOutlined />
            </span>
          </Link>
        </Col>
      ))}
    </Row>
  );
}
