"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useState } from "react";

import useEmblaCarousel from "embla-carousel-react";

import ProductCard from "./ProductCard";
import { featuredProducts } from "./featured-products.data";

const FeaturedProducts = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    direction: "rtl",
    align: "start",
  });

  const prev = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const next = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  return (
    <section className="py-24">
      <div className="w90" dir="rtl">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h2 className="text-foreground text-4xl font-bold">
              محصولات منتخب آرکات
            </h2>

            <p className="text-muted-foreground mt-3">
              انتخابی از ابزارهای تخصصی ماشین‌کاری
            </p>
          </div>

          <button
            type="button"
            className="border-custom-primary text-custom-primary hover:bg-custom-primary cursor-pointer rounded-lg border px-7 py-3 text-sm font-semibold transition-colors duration-300 hover:text-white"
          >
            مشاهده همه محصولات
          </button>
        </div>

        <div ref={emblaRef} className="overflow-hidden">
          <div className="-ms-5.5 flex">
            {featuredProducts.map((product) => (
              <div key={product.id} className="min-w-0 shrink-0 basis-1/5 ps-6">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3" dir="ltr">
          <button
            type="button"
            onClick={prev}
            className="border-border bg-background text-foreground hover:border-custom-primary hover:bg-custom-primary flex size-12 cursor-pointer items-center justify-center rounded-lg border transition-colors duration-300 hover:text-white"
          >
            <ArrowLeft size={20} strokeWidth={1.8} />
          </button>

          <button
            type="button"
            onClick={next}
            className="border-border bg-background text-foreground hover:border-custom-primary hover:bg-custom-primary flex size-12 cursor-pointer items-center justify-center rounded-lg border transition-colors duration-300 hover:text-white"
          >
            <ArrowRight size={20} strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
