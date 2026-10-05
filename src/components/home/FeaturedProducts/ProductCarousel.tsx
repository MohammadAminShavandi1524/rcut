"use client";

import useEmblaCarousel from "embla-carousel-react";

import ProductCard from "./ProductCard";
import { products } from "@/components/products/products.data";

const ProductCarousel = () => {
  const [emblaRef] = useEmblaCarousel({
    loop: true,
    direction: "rtl",
    align: "start",
  });

  const featuredProducts = products.filter((product) => product.isBestSeller);

  return (
    <div
      ref={emblaRef}
      onDragStart={(event) => event.preventDefault()}
      className="overflow-hidden select-none"
    >
      <div className="-ms-6 flex touch-pan-y">
        {featuredProducts.map((product) => (
          <div
            key={product.id}
            className="min-w-0 shrink-0 grow-0 basis-1/6 ps-6"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
