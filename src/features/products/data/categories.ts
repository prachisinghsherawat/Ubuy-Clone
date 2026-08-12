import type { Category } from "@/types";

/** The shop taxonomy. `icon` maps to a key in CATEGORY_ICONS (client side). */
export const CATEGORIES: Category[] = [
  {
    slug: "streaming",
    label: "Streaming",
    icon: "playSquare",
    blurb: "Sticks, boxes and everything binge-worthy",
  },
  {
    slug: "audio",
    label: "Audio",
    icon: "sound",
    blurb: "Headphones, earbuds and portable speakers",
  },
  {
    slug: "gaming",
    label: "Gaming",
    icon: "rocket",
    blurb: "Consoles, controllers and VR headsets",
  },
  {
    slug: "tv",
    label: "TV & Displays",
    icon: "desktop",
    blurb: "4K smart TVs from global brands",
  },
  {
    slug: "computers",
    label: "Computers",
    icon: "laptop",
    blurb: "Laptops, gaming rigs and monitors",
  },
  {
    slug: "cameras",
    label: "Cameras & Drones",
    icon: "camera",
    blurb: "Webcams, drones and conference cams",
  },
  {
    slug: "smart-home",
    label: "Smart Home",
    icon: "home",
    blurb: "Doorbells, speakers and assistants",
  },
  {
    slug: "accessories",
    label: "Accessories",
    icon: "thunderbolt",
    blurb: "Chargers, cables and batteries",
  },
];

export const CATEGORY_BY_SLUG = new Map(CATEGORIES.map((c) => [c.slug, c]));

export function categoryLabel(slug: string): string {
  return CATEGORY_BY_SLUG.get(slug as Category["slug"])?.label ?? "All";
}
