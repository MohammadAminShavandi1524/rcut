"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";

import ProductCard from "./ProductCard";
import { useFeaturedProducts } from "./useFeaturedProducts";

const FeaturedProducts = () => {
  const { products: featuredProducts } = useFeaturedProducts();

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
    <section className="py-12 sm:py-16 lg:py-20 xl:py-24">
      <div className="w90 mx-auto" dir="rtl">
        {/* Section Header */}
        <div className="mb-6 flex flex-col gap-5 sm:mb-8 sm:gap-6 lg:mb-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0 text-right">
            <h2 className="text-foreground xss:text-[25px] text-[23px] leading-[1.5] font-bold sm:text-[28px] lg:text-[32px] xl:text-4xl">
              محصولات منتخب آرکات
            </h2>

            <p className="text-muted-foreground mt-2 text-[13px] leading-7 sm:mt-3 sm:text-sm lg:text-base">
              انتخابی از ابزارهای تخصصی ماشین‌کاری
            </p>
          </div>

          <Link
            href="/products"
            className="border-custom-primary text-custom-primary hover:bg-custom-primary inline-flex w-full shrink-0 items-center justify-center rounded-lg border px-5 py-3 text-[13px] font-semibold transition-colors duration-300 hover:text-white sm:w-fit sm:px-7 sm:text-sm"
          >
            مشاهده همه محصولات
          </Link>
        </div>

        {/* Products Slider */}
        <div
          ref={emblaRef}
          onDragStart={(event) => event.preventDefault()}
          className="overflow-hidden select-none"
        >
          <div className="-ms-2 flex touch-pan-y items-stretch sm:-ms-3 lg:-ms-4 xl:-ms-4.5">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="xss:basis-[82%] flex min-w-0 shrink-0 grow-0 basis-[88%] items-stretch ps-3 min-[480px]:basis-[65%] sm:basis-1/2 sm:ps-4 md:basis-1/3 lg:ps-5 xl:basis-1/4 xl:ps-5.5 2xl:basis-1/5 [&>article]:w-full"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div
          className="mt-6 flex justify-end gap-2.5 sm:mt-7 lg:mt-8 lg:gap-3"
          dir="ltr"
        >
          <button
            type="button"
            aria-label="محصولات بعدی"
            onClick={scrollNext}
            className="border-border bg-background text-foreground hover:border-custom-primary hover:bg-custom-primary flex size-10 cursor-pointer items-center justify-center rounded-lg border transition-colors duration-300 hover:text-white active:scale-95 sm:size-11 lg:size-12"
          >
            <ArrowLeft
              className="size-[18px] lg:size-5"
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </button>

          <button
            type="button"
            aria-label="محصولات قبلی"
            onClick={scrollPrev}
            className="border-border bg-background text-foreground hover:border-custom-primary hover:bg-custom-primary flex size-10 cursor-pointer items-center justify-center rounded-lg border transition-colors duration-300 hover:text-white active:scale-95 sm:size-11 lg:size-12"
          >
            <ArrowRight
              className="size-[18px] lg:size-5"
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
