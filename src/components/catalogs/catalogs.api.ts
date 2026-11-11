import type { ApiBrand } from "@/components/products/products.api";

export interface ApiCatalog {
  id: number;
  title: string;
  description: string;
  image: string | null;
  brand: ApiBrand | null;
  cover: string | null;
  file: string | null;
  index: number;
  created: string;
}

export interface CatalogBrand {
  brand: ApiBrand;
  catalogs: ApiCatalog[];
}

export const getCatalogs = async (
  signal?: AbortSignal,
): Promise<ApiCatalog[]> => {
  const response = await fetch("/api/catalogs", {
    cache: "no-store",
    signal,
  });

  if (!response.ok) {
    throw new Error(`GET CATALOGS FAILED: ${response.status}`);
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("Invalid catalogs response");
  }

  return data as ApiCatalog[];
};

export const getCatalogBrands = (catalogs: ApiCatalog[]): CatalogBrand[] => {
  const brandMap = new Map<number, CatalogBrand>();

  for (const catalog of catalogs) {
    if (!catalog.brand || !catalog.image?.trim() || !catalog.file?.trim()) {
      continue;
    }

    const brandId = catalog.brand.id;

    if (!Number.isSafeInteger(brandId) || brandId <= 0) {
      continue;
    }

    const existing = brandMap.get(brandId);

    if (existing) {
      existing.catalogs.push(catalog);
    } else {
      brandMap.set(brandId, {
        brand: catalog.brand,
        catalogs: [catalog],
      });
    }
  }

  return [...brandMap.values()]
    .map((item) => ({
      ...item,
      catalogs: item.catalogs.sort((a, b) => a.index - b.index || a.id - b.id),
    }))
    .sort((a, b) => a.brand.index - b.brand.index || a.brand.id - b.brand.id);
};
