import type { FeaturedProduct } from "../FeaturedProducts/featured-products.api";

export async function getNewProducts(
  signal?: AbortSignal,
): Promise<FeaturedProduct[]> {
  const response = await fetch("/api/products", {
    method: "GET",
    cache: "no-store",
    signal,
  });

  if (!response.ok) {
    throw new Error("دریافت محصولات جدید ناموفق بود.");
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("ساختار پاسخ محصولات نامعتبر است.");
  }

  return (data as FeaturedProduct[])
    .filter((product) => product.new === true)
    .sort(
      (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime(),
    );
}
