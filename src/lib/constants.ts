/** Brand-level constants and route helpers used across the app. */

export const SITE = {
  name: "Ubuy",
  tagline: "International online shopping made easy",
  supportPhone: "+91 800 123 4567",
  currency: "INR",
} as const;

export const ROUTES = {
  home: "/",
  products: "/products",
  product: (slug: string) => `/products/${slug}`,
  cart: "/cart",
  checkout: "/checkout",
  payment: "/checkout/payment",
  success: "/checkout/success",
  signIn: "/signin",
  signUp: "/signup",
} as const;

/** localStorage keys, namespaced so a shared origin never collides. */
export const STORAGE_KEYS = {
  cart: "ubuy.cart",
  wishlist: "ubuy.wishlist",
  users: "ubuy.users",
  session: "ubuy.session",
  address: "ubuy.address",
  lastOrder: "ubuy.lastOrder",
} as const;

/** Free shipping above this order value, otherwise FLAT_SHIPPING applies. */
export const FREE_SHIPPING_THRESHOLD = 25_000;
export const FLAT_SHIPPING = 499;
export const TAX_RATE = 0.05;

export const PRICE_BUCKETS = [
  { id: "under-7700", label: "Under ₹7,700", min: 0, max: 7_700 },
  { id: "7700-19250", label: "₹7,700 – ₹19,250", min: 7_700, max: 19_250 },
  { id: "19250-38500", label: "₹19,250 – ₹38,500", min: 19_250, max: 38_500 },
  { id: "38500-77000", label: "₹38,500 – ₹77,000", min: 38_500, max: 77_000 },
  { id: "over-77000", label: "Over ₹77,000", min: 77_000, max: Infinity },
] as const;

export type PriceBucketId = (typeof PRICE_BUCKETS)[number]["id"];

export const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "discount", label: "Biggest Discount" },
  { value: "rating", label: "Customer Rating" },
] as const;

export type SortOption = (typeof SORT_OPTIONS)[number]["value"];
