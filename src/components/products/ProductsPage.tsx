"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown, ChevronLeft, SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import { cn } from "@/lib/utils";

import ProductCard from "./ProductCard";
import ProductsFilters from "./ProductsFilters";
import { ProductsListSkeleton } from "./ProductsSkeleton";

import {
  getProducts,
  getCategories,
  type ApiProduct,
  type ApiCategory,
} from "./products.api";

import {
  buildCategoryTree,
  findLiveCategoryByKey,
  findLiveCategoryById,
  getLiveCategoryPath,
  getLiveLeafIds,
  matchesLiveCategoryFilter,
} from "./products-category-tree";

import type { CategoryNode } from "./products.categories";

type Props = {
  categorySlug?: string;
};

const ProductsPage = ({ categorySlug }: Props) => {
  const [filtersOpen, setFiltersOpen] = useState(false);

  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const searchParams = useSearchParams();

  useEffect(() => {
    const controller = new AbortController();

    const loadProducts = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          getProducts(controller.signal),
          getCategories(controller.signal),
        ]);

        if (controller.signal.aborted) return;

        if (!Array.isArray(productsData) || !Array.isArray(categoriesData)) {
          throw new Error("ساختار اطلاعات محصولات نامعتبر است.");
        }

        setProducts(productsData);
        setCategories(categoriesData);
        setLoadError(false);
      } catch (error) {
        if (controller.signal.aborted) return;

        console.error("GET PRODUCTS PAGE ERROR:", error);
        setLoadError(true);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    void loadProducts();

    return () => controller.abort();
  }, []);

  const categoryTree = useMemo(
    () => buildCategoryTree(categories),
    [categories],
  );

  const sort = searchParams.get("sort") || "newest";
  const categoriesParam = searchParams.get("categories") ?? "";
  const scopeParam = searchParams.get("scope");
  const bestSellerOnly = searchParams.get("bestSeller") === "1";
  const selectedProduct = searchParams.get("product");

  const scopeCategory = scopeParam
    ? findLiveCategoryByKey(scopeParam, categoryTree)
    : categorySlug
      ? findLiveCategoryByKey(categorySlug, categoryTree)
      : undefined;

  const scopeLeafIds = useMemo(
    () => (scopeCategory ? getLiveLeafIds(scopeCategory) : []),
    [scopeCategory],
  );

  const breadcrumbCategories = scopeCategory
    ? getLiveCategoryPath(scopeCategory.id, categoryTree)
    : [];

  const selectedCategoryIds = useMemo(() => {
    const ids = [
      ...new Set(
        categoriesParam
          .split(",")
          .filter(Boolean)
          .map((value) => findLiveCategoryByKey(value, categoryTree)?.id)
          .filter((id): id is number => id !== undefined),
      ),
    ];

    if (!scopeCategory) {
      return ids;
    }

    const filteredIds = ids.filter((id) => {
      const category = findLiveCategoryById(id, categoryTree);

      if (!category) return false;

      return getLiveLeafIds(category).every((leafId) =>
        scopeLeafIds.includes(leafId),
      );
    });

    return filteredIds.length > 0 ? filteredIds : [scopeCategory.id];
  }, [categoriesParam, categoryTree, scopeCategory, scopeLeafIds]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedProduct) {
      result = result.filter(
        (product) => String(product.id) === selectedProduct,
      );
    }

    if (scopeCategory) {
      result = result.filter((product) =>
        scopeLeafIds.includes(product.category.id),
      );
    }

    if (selectedCategoryIds.length > 0) {
      result = result.filter((product) =>
        matchesLiveCategoryFilter(
          product.category.id,
          selectedCategoryIds,
          categoryTree,
        ),
      );
    }

    if (bestSellerOnly) {
      result = result.filter((product) => product.top_seller === true);
    }

    result.sort((a, b) => {
      if (sort === "best-selling" && a.top_seller !== b.top_seller) {
        return a.top_seller ? -1 : 1;
      }

      return new Date(b.created).getTime() - new Date(a.created).getTime();
    });

    return result;
  }, [
    products,
    selectedProduct,
    scopeCategory,
    scopeLeafIds,
    selectedCategoryIds,
    bestSellerOnly,
    sort,
    categoryTree,
  ]);

  const showProductCategory = selectedCategoryIds.length !== 1;

  if (loading) {
    return <ProductsListSkeleton />;
  }

  if (loadError) {
    return (
      <main
        dir="rtl"
        className="bg-background flex min-h-screen items-center justify-center"
      >
        <p className="text-muted-foreground text-sm">
          دریافت اطلاعات محصولات ناموفق بود.
        </p>
      </main>
    );
  }

  return (
    <main dir="rtl" className="bg-background min-h-screen">
      <section className="w90 3xl:px-10 mx-auto py-6 sm:py-8 lg:px-6 xl:px-8">
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
              className={cn(
                "text-muted-foreground transition-transform duration-300",
                filtersOpen && "rotate-180",
              )}
            />
          </button>
        </div>

        {/* Main */}
        <div className="3xl:grid-cols-[300px_minmax(0,1fr)] mt-4 grid min-w-0 items-start gap-4 lg:mt-8 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-5 xl:grid-cols-[270px_minmax(0,1fr)]">
          {/* Sidebar */}
          <div
            id="products-filters-panel"
            className={cn(
              "min-w-0 lg:sticky lg:top-28 lg:block",
              filtersOpen ? "block" : "hidden",
            )}
          >
            <ProductsFilters categories={categoryTree} />
          </div>

          {/* Products */}
          <div>
            {filteredProducts.length > 0 ? (
              <div className="mlg:grid-cols-3 3xl:grid-cols-4 3xl:gap-x-5 grid min-w-0 grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
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
