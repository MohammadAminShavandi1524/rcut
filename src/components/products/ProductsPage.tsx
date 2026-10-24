"use client";

import { useMemo, useState } from "react";
import { ChevronDown, ChevronLeft, SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import ProductCard from "./ProductCard";
import ProductsFilters from "./ProductsFilters";

import { products, type CategorySlug } from "./products.data";

import {
  findCategoryByKey,
  findCategoryById,
  getCategoryPath,
  getLeafCategoryIds,
  matchesCategoryFilter,
} from "./products.categories";

type Props = {
  categorySlug?: CategorySlug;
};

const ProductsPage = ({ categorySlug }: Props) => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const searchParams = useSearchParams();

  const sort = searchParams.get("sort") || "newest";

  const categoriesParam = searchParams.get("categories") ?? "";

  const scopeParam = searchParams.get("scope");

  const bestSellerOnly = searchParams.get("bestSeller") === "1";

  const selectedProduct = searchParams.get("product");

  // دسته‌بندی انتخاب‌شده از Dropdown یا Footer
  const scopeCategory = scopeParam
    ? findCategoryByKey(scopeParam)
    : categorySlug
      ? findCategoryByKey(categorySlug)
      : undefined;

  // تمام دسته‌بندی‌های نهایی متعلق به Scope
  const scopeLeafIds = useMemo(
    () => (scopeCategory ? getLeafCategoryIds(scopeCategory) : []),
    [scopeCategory],
  );

  // مسیر سلسله‌مراتبی Breadcrumb
  const breadcrumbCategories = scopeCategory
    ? getCategoryPath(scopeCategory.id)
    : [];

  // دسته‌بندی‌هایی که داخل فیلتر انتخاب شده‌اند
  const selectedCategoryIds = useMemo(() => {
    const ids = [
      ...new Set(
        categoriesParam
          .split(",")
          .filter(Boolean)
          .map((value) => findCategoryByKey(value)?.id)
          .filter((id): id is number => id !== undefined),
      ),
    ];

    if (!scopeCategory) {
      return ids;
    }

    // فقط دسته‌بندی‌های متعلق به Scope مجازند
    const filteredIds = ids.filter((id) => {
      const category = findCategoryById(id);

      if (!category) return false;

      return getLeafCategoryIds(category).every((leafId) =>
        scopeLeafIds.includes(leafId),
      );
    });

    // اگر فیلتر اختصاصی انتخاب نشده، کل Scope نمایش داده می‌شود
    return filteredIds.length > 0 ? filteredIds : [scopeCategory.id];
  }, [categoriesParam, scopeCategory, scopeLeafIds]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Single Product Filter
    if (selectedProduct) {
      result = result.filter((product) => product.slug === selectedProduct);
    }

    // Scope Filter
    // انتخاب دسته‌بندی از Dropdown یا Footer
    if (scopeCategory) {
      result = result.filter((product) =>
        scopeLeafIds.includes(product.categoryId),
      );
    }

    // Category Page Filter
    if (categorySlug && !scopeParam) {
      const category = findCategoryByKey(categorySlug);

      if (category) {
        const leafIds = getLeafCategoryIds(category);

        result = result.filter((product) =>
          leafIds.includes(product.categoryId),
        );
      }
    }

    // Category Checkbox Filters
    if (selectedCategoryIds.length > 0) {
      result = result.filter((product) =>
        matchesCategoryFilter(product.categoryId, selectedCategoryIds),
      );
    }

    // Best Seller Filter
    if (bestSellerOnly) {
      result = result.filter((product) => product.isBestSeller);
    }

    // Sort
    result.sort((a, b) => {
      if (sort === "best-selling") {
        if (a.isBestSeller !== b.isBestSeller) {
          return a.isBestSeller ? -1 : 1;
        }
      }

      return new Date(b.created).getTime() - new Date(a.created).getTime();
    });

    return result;
  }, [
    categorySlug,
    scopeParam,
    scopeCategory,
    scopeLeafIds,
    selectedCategoryIds,
    bestSellerOnly,
    sort,
    selectedProduct,
  ]);

  const showProductCategory = selectedCategoryIds.length !== 1;

  return (
    <main dir="rtl" className="bg-background min-h-screen">
      <section className="w90 mx-auto py-6 sm:py-8 lg:px-6 xl:px-8 3xl:px-10">
        {/* Breadcrumb */}
        <nav
          aria-label="مسیر صفحه"
          className="ms-2 flex flex-wrap items-center gap-2 text-sm"
        >
          <Link
            href="/"
            className="text-muted-foreground hover:text-custom-primary transition-colors duration-300"
          >
            آرکات
          </Link>

          <ChevronLeft
            size={15}
            aria-hidden="true"
            className="text-muted-foreground shrink-0"
          />

          {breadcrumbCategories.length === 0 ? (
            <span aria-current="page" className="text-foreground font-medium">
              محصولات
            </span>
          ) : (
            <>
              <Link
                href="/products"
                className="text-muted-foreground hover:text-custom-primary transition-colors duration-300"
              >
                محصولات
              </Link>

              {breadcrumbCategories.map((category, index) => {
                const isLast = index === breadcrumbCategories.length - 1;

                return (
                  <div key={category.id} className="flex items-center gap-2">
                    <ChevronLeft
                      size={15}
                      aria-hidden="true"
                      className="text-muted-foreground shrink-0"
                    />

                    {isLast ? (
                      <span
                        aria-current="page"
                        className="text-custom-primary font-medium"
                      >
                        {category.name}
                      </span>
                    ) : (
                      <Link
                        href={`/products?scope=${category.id}&categories=${category.id}`}
                        className="text-muted-foreground hover:text-custom-primary transition-colors duration-300"
                      >
                        {category.name}
                      </Link>
                    )}
                  </div>
                );
              })}
            </>
          )}
        </nav>

        {/* Mobile / Tablet Filter Toggle */}
        <div className="mt-6 lg:hidden">
          <button
            type="button"
            onClick={() => setFiltersOpen((value) => !value)}
            aria-expanded={filtersOpen}
            aria-controls="products-filters-panel"
            className="border-border bg-background text-foreground hover:border-custom-primary flex min-h-12 w-full cursor-pointer items-center justify-between rounded-xl border px-4 py-3 text-sm font-semibold transition-colors duration-300"
          >
            <span className="flex items-center gap-2.5">
              <SlidersHorizontal
                size={19}
                strokeWidth={1.7}
                className="text-custom-primary"
              />
              فیلتر و مرتب‌سازی محصولات
            </span>

            <ChevronDown
              size={19}
              strokeWidth={1.7}
              className={`text-muted-foreground transition-transform duration-300 ${
                filtersOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* Main */}
        <div className="mt-4 grid min-w-0 items-start gap-4 lg:mt-8 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-5 xl:grid-cols-[270px_minmax(0,1fr)] 3xl:grid-cols-[300px_minmax(0,1fr)]">
          {/* Sidebar */}
          <div id="products-filters-panel"
            className={`${filtersOpen ? "block" : "hidden"} min-w-0 lg:sticky lg:top-28 lg:block`}>
            <ProductsFilters />
          </div>

          {/* Products */}
          <div>
            {filteredProducts.length > 0 ? (
              <div className="grid min-w-0 grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 mlg:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 3xl:gap-x-5">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    showCategory={showProductCategory}
                  />
                ))}
              </div>
            ) : (
              <div className="border-border flex min-h-[300px] items-center justify-center rounded-2xl border">
                <p className="text-muted-foreground text-sm">
                  محصولی با این فیلترها پیدا نشد.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductsPage;
