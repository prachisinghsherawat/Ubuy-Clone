/**
 * Shipping destinations offered in the header's "Deliver to" picker.
 *
 * A curated list rather than a countries API: a storefront ships to a defined
 * set, each with one settlement currency and a locale that formats it the way
 * shoppers there expect. (restcountries.com, the obvious source, now requires
 * an account — and it would still not tell us where *this* shop ships.)
 */
export interface Destination {
  country: string;
  /** Emoji flag — no image request, and it inherits the text colour. */
  flag: string;
  /** ISO 4217 code, used both for conversion and for Intl formatting. */
  currency: string;
  locale: string;
}

export const DESTINATIONS: Destination[] = [
  { country: "India", flag: "🇮🇳", currency: "INR", locale: "en-IN" },
  { country: "United States", flag: "🇺🇸", currency: "USD", locale: "en-US" },
  { country: "United Kingdom", flag: "🇬🇧", currency: "GBP", locale: "en-GB" },
  { country: "United Arab Emirates", flag: "🇦🇪", currency: "AED", locale: "en-AE" },
  { country: "Saudi Arabia", flag: "🇸🇦", currency: "SAR", locale: "en-SA" },
  { country: "Singapore", flag: "🇸🇬", currency: "SGD", locale: "en-SG" },
  { country: "Australia", flag: "🇦🇺", currency: "AUD", locale: "en-AU" },
  { country: "Canada", flag: "🇨🇦", currency: "CAD", locale: "en-CA" },
  { country: "Germany", flag: "🇩🇪", currency: "EUR", locale: "de-DE" },
  { country: "Japan", flag: "🇯🇵", currency: "JPY", locale: "ja-JP" },
];

/** The shop's base of account — every stored product price is in this. */
export const BASE_CURRENCY = "INR";

export const DEFAULT_DESTINATION = DESTINATIONS[0];

/**
 * Currencies conventionally quoted without a fractional part.
 *
 * Intl knows this for JPY on its own, but not for INR — and this storefront
 * has always quoted whole rupees, so it is stated explicitly for both.
 */
export const ZERO_DECIMAL_CURRENCIES = new Set(["INR", "JPY", "KRW", "VND"]);

export function findDestination(country: string): Destination {
  return (
    DESTINATIONS.find((entry) => entry.country === country) ?? DEFAULT_DESTINATION
  );
}
