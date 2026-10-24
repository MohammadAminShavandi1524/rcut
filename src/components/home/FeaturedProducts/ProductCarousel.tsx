"use client";

import useEmblaCarousel from "embla-carousel-react";

import ProductCard from "./ProductCard";
import { products } from "@/components/products/products.data";

const featuredProducts = products.filter((product) => product.isBestSeller);

const ProductCarousel = () => {
  const [emblaRef] = useEmblaCarousel({
    loop: true,
    direction: "rtl",
    align: "start",
    containScroll: "trimSnaps",
  });

  return (
    <div
      ref={emblaRef}
      onDragStart={(event) => event.preventDefault()}
      className="overflow-hidden select-none"
      dir="rtl"
    >
      <div className="-ms-3 flex touch-pan-y items-stretch sm:-ms-4 lg:-ms-5 xl:-ms-6">
        {featuredProducts.map((product) => (
          <div
            key={product.id}
            className="xss:basis-[82%] flex min-w-0 shrink-0 grow-0 basis-[88%] items-stretch ps-3 min-[480px]:basis-[65%] sm:basis-1/2 sm:ps-4 md:basis-1/3 lg:ps-5 xl:basis-1/4 xl:ps-6 2xl:basis-1/5"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
