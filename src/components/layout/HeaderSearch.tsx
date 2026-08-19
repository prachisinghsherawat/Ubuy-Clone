"use client";

import {
  ClockCircleOutlined,
  CloseOutlined,
  FireOutlined,
  LoadingOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Input, Select, Space } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";

import { useCurrency } from "@/features/currency/CurrencyProvider";
import { ROUTES, STORAGE_KEYS } from "@/lib/constants";
import { createPersistentStore, usePersistentValue } from "@/lib/persistentStore";
import type { Category, SearchSuggestion } from "@/types";

/** Keystrokes settle for this long before a request goes out. */
const DEBOUNCE_MS = 220;
const MIN_QUERY_LENGTH = 2;
const MAX_RECENT = 6;

const TRENDING = ["iPhone", "Laptop", "Perfume", "Sunglasses", "Watch", "Groceries"];

/** Recent queries survive reloads and sync across tabs, like a real storefront. */
const recentStore = createPersistentStore<string[]>(STORAGE_KEYS.recentSearches, []);

function remember(query: string): void {
  recentStore.set((current) => {
    // Case-insensitive de-dupe, most recent first, capped.
    const withoutMatch = current.filter(
      (entry) => entry.toLowerCase() !== query.toLowerCase(),
    );
    return [query, ...withoutMatch].slice(0, MAX_RECENT);
  });
}

export function HeaderSearch({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const { format } = useCurrency();
  const [term, setTerm] = useState("");
  const [scope, setScope] = useState("");
  const [fetched, setFetched] = useState<{
    query: string;
    results: SearchSuggestion[];
  }>({ query: "", results: [] });
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);

  const recent = usePersistentValue(recentStore);
  const query = term.trim();
  const showTrending = query.length < MIN_QUERY_LENGTH;

  useEffect(() => {
    if (query.length < MIN_QUERY_LENGTH) return;

    const controller = new AbortController();

    const timer = setTimeout(async () => {
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
          signal: controller.signal,
        });
        const data = (await response.json()) as { results: SearchSuggestion[] };
        setFetched({ query, results: data.results });
      } catch {
        if (!controller.signal.aborted) setFetched({ query, results: [] });
      }
    }, DEBOUNCE_MS);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  const results = !showTrending && fetched.query === query ? fetched.results : [];
  const loading = !showTrending && fetched.query !== query;
  const highlighted = activeIndex < results.length ? activeIndex : -1;

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  const submit = (value = query) => {
    const trimmed = value.trim();
    if (!trimmed) {
      go(scope ? `${ROUTES.products}?category=${scope}` : ROUTES.products);
      return;
    }

    remember(trimmed);
    const params = new URLSearchParams({ q: trimmed });
    if (scope) params.set("category", scope);
    go(`${ROUTES.products}?${params.toString()}`);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      setOpen(false);
      return;
    }

    if (event.key === "Enter") {
      const active = results[highlighted];
      if (active) {
        event.preventDefault();
        remember(query);
        go(ROUTES.product(active.slug));
      } else {
        submit();
      }
      return;
    }

    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    if (!results.length) return;

    event.preventDefault();
    setOpen(true);
    setActiveIndex(() => {
      const next = highlighted + (event.key === "ArrowDown" ? 1 : -1);
      if (next < -1) return results.length - 1;
      if (next >= results.length) return -1;
      return next;
    });
  };

  const scopeOptions = [
    { value: "", label: "All" },
    ...categories.map((category) => ({
      value: category.slug,
      label: category.label,
    })),
  ];

  return (
    <div className="header-search" ref={rootRef}>
      {/* `Space.Compact` rather than the Input's `addonBefore`: that prop is
          deprecated in antd 6 and renders the scope picker as an unstyled
          block, which showed up as an empty white box beside the field. */}
      <Space.Compact className="header-search-field">
        <Select
          value={scope}
          onChange={setScope}
          options={scopeOptions}
          popupMatchSelectWidth={220}
          size="large"
          className="search-scope"
          aria-label="Search within category"
        />
        <Input
          size="large"
          allowClear
          value={term}
          onChange={(event) => {
            setTerm(event.target.value);
            setOpen(true);
            setActiveIndex(-1);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder="Search products, brands…"
          aria-label="Search products"
          role="combobox"
          aria-expanded={open}
          aria-controls="header-search-panel"
          aria-autocomplete="list"
          aria-activedescendant={
            highlighted >= 0 ? `header-search-option-${highlighted}` : undefined
          }
          suffix={
            <Button
              type="primary"
              icon={loading ? <LoadingOutlined /> : <SearchOutlined />}
              onClick={() => submit()}
              aria-label="Search"
            />
          }
          styles={{ root: { paddingInlineEnd: 4 } }}
        />
      </Space.Compact>

      {open ? (
        <div className="search-panel" id="header-search-panel">
          {showTrending ? (
            <>
              {recent.length ? (
                <>
                  <p className="search-panel-head">
                    <ClockCircleOutlined /> Recent searches
                    <button
                      type="button"
                      className="search-clear"
                      onClick={() => recentStore.set([])}
                    >
                      Clear
                    </button>
                  </p>
                  <div className="search-chips">
                    {recent.map((item) => (
                      <span key={item} className="search-chip search-chip-recent">
                        <button
                          type="button"
                          onClick={() => {
                            setTerm(item);
                            submit(item);
                          }}
                        >
                          {item}
                        </button>
                        <button
                          type="button"
                          className="search-chip-remove"
                          aria-label={`Remove ${item} from recent searches`}
                          onClick={() =>
                            recentStore.set((current) =>
                              current.filter((entry) => entry !== item),
                            )
                          }
                        >
                          <CloseOutlined />
                        </button>
                      </span>
                    ))}
                  </div>
                </>
              ) : null}

              <p className="search-panel-head">
                <FireOutlined /> Trending searches
              </p>
              <div className="search-chips">
                {TRENDING.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className="search-chip"
                    onClick={() => {
                      setTerm(item);
                      submit(item);
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </>
          ) : results.length ? (
            <>
              <p className="search-panel-head">
                Products matching &ldquo;{query}&rdquo;
              </p>
              <ul className="search-results" role="listbox" aria-label="Search suggestions">
                {results.map((item, index) => (
                  <li key={item.id} role="presentation">
                    <Link
                      id={`header-search-option-${index}`}
                      role="option"
                      aria-selected={index === highlighted}
                      href={ROUTES.product(item.slug)}
                      className="search-result"
                      data-active={index === highlighted}
                      onClick={() => {
                        remember(query);
                        setOpen(false);
                      }}
                      onMouseEnter={() => setActiveIndex(index)}
                    >
                      <span className="search-result-media">
                        <Image src={item.image} alt="" fill sizes="48px" />
                      </span>
                      <span className="search-result-copy">
                        <strong>{item.name}</strong>
                        <small>
                          {item.brand} · {item.category}
                        </small>
                      </span>
                      <span className="search-result-price">{format(item.price)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <button type="button" className="search-panel-all" onClick={() => submit()}>
                See all results for &ldquo;{query}&rdquo;
              </button>
            </>
          ) : (
            <p className="search-empty">
              {loading ? "Searching…" : `No matches for "${query}"`}
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
}
