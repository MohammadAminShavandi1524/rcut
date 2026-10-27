import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

import type { ApiProduct } from "./products.api";

type Props = {
  product: ApiProduct;
  showCategory?: boolean;
};

const ProductCard = ({ product, showCategory = true }: Props) => {
  const productHref = `/products/${product.id}`;

  return (
    <article
      dir="rtl"
      className="group border-border bg-background hover:border-custom-primary 3xl:min-h-[500px] flex h-full min-h-[390px] flex-col overflow-hidden rounded-2xl border transition-colors duration-300 sm:min-h-[430px] lg:min-h-[410px] xl:min-h-[450px]"
    >
      {/* Image */}
      <div className="relative aspect-square shrink-0 overflow-hidden">
        <Link
          href={productHref}
          className="absolute inset-0 z-0"
          aria-label={`مشاهده ${product.name}`}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className="3xl:p-6 object-contain p-4 transition-transform duration-500 group-hover:scale-[1.03] sm:p-5"
          />

          {/* Tags */}
          {(product.top_seller || product.new) && (
            <div className="pointer-events-none absolute start-4 top-4">
              {product.top_seller ? (
                <span className="bg-custom-primary rounded-md px-3 py-1.5 text-xs font-medium text-white">
                  پرفروش
                </span>
              ) : (
                <span className="border-custom-primary bg-background text-custom-primary rounded-md border px-3 py-1.5 text-xs font-medium">
                  جدید
                </span>
              )}
            </div>
          )}
        </Link>
      </div>

      <div className="bg-border h-px shrink-0" />

      {/* Content */}
      <div className="3xl:gap-5 grid flex-1 grid-rows-[1fr_auto] gap-3 p-3.5 sm:p-4">
        {/* Product Info */}
        <Link href={productHref} className="block min-h-0">
          {/* {showCategory && (
            <span className="text-muted-foreground text-xs">
              {product.category.name}
            </span>
          )} */}

          <h3
            className={cn(
              "text-foreground text-sm font-bold sm:text-base",
              showCategory && "mt-2",
            )}
          >
            {product.name}
          </h3>

          <p className="text-muted-foreground mt-2 pe-1 text-justify text-[13px] leading-6 sm:mt-3 sm:pe-2 sm:text-sm sm:leading-7">
            {product.description}
          </p>
        </Link>

        {/* Price Inquiry */}
        <Link
          href="tel:09192081368"
          className="border-custom-primary text-custom-primary hover:bg-custom-primary flex min-h-11 w-full cursor-pointer items-center justify-center rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors duration-300 hover:text-white"
        >
          استعلام قیمت
        </Link>
      </div>
    </article>
  );
};

export default ProductCard;
