import type { CategorySlug, Product } from "@/types";

/**
 * Static catalogue, ported from the original `scripts/sorting.js` array.
 *
 * Two fixes were carried over from the legacy data: brands now match the actual
 * manufacturer (so brand filtering is meaningful) and list prices are always
 * above the selling price (the Ring doorbell had them inverted).
 */
interface Seed {
  slug: string;
  name: string;
  brand: string;
  category: CategorySlug;
  price: number;
  listPrice: number;
  rating: number;
  reviewCount: number;
  /** Amazon media id — expanded to a full CDN url below. */
  imageId: string;
  highlights: string[];
  description: string;
  badge?: Product["badge"];
  inStock?: boolean;
}

const SEEDS: Seed[] = [
  {
    slug: "fire-tv-stick-alexa-voice-remote",
    name: "Fire TV Stick with Alexa Voice Remote",
    brand: "Amazon",
    category: "streaming",
    price: 2656,
    listPrice: 4019,
    rating: 4.6,
    reviewCount: 128_430,
    imageId: "51KKR5uGn6L",
    highlights: [
      "Full HD streaming with Dolby Atmos audio",
      "Alexa Voice Remote with TV power and volume controls",
      "Works with Netflix, Prime Video, Disney+ and 10,000+ apps",
    ],
    description:
      "The best-selling streaming stick, now faster and with a redesigned voice remote. Plug it into any HDMI port and turn an ordinary television into a full smart TV in under two minutes.",
    badge: "Best Seller",
  },
  {
    slug: "echo-dot-3rd-gen-smart-speaker",
    name: "Echo Dot (3rd Gen) Smart Speaker with Alexa",
    brand: "Amazon",
    category: "smart-home",
    price: 2202,
    listPrice: 4019,
    rating: 4.5,
    reviewCount: 96_218,
    imageId: "6182S7MYC2L",
    highlights: [
      "Improved speaker for richer, louder sound",
      "Voice control for music, news, timers and smart devices",
      "Pairs with other Echo devices for multi-room audio",
    ],
    description:
      "A compact smart speaker that fits anywhere and answers almost anything. Ask Alexa to play music, read the news, control compatible lights or set a reminder — hands free.",
    badge: "Deal",
  },
  {
    slug: "amazon-basics-aaa-batteries-36-pack",
    name: "Amazon Basics 36 Pack AAA High-Performance Batteries",
    brand: "Amazon Basics",
    category: "accessories",
    price: 1409,
    listPrice: 1599,
    rating: 4.7,
    reviewCount: 214_907,
    imageId: "71nDX36Y9UL",
    highlights: [
      "36 alkaline AAA cells in a resealable storage box",
      "10-year leak-free shelf life",
      "Reliable power for remotes, toys and wireless peripherals",
    ],
    description:
      "Household batteries that just work. A ten-year shelf life means the spare pack in the drawer is still full when you finally reach for it.",
  },
  {
    slug: "fire-tv-stick-4k-max",
    name: "Fire TV Stick 4K Max Streaming Device",
    brand: "Amazon",
    category: "streaming",
    price: 3565,
    listPrice: 5302,
    rating: 4.7,
    reviewCount: 74_512,
    imageId: "41XTOfFgUqL",
    highlights: [
      "4K Ultra HD with Dolby Vision, HDR10+ and Atmos",
      "Wi-Fi 6 support for smoother streaming",
      "40% more powerful than the Fire TV Stick 4K",
    ],
    description:
      "The quickest Fire TV stick Amazon ships. Wi-Fi 6, a faster processor and picture-in-picture live camera feeds make it the one to buy if your router and TV can keep up.",
    badge: "New",
  },
  {
    slug: "apple-20w-usb-c-power-adapter",
    name: "Apple 20W USB-C Power Adapter",
    brand: "Apple",
    category: "accessories",
    price: 2019,
    listPrice: 2112,
    rating: 4.8,
    reviewCount: 58_331,
    imageId: "41iWogJnZQL",
    highlights: [
      "Fast, efficient charging at home or on the go",
      "Charges iPhone from 0 to 50% in around 30 minutes",
      "Compatible with iPad, AirPods and Apple Watch",
    ],
    description:
      "Apple's compact 20W USB-C brick — the fast charger that no longer comes in the box. Pair it with a USB-C to Lightning cable for the quickest top-up your iPhone supports.",
  },
  {
    slug: "turtle-beach-stealth-600-gen-2",
    name: "Turtle Beach Stealth 600 Gen 2 Wireless Gaming Headset",
    brand: "Turtle Beach",
    category: "gaming",
    price: 8558,
    listPrice: 9467,
    rating: 4.4,
    reviewCount: 31_204,
    imageId: "61iHiW114KL",
    highlights: [
      "15-hour battery on a lag-free wireless connection",
      "Flip-to-mute mic with improved noise isolation",
      "Glasses-friendly ProSpecs ear cushions",
    ],
    description:
      "A console headset that gets the fundamentals right: comfortable over long sessions, genuinely lag free, and with a mic your squad can actually understand.",
  },
  {
    slug: "jbl-flip-4-bluetooth-speaker",
    name: "JBL FLIP 4 Waterproof Portable Bluetooth Speaker",
    brand: "JBL",
    category: "audio",
    price: 9467,
    listPrice: 10_466,
    rating: 4.6,
    reviewCount: 44_890,
    imageId: "61d5F64UDpL",
    highlights: [
      "IPX7 waterproof — survives a full dunk",
      "12 hours of playtime per charge",
      "Connect two speakers for stereo sound",
    ],
    description:
      "The pool-party staple. Fully waterproof, loud well past what its size suggests, and it pairs with a second FLIP for proper stereo separation.",
    badge: "Best Seller",
  },
  {
    slug: "ring-video-doorbell-3",
    name: "Ring Video Doorbell 3 with Enhanced Wi-Fi",
    brand: "Ring",
    category: "smart-home",
    price: 13_105,
    listPrice: 16_739,
    rating: 4.5,
    reviewCount: 27_744,
    imageId: "71v6fiYWE5L",
    highlights: [
      "1080p HD video with improved motion detection",
      "Dual-band 2.4 and 5 GHz Wi-Fi",
      "Quick-release battery — no rewiring needed",
    ],
    description:
      "See and speak to whoever is at the door from anywhere. Privacy zones and adjustable motion areas keep the alerts to visitors rather than passing traffic.",
  },
  {
    slug: "xbox-elite-series-2-controller-black",
    name: "Xbox Elite Wireless Controller Series 2 – Black",
    brand: "Microsoft",
    category: "gaming",
    price: 14_740,
    listPrice: 16_739,
    rating: 4.4,
    reviewCount: 39_115,
    imageId: "71F6eID-ImL",
    highlights: [
      "Adjustable-tension thumbsticks and shorter hair triggers",
      "Up to 40 hours of rechargeable battery life",
      "Three custom profiles saved on the controller",
    ],
    description:
      "The controller serious players keep going back to. Swappable sticks, paddles and trigger locks, all tunable per game and stored in three on-board profiles.",
  },
  {
    slug: "logitech-c920s-hd-pro-webcam",
    name: "Logitech C920S HD Pro Webcam, Full HD 1080p",
    brand: "Logitech",
    category: "cameras",
    price: 5525,
    listPrice: 6745,
    rating: 4.7,
    reviewCount: 62_009,
    imageId: "61-6uAf8soL",
    highlights: [
      "Full HD 1080p/30fps video calling",
      "Dual mics with automatic noise reduction",
      "Bundled privacy shutter",
    ],
    description:
      "The default answer to \"which webcam should I get?\". Sharp 1080p, sensible automatic exposure, and a physical shutter for the calls you would rather not be seen on.",
    badge: "Best Seller",
  },
  {
    slug: "sceptre-27-inch-fhd-gaming-monitor",
    name: "Sceptre 27-Inch FHD LED Gaming Monitor 165Hz",
    brand: "Sceptre",
    category: "computers",
    price: 13_696,
    listPrice: 16_736,
    rating: 4.5,
    reviewCount: 18_766,
    imageId: "61FYOyYCg1S",
    highlights: [
      "165Hz refresh rate with 1ms response",
      "AMD FreeSync for tear-free frames",
      "Built-in speakers and edgeless three-side design",
    ],
    description:
      "A high-refresh 27-inch panel at a price that leaves budget for the graphics card. FreeSync keeps fast scenes clean without an expensive sync module.",
  },
  {
    slug: "apple-airpods-pro",
    name: "Apple AirPods Pro with MagSafe Charging Case",
    brand: "Apple",
    category: "audio",
    price: 16_649,
    listPrice: 23_010,
    rating: 4.7,
    reviewCount: 152_338,
    imageId: "71bhWgQK-cL",
    highlights: [
      "Active Noise Cancellation with Transparency mode",
      "Adaptive EQ tuned to the shape of your ear",
      "Sweat and water resistant, with MagSafe case",
    ],
    description:
      "Noise cancellation that genuinely quiets a commute, in a case small enough to forget you are carrying. Instant pairing across every device on your Apple ID.",
    badge: "Deal",
  },
  {
    slug: "meta-quest-2-128gb",
    name: "Meta Quest 2 — Advanced All-In-One VR Headset, 128 GB",
    brand: "Meta",
    category: "gaming",
    price: 27_553,
    listPrice: 30_000,
    rating: 4.6,
    reviewCount: 88_412,
    imageId: "615YaAiA-ML",
    highlights: [
      "No PC or console required",
      "Ultra-fast processor with a bright, sharp display",
      "Library of 350+ titles across games and fitness",
    ],
    description:
      "Standalone VR that finally stopped needing a gaming PC bolted to it. Set it up anywhere with room to stretch your arms and you are playing in ten minutes.",
    badge: "Best Seller",
  },
  {
    slug: "bose-quietcomfort-noise-cancelling-headphones",
    name: "Bose QuietComfort Noise Cancelling Headphones",
    brand: "Bose",
    category: "audio",
    price: 18_467,
    listPrice: 25_735,
    rating: 4.6,
    reviewCount: 71_050,
    imageId: "61j9RdOsJwL",
    highlights: [
      "Eleven levels of active noise cancellation",
      "24-hour battery life on a single charge",
      "Three-mic system for clear calls",
    ],
    description:
      "Bose's long-haul flight headphones. The cancellation is adjustable rather than all-or-nothing, and the padding holds up across a full working day.",
  },
  {
    slug: "xbox-elite-series-2-core-white",
    name: "Xbox Elite Wireless Controller Series 2 Core – White",
    brand: "Microsoft",
    category: "gaming",
    price: 12_999,
    listPrice: 15_999,
    rating: 4.3,
    reviewCount: 12_884,
    imageId: "71F6eID-ImL",
    highlights: [
      "Same Elite chassis with the component pack sold separately",
      "Wrap-around rubberised grip",
      "Bluetooth for Xbox, Windows and mobile",
    ],
    description:
      "The Elite Series 2 without the accessory kit, for players who already own the paddles and sticks — or want to add them later.",
  },
  {
    slug: "meta-quest-2-256gb",
    name: "Meta Quest 2 — Advanced All-In-One VR Headset, 256 GB",
    brand: "Meta",
    category: "gaming",
    price: 39_939,
    listPrice: 46_000,
    rating: 4.6,
    reviewCount: 54_772,
    imageId: "61kwRNPtMpL",
    highlights: [
      "Double the storage for large VR titles",
      "Hand tracking and wireless PC streaming",
      "Includes two Touch controllers",
    ],
    description:
      "The larger Quest 2. Worth the difference if you install big titles rather than rotating through two at a time.",
  },
  {
    slug: "dji-mini-2-fly-more-combo",
    name: "DJI Mini 2 Fly More Combo — Ultralight Foldable Drone",
    brand: "DJI",
    category: "cameras",
    price: 54_811,
    listPrice: 62_000,
    rating: 4.8,
    reviewCount: 21_336,
    imageId: "71wfsfmD-UL",
    highlights: [
      "4K/30fps video on a 3-axis stabilised gimbal",
      "Under 249g — lighter registration requirements in many regions",
      "31-minute flight time with 10km video transmission",
    ],
    description:
      "A travel drone that folds into a jacket pocket. The three-axis gimbal is the reason its footage looks steady where phone-gimbal drones wobble.",
    badge: "Limited",
  },
  {
    slug: "tcl-50-inch-4-series-4k-roku-tv",
    name: "TCL 50-inch Class 4-Series 4K UHD Smart Roku LED TV",
    brand: "TCL",
    category: "tv",
    price: 33_094,
    listPrice: 45_015,
    rating: 4.5,
    reviewCount: 40_128,
    imageId: "71wJCiFPrfL",
    highlights: [
      "4K Ultra HD with HDR10",
      "Roku TV interface with every major streaming app",
      "Three HDMI inputs including ARC",
    ],
    description:
      "A 50-inch 4K set that keeps the software simple. Roku's launcher stays quick years in, which is more than most bundled smart platforms manage.",
    badge: "Deal",
  },
  {
    slug: "apple-airpods-max-space-gray",
    name: "Apple AirPods Max — Space Gray",
    brand: "Apple",
    category: "audio",
    price: 43_907,
    listPrice: 50_260,
    rating: 4.6,
    reviewCount: 33_940,
    imageId: "81jqUPkIVRL",
    highlights: [
      "Computational audio with Adaptive EQ",
      "Spatial Audio with dynamic head tracking",
      "Anodised aluminium cups and a breathable mesh canopy",
    ],
    description:
      "Apple's full-size headphones. Heavier than the plastic competition and priced accordingly, but the materials and the spatial audio processing are in a class of their own.",
  },
  {
    slug: "vizio-65-inch-v-series-4k",
    name: "VIZIO 65-Inch V-Series 4K UHD LED HDR Smart TV",
    brand: "VIZIO",
    category: "tv",
    price: 45_634,
    listPrice: 54_901,
    rating: 4.4,
    reviewCount: 26_517,
    imageId: "81ii3VScCbL",
    highlights: [
      "4K HDR with Dolby Vision support",
      "Apple AirPlay 2 and Chromecast built in",
      "Low-latency gaming engine for consoles",
    ],
    description:
      "Sixty-five inches with Dolby Vision and AirPlay 2, at a price that undercuts the big three. The gaming mode keeps input lag low enough for console play.",
  },
  {
    slug: "acer-nitro-5-gaming-laptop",
    name: "Acer Nitro 5 Gaming Laptop, Core i5-10300H, GTX 1650",
    brand: "Acer",
    category: "computers",
    price: 72_619,
    listPrice: 76_707,
    rating: 4.4,
    reviewCount: 19_882,
    imageId: "71m03KItMZL",
    highlights: [
      "15.6-inch Full HD 144Hz IPS display",
      "Intel Core i5-10300H with NVIDIA GeForce graphics",
      "Dual-fan cooling with upgradable RAM and storage",
    ],
    description:
      "The dependable entry-level gaming laptop. A 144Hz panel and upgradable memory mean it stays useful well past the first year.",
  },
  {
    slug: "cyberpowerpc-gamer-xtreme-vr",
    name: "CyberPowerPC Gamer Xtreme VR Gaming PC, i5-11400F",
    brand: "CyberPowerPC",
    category: "computers",
    price: 92_607,
    listPrice: 100_000,
    rating: 4.5,
    reviewCount: 9_431,
    imageId: "81Wx7hw9vwL",
    highlights: [
      "Intel Core i5-11400F with 8GB DDR4",
      "500GB NVMe SSD for fast load times",
      "RGB gaming keyboard and mouse included",
    ],
    description:
      "A pre-built that skips the parts-picking. VR-ready out of the box, with room in the case for the graphics upgrade you will eventually want.",
  },
  {
    slug: "samsung-65-inch-crystal-uhd-au8000",
    name: "SAMSUNG 65-Inch Crystal UHD AU8000 Series 4K Smart TV",
    brand: "Samsung",
    category: "tv",
    price: 61_988,
    listPrice: 71_000,
    rating: 4.6,
    reviewCount: 35_600,
    imageId: "81Wx7hw9vwL",
    highlights: [
      "Crystal Processor 4K with dynamic upscaling",
      "Motion Xcelerator for smoother sport and action",
      "Slim AirSlim profile with Q-Symphony audio",
    ],
    description:
      "Samsung's mainstream 65-inch. The upscaling is the quiet advantage here — older HD content looks noticeably cleaner than on cheaper 4K sets.",
  },
  {
    slug: "samsung-odyssey-g9-49-inch",
    name: "SAMSUNG 49-inch Odyssey G9 Gaming Monitor, 240Hz QLED",
    brand: "Samsung",
    category: "computers",
    price: 118_821,
    listPrice: 127_509,
    rating: 4.5,
    reviewCount: 7_204,
    imageId: "61SQz8S+fEL",
    highlights: [
      "Dual QHD 5120x1440 super-ultrawide panel",
      "240Hz with 1ms response and 1000R curve",
      "G-Sync compatible and FreeSync Premium Pro",
    ],
    description:
      "Two QHD monitors' worth of pixels in one uninterrupted curve, running at 240Hz. Absurd, and completely convincing once you have played a racing game on it.",
    badge: "Limited",
  },
  {
    slug: "meeting-owl-pro-conference-camera",
    name: "Meeting Owl Pro 360-Degree 1080p Video Conference Camera",
    brand: "Owl Labs",
    category: "cameras",
    price: 91_155,
    listPrice: 94_155,
    rating: 4.3,
    reviewCount: 4_118,
    imageId: "91-o+984YvL",
    highlights: [
      "360° camera, mic and speaker in one device",
      "Automatically focuses on whoever is speaking",
      "18-foot audio pickup radius",
    ],
    description:
      "Drops in the middle of the table and turns the whole room into one participant. It follows the conversation on its own, so nobody has to keep swivelling a laptop.",
    inStock: false,
  },
];

/** Amazon's CDN accepts a size token — request a larger render than the legacy 218px. */
function imageUrl(imageId: string): string {
  return `https://m.media-amazon.com/images/I/${imageId}._AC_SX679_.jpg`;
}

export const PRODUCTS: Product[] = SEEDS.map((seed, index) => ({
  id: `p-${String(index + 1).padStart(3, "0")}`,
  slug: seed.slug,
  name: seed.name,
  brand: seed.brand,
  store: "US Store",
  category: seed.category,
  price: seed.price,
  listPrice: seed.listPrice,
  rating: seed.rating,
  reviewCount: seed.reviewCount,
  image: imageUrl(seed.imageId),
  highlights: seed.highlights,
  description: seed.description,
  inStock: seed.inStock ?? true,
  badge: seed.badge,
}));

const BY_ID = new Map(PRODUCTS.map((p) => [p.id, p]));
const BY_SLUG = new Map(PRODUCTS.map((p) => [p.slug, p]));

export function getProductById(id: string): Product | undefined {
  return BY_ID.get(id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return BY_SLUG.get(slug);
}

export const BRANDS: string[] = [...new Set(PRODUCTS.map((p) => p.brand))].sort(
  (a, b) => a.localeCompare(b),
);

export function getFeatured(limit = 8): Product[] {
  return PRODUCTS.filter((p) => p.badge === "Best Seller" || p.badge === "New").slice(
    0,
    limit,
  );
}

export function getDeals(limit = 8): Product[] {
  return [...PRODUCTS]
    .sort(
      (a, b) =>
        (b.listPrice - b.price) / b.listPrice - (a.listPrice - a.price) / a.listPrice,
    )
    .slice(0, limit);
}

export function getByCategory(category: CategorySlug, limit?: number): Product[] {
  const matches = PRODUCTS.filter((p) => p.category === category);
  return limit ? matches.slice(0, limit) : matches;
}

/** Same category first, then anything else, excluding the product itself. */
export function getRelated(product: Product, limit = 4): Product[] {
  const sameCategory = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id,
  );
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);
  const filler = PRODUCTS.filter(
    (p) => p.category !== product.category && p.id !== product.id,
  );
  return [...sameCategory, ...filler].slice(0, limit);
}
