export interface ApiCategory {
  id: number;
  name: string;
  index: number;
  child_count: number;
  parent: {
    id: number;
    name: string;
  } | null;
  created: string;
}

export interface ApiProduct {
  id: number;
  name: string;
  description: string;
  image: string;
  category: ApiCategory;
  new: boolean;
  top_seller: boolean;
  created: string;
}

async function getJson<T>(url: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(url, {
    cache: "no-store",
    signal,
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const getProducts = (signal?: AbortSignal) =>
  getJson<ApiProduct[]>("/api/products", signal);

export const getCategories = (signal?: AbortSignal) =>
  getJson<ApiCategory[]>("/api/categories", signal);

export const getProduct = (id: number, signal?: AbortSignal) =>
  getJson<ApiProduct>(`/api/products/${id}`, signal);
