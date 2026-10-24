"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import ProductsSort from "./ProductsSort";
import ProductsCategoryFilter from "./ProductsCategoryFilter";
import ProductsTypeFilter from "./ProductsTypeFilter";

import {
  findCategoryByKey,
  findCategoryById,
  getLeafCategoryIds,
} from "./products.categories";

const ProductsFilters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const sort =
    searchParams.get("sort") === "best-selling" ? "best-selling" : "newest";

  const scopeKey = searchParams.get("scope");

  const scopeCategory = scopeKey ? findCategoryByKey(scopeKey) : undefined;

  const scopeCategoryId = scopeCategory?.id;

  const scopeLeafIds = scopeCategory ? getLeafCategoryIds(scopeCategory) : [];

  const parsedCategories = [
    ...new Set(
      (searchParams.get("categories") ?? "")
        .split(",")
        .filter(Boolean)
        .map((value) => findCategoryByKey(value)?.id)
        .filter((id): id is number => id !== undefined),
    ),
  ];

  const isWithinScope = (categoryId: number) => {
    if (!scopeCategory) return true;

    const category = findCategoryById(categoryId);
    if (!category) return false;

    return getLeafCategoryIds(category).every((id) =>
      scopeLeafIds.includes(id),
    );
  };

  const selectedCategories = parsedCategories.filter(isWithinScope);

  if (scopeCategoryId !== undefined && selectedCategories.length === 0) {
    selectedCategories.push(scopeCategoryId);
  }

  const bestSellerOnly = searchParams.get("bestSeller") === "1";

  const replaceParams = (params: URLSearchParams) => {
    const query = params.toString();

    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  };

  const updateUrl = (key: string, value?: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    replaceParams(params);
  };

  const handleCategoryToggle = (id: number) => {
    if (!isWithinScope(id)) return;

    let nextCategories: number[];

    if (selectedCategories.includes(id)) {
      nextCategories = selectedCategories.filter((item) => item !== id);
    } else {
      const withoutScope = selectedCategories.filter(
        (item) => item !== scopeCategoryId,
      );

      nextCategories = [...withoutScope, id];
    }

    if (scopeCategoryId !== undefined && nextCategories.length === 0) {
      nextCategories = [scopeCategoryId];
    }

    const params = new URLSearchParams(searchParams.toString());

    params.delete("product");

    if (nextCategories.length > 0) {
      params.set("categories", [...new Set(nextCategories)].join(","));
    } else {
      params.delete("categories");
    }

    replaceParams(params);
  };

  const handleSortChange = (value: "newest" | "best-selling") => {
    updateUrl("sort", value === "newest" ? undefined : value);
  };

  const handleBestSellerChange = (value: "all" | "best-seller") => {
    updateUrl("bestSeller", value === "all" ? undefined : "1");
  };

  return (
    <aside
      dir="rtl"
      className="border-border bg-background w-full overflow-hidden rounded-2xl border"
    >
      <ProductsSort sort={sort} onChange={handleSortChange} />

      <ProductsCategoryFilter
        selectedCategories={selectedCategories}
        onToggle={handleCategoryToggle}
        scopeCategoryId={scopeCategoryId}
      />

      <ProductsTypeFilter
        bestSellerOnly={bestSellerOnly}
        onChange={handleBestSellerChange}
      />
    </aside>
  );
};

export default ProductsFilters;
