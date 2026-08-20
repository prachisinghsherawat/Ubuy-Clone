"use client";

import { Zap } from "lucide-react";
import { useEffect, useState } from "react";

interface Remaining {
  hours: number;
  minutes: number;
  seconds: number;
}

/** Milliseconds from now until the next local midnight, when deals reset. */
function msUntilMidnight(): number {
  const now = new Date();
  const midnight = new Date(now);
  // Hour 24 rolls into the next day, and the Date constructor normalises it —
  // which also keeps this correct across a DST boundary.
  midnight.setHours(24, 0, 0, 0);
  return midnight.getTime() - now.getTime();
}

function split(ms: number): Remaining {
  const total = Math.max(0, Math.floor(ms / 1000));
  return {
    hours: Math.floor(total / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

const pad = (value: number) => String(value).padStart(2, "0");

/**
 * Deal band with a live countdown to the end of the day.
 *
 * The clock is deliberately absent from the server render: the remaining time
 * differs between the render on the server and the first client paint, so
 * emitting it in the HTML would be a guaranteed hydration mismatch. `remaining`
 * starts as `null` and the units render as placeholders until the mount effect
 * fills them in on the client — the band's layout is identical either way, so
 * nothing shifts when the real digits arrive.
 */
export function FlashDealBand() {
  const [remaining, setRemaining] = useState<Remaining | null>(null);

  useEffect(() => {
    const tick = () => setRemaining(split(msUntilMidnight()));

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: "Hrs", value: remaining && pad(remaining.hours) },
    { label: "Min", value: remaining && pad(remaining.minutes) },
    { label: "Sec", value: remaining && pad(remaining.seconds) },
  ];

  return (
    <div className="flash-band">
      <div className="flash-band-copy">
        <span className="flash-band-icon">
          <Zap fill="currentColor" />
        </span>
        <div>
          <h3>Flash deals end tonight</h3>
          <p>Prices reset at midnight — stock is limited on every line.</p>
        </div>
      </div>

      <div
        className="flash-timer"
        role="timer"
        aria-live="off"
        aria-label="Time remaining in today's flash deals"
      >
        {units.map((unit, index) => (
          <div key={unit.label} style={{ display: "contents" }}>
            {index > 0 ? (
              <span className="flash-sep" aria-hidden="true">
                :
              </span>
            ) : null}
            <span className="flash-unit">
              <strong>{unit.value ?? "--"}</strong>
              <span>{unit.label}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
