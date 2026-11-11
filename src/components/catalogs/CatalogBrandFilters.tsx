"use client";

import ProductsSort from "@/components/products/ProductsSort";
import ProductsCategoryFilter from "@/components/products/ProductsCategoryFilter";
import ProductsTypeFilter from "@/components/products/ProductsTypeFilter";

import type { CategoryNode } from "@/components/products/products.categories";

type SortValue = "newest" | "best-selling";
type ProductType = "all" | "best-seller";

type Props = {
  categories: CategoryNode[];
  selectedCategoryIds: number[];
  onCategoryToggle: (id: number) => void;
  sort: SortValue;
  onSortChange: (value: SortValue) => void;
  bestSellerOnly: boolean;
  onBestSellerChange: (value: ProductType) => void;
};

const CatalogBrandFilters = ({
  categories,
  selectedCategoryIds,
  onCategoryToggle,
  sort,
  onSortChange,
  bestSellerOnly,
  onBestSellerChange,
}: Props) => {
  return (
    <aside
      dir="rtl"
      className="border-border bg-background w-full overflow-hidden rounded-2xl border"
    >
      <ProductsSort sort={sort} onChange={onSortChange} />

      <ProductsCategoryFilter
        categories={categories}
        selectedCategories={selectedCategoryIds}
        onToggle={onCategoryToggle}
      />

      <ProductsTypeFilter
        bestSellerOnly={bestSellerOnly}
        onChange={onBestSellerChange}
      />
    </aside>
  );
};

export default CatalogBrandFilters;
