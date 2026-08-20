import type { ReactNode } from "react";

/**
 * Title + supporting line for a card panel.
 *
 * Both checkout steps repeated the same hand-styled `<h1>`/`<p>` pair; the
 * sizes had already started to drift between them.
 */
export function PanelHeading({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  return (
    <>
      <h1 className="panel-heading">{title}</h1>
      {children ? <p className="panel-subheading">{children}</p> : null}
    </>
  );
}
