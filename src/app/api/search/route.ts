import { getCatalogue } from "@/features/products/api/catalogue";
import type { Product, SearchSuggestion } from "@/types";

/** Below this, a query matches too much of the catalogue to be a suggestion. */
const MIN_QUERY_LENGTH = 2;
const MAX_RESULTS = 6;

function toSuggestion(product: Product): SearchSuggestion {
  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    brand: product.brand,
    category: product.category,
    price: product.price,
    listPrice: product.listPrice,
    image: product.image,
  };
}

/**
 * Ranks a product against the query, or returns null if it does not match.
 *
 * A plain `includes` filter puts "Ingot" above "iPhone 13" for the query
 * "i" — substring position is what shoppers actually perceive as relevance, so
 * matches are scored by *where* the hit lands rather than merely whether it
 * exists. Lower is better.
 */
function score(product: Product, query: string): number | null {
  const name = product.name.toLowerCase();
  const brand = product.brand.toLowerCase();
  const category = product.category.toLowerCase();

  if (name.startsWith(query)) return 0;
  if (brand.startsWith(query)) return 1;

  const nameAt = name.indexOf(query);
  // A hit at a word boundary reads as intentional; one mid-word is incidental.
  if (nameAt === 0 || (nameAt > 0 && name[nameAt - 1] === " ")) return 2;
  if (nameAt > 0) return 3;

  if (brand.includes(query)) return 4;
  if (category.includes(query)) return 5;

  // Tags are the catalogue's synonym layer, and they matter: nothing is named
  // or categorised "perfume" — the category is "fragrances" — so without this
  // the obvious shopper query returns an empty dropdown. Ranked last, because
  // a tag hit is the weakest evidence of relevance.
  if (product.tags?.some((tag) => tag.toLowerCase().includes(query))) return 6;

  return null;
}

/**
 * Typeahead suggestions for the header search.
 *
 * The catalogue fetch underneath is cached and revalidated hourly, so this
 * stays a cheap in-memory scan per keystroke rather than an upstream round
 * trip. The handler itself is uncached because the response varies by query.
 */
export async function GET(request: Request): Promise<Response> {
  const query = (new URL(request.url).searchParams.get("q") ?? "")
    .trim()
    .toLowerCase();

  if (query.length < MIN_QUERY_LENGTH) {
    return Response.json({ results: [] satisfies SearchSuggestion[] });
  }

  const catalogue = await getCatalogue();

  const ranked = catalogue
    .flatMap((product) => {
      const rank = score(product, query);
      return rank === null ? [] : [{ product, rank }];
    })
    // Rating breaks ties, so equally relevant matches lead with the best one.
    .sort((a, b) => a.rank - b.rank || b.product.rating - a.product.rating)
    .slice(0, MAX_RESULTS)
    .map((entry) => toSuggestion(entry.product));

  return Response.json({ results: ranked });
}
