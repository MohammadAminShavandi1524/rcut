"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import ProductsSort from "./ProductsSort";
import ProductsCategoryFilter from "./ProductsCategoryFilter";
import ProductsTypeFilter from "./ProductsTypeFilter";

const ProductsFilters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const sort =
    (searchParams.get("sort") as "newest" | "best-selling") || "newest";

  const selectedCategories =
    searchParams.get("categories")?.split(",").filter(Boolean) ?? [];

  const bestSellerOnly = searchParams.get("bestSeller") === "1";

  const updateUrl = (key: string, value?: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    const query = params.toString();

    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  };

  const handleCategoryToggle = (slug: string) => {
    const nextCategories = selectedCategories.includes(slug)
      ? selectedCategories.filter((item) => item !== slug)
      : [...selectedCategories, slug];

    const params = new URLSearchParams(searchParams.toString());

    // با انتخاب دسته‌بندی، فیلتر تک‌محصولی حذف می‌شود.
    params.delete("product");

    if (nextCategories.length) {
      params.set("categories", nextCategories.join(","));
    } else {
      params.delete("categories");
    }

    const query = params.toString();

    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  };

  const handleSortChange = (
    value: "newest" | "best-selling",
  ) => {
    if (value === "newest") {
      updateUrl("sort");
      return;
    }

    updateUrl("sort", value);
  };

  const handleBestSellerChange = (
    value: "all" | "best-seller",
  ) => {
    if (value === "all") {
      updateUrl("bestSeller");
      return;
    }

    updateUrl("bestSeller", "1");
  };

  return (
    <aside
      dir="rtl"
      className="border-border bg-background w-full overflow-hidden rounded-2xl border"
    >
      <ProductsSort
        sort={sort}
        onChange={handleSortChange}
      />

      <ProductsCategoryFilter
        selectedCategories={selectedCategories}
        onToggle={handleCategoryToggle}
      />

      <ProductsTypeFilter
        bestSellerOnly={bestSellerOnly}
        onChange={handleBestSellerChange}
      />
    </aside>
  );
};

export default ProductsFilters;