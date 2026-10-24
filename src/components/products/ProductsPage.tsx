"use client";

import { useMemo } from "react";
import { ChevronLeft } from "lucide-react";
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
      <section className="w90 mx-auto py-8 lg:px-10">
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

        {/* Main */}
        <div className="mt-8 grid items-start gap-5 lg:grid-cols-[300px_minmax(0,1fr)]">
          {/* Sidebar */}
          <div className="lg:sticky lg:top-28">
            <ProductsFilters />
          </div>

          {/* Products */}
          <div>
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
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
