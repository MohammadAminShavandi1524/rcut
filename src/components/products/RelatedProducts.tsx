"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

import ProductCard from "./ProductCard";
import type { Product } from "./products.data";

type Props = {
  products: Product[];
};

const RelatedProducts = ({ products }: Props) => {
  const [hasOverflow, setHasOverflow] = useState(false);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    direction: "rtl",
    align: "start",
    loop: false,
    containScroll: "trimSnaps",
    watchDrag: (api) => api.scrollSnapList().length > 1,
  });

  const updateControls = useCallback(() => {
    if (!emblaApi) return;

    setHasOverflow(emblaApi.scrollSnapList().length > 1);
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    updateControls();

    emblaApi.on("select", updateControls);
    emblaApi.on("reInit", updateControls);

    return () => {
      emblaApi.off("select", updateControls);
      emblaApi.off("reInit", updateControls);
    };
  }, [emblaApi, updateControls]);

  if (products.length === 0) return null;

  return (
    <section
      dir="rtl"
      aria-labelledby="related-products-title"
      aria-roledescription={hasOverflow ? "کروسل" : undefined}
      className="mt-24 lg:mt-30"
    >
      <div className="mb-8">
        <h2
          id="related-products-title"
          className="text-foreground text-2xl font-bold sm:text-3xl"
        >
          محصولات مشابه
        </h2>
      </div>

      <div
        ref={emblaRef}
        onDragStart={(event) => event.preventDefault()}
        className="overflow-hidden select-none"
      >
        <div className="-ms-4 flex touch-pan-y items-stretch">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex min-w-0 shrink-0 grow-0 basis-full items-stretch ps-5 sm:basis-1/2 md:basis-1/3 xl:basis-1/4 2xl:basis-1/5 [&>article]:h-auto [&>article]:w-full"
            >
              <ProductCard product={product} showCategory={false} />
            </div>
          ))}
        </div>
      </div>

      {hasOverflow && (
        <div className="mt-8 flex justify-end gap-3" dir="ltr">
          <button
            type="button"
            aria-label="محصولات بعدی"
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canScrollNext}
            className="border-border bg-background text-foreground enabled:hover:border-custom-primary enabled:hover:bg-custom-primary flex size-12 cursor-pointer items-center justify-center rounded-lg border transition-colors duration-300 enabled:hover:text-white disabled:cursor-not-allowed disabled:opacity-35"
          >
            <ArrowLeft size={20} strokeWidth={1.8} aria-hidden="true" />
          </button>

          <button
            type="button"
            aria-label="محصولات قبلی"
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canScrollPrev}
            className="border-border bg-background text-foreground enabled:hover:border-custom-primary enabled:hover:bg-custom-primary flex size-12 cursor-pointer items-center justify-center rounded-lg border transition-colors duration-300 enabled:hover:text-white disabled:cursor-not-allowed disabled:opacity-35"
          >
            <ArrowRight size={20} strokeWidth={1.8} aria-hidden="true" />
          </button>
        </div>
      )}
    </section>
  );
};

export default RelatedProducts;
