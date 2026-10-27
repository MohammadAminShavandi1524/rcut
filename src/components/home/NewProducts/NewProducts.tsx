"use client";

import Link from "next/link";

import ProductCard from "../FeaturedProducts/ProductCard";

import { useNewProducts } from "./useNewProducts";

const NewProducts = () => {
  const newProducts = useNewProducts();

  return (
    <section className="py-12 sm:py-16 lg:py-20 xl:py-24">
      <div className="w90 mx-auto" dir="rtl">
        {/* Section Header */}
        <div className="mb-6 flex flex-col gap-5 sm:mb-8 sm:gap-6 lg:mb-10 lg:flex-row lg:items-center lg:justify-between xl:mb-12">
          <div className="min-w-0 text-right">
            <h2 className="text-foreground xss:text-[25px] text-[23px] leading-[1.5] font-bold sm:text-[28px] lg:text-[32px] xl:text-4xl">
              محصولات جدید
            </h2>

            <p className="text-muted-foreground mt-2 text-[13px] leading-7 sm:mt-3 sm:text-sm lg:text-base">
              جدیدترین ابزارهای اضافه شده به مجموعه آرکات
            </p>
          </div>

          <Link
            href="/products?sort=newest"
            className="border-custom-primary text-custom-primary hover:bg-custom-primary inline-flex w-full shrink-0 items-center justify-center rounded-lg border px-5 py-3 text-[13px] font-semibold transition-colors duration-300 hover:text-white sm:w-fit sm:px-7 sm:text-sm"
          >
            مشاهده همه محصولات
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 items-stretch gap-4 min-[480px]:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:gap-6 xl:grid-cols-4 2xl:grid-cols-5">
          {newProducts.map((product, index) => (
            <div
              key={product.id}
              className={index >= 4 ? "hidden min-[480px]:block" : ""}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewProducts;
