"use client";

import { Check, ChevronDown, Globe } from "lucide-react";
import { Popover, Tag } from "antd";
import { useState } from "react";

import { useCurrency } from "@/features/currency/CurrencyProvider";
import { DESTINATIONS } from "@/features/currency/destinations";

export function DeliverTo() {
  const { destination, setCountry, live, updatedAt } = useCurrency();
  const [open, setOpen] = useState(false);

  const panel = (
    <div className="deliver-panel">
      <p className="deliver-heading">Ship to &amp; currency</p>

      <ul className="deliver-list">
        {DESTINATIONS.map((entry) => {
          const selected = entry.country === destination.country;
          return (
            <li key={entry.country}>
              <button
                type="button"
                className="deliver-option"
                data-selected={selected}
                onClick={() => {
                  setCountry(entry.country);
                  setOpen(false);
                }}
              >
                <span className="deliver-flag" aria-hidden="true">
                  {entry.flag}
                </span>
                <span className="deliver-country">{entry.country}</span>
                <span className="deliver-code">{entry.currency}</span>
                {selected ? <Check className="deliver-check" /> : null}
              </button>
            </li>
          );
        })}
      </ul>

      <p className="deliver-note">
        {live ? (
          <>
            <Tag color="green">Live rates</Tag>
            {updatedAt ? `Updated ${updatedAt}` : "Updated hourly"}
          </>
        ) : (
          <>
            <Tag color="orange">Indicative</Tag>
            Live rates unavailable — showing approximate conversions.
          </>
        )}
      </p>
    </div>
  );

  return (
    <Popover
      content={panel}
      open={open}
      onOpenChange={setOpen}
      trigger="click"
      placement="bottomRight"
      arrow
    >
      <button
        type="button"
        className="header-action header-action-deliver"
        aria-label="Change delivery country"
      >
        <Globe />
        <span className="header-action-label">
          <small>Deliver to</small>
          <strong>
            <span aria-hidden="true">{destination.flag}</span> {destination.currency}
          </strong>
        </span>
        <ChevronDown style={{ fontSize: 10, opacity: 0.7 }} />
      </button>
    </Popover>
  );
}
