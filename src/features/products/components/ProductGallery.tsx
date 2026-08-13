"use client";

import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Image from "next/image";
import { useState } from "react";

/** Main image plus thumbnail strip, with wrap-around arrow paging. */
export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const gallery = images.length ? images : [""];
  const step = (direction: 1 | -1) =>
    setActive((current) => (current + direction + gallery.length) % gallery.length);

  return (
    <div className="gallery">
      <div className="gallery-main">
        <Image
          src={gallery[active]}
          alt={`${name} — image ${active + 1} of ${gallery.length}`}
          fill
          // `priority` is deprecated in Next 16; this is the above-the-fold LCP
          // image on the product page, so load it eagerly at high priority.
          loading="eager"
          fetchPriority="high"
          sizes="(max-width: 900px) 100vw, 520px"
          style={{ objectFit: "contain" }}
        />

        {gallery.length > 1 ? (
          <>
            <Button
              shape="circle"
              icon={<LeftOutlined />}
              className="gallery-arrow gallery-arrow-prev"
              onClick={() => step(-1)}
              aria-label="Previous image"
            />
            <Button
              shape="circle"
              icon={<RightOutlined />}
              className="gallery-arrow gallery-arrow-next"
              onClick={() => step(1)}
              aria-label="Next image"
            />
          </>
        ) : null}
      </div>

      {gallery.length > 1 ? (
        <div className="gallery-thumbs">
          {gallery.map((src, index) => (
            <button
              key={src}
              type="button"
              className={`gallery-thumb${index === active ? " is-active" : ""}`}
              onClick={() => setActive(index)}
              aria-label={`View image ${index + 1}`}
              aria-current={index === active}
            >
              <Image src={src} alt="" fill sizes="72px" style={{ objectFit: "contain" }} />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
