import { Product } from "@/entities/product";

export function calculateAvgRate(product: Product): number {
  if (!product.comments || product.comments.length === 0) return 0;
  const total = product.comments.reduce(
    (acc, comment) => acc + comment.rate,
    0,
  );
  return total / product.comments.length;
}

export function getStarState(
  rating: number,
  starIndex: number,
  isProduct: boolean,
): "filled" | "half-filled" | "empty" {
  if (isProduct) {
    if (rating >= starIndex + 1) return "filled";
    if (rating > starIndex && rating < starIndex + 1) return "half-filled";
    return "empty";
  }

  return starIndex < rating ? "filled" : "empty";
}
