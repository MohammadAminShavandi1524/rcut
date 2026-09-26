"use client";

import useEmblaCarousel from "embla-carousel-react";

import ProductCard from "./ProductCard";
import { featuredProducts } from "./featured-products.data";

const ProductCarousel = () => {
  const [emblaRef] = useEmblaCarousel({
    loop: true,
    direction: "rtl",
    align: "start",
  });

  return (
    <div ref={emblaRef} className="overflow-hidden">
      <div className="flex -ms-6">
        {featuredProducts.map((product) => (
          <div
            key={product.id}
            className="
              min-w-0
              shrink-0
              basis-1/6
              ps-6
            "
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
