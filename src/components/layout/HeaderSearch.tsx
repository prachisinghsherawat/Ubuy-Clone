"use client";

import { FireOutlined, LoadingOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";

import { ROUTES } from "@/lib/constants";
import { formatPrice } from "@/lib/format";
import type { SearchSuggestion } from "@/types";

/** Keystrokes settle for this long before a request goes out. */
const DEBOUNCE_MS = 220;
const MIN_QUERY_LENGTH = 2;

const TRENDING = [
  "iPhone",
  "Laptop",
  "Perfume",
  "Sunglasses",
  "Watch",
  "Groceries",
];

export function HeaderSearch() {
  const router = useRouter();
  const [term, setTerm] = useState("");
  /**
   * The last completed fetch, tagged with the query that produced it.
   *
   * Storing the query alongside the rows is what lets `results` and `loading`
   * both be *derived* below rather than kept as their own state. Separate
   * `results`/`loading` state would have to be reset from inside this effect on
   * every keystroke, and a synchronous setState in an effect body is exactly
   * the cascading-render pattern React warns about.
   */
  const [fetched, setFetched] = useState<{
    query: string;
    results: SearchSuggestion[];
  }>({ query: "", results: [] });
  const [open, setOpen] = useState(false);
  /** -1 means "no suggestion highlighted"; Enter then runs the raw query. */
  const [activeIndex, setActiveIndex] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);

  const query = term.trim();
  const showTrending = query.length < MIN_QUERY_LENGTH;

  /**
   * Debounced suggestion fetch.
   *
   * The AbortController is the important part: without it a slow response for
   * "ip" can land after a fast one for "iphone" and overwrite the newer
   * results. Aborting the previous request on every change makes the last
   * query issued always the last one to resolve.
   */
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
        // An abort is the expected path on every keystroke — a newer request
        // already owns this state, so leave it alone. A genuine network
        // failure records an empty result *for this query* so the panel
        // settles on "no matches" instead of spinning forever.
        if (!controller.signal.aborted) setFetched({ query, results: [] });
      }
    }, DEBOUNCE_MS);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  // Results belong to the query on screen, or they are not shown at all — this
  // is what makes a stale response for a previous query impossible to render.
  const results = !showTrending && fetched.query === query ? fetched.results : [];
  const loading = !showTrending && fetched.query !== query;
  // Guards the highlight against a result list that shrank under it.
  const highlighted = activeIndex < results.length ? activeIndex : -1;

  // Close when focus or a click lands outside the whole search block.
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
    go(trimmed ? `${ROUTES.products}?q=${encodeURIComponent(trimmed)}` : ROUTES.products);
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
        go(ROUTES.product(active.slug));
      } else {
        submit();
      }
      return;
    }

    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    if (!results.length) return;

    // Arrow keys would otherwise jump the caret to the ends of the input.
    event.preventDefault();
    setOpen(true);
    setActiveIndex(() => {
      const next = highlighted + (event.key === "ArrowDown" ? 1 : -1);
      // Wrap through -1 so the list cycles back to the raw-query state rather
      // than trapping the highlight at either end.
      if (next < -1) return results.length - 1;
      if (next >= results.length) return -1;
      return next;
    });
  };

  return (
    <div className="header-search" ref={rootRef}>
      <Input
        size="large"
        allowClear
        value={term}
        onChange={(event) => {
          setTerm(event.target.value);
          setOpen(true);
          // Typing invalidates whatever row was highlighted. Resetting here, in
          // the event handler, is what keeps the effect free of setState.
          setActiveIndex(-1);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
        placeholder="Search for products, brands and categories"
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

      {open ? (
        <div className="search-panel" id="header-search-panel">
          {showTrending ? (
            <>
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
                      onClick={() => setOpen(false)}
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
                      <span className="search-result-price">
                        {formatPrice(item.price)}
                      </span>
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
