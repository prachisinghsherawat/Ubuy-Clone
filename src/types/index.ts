/** Shared domain types. Keep these free of React/antd imports. */

/**
 * Category slugs come from the live catalogue API, so this is a plain string
 * rather than a closed union — the taxonomy changes without a redeploy.
 */
export type CategorySlug = string;

export interface Category {
  slug: CategorySlug;
  label: string;
  /** Ant Design icon name rendered by the category strip. */
  icon: string;
  blurb: string;
}

export type ProductBadge = "Best Seller" | "New" | "Deal" | "Limited";

export interface ProductReview {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  store: string;
  category: CategorySlug;
  /** Selling price in INR. */
  price: number;
  /** Struck-through reference price in INR. */
  listPrice: number;
  rating: number;
  reviewCount: number;
  /** Primary thumbnail. */
  image: string;
  /** Full gallery; always contains at least `image`. */
  images: string[];
  highlights: string[];
  description: string;
  inStock: boolean;
  /** Units on hand — drives the "only N left" urgency copy. */
  stock: number;
  badge?: ProductBadge;
  sku?: string;
  warranty?: string;
  shippingInfo?: string;
  returnPolicy?: string;
  minimumOrderQuantity?: number;
  tags?: string[];
  reviews?: ProductReview[];
  weight?: number;
  dimensions?: { width: number; height: number; depth: number };
}

/**
 * Cart lines carry a full product snapshot rather than just an id.
 *
 * The catalogue is now remote and paginated, so a stored id alone cannot be
 * resolved synchronously at render time. Snapshotting also pins the price the
 * shopper actually saw when they added the item.
 */
export interface CartLine {
  productId: string;
  quantity: number;
  product: Product;
}

/** A cart line with its computed line total, ready to render. */
export interface CartLineView extends CartLine {
  lineTotal: number;
}

export interface CartTotals {
  itemCount: number;
  subtotal: number;
  savings: number;
  shipping: number;
  tax: number;
  total: number;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  addressLine: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
}

export interface User {
  name: string;
  email: string;
  mobile: string;
}

export type PaymentMethod = "card" | "upi" | "cod";

export interface PlacedOrder {
  id: string;
  placedAt: string;
  lines: CartLineView[];
  totals: CartTotals;
  address: ShippingAddress;
  /** Only meaningful for card payments; other methods leave it blank. */
  cardLast4: string;
  /** Optional: orders written by an earlier build predate this field. */
  paymentMethod?: PaymentMethod;
}
