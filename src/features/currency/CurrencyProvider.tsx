"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { RatesResponse } from "@/app/api/rates/route";
import {
  BASE_CURRENCY,
  DEFAULT_DESTINATION,
  ZERO_DECIMAL_CURRENCIES,
  findDestination,
  type Destination,
} from "@/features/currency/destinations";
import { STORAGE_KEYS } from "@/lib/constants";
import { formatPrice } from "@/lib/format";
import { createPersistentStore, usePersistentValue } from "@/lib/persistentStore";

interface CurrencyContextValue {
  destination: Destination;
  setCountry: (country: string) => void;
  /** Formats a base-currency (INR) amount in the selected currency. */
  format: (baseAmount: number) => string;
  /** True once real quotes are in; false while the fallback table is in use. */
  live: boolean;
  updatedAt: string | null;
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

const destinationStore = createPersistentStore<string>(
  STORAGE_KEYS.destination,
  DEFAULT_DESTINATION.country,
);

/**
 * Site-wide currency conversion.
 *
 * Products are stored in INR, so `rates` is keyed off INR and every price in
 * the UI goes through `format`. Rates start `null` and the base currency
 * converts at 1, which means the server render and the hydrating render both
 * produce exactly today's rupee output — the live quotes only ever change what
 * is on screen *after* hydration, so there is no mismatch to reconcile.
 */
export function CurrencyProvider({ children }: { children: ReactNode }) {
  const country = usePersistentValue(destinationStore);
  const [rates, setRates] = useState<RatesResponse | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    // setState lives in the async callback, never synchronously in the effect
    // body — the latter is the cascading-render pattern React warns about.
    void (async () => {
      try {
        const response = await fetch("/api/rates", { signal: controller.signal });
        setRates((await response.json()) as RatesResponse);
      } catch {
        // Unreachable endpoint leaves `rates` null; `rateFor` then holds every
        // price at the base currency rather than rendering a wrong number.
      }
    })();

    return () => controller.abort();
  }, []);

  const destination = useMemo(() => findDestination(country), [country]);

  const setCountry = useCallback((next: string) => destinationStore.set(next), []);

  const formatter = useMemo(
    () =>
      new Intl.NumberFormat(destination.locale, {
        style: "currency",
        currency: destination.currency,
        maximumFractionDigits: ZERO_DECIMAL_CURRENCIES.has(destination.currency)
          ? 0
          : 2,
      }),
    [destination],
  );

  const format = useCallback(
    (baseAmount: number) => {
      const rate =
        destination.currency === BASE_CURRENCY
          ? 1
          : rates?.rates[destination.currency];

      // No quote for this currency yet: fall back to the base-currency
      // formatter rather than render a converted-looking number that is
      // silently wrong.
      if (rate === undefined) return formatPrice(baseAmount);

      return formatter.format(baseAmount * rate);
    },
    [destination, formatter, rates],
  );

  const value = useMemo(
    () => ({
      destination,
      setCountry,
      format,
      live: rates?.live ?? false,
      updatedAt: rates?.updatedAt ?? null,
    }),
    [destination, setCountry, format, rates],
  );

  return (
    <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
  );
}

export function useCurrency(): CurrencyContextValue {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error("useCurrency must be used inside <CurrencyProvider>");
  return context;
}
