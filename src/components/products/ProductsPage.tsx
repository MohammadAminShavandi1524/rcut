"use client";

import { useMemo } from "react";
import { ChevronLeft } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import ProductCard from "./ProductCard";
import ProductsFilters from "./ProductsFilters";
import {
  productCategories,
  products,
  type CategorySlug,
} from "./products.data";

type Props = {
  categorySlug?: CategorySlug;
};

const ProductsPage = ({ categorySlug }: Props) => {
  const searchParams = useSearchParams();

  const sort = searchParams.get("sort") || "newest";

  const selectedCategories =
    searchParams.get("categories")?.split(",").filter(Boolean) ?? [];

  const bestSellerOnly = searchParams.get("bestSeller") === "1";

  const selectedProduct = searchParams.get("product");

  const activeCategory = categorySlug
    ? productCategories.find((item) => item.slug === categorySlug)
    : undefined;

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Single Product Filter
    if (selectedProduct) {
      result = result.filter((product) => product.slug === selectedProduct);
    }

    // Category page
    if (categorySlug) {
      const category = productCategories.find(
        (item) => item.slug === categorySlug,
      );

      if (category) {
        result = result.filter(
          (product) => product.category === category.title,
        );
      }
    }

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter((product) => {
        const category = productCategories.find(
          (item) => item.title === product.category,
        );

        return category && selectedCategories.includes(category.slug);
      });
    }

    // Best seller filter
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
  }, [categorySlug, selectedCategories, bestSellerOnly, sort, selectedProduct]);

  // وقتی فقط یک دسته‌بندی انتخاب شده باشد،
  // دسته‌بندی داخل کارت محصول نمایش داده نمی‌شود.
  const showProductCategory = selectedCategories.length !== 1;

  return (
    <main dir="rtl" className="bg-background min-h-screen">
      <section className="w90 mx-auto py-8 lg:px-10">
        {/* Breadcrumb */}
        <nav className="ms-2 flex items-center gap-2 text-sm">
          <Link
            href="/"
            className="text-muted-foreground hover:text-custom-primary transition-colors duration-300"
          >
            آرکات
          </Link>

          <ChevronLeft size={15} className="text-muted-foreground" />

          <Link
            href="/products"
            className={`transition-colors duration-300 ${
              activeCategory
                ? "text-muted-foreground hover:text-custom-primary"
                : "text-foreground font-medium"
            }`}
          >
            محصولات
          </Link>

          {activeCategory && (
            <>
              <ChevronLeft size={15} className="text-muted-foreground" />

              <span className="text-custom-primary font-medium">
                {activeCategory.title}
              </span>
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
