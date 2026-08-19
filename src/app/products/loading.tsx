import { ProductListingSkeleton } from "@/components/ui/Skeletons";

/** Streamed while the catalogue request resolves. */
export default function ProductsLoading() {
  return (
    <div className="container page">
      <ProductListingSkeleton />
    </div>
  );
}
