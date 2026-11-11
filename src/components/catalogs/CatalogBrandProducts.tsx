"use client";

import { useMemo, useState } from "react";

import { ChevronDown, SlidersHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";

import ProductCard from "@/components/products/ProductCard";

import {
  type ApiCategory,
  type ApiProduct,
} from "@/components/products/products.api";

import {
  buildCategoryTree,
  matchesLiveCategoryFilter,
} from "@/components/products/products-category-tree";

import CatalogBrandFilters from "./CatalogBrandFilters";

type Props = {
  brandName: string;
  products: ApiProduct[];
  categories: ApiCategory[];
};

type SortValue = "newest" | "best-selling";

const CatalogBrandProducts = ({ brandName, products, categories }: Props) => {
  const [filtersOpen, setFiltersOpen] = useState(false);

  const [sort, setSort] = useState<SortValue>("newest");

  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);

  const [bestSellerOnly, setBestSellerOnly] = useState(false);

  const categoryTree = useMemo(
    () => buildCategoryTree(categories),
    [categories],
  );

  const handleCategoryToggle = (id: number) => {
    setSelectedCategoryIds((current) => {
      if (current.includes(id)) {
        return current.filter((item) => item !== id);
      }

      return [...current, id];
    });
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

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
  }, [products, selectedCategoryIds, categoryTree, bestSellerOnly, sort]);

  const showProductCategory = selectedCategoryIds.length !== 1;

  return (
    <section
      className="catalog-brand-products-section mt-12 sm:mt-14 lg:mt-18 xl:mt-20"
      aria-labelledby="brand-products-heading"
    >
      {/* Heading */}
      <div className="mb-6 text-right sm:mb-8">
        <h2
          id="brand-products-heading"
          className="text-foreground text-[23px] font-bold sm:text-[27px] lg:text-[32px]"
        >
          محصولات {brandName}
        </h2>
      </div>

      {/* Mobile / Tablet Filter Toggle */}
      <div className="mt-6 lg:hidden">
        <button
          type="button"
          onClick={() => setFiltersOpen((value) => !value)}
          aria-expanded={filtersOpen}
          aria-controls="catalog-brand-filters-panel"
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

      {/* Same Layout As ProductsPage */}
      <div className="3xl:grid-cols-[300px_minmax(0,1fr)] mt-4 grid min-w-0 items-start gap-4 lg:mt-8 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-5 xl:grid-cols-[270px_minmax(0,1fr)]">
        {/* Filters Sidebar */}
        <div
          id="catalog-brand-filters-panel"
          className={cn(
            "min-w-0 lg:sticky lg:top-28 lg:block",
            filtersOpen ? "block" : "hidden",
          )}
        >
          <CatalogBrandFilters
            categories={categoryTree}
            selectedCategoryIds={selectedCategoryIds}
            onCategoryToggle={handleCategoryToggle}
            sort={sort}
            onSortChange={setSort}
            bestSellerOnly={bestSellerOnly}
            onBestSellerChange={(value) =>
              setBestSellerOnly(value === "best-seller")
            }
          />
        </div>

        {/* Products Grid */}
        <div className="min-w-0">
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
            <div className="border-border flex min-h-[300px] items-center justify-center rounded-2xl border px-5">
              <p className="text-muted-foreground text-center text-sm">
                محصولی با این فیلترها پیدا نشد.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CatalogBrandProducts;
