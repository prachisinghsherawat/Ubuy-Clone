/**
 * Absolute origin for metadata, sitemap and robots output.
 *
 * Vercel injects `VERCEL_PROJECT_PRODUCTION_URL` (host only, no scheme) for the
 * production deployment; `NEXT_PUBLIC_SITE_URL` overrides it for any other
 * host. Falls back to localhost so `next build` works offline.
 */
export function siteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;

  return "http://localhost:3000";
}
