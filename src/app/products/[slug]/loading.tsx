import { ProductDetailSkeleton } from "@/components/ui/Skeletons";

/** Streamed while a product and its related rail resolve. */
export default function ProductLoading() {
  return (
    <div className="container page">
      <ProductDetailSkeleton />
    </div>
  );
}
