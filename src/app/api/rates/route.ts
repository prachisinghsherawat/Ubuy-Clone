import { BASE_CURRENCY, DESTINATIONS } from "@/features/currency/destinations";

/** Live, keyless FX feed. Quotes are refreshed once a day upstream. */
const RATES_API = `https://open.er-api.com/v6/latest/${BASE_CURRENCY}`;

/** Matches the upstream refresh cadence — a fresher poll would return the same numbers. */
const REVALIDATE_SECONDS = 3600;

/**
 * Last-resort rates, per 1 INR.
 *
 * Only used when the FX service is unreachable. They are approximate and will
 * drift, which is exactly why the response marks them `live: false` — the UI
 * says "indicative rates" rather than quoting a stale number as fact.
 */
const FALLBACK_RATES: Record<string, number> = {
  INR: 1,
  USD: 0.0105,
  GBP: 0.0078,
  AED: 0.0385,
  SAR: 0.0393,
  SGD: 0.0135,
  AUD: 0.0161,
  CAD: 0.0144,
  EUR: 0.0091,
  JPY: 1.669,
};

export interface RatesResponse {
  base: string;
  /** Multiply a base-currency amount by `rates[code]` to get `code`. */
  rates: Record<string, number>;
  /** False when the fallback table was served because upstream failed. */
  live: boolean;
  updatedAt: string | null;
}

interface RawRates {
  result?: string;
  rates?: Record<string, number>;
  time_last_update_utc?: string;
}

export async function GET(): Promise<Response> {
  let payload: RatesResponse = {
    base: BASE_CURRENCY,
    rates: FALLBACK_RATES,
    live: false,
    updatedAt: null,
  };

  try {
    const response = await fetch(RATES_API, {
      next: { revalidate: REVALIDATE_SECONDS, tags: ["rates"] },
    });

    if (response.ok) {
      const data = (await response.json()) as RawRates;

      if (data.result === "success" && data.rates) {
        // Only the currencies actually offered are forwarded — the upstream
        // payload carries ~160 of them, and the client needs ten.
        const rates: Record<string, number> = { [BASE_CURRENCY]: 1 };
        for (const { currency } of DESTINATIONS) {
          const rate = data.rates[currency];
          if (typeof rate === "number") rates[currency] = rate;
        }

        payload = {
          base: BASE_CURRENCY,
          rates,
          live: true,
          updatedAt: data.time_last_update_utc ?? null,
        };
      }
    }
  } catch {
    // Offline or upstream outage — the fallback table above already stands.
  }

  return Response.json(payload);
}
