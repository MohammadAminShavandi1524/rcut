"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";

import ProductCard from "./ProductCard";
import { products } from "@/components/products/products.data";

const featuredProducts = products.filter((product) => product.isBestSeller);

const FeaturedProducts = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    direction: "rtl",
    align: "start",
  });

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  return (
    <section className="py-24">
      <div className="w90 mx-auto" dir="rtl">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-6">
          <div>
            <h2 className="text-foreground text-2xl font-bold sm:text-3xl lg:text-4xl">
              محصولات منتخب آرکات
            </h2>

            <p className="text-muted-foreground mt-3">
              انتخابی از ابزارهای تخصصی ماشین‌کاری
            </p>
          </div>

          <Link
            href="/products"
            className="border-custom-primary text-custom-primary hover:bg-custom-primary inline-flex items-center justify-center rounded-lg border px-7 py-3 text-sm font-semibold transition-colors duration-300 hover:text-white"
          >
            مشاهده همه محصولات
          </Link>
        </div>

        <div
          ref={emblaRef}
          onDragStart={(event) => event.preventDefault()}
          className="overflow-hidden select-none"
        >
          <div className="-ms-5.5 flex touch-pan-y items-stretch">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="flex min-w-0 shrink-0 grow-0 basis-full items-stretch ps-6 sm:basis-1/2 md:basis-1/3 xl:basis-1/4 2xl:basis-1/5"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3" dir="ltr">
          <button
            type="button"
            aria-label="محصولات بعدی"
            onClick={scrollNext}
            className="border-border bg-background text-foreground hover:border-custom-primary hover:bg-custom-primary flex size-12 cursor-pointer items-center justify-center rounded-lg border transition-colors duration-300 hover:text-white"
          >
            <ArrowLeft size={20} strokeWidth={1.8} aria-hidden="true" />
          </button>

          <button
            type="button"
            aria-label="محصولات قبلی"
            onClick={scrollPrev}
            className="border-border bg-background text-foreground hover:border-custom-primary hover:bg-custom-primary flex size-12 cursor-pointer items-center justify-center rounded-lg border transition-colors duration-300 hover:text-white"
          >
            <ArrowRight size={20} strokeWidth={1.8} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
