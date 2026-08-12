/** Shared domain types. Keep these free of React/antd imports. */

export type CategorySlug =
  | "streaming"
  | "audio"
  | "gaming"
  | "tv"
  | "computers"
  | "cameras"
  | "smart-home"
  | "accessories";

export interface Category {
  slug: CategorySlug;
  label: string;
  /** Ant Design icon name rendered by the category strip. */
  icon: string;
  blurb: string;
}

export type ProductBadge = "Best Seller" | "New" | "Deal" | "Limited";

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
  image: string;
  highlights: string[];
  description: string;
  inStock: boolean;
  badge?: ProductBadge;
}

/** A cart line references the catalogue by id so storage stays small. */
export interface CartLine {
  productId: string;
  quantity: number;
}

/** A cart line joined with its catalogue entry, ready to render. */
export interface CartLineView extends CartLine {
  product: Product;
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

export interface PlacedOrder {
  id: string;
  placedAt: string;
  lines: CartLineView[];
  totals: CartTotals;
  address: ShippingAddress;
  cardLast4: string;
}
