"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

import Link from "next/link";

import { ChevronLeft } from "lucide-react";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import {
  getProductsByBrand,
  getCategories,
  type ApiProduct,
  type ApiCategory,
} from "@/components/products/products.api";

import {
  getCatalogsByBrand,
  getCatalogBrands,
  type CatalogBrand,
} from "./catalogs.api";

import CatalogBrandIntro from "./CatalogBrandIntro";
import CatalogBrandProducts from "./CatalogBrandProducts";
import CatalogBrandDetails from "./CatalogBrandDetails";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  brandId: number;
};

type BrandPageData = {
  brandId: number;
  catalogBrand: CatalogBrand;
  products: ApiProduct[];
  categories: ApiCategory[];
};

const CatalogBrandPage = ({ brandId }: Props) => {
  const pageRef = useRef<HTMLElement | null>(null);

  const [data, setData] = useState<BrandPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch Brand Data
  useEffect(() => {
    const controller = new AbortController();

    const loadBrand = async () => {
      setLoading(true);
      setError(false);
      setData(null);

      try {
        const [catalogs, products, categories] = await Promise.all([
          getCatalogsByBrand(brandId, controller.signal),
          getProductsByBrand(brandId, controller.signal),
          getCategories(controller.signal),
        ]);

        if (controller.signal.aborted) return;

        if (
          !Array.isArray(catalogs) ||
          !Array.isArray(products) ||
          !Array.isArray(categories)
        ) {
          throw new Error("Invalid brand page response");
        }

        const catalogBrand = getCatalogBrands(
          catalogs.filter((catalog) => catalog.brand?.id === brandId),
        ).find((item) => item.brand.id === brandId);

        if (!catalogBrand) {
          throw new Error("No valid catalogs for this brand");
        }

        setData({
          brandId,
          catalogBrand,
          products,
          categories,
        });

        setError(false);
      } catch (err) {
        if (controller.signal.aborted) return;

        console.error("GET CATALOG BRAND PAGE ERROR:", err);

        setData(null);
        setError(true);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    void loadBrand();

    return () => controller.abort();
  }, [brandId]);

  const pageData = data?.brandId === brandId ? data : null;

  // GSAP Animations
  useLayoutEffect(() => {
    if (loading || error || !pageData) return;

    const section = pageRef.current;

    if (!section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(".catalog-brand-heading", {
        y: 22,
        opacity: 0,
        duration: 0.55,
        ease: "power2.out",
      });

      gsap.from(".catalog-brand-products-section", {
        y: 25,
        opacity: 0,
        duration: 0.55,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".catalog-brand-products-section",
          start: "top 88%",
          once: true,
        },
      });

      gsap.utils
        .toArray<HTMLElement>(".catalog-detail-section")
        .forEach((element) => {
          gsap.from(element, {
            y: 28,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              once: true,
            },
          });
        });
    }, section);

    return () => ctx.revert();
  }, [loading, error, pageData]);

  // Loading Skeleton
  if (loading || (!error && !pageData)) {
    return (
      <main
        dir="rtl"
        className="bg-background min-h-screen"
        role="status"
        aria-label="در حال بارگذاری اطلاعات برند"
        aria-busy="true"
      >
        <div className="w90 3xl:px-10 mx-auto py-6 sm:py-8 lg:px-6 xl:px-8">
          <div className="bg-border/50 h-4 w-52 animate-pulse rounded" />

          {/* Brand Skeleton */}
          <div className="border-border mt-8 grid gap-6 rounded-2xl border p-5 sm:p-7 lg:grid-cols-[minmax(0,1fr)_220px]">
            <div className="space-y-5">
              <div className="bg-border/50 h-9 w-48 animate-pulse rounded" />

              <div className="bg-border/50 h-4 w-full animate-pulse rounded" />

              <div className="bg-border/50 h-4 w-4/5 animate-pulse rounded" />

              <div className="bg-border/50 h-11 w-44 animate-pulse rounded-lg" />
            </div>

            <div className="bg-border/50 aspect-square w-full max-w-[220px] animate-pulse rounded-xl" />
          </div>

          {/* Products Skeleton */}
          <div className="mt-12">
            <div className="bg-border/50 mb-7 h-8 w-44 animate-pulse rounded" />

            <div className="3xl:grid-cols-[300px_minmax(0,1fr)] mt-4 grid min-w-0 items-start gap-4 lg:mt-8 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-5 xl:grid-cols-[270px_minmax(0,1fr)]">
              {/* Filters Skeleton */}
              <div className="border-border hidden rounded-2xl border p-5 lg:block">
                <div className="bg-border/50 mb-6 h-11 animate-pulse rounded" />

                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="bg-border/50 mb-4 h-5 animate-pulse rounded"
                  />
                ))}
              </div>

              {/* Cards Skeleton */}
              <div className="mlg:grid-cols-3 3xl:grid-cols-4 grid min-w-0 grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="border-border overflow-hidden rounded-2xl border"
                  >
                    <div className="bg-border/40 aspect-square animate-pulse" />

                    <div className="space-y-3 p-4">
                      <div className="bg-border/50 h-5 w-4/5 animate-pulse rounded" />

                      <div className="bg-border/50 h-4 w-full animate-pulse rounded" />

                      <div className="bg-border/50 h-4 w-2/3 animate-pulse rounded" />

                      <div className="bg-border/50 mt-5 h-11 animate-pulse rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Error
  if (error || !pageData) {
    return (
      <main
        dir="rtl"
        className="bg-background flex min-h-screen items-center justify-center px-5"
      >
        <div className="text-center">
          <p className="text-muted-foreground text-sm">
            اطلاعات این برند یا کاتالوگ‌های آن در دسترس نیست.
          </p>

          <Link
            href="/catalogs"
            className="text-custom-primary mt-5 inline-block text-sm font-semibold"
          >
            بازگشت به کاتالوگ محصولات و برندها
          </Link>
        </div>
      </main>
    );
  }

  const { catalogBrand, products, categories } = pageData;

  return (
    <main ref={pageRef} dir="rtl" className="bg-background min-h-screen">
      <div className="w90 3xl:px-10 3xl:pb-24 mx-auto py-6 pb-14 sm:py-8 sm:pb-18 lg:px-6 lg:pb-20 xl:px-8">
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

          <Link
            href="/catalogs"
            className="text-muted-foreground hover:text-custom-primary transition-colors duration-300"
          >
            کاتالوگ محصولات و برندها
          </Link>

          <ChevronLeft
            size={15}
            aria-hidden="true"
            className="text-muted-foreground shrink-0"
          />

          <span aria-current="page" className="text-foreground font-medium">
            {catalogBrand.brand.name}
          </span>
        </nav>

        {/* Brand Introduction */}
        <CatalogBrandIntro catalogBrand={catalogBrand} />

        {/* Brand Products */}
        <CatalogBrandProducts
          key={brandId}
          brandName={catalogBrand.brand.name}
          products={products}
          categories={categories}
        />

        {/* Catalog Details */}
        <CatalogBrandDetails
          brandName={catalogBrand.brand.name}
          catalogs={catalogBrand.catalogs}
        />
      </div>
    </main>
  );
};

export default CatalogBrandPage;
