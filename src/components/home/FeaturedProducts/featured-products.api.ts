export interface FeaturedProduct {
  id: number;
  name: string;
  description: string;
  image: string;
  category: {
    id: number;
    name: string;
    index: number;
    child_count: number;
    parent: {
      id: number;
      name: string;
    } | null;
    created: string;
  };
  new: boolean;
  top_seller: boolean;
  created: string;
}

export async function getFeaturedProducts(
  signal?: AbortSignal,
): Promise<FeaturedProduct[]> {
  const response = await fetch("/api/products", {
    method: "GET",
    cache: "no-store",
    signal,
  });

  if (!response.ok) {
    throw new Error("دریافت محصولات منتخب ناموفق بود.");
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("ساختار پاسخ محصولات نامعتبر است.");
  }

  return (data as FeaturedProduct[]).filter(
    (product) => product.top_seller === true,
  );
}
